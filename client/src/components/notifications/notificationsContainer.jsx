import { useEffect, useState } from "react"
import axios from 'axios';
import {useSelector} from 'react-redux'
import NotificationComponent from "./notificationComponent";
export default function NotificationsContainer() {
    const {id} = useSelector((state)=>{
        return state.user
    }) 
    const [notifications, setNotif] = useState(null);
    useEffect(()=>{
        axios(`/notifications/${id}`).then(({data})=>{
            console.log(data);
            setNotif(data);
        }).catch(e=>{
            console.log(e);
        })
    },[id])
    return (
        <article className="absolute bg-stone-200 w-64 h-72 text-center py-4 rounded-xl top-12 text-black">
            {notifications ? 
                notifications.map((notif, i)=>
                (!notif.Notifications.isRead ?
                    <NotificationComponent key={i} id={id} data = {notif}></NotificationComponent> : false
                )
            )
                : 'No hay notificaciones para mostrar.'
            }

        </article>
    )
}