import axios from "axios";
import useInputChange from "../../hooks/useInputChange";
import validation from './validation';
import { useState } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
export default function ProjectForm({setOpen}) {

    const {id} = useSelector(state=>{
        return state.user;
    })
    const [newBoard] = useState({
        name:'',
        description:'',
    })

    const { userData, errors, handleChange } = useInputChange(newBoard, validation);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`/board/new`,{
                newBoard:userData,
                user_id:id,
            },{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',}
            });
            setOpen(false)
            console.log(data);
        } catch (error) {
            console.error(error);
        }
        
    }


    return (

        <div className="absolute w-full h-screen bg-black/[.6] flex flex-col justify-center items-center">
            <div className="w-full grid justify-items-end">
                <button 
                onClick={()=>{
                    setOpen(false)
                }}
                className="rounded-xl text-Sl text-black bg-white/[.6] py-2 px-4 font-semibold mt-2 hover:bg-red-500 mr-10">X</button>
            </div>
            <form
            className="flex flex-col w-96 bg-black/[.95]  p-6 m-4 rounded-xl"
            onSubmit={handleSubmit}>
                <div className="flex flex-col mt-2">
                    <label className="font-semibold  text-white text-xl" htmlFor="name">Nombre del Proyecto:</label>
                    <input
                        className="rounded-2xl px-4 py-1 mt-4 text-black"
                        type="text" id="name" name="name" required
                        onChange={handleChange}
                    />
                </div>
                <div className="h-4 my-1">
                    <span className="text-red-500 font-normal" >{errors.name ? `${errors.name}*`: errors.email}</span>
                </div>
                <div className="flex flex-col mt-2">
                    <label className='font-semibold  text-white text-xl' htmlFor="description">Descripción:</label>
                    <input 
                        className="rounded-2xl px-4 py-1 mt-4 text-black"
                        type="description" id="description" name="description" required
                        onChange={handleChange}
                    />
                </div>
                <button className='rounded-full text-xl text-white bg-sky-500 px-6 py-2 font-semibold mt-4 hover:bg-white hover:text-sky-500 mx-auto'
                type="submit">Crear</button>
            </form>
        </div>
    )
}