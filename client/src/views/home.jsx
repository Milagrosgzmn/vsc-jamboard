import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setMyContacts } from "../redux/actions/userActions";
import ContactsList from "../components/contacts/contactsList";
import ProjectGrid from "../components/projects/projectGrid";
export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state=>{
      return state.user;
    })

    useEffect(()=>{
      dispatch(setMyContacts(user.id))
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
      < main className="flex flex-col pt-20 items-center">
        <ContactsList/>
        <section className="w-10/12">
          
          <div className="flex flex-row justify-between items-center">
            <h2> Mis proyectos</h2>
            <input className="rounded-2xl px-4 py-1 border-2 border-inheret" type="search" placeholder="Buscar proyecto"/>
          </div>

          <ProjectGrid/>
        </section>
      </main>
    )
}