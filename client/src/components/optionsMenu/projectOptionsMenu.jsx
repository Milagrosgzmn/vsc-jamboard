export default function ProjectOptionsMenu() {

    return(
        <article className=' absolute left-full top-0 bg-neutral-900 text-white w-32 h-max rounded-2xl'>
                <ul className='py-4 font-medium text-xs'>
                    <li className='w-full px-4 py-2 hover:bg-neutral-700 cursor-pointer'>Renombrar</li>
                    <li className='w-full px-4 py-2 hover:bg-neutral-700 cursor-pointer'>Añadir contribuidor +</li>
                    <li className='w-full px-4 py-2 hover:text-red-600 hover:bg-neutral-700 cursor-pointer'>Eliminar proyecto</li>
                </ul>

        </article>
    )
}