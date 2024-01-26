import Project from './projectComponent'
import style from './styles.module.css'

export default function ProjectGrid() {

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
    ]

    return(
        <article className={style.projectGrid}>
            {
                myProjects.map((project, i) =>(
                    <Project key={i} project={project}/>
                ))
            }
        </article>
    )
}