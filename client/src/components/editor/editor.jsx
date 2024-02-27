/* eslint-disable react/prop-types */

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';

import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';

import { Controlled as ControlledEditor} from 'react-codemirror2';
import {useState} from 'react';
import { useSelector } from 'react-redux';

export default function Editor(props) {

    const user_id = useSelector(state=>{
        return state.user.id;
    })
    const {displayName, value, language, handleLiveCoding, id, socket} = props;
    const [open, setOpen] = useState(true)

    function handleChange (editor, data, newValue){
        handleLiveCoding(language, newValue, socket, id, user_id)
    }
    return(
       <article id='code-editor' className={open? 'editor grow p-2 max-w-[65%]': 'grow-0 p-2 max-w-[15%]'}>
            <div className='flex justify-between bg-neutral-950 text-white rounded-t-xl p-2'>
                {displayName}
                <div onClick={()=>{setOpen(!open)}}>
                {open ? 
                    <CloseFullscreenRoundedIcon/> :
                    <OpenInFullRoundedIcon/>
                }
                </div>
            </div>
            <ControlledEditor
                onBeforeChange={(editor, data, newValue) => {
                    handleChange(editor, data, newValue);
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