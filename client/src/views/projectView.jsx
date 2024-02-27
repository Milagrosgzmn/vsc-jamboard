
import { useEffect } from "react";
import axios from "axios"; 
import io from 'socket.io-client'
import { useParams } from "react-router-dom"

import Editor from "../components/editor/editor";
import { useState } from "react";

const myUrl =  import.meta.env.VITE_API_BACK_URL || 'http://localhost:3001';


export default function ProjectView() {

    const [srcDoc, setSrcDoc] = useState('');
    const [html, setHtml] = useState('');
    const [css , setCss] = useState('');
    const [js, setJs] = useState('');

    const {id} = useParams();

    const socket = io(myUrl); 
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
        
        socket.on('connect', () => {
            console.log('Conexión establecida con el servidor');
        });
        socket.on(`${id}`, (data)=>{
            if(data.language==='xml'){
                setHtml(data.code)
            }
            if(data.language==='css'){
                setCss(data.code)
            }
            if(data.language==='javascript'){
                setJs(data.code)
            }
        })

        return () => {
            socket.off('connect'),
            socket.off(`${id}`)
            socket.disconnect();
        };
    }, []);

    useEffect(()=>{
        axios(`/board/s/${id}`).then(({data})=>{
            setCss(data.css);
            setHtml(data.html);
            setJs(data.js);
        }).catch(error=>{
            console.log(error)
        })
    },[id])

    function sendCode (language, code, socket, id, user_id){

        socket.emit('code',{
            user: user_id,
            language: language,
            code:code,
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
            />
            <Editor
                language='css' 
                displayName='CSS'
                value={css}
                onChange={setCss}
                handleLiveCoding = {sendCode}
                id={id}
                socket={socket}
            />
            <Editor
                language='javascript' 
                displayName='JS'
                value={js}
                onChange={setJs}
                handleLiveCoding = {sendCode}
                id={id}
                socket={socket}
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