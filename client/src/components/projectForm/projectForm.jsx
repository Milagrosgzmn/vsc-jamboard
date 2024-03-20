/* eslint-disable react/prop-types */
import axios from "axios";
import useInputChange from "../../hooks/useInputChange";
import validation from './validation';
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBoard } from "../../redux/actions/jamboardActions";
import { setMyBoards } from "../../redux/actions/jamboardActions";
// eslint-disable-next-line react/prop-types
export default function ProjectForm({setOpen}) {

    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();
    const {id} = useSelector(state=>{
        return state.user;
    })
    const [newBoard] = useState({
        name:'',
        description:'',
    })

    let { userData, errors, handleChange, setUserData } = useInputChange(newBoard, validation);
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(errors.name || errors.description){
            return;
        }
        
        try {
            if(isEditing){
                const board_id = localStorage.getItem('id');
                const {data} = await axios.put(`/board/${board_id}`,{
                    newBoard:userData,
                },{
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',}
                });
                setOpen(false)
                if(data.success){
                    dispatch(setMyBoards(id))
                    return;
                    // swal con ok
                }
            }
            const {data} = await axios.post(`/board/new`,{
                newBoard:userData,
                user_id:id,
            },{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',}
            });
            setOpen(false)
            dispatch(addNewBoard(data))
        } catch (error) {
            console.error(error);
        }
        
    }
    useEffect(()=>{
        const boardName = localStorage.getItem('board-name');
        const boardDesc = localStorage.getItem('board-description')
        if (boardDesc || boardName) setIsEditing(true);
        if (boardName) {
            setUserData(prevUserData => ({
                ...prevUserData,
                name: boardName
            }));
        }
    
        if (boardDesc) {
            setUserData(prevUserData => ({
                ...prevUserData,
                description: boardDesc
            }));
        }
        return ()=>{
            localStorage.removeItem('board-name');
            localStorage.removeItem('board-description');
            localStorage.removeItem('id');
        }
        
    },[])


    return (

        <div className="fixed w-full h-screen bg-black/[.6] flex flex-col pt-2 items-center">
            <div className="w-full grid justify-items-end">
                <button 
                onClick={()=>{
                    setOpen(false)
                }}
                className="rounded-xl text-Sl text-black bg-white/[.6] py-2 px-4 font-semibold mt-2 hover:bg-red-500 mr-10">X</button>
            </div>
            <form
            className="flex flex-col w-96 bg-black/[.95]  p-6 m-4 rounded-xl resize-y h-3/4"
            onSubmit={handleSubmit}>
                <div className="flex flex-col mt-2">
                    <label className="font-semibold  text-white text-xl" htmlFor="name">Nombre del Proyecto:</label>
                    <input
                        className="rounded-2xl px-4 py-1 mt-4 text-black"
                        type="text" id="name" name="name" required
                        onChange={handleChange}
                        value={userData.name}
                    />
                </div>
                <div className="h-4 my-1">
                    <span className="text-red-500 font-normal" >{errors.name ? `${errors.name}*`: errors.name}</span>
                </div>
                <div className="flex flex-col mt-2">
                    <label className='font-semibold  text-white text-xl' htmlFor="description">Descripción:</label>
                    <textarea 
                        className="rounded-2xl px-4 py-1 mt-4 text-black resize-y h-32"
                        id="description" 
                        name="description" 
                        onChange={handleChange}
                        value={userData.description}
                    />
                </div>
                <div className="h-4 my-1">
                    <span className="text-red-500 font-normal" >{errors.description ? `${errors.description}*`: errors.description}</span>
                </div>
                <button className='rounded-full text-xl text-white bg-sky-500 px-6 py-2 font-semibold mt-4 hover:bg-white hover:text-sky-500 mx-auto'
                type="submit">Enviar</button>
            </form>
        </div>
    )
}