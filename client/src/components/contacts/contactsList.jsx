import axios from 'axios';
import Contact from "./contact"
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import profile1 from '../../assets/images/profile1.jpg'
import profile2 from '../../assets/images/profile2.jpg'
import profile3 from '../../assets/images/profile3.jpg'
import profile4 from '../../assets/images/profile4.jpg'
import AddContact from "./addContact";

import {useOnKeyPress} from '../../hooks/useOnKeyPress';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { contactsReset, filterContacts} from '../../redux/actions/userActions';

export default function ContactsList() {
    const dispatch = useDispatch();
    const {contacts,id} = useSelector(state=>{
        return state.user;
    })
    useEffect(()=>{},[contacts])
     
    const profilePics = [profile1,profile2,profile3,profile4];
    const [isAdding, setAdding] = useState(false);
    const [didActivate, setActivate] = useState(false);
    const [isSearching, setSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchValueContact, setSearchValueContact] = useState('');
    const [addContact, setAddContact] = useState(false)
    const [contactList, setContactList] = useState([]);
    const [buttonCont] = useState({
        small:'+',
        normal:'Nuevo contacto +'
    })
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
    function handleChangeAlreadyContact(e){
        setSearchValueContact(e.target.value)

        if (e.target.value) {
            setSearching(true)
            const value = e.target.value.toLowerCase();
            dispatch(filterContacts(value))
        }else{
            setSearching(false)
            dispatch(contactsReset())
        }
        
     }
    const handleChange = (e)=>{
        setSearchValue(e.target.value);
        if(!e.target.value){
           setContactList([]);
           setAdding(false);
           setActivate(false);
        }else{
            setAdding(true);
        }
        
    }
    const handleSearchContact = async()=>{
        setActivate(true);
        try {
            let searchV = searchValue.trim();
            const {data} = await axios(`/contact?username=${searchV}&me=${id}`, {
                withCredentials: true,
              });
                setContactList(data)
           } catch (error) {
            console.error(error);
           }
    }
    useOnKeyPress(handleSearchContact, 'Enter', isAdding);

    return(
        <section className="w-10/12 flex flex-col my-16">
            <div className="flex sm:flex-row flex-col  justify-between items-center">
                <h2 className="font-bold sm:text-3xl text-xl sm:w-auto w-full">Mi red</h2>
                <div className="flex md:text-base text-xs mt-4 sm:mt-1">
                    <div className='relative'> 
                    {addContact && 
                    <input value={searchValue} onChange={handleChange} className="rounded-2xl px-4 py-1 border-2 border-inheret" type="search" placeholder="Ingresa el nombre de usuario"/>
                    }
                    {didActivate && <div className="h-max w-full  absolute bg-neutral-200 z-10 p-4 rounded-xl transition-all duration-800 ease-in-out ">
                        { didActivate && (contactList.length ? contactList.map( contact =>(
                            <AddContact key ={contact.id.slice(0,6)} 
                            setSearchValue={setSearchValue}
                            contact={contact} 
                            setAddContact={setAddContact} 
                            setActivate={setActivate}/>
                        )) : <p>No se ha encontrado al usuario</p>)}
                    </div>}
                    </div>
                    <button onClick={()=>{
                        if(addContact){
                            setActivate(false);
                            setAdding(false);
                            setSearchValue('')
                        }
                        setAddContact(!addContact)
                    }}className="sm:block hidden bg-green-500 font-semibold mx-2 py-2 px-4 rounded-xl">{addContact ? 'x' : buttonCont.normal}</button>
                    <button onClick={()=>{
                        if(addContact){
                            setActivate(false);
                            setAdding(false);
                            setSearchValue('')
                        }
                        setAddContact(!addContact)
                    }}
                    className="sm:hidden bg-green-500 font-semibold mx-2 py-2 px-4 rounded-xl">{addContact ? 'x' : buttonCont.small}</button>
                    
                    <input className="rounded-2xl px-4 py-1 border-2 border-inheret mx-1" type="search" placeholder="Buscar contacto" onChange={handleChangeAlreadyContact} value={searchValueContact}/>
                   {isSearching && <button className="bg-neutral-800 rounded-2xl px-4 py-1 text-white font-semibold " onClick={()=>{
                        dispatch(contactsReset())
                        setSearchValueContact('')
                    }}>Reset</button>}
                </div>
            </div>
            <div className="relative flex items-center mt-4">
                <div className="absolute left-0 rounded-full bg-black/20 cursor-pointer" onClick={handlePrev}>
                    <ArrowLeftRoundedIcon/>
                </div>
                <div className="absolute right-0 rounded-full bg-black/20 cursor-pointer" onClick={handleNext}>
                    <ArrowRightRoundedIcon/>
                </div> 
                <div className=" mx-auto w-11/12">
                    <article className="w-full h-40 flex items-center justify-center">
                        {contacts.slice(start, end).map((contact, i) =>(
                            <Contact key={i} i={i} pics={profilePics} contact={contact} />
                        ))}
                    </article>
                </div>
            </div>
        </section>
    )
}