import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setMyContacts } from "../redux/actions/userActions";
import ContactsList from "../components/contacts/contactsList";
import ProjectGrid from "../components/projects/projectGrid";
import { setMyBoards } from "../redux/actions/jamboardActions";
import ProjectForm from "../components/projectForm/projectForm";
import ContactForm from "../components/contacts/contactForm";

export default function Home() {

    const [openContactMenu, setContactMenu] = useState(false)
    const [openProjectForm, setOpenProjectForm] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>{
      return state.user;
    })

    useEffect(()=>{
      dispatch(setMyContacts(user.id))
      dispatch(setMyBoards(user.id))
    },[]);

    useEffect(()=>{
      
      const expirationToken = localStorage.getItem('tokenExpires')
      if(!expirationToken){
        navigate('/')
      }else{
          const timeLeft = expirationToken-Date.now();
        if (!timeLeft) {
          dispatch(logOutUser())
        }else{
          setTimeout(()=>{
            console.log('swal tu sesión expiró');
            dispatch(logOutUser())
            navigate('/')
          },timeLeft)
        }
      }
      
    },[])
    return (
      < main className={openProjectForm ? 'flex flex-col pt-16 items-center relative' : 'flex flex-col pt-16 items-center' }>
        <ContactsList/>
        <section className="w-10/12">
          
          <div className="flex sm:flex-row flex-col justify-between items-center">
            <h2 className="font-bold sm:text-3xl text-xl sm:w-auto w-full"> Mis proyectos</h2>
            <div className="flex md:text-base text-xs mt-4 sm:mt-1">
              <button onClick={()=>{setOpenProjectForm(true)}} className="sm:block hidden bg-green-500 font-semibold mx-2 py-2 px-4 rounded-xl"> Nuevo proyecto +</button>
              <button onClick={()=>{setOpenProjectForm(true)}} className="sm:hidden bg-green-500 font-semibold mx-2 py-2 px-4 rounded-xl"> +</button>
              <input className=" rounded-2xl px-4 py-1 border-2 border-inheret" type="search" placeholder="Buscar proyecto"/>
            </div>
          </div>
          
            <ProjectGrid setOpen={setOpenProjectForm} setContactMenu={setContactMenu} />
          
        </section>
        {openProjectForm && <ProjectForm setOpen={setOpenProjectForm}/>}
        {openContactMenu && <ContactForm setContactMenu={setContactMenu}/>} 
      </main>
    )
}