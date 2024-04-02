/* eslint-disable react/prop-types */
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ContactOptionsMenu from '../optionsMenu/contactOptionsMenu';

import { useState, useEffect, useRef } from 'react';

export default function Contact({contact, pics, i}) {
    const random = Math.floor(Math.random()*4)
    const [openMenu, setOpenMenu] = useState(false);

    const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false); // cierra el menú si se hace clic fuera de él
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    return (
        <article className="flex flex-row w-56 h-20 rounded-full border-2 items-center justify-evenly mx-2">
            <div className="rounded-full w-16 h-16 overflow-hidden border-[1px] border-black/[0.8">
                <img className="w-full h-full object-cover" src={pics[i>3 ? random : i]} alt="profile picture" />
            </div>
            <h3>{contact.username}</h3>
            <div className='relative' ref={menuRef}>  
                <MoreVertRoundedIcon
                 onClick={()=>{
                    setOpenMenu(!openMenu)
                 }}
                 className='text-black/[0.7] cursor-pointer'/>
                {openMenu && <ContactOptionsMenu contact={contact}/>}
            </div>
        </article>
    )
}