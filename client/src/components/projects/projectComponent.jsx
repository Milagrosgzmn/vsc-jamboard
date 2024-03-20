/* eslint-disable react/prop-types */
import boardPic from '../../assets/images/cover.png';
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from 'react';

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ProjectOptionsMenu from '../optionsMenu/projectOptionsMenu';

export default function Project({project, setOpen, setContactMenu}) {

    const [openMenu, setOpenMenu] = useState(false);
    const [isTooLong, setIsTooLong] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const menuRef = useRef(null);

   useEffect(() => {
     function handleClickOutside(event) {
       if (menuRef.current && !menuRef.current.contains(event.target)) {
         setOpenMenu(false); // cierra el menú si se hace clic fuera de él
       }
     }
 
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, []);


   useEffect(()=>{
    const element = document.getElementById(`${project.id}`); 
    const container =element.clientHeight;
    const content = element.scrollHeight;
    
    if(content>container){
        element.style.overflow = 'hidden';
        setIsTooLong(true)
    }
        if (seeMore) {
            element.style.overflow = 'auto';
        }else{
            element.style.overflow = 'hidden';
        }
   },[seeMore, project.id])


    return(
        <article className={`flex w-80 ${seeMore ? 'h-max' : 'h-56'} rounded-3xl border-2 p-4 m-4 justify-between items-top`}>
        <div className='w-full flex flex-col justify-between'>
        
            <div className="flex flex-row items-center justify-between pb-2"  >
                <Link className='flex flex-row items-center' to={`/project/${project.id}`}>
                    <div className=" bg-black rounded-full w-10 h-10  mr-4 overflow-hidden">
                        <img className='w-full h-full object-scale-down' src={boardPic} alt="board pic" />
                    </div>
                    <h3 className="font-bold">{project.name}</h3>
                </Link>
                <div className=' relative' ref={menuRef}>
                    <MoreVertRoundedIcon onClick={()=>{
                        setOpenMenu(!openMenu)
                    }} className='text-black/[0.7] cursor-pointer'/>
                    {openMenu && <ProjectOptionsMenu project={project} setOpen={setOpen} setContactMenu={setContactMenu}/>}
                </div>
            </div>
            <div className='font-normal text-nuetral-500 my-2'>
                <p id={project.id} className={`${seeMore ? 'h-max' : 'h-12'} `}>
                {project.description}</p>
                {isTooLong && ( !seeMore ? <span onClick={()=>{setSeeMore(true)}} className=' cursor-pointer font-semibold'>. . . <ArrowDropDownRoundedIcon/></span> : <ArrowDropUpRoundedIcon onClick={()=>{setSeeMore(false)}}/>)}
            </div>
            <ul className="flex text-sm">
                <span className=" font-medium ">Colaboradores: </span>
                {project.contributors.length ? project.contributors.map((colaborator, i)=>(
                    <li className="pl-1" key={i}> {colaborator},</li>
                )) : <li className='pl-1 font-light'>Sin contribuyentes.</li>}
            </ul>
            
            <p className='text-xs'><span className=" font-medium text-sm">Fecha de creación: </span>{new Date(project.createdAt).toLocaleString().split(',')[0]}</p>
        </div>
        
        
        </article>
        
    
    )
}