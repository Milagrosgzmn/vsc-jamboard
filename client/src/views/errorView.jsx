import { NavLink} from "react-router-dom"

export default function ErrorView() {
    return(
        <div style={{height:'90vh'}} className="flex flex-col justify-center items-center border-box">
            <p className="text-xl">No hemos encontrado la página que estás buscando.
            </p>
            <NavLink className='mt-8 darkbg py-2 px-4 rounded-3xl font-semibold border-2
            hover:bg-white hover:text-black
            ' to='/home'>
                    Volver
            </NavLink >
        </div>
    )
}