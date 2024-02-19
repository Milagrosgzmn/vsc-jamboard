/* eslint-disable react/prop-types */
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

import { Controlled as ControlledEditor} from 'react-codemirror2'

export default function Editor(props) {

    const {displayName, value, language, onChange} = props;

    function handleChange (editor, data, value){
        onChange(value)
    }

    return(
       <article className='editor-cont h-full'>
            <div className='flex justify-between bg-blue-900 text-white'>
                {displayName}
                <p>c/O icon</p>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value = {value}
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