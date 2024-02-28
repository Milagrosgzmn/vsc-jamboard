import { useEffect, useState } from "react";
import Contact from "./contact"

import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import profile1 from '../../assets/images/profile1.jpg'
import profile2 from '../../assets/images/profile2.jpg'
import profile3 from '../../assets/images/profile3.jpg'
import profile4 from '../../assets/images/profile4.jpg'

import { useSelector } from "react-redux";

export default function ContactsList() {

    const contacts = useSelector(state=>{
        return state.user.contacts;
    })
     
    const profilePics = [profile1,profile2,profile3,profile4];

    const [visibleContacts, setVisibleContacts] = useState(4)
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(visibleContacts);

    useEffect(()=>{
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 600) {
                setVisibleContacts(1);
            }else if (screenWidth <800) {
                setVisibleContacts(2);
            } else if (screenWidth <1000) {
                setVisibleContacts(3);
            } else if (screenWidth < 1300) {
                setVisibleContacts(4);
            } else {
                setVisibleContacts(5);
            }
            };
        setEnd(visibleContacts)
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
   
    },[visibleContacts])

    const handleNext = ()=>{
        if(end>contacts.length){
            setStart(0)
            setEnd(visibleContacts)
            return
        }
        setEnd(prevEnd=>prevEnd+visibleContacts)
        setStart(prevStart => prevStart+visibleContacts)
    }
    const handlePrev = ()=>{
        setStart((prevStart) => Math.max(prevStart - visibleContacts, 0));
        setEnd((prevEnd) => Math.max(prevEnd - visibleContacts, visibleContacts));
    }

    return(
        <section className="w-10/12 flex flex-col my-16">
            <div className="flex flex-row justify-between items-center">
                <h2>Mi red</h2>
                <div className="flex">
                    <button className="bg-green-500 font-semibold mx-2 py-2 px-4 rounded-xl"> Nuevo contacto +</button>
                    <input className="rounded-2xl px-4 py-1 border-2 border-inheret" type="search" placeholder="Buscar contacto"/>
                </div>
            </div>

            <div className="relative flex items-center">
                <div className="absolute left-0 rounded-full bg-black/20 cursor-pointer" onClick={handlePrev}>
                    <ArrowLeftRoundedIcon/>
                </div>
                <div className="absolute right-0 rounded-full bg-black/20 cursor-pointer" onClick={handleNext}>
                    <ArrowRightRoundedIcon/>
                </div> 
                <div className=" mx-auto w-11/12">
                    <article className="w-full h-40 flex items-center">
                        
                        {contacts.slice(start, end).map((contact, i) =>(
                            <Contact key={i} i={i} pics={profilePics} contact={contact} />
                        ))}
                    </article>
                </div>
            </div>
            

            
        </section>
    )
}