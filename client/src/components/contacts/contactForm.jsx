/* eslint-disable react/prop-types */
import axios from "axios";
import Swal from "sweetalert2";
import { setMyBoards } from "../../redux/actions/jamboardActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function ContactForm(props){

    const {setContactMenu} = props;
    const [contactId, setContactId] = useState('');
    const [errors, setErrors] = useState('');

    const board_id = localStorage.getItem('id');
    const contributors = localStorage.getItem('contributors').split(',');

    const dispatch = useDispatch();
    const {id, contacts} = useSelector(state=>{
        return state.user;
    })


    const contactsToAdd = contacts.filter(({username}) => {
        return !contributors.some( contributor => contributor === username)
    });

    useEffect(()=>{
        return ()=>{
            localStorage.removeItem('id');
            localStorage.removeItem('contributors');
        }
    },[])

    const handleAddContributor = async(e)=>{
        e.preventDefault()

        if(!contactId){
            setErrors('Debe seleccionar un contacto')
            return
        }
        try {
            const {data} = await axios.put(`/board/contributor/${contactId}`,
                {board_id},
                {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',}
            });
            if(data.success){
                dispatch(setMyBoards(id));
                setContactMenu(false)
                Swal.fire({
                    title: "¡Listo!",
                    text: "Agregaste un contribuidor con exito",
                    icon: "success"
                  });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Parece que hubo un error, intentalo de nuevo más tarde.",
              });
        }
    }

    const handleChange = (e)=>{
        setContactId(e.target.value);
    }

    return (

        <div className=" w-full fixed h-screen bg-black/[.6] flex flex-col pt-2 items-center">
            <div className="w-full grid justify-items-end">
                <button 
                onClick={()=>{
                    setContactMenu(false)
                }}
                className="rounded-xl text-Sl text-black bg-white/[.6] py-2 px-4 font-semibold mt-2 hover:bg-red-500 mr-10">X</button>
            </div>
            <form
            className="flex flex-col justify-between w-96 bg-black/[.95] p-6 m-4 rounded-xl resize-y h-1/2"
            onSubmit={handleAddContributor}>
                <div className="flex items-center justify-center">
                <div className="flex flex-col mt-2">
                    <label className="font-semibold  text-white text-xl mb-2">Añadir contacto a proyecto:</label>
                    <select 
                    className="rounded-xl p-2 my-2 "
                    onChange={handleChange} name="" id="" required>
                        <option defaultValue='' >Seleccione un contacto</option>
                        {contactsToAdd.length ? contactsToAdd.map(contact =>(
                            <option key={contact.id} value={contact.id}>{contact.username}</option>
                        )) :
                            <option value=''>Parece que no tienes contactos para agregar.</option>
                        }
                        
                    </select>
                    
                </div>
                <div className="h-4 my-1">
                    <span className="text-red-500 font-normal" >{errors ? `${errors}*`: errors}</span>
                </div>
                </div>
                
                <button className='rounded-full text-xl text-white bg-sky-500 px-6 py-2 font-semibold mt-4 hover:bg-white hover:text-sky-500 mx-auto'
                type="submit">Enviar</button>
            </form>
        </div>
    )
}