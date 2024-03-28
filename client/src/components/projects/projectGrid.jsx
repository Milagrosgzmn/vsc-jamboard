/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Project from './projectComponent'
import style from './styles.module.css'

import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { useSelector } from 'react-redux';

export default function ProjectGrid({setOpen, setContactMenu}) {

    const [end,setEnd] = useState();
    const [seeMore, setSeeMore] = useState(false)

    const myProjects = useSelector(state=>{
        return state.jamboard.boards;
    })

    useEffect(()=>{
        if (myProjects.length < 5 ){
            setEnd(myProjects.length)
        }else{
            setEnd(6)
            if(myProjects.length>6){
                setSeeMore(true)
            }
        }
    },[myProjects])
    return(
        <article className="lg:block flex justify-center min-h-80 mt-4">
        {myProjects.length?
        <article className={style.projectGrid}>
            {
                myProjects.slice(0,end).map((project, i) =>(
                    <Project key={i} project={project} setOpen={setOpen} setContactMenu={setContactMenu}/>
                ))
            }
            {seeMore && 
            <div className='p-4 font-semibold text-xl cursor-pointer' onClick={()=>{setSeeMore(!seeMore)
                seeMore ? setEnd(myProjects.length) : setEnd(6)
            }}>
                {seeMore ? <div>Ver más <ArrowDropDownRoundedIcon/></div> : <div>Ver menos <ArrowDropUpRoundedIcon/></div>}
            </div>
            }
            
            
           
        </article>
        : <p className=' text-center font-medium text-xl py-4 my-4'>No hay proyectos para mostrar.</p>
        }
        </article>
    )
}