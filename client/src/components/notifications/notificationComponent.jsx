import axios from 'axios';
/* eslint-disable react/prop-types */
export default function NotificationComponent({data, id}) {

    const {username, Notifications} = data;

    const issue = {
        connectRequest:`¡${username} te ha enviado una solicitud para conectar!`,
        addedToBoard:`¡${username} te ha añadido a un proyecto!`,
    }

    const handleAddContact = async ()=>{
        try {
            await axios.post('/contact/add',{
                user_id:id,
                friend_id: data.id,
            },{
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',}
            })
            //swal de bien
        } catch (error) {
            //sual de mal
            console.error(error);
        }
    }
    const handleUpdateNotif = async ()=>{
        try {
            axios.put('/contact/algo mas',{isRead:true},
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',}
            })
        } catch (error) {
            //swal de mal
            console.error(error);
        }
    }

    return (
        <article className="w-full h-32 border-2 border-b-stone-300 px-4 my-2">
            <div className="flex flex-row">
                <p className="font-semibold">{issue[Notifications.issue]}</p>
                <p className="absolute right-4 top-1 cursor-pointer hover:text-red-500 "
                onClick={handleUpdateNotif}>X</p>
            </div>
            {Notifications.issue =='connectRequest' && 
            <div className="flex flex-row justify-between items-center">
                <button className="bg-blue-500 font-semibold my-1 text-white py-2 px-4 rounded-xl" onClick={handleAddContact}>Aceptar</button>
                <button className="bg-red-500 font-semibold my-1 text-white py-2 px-4 rounded-xl" onClick={handleUpdateNotif}>Eliminar</button>
            </div>}
        </article>
    )
}