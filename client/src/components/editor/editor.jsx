/* eslint-disable react/prop-types */
import {diffChars} from 'diff';
import { copyText } from './copyText';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';

import { Controlled as ControlledEditor} from 'react-codemirror2';
import {useState} from 'react';
import { useSelector } from 'react-redux';

export default function Editor(props) {
    let timeout;
    const user_id = useSelector(state=>{
        return state.user.id;
    })
    const {displayName, value, language, handleLiveCoding, id, socket, onChange, externUser, setExternUser} = props;
    const [open, setOpen] = useState(true)
    const [copied, setCopied] = useState(false)

    function handleChange (editor, data, newValue){
        const differs = diffChars(value, newValue);
        let patch;
        if (differs.length>1) {
            patch= {
                start : differs[0].count,
                action: differs[1].added ? 'add' : (differs[1].removed ? 'delete' : 'unchanged'),
                value: differs[1].value,
                end:( differs[0].count +  differs[1].count),
                language
            }
        }else{
            patch={
                start:0,
                action: differs[0].added ? 'add' : (differs[0].removed ? 'delete' : 'unchanged'),
                value:differs[0].value,
                end:differs[0].count,
                language
            }
        }
        handleKeyUp(patch)
        if (!externUser) {
            onChange(newValue)
        }
    }
    function handleKeyUp(patch) {
        // Cancelar el temporizador anterior si existe
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            // Enviar los datos al servidor WebSocket
            handleLiveCoding(socket, id, user_id, patch)
        }, 500);
    }
  
    return(
       <article id='code-editor' className={open? 'editor grow p-2 w-full md:max-w-[65%]': 'grow-0 p-2 max-w-[15%]'}>
            <div className='flex justify-between bg-neutral-950 text-white rounded-t-xl p-2'>
                {displayName}
                <div>
                <div className='hidden md:block' onClick={()=>{setOpen(!open)}}>
                {open ? 
                    <CloseFullscreenRoundedIcon/> :
                    <OpenInFullRoundedIcon/>
                }
                </div>
                {!copied ? <ContentCopyRoundedIcon 
                    onClick={()=>{
                        copyText(value, setCopied)
                    }}
                /> : <DoneRoundedIcon className='text-green-500'/>}
                </div>
            </div>
            <ControlledEditor
                onBeforeChange={(editor, data, newValue) => {
                    handleChange(editor, data, newValue);
                    setExternUser(false);
                }}
                value={value}
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme:'material',
                    lineNumbers:true
                }}
            />
       </article>
    ) 
}