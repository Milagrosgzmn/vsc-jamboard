import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { deleteBoard } from "../../redux/actions/jamboardActions";
/* eslint-disable react/prop-types */
export default function ProjectOptionsMenu(props) {

    const {setOpen, project, setContactMenu} = props;
    const dispatch = useDispatch();
    const {id} = useSelector(state=>{
        return state.user;
    })
    const handleEdit =()=>{
        localStorage.setItem('board-name', project.name);
        localStorage.setItem('board-description', project.description);
        localStorage.setItem('id', project.id);
    }

    const handleDelete = ()=>{
        const role = localStorage.getItem('role');
        try {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Estás a punto de eliminar este proyecto",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    const url = role === 'owner' ? '/board' : '/board/contributor';
                    await axios.delete(`${url}/${project.id}_${id}`)
                    dispatch(deleteBoard(project.id));
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El proyecto ha sido borrado de tu tablero",
                        icon: "success"
                    });
                }
              });
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <article className=' absolute sm:left-1 right-0 top-5.5 bg-neutral-900 text-white w-32 h-max rounded-2xl'>
                <ul className='py-4 font-medium text-xs'>
                    <li onClick={()=>{
                            handleEdit()
                            setOpen(true)
                        }
                        } className='w-full px-4 py-2 hover:bg-neutral-700 cursor-pointer'>Editar</li>
                    <li onClick={()=>{
                        setContactMenu(true);
                        localStorage.setItem('id', project.id);
                        localStorage.setItem('contributors', project.contributors);
                    }}
                        className='w-full px-4 py-2 hover:bg-neutral-700 cursor-pointer'>Añadir contribuidor +
                    </li>
                    <li onClick={handleDelete}
                    className='w-full px-4 py-2 hover:text-red-600 hover:bg-neutral-700 cursor-pointer'>Eliminar proyecto</li>
                </ul> 
        </article>
    )
}