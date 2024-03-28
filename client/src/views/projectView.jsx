import { useEffect } from "react";
import axios from "axios"; 
import io from 'socket.io-client'
import { useParams } from "react-router-dom"

import Editor from "../components/editor/editor";
import { useState } from "react";
import { useSelector } from "react-redux";

const myUrl =  import.meta.env.VITE_API_BACK_URL || 'http://localhost:3001';

export default function ProjectView() {
    const user_id = useSelector(state=>{
        return state.user.id;
    })
    const [socket, setSocket] = useState();
    const [externUser, setExternUser] = useState(false)
    const [srcDoc, setSrcDoc] = useState('');
    const [html, setHtml] = useState('');
    const [css , setCss] = useState('');
    const [js, setJs] = useState('');
    const {id} = useParams();

    useEffect(()=>{
       const timeOut = setTimeout(() => {
            setSrcDoc(`
            <html>
                <meta charset="UTF-8">
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
            </html>
        `)
       }, 350); 
       return ()=>clearTimeout(timeOut)
    },[css, js, html])

    useEffect(() => {
        axios(`/board/s/${id}`,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',}
        }).then(({data})=>{
            setCss(data.css);
            setHtml(data.html);
            setJs(data.js);
          
        }).catch(error=>{
            console.error(error)
        }) 
        },[]);

        useEffect(()=>{
            const s = io(myUrl);
            setSocket(s);
        return ()=>{
            s.disconnect()
        }
        },[])

    useEffect(() => {
        if(!socket)return;
        const handlePatch = (language, patch)=>{
            const value = language === 'xml' ? html : (language === 'css' ? css : js);
            let newCode;
            if (patch.action === 'add') {
                newCode = value.slice(0,patch.start) + patch.value +value.slice(patch.start)       
            }else if(patch.action === 'delete'){
                newCode = value.slice(0,patch.start)+value.slice(patch.end)
            } else {
                newCode = value;
            }
            return language === 'xml' ? setHtml(newCode) : (language === 'css' ? setCss(newCode) : setJs(newCode));
        }
        socket.on(`${id}`, (data)=>{
            if (user_id !== data.user) {
                setExternUser(true);
                handlePatch(data.patch.language, data.patch)
        }})

        return () => {
            socket.off(`${id}`);
        };
    },[css,html,js, socket, id, user_id]);

    function sendCode (socket, id, user_id, patch){
        socket.emit('code',{
            user: user_id,
            patch:patch,
            id:id,
        })
    }
    
    return(
    <div className="pt-16">
        <section className=" pt-2 editors-cont flex overflow-x-auto max-w-full bg-neutral-900">
            <Editor 
                language='xml' 
                displayName='HTML'
                value={html}
                onChange={setHtml}
                handleLiveCoding = {sendCode}
                id={id}
                socket={socket}
                externUser={externUser}
                setExternUser={setExternUser}
            />
            <Editor
                language='css' 
                displayName='CSS'
                value={css}
                onChange={setCss}
                handleLiveCoding = {sendCode}
                id={id}
                socket={socket}
                externUser={externUser}
                setExternUser={setExternUser}
            />
            <Editor
                language='javascript' 
                displayName='JS'
                value={js}
                onChange={setJs}
                handleLiveCoding = {sendCode}
                id={id}
                socket={socket}
                externUser={externUser}
                setExternUser={setExternUser}
            />
        </section>
        <section className="w-full">
            <iframe 
            srcDoc={srcDoc}
            className="border-none"
            title="output"
            sandbox="allow-scripts"
            width='100%'
            height='100%'
           >
            </iframe>
        </section>
    </div>)
}