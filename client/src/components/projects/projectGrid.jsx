import { useEffect, useState } from 'react'
import Project from './projectComponent'
import style from './styles.module.css'

export default function ProjectGrid() {

    const [end,setEnd] = useState();
    const [seeMore, setSeeMore] = useState(false)

    const myProjects = [
        {
            name: '1 project',
            description:'mi proyecto de jamboard ejemplo',
            colaborators:['Luqui', 'Marco', 'Mirko'],
            creationDate: '25-2-24'
        },
        {
            name: '2 project',
            description:'mi proyecto de jamboard ejemplo',
            colaborators:['Luqui', 'Marco', 'Mirko'],
            creationDate: '25-2-24'
        },
        {
            name: '3 project',
            description:'mi proyecto de jamboard ejemplo',
            colaborators:['Luqui', 'Marco', 'Mirko'],
            creationDate: '25-2-24'
        },
        {
            name: '4 project',
            description:'mi proyecto de jamboard ejemplo',
            colaborators:['Luqui', 'Marco', 'Mirko'],
            creationDate: '25-2-24'
        },
        {
            name: '1 project',
            description:'mi proyecto de jamboard ejemplo',
            colaborators:['Luqui', 'Marco', 'Mirko'],
            creationDate: '25-2-24'
        },
        {
            name: '2 project',
            description:'mi proyecto de jamboard ejemplo',
            colaborators:['Luqui', 'Marco', 'Mirko'],
            creationDate: '25-2-24'
        },
        {
            name: '3 project',
            description:'mi proyecto de jamboard ejemplo',
            colaborators:['Luqui', 'Marco', 'Mirko'],
            creationDate: '25-2-24'
        },
        {
            name: '4 project',
            description:'mi proyecto de jamboard ejemplo',
            colaborators:['Luqui', 'Marco', 'Mirko'],
            creationDate: '25-2-24'
        },
    ]

    useEffect(()=>{
        if (myProjects.length < 5 ){
            setEnd(myProjects.length)
        }else{
            setEnd(6)
            setSeeMore(true)
        }
    },[])
    return(
        <article className={style.projectGrid}>
            {
                myProjects.slice(0,end).map((project, i) =>(
                    <Project key={i} project={project}/>
                ))
            }
            <div className='p-4 font-semibold text-xl' onClick={()=>{setSeeMore(!seeMore)
                seeMore ? setEnd(myProjects.length) : setEnd(6)
            }}>
                {seeMore ? 'Ver más...' : 'Ver menos'}
            </div>
           
        </article>
    )
}