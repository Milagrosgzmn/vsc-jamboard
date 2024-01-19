
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export default function NavBar(){

    const [open, setOpen] = useState(false);


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

    return (
        <header className="md:flex w-full  h-[4.5rem] fixed z-10 items-center justify-between bg-white md:px-10 px-4 ">
        <div></div>
        <div  onClick={()=>{
            setOpen(!open);
        }}>{
            open ? <div className="static md:hidden"><CloseRoundedIcon className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"/></div>
             : <div className="static  md:hidden"><MenuRoundedIcon className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"/></div>
        }
        </div>
        <nav>
            <ul className={`bg-white md:flex md:w-auto md:pb-0 md:items-center left-0 w-full absolute md:static
            md-pl-0 pl-9 transition-opacity ease-out duration-500

            ${open ? 'top-20 opacity-100' :'opacity-0 top-[-490px]'}
            md:opacity-100`}>
                <li>Hola, usuario, de estar registered</li>
                <li><Link to='/sign-up'>Sign Up</Link></li>
                <li><Link to='/log-in'>Log In</Link></li>
                <li /*aqui onclick cierro sesion y redirect home*/>Log Out</li>
                
            </ul>
        </nav>
    </header>
    )
}