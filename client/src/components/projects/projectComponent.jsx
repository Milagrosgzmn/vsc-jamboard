/* eslint-disable react/prop-types */

export default function Project({project}) {
    return(
        <article className="flex flex-col w-80 h-40 rounded-3xl border-2 p-4 my-4">
            <div className="flex flex-row items-center justify-between">
                <div className=" bg-red-500 rounded-full w-8 h-8">
                    <img src="" alt="" />
                </div>
                <h3 className="font-bold">{project.name}</h3>
            </div>
            <p>{project.description}</p>
            <ul className="flex">
                <span className="text-normal font-medium">Colaboradores: </span>
                {project.colaborators.map((colaborator, i)=>(
                    <li className="px-2" key={i}>{colaborator}</li>
                ))}
            </ul>
            <p>{project.creationDate}</p>
        </article>
    
    )
}