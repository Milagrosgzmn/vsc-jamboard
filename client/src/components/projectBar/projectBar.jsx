/* eslint-disable react/prop-types */
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

import { copyText } from '../editor/copyText';
import {Link, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function ProjectBar(){

    const [isCopied, setCopied] = useState(false)
    const {id} = useParams();
    const boards = useSelector(state=>{
        return state.jamboard.boards
    });
    const [project] =boards.filter(board=>{
        return board.id === id
    });


    return (
    <header className="flex flex-row box-border w-full  h-[4.5rem]  items-center justify-between darkbg md:px-10 px-4 font-bold ">
        <div className='flex items-center'>
            <Link to={'/home'}>
                <ArrowBackRoundedIcon/>
            </Link>
            <div className='pl-4'>{project.name}</div>
        </div>
        <div className='flex flex-col items-center'>
            <div className='w-full flex justify-between'>
                <h4>CÓDIGO</h4>
                {!isCopied ? <ContentCopyRoundedIcon 
                    onClick={()=>{
                        copyText(project.enterCode, setCopied)
                    }}
                /> : <DoneRoundedIcon className='text-green-500'/>}
            </div>
            
            <p>{project.enterCode}</p>
        </div>
        <button className='bg-green-500 py-2 px-4 rounded-full hover:bg-blue-500'>Guardar</button>
        
    </header>
    )
}