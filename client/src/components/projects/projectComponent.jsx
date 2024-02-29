/* eslint-disable react/prop-types */
import boardPic from '../../assets/images/cover.png';
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from 'react';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ProjectOptionsMenu from '../optionsMenu/projectOptionsMenu';

export default function Project({project}) {
   const [openMenu, setOpenMenu] = useState(false);

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

    return(
        <article className="flex w-80 h-40 rounded-3xl border-2 p-4 my-4 justify-between items-top ">
        <Link className='w-10/12' to={`/project/${project.id}`} >
        
            <div className="flex flex-row items-center justify-between pb-2">
                <div className=" bg-black rounded-full w-10 h-10 overflow-hidden">
                    <img className='w-full h-full object-scale-down' src={boardPic} alt="board pic" />
                </div>
                <h3 className="font-bold">{project.name}</h3>
            </div>
            <p>{project.description}</p>
            <ul className="flex text-sm">
                <span className=" font-medium">Colaboradores: </span>
                {/* {project.colaborators.map((colaborator, i)=>(
                    <li className="pl-1" key={i}> {colaborator},</li>
                ))} */}
            </ul>
            <p>{project.creationDate}</p>
        </Link>
        <div className='pt-2 relative' ref={menuRef}>
            <MoreVertRoundedIcon onClick={()=>{
                setOpenMenu(!openMenu)
            }} className='text-black/[0.7] cursor-pointer'/>
            {openMenu && <ProjectOptionsMenu/>}
        </div>
        
        </article>
        
    
    )
}