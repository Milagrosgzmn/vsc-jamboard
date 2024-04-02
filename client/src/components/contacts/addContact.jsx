import axios from "axios";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
export default function AddContact({contact, setAddContact, setActivate, setSearchValue}) {

    const {id} = useSelector(state=>{
        return state.user;
    })
    const handleSendInvitation = async ()=>{
        try {
            const {data} = await axios.post('/contact/check',{
                user_id:id,
                friend_id: contact.id
            },{
                withCredentials:true
            })
            if (data.success) {
                setAddContact(false)
                setSearchValue('')
                setActivate(false)
                Swal.fire({
                    title: "Solicutd enviada",
                    icon: "success"
                  });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <article className="flex py-2 flex-col">
            <h3 className="font-semibold pl-2 text-base">{contact.username.charAt(0).toUpperCase() + contact.username.slice(1)}</h3>
            <button 
            onClick={handleSendInvitation}
            className="bg-blue-500 font-bold my-1 text-white py-2 px-4 rounded-xl">Enviar solicitud</button>
        </article>
    )
}