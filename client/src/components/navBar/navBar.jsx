
import { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch, useSelector } from "react-redux";
import style from './navBar.module.css';
import { logOutUser } from "../../redux/actions/userActions";

export default function NavBar(){

    const [open, setOpen] = useState(false);
    const userLogged = useSelector(state=>{
        return state.user.username;
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleDisp (){
        const cont= document.querySelector('.content-cont');
        if(cont){
            if (open) {
                cont.style.opacity = '0';
                cont.style.pointerEvents = 'none'; 
            }else{
                setTimeout(()=>{
                    cont.style.opacity = '1';
                    cont.style.pointerEvents = 'auto';
                },300)
                
            }
        }
       
    }

    useEffect(()=>{
        handleDisp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[open])

    const handleLogOut =()=>{
        dispatch(logOutUser())
        navigate('/');
    }

    return (
    <header className="box-border w-full md:flex h-[4.5rem] fixed z-10 items-center justify-between darkbg font-bold ">
        <div></div>
        <div  onClick={()=>{
            setOpen(!open);
        }}>{
            open ? <div className="static md:hidden"><CloseRoundedIcon className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"/></div>
             : <div className="static  md:hidden"><MenuRoundedIcon className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"/></div>
        }
        </div>
        <nav className="darkbg flex justify-end md:w-10/12">
            <ul className={`bg-black md:flex w-full md:pb-0 md:items-center left-0 md:w-80 absolute md:static
            md-pl-0 pl-9 transition-opacity ease-out duration-500 md:justify-end

            ${open ? 'top-16 opacity-100 pb-4' :'opacity-0 top-[-490px]'}
            md:opacity-100`}>

                { userLogged ?
                <>
                    <li className="cursor-pointer hidden md:block"><NotificationsNoneRoundedIcon/></li>
                    <li className={style.list}>Hola, {userLogged}</li>    
                    <li className={style.list} onClick={handleLogOut}>Cerrar sesión</li>
                    <li className="md:hidden block my-2 mx-4">Notificaciones</li>
                </> :
                <>
                    <li className={style.list}><Link to='/log-in'>Iniciar sesión</Link></li>
                    <li className={style.list}><Link to='/sign-up'>Registrarse</Link></li>
                </>
                }
                
            </ul>
        </nav>
    </header>
    )
}