import { Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Home from './views/home';
import Landing from './views/landing';
import ErrorView from './views/errorView';
import NavBar from './components/navBar/navBar';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import ProtectedVIew from './components/protectView/protectedView';
import ProjectView from './views/projectView';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';


import { useEffect } from 'react';
import { logOutUser } from './redux/actions/userActions';


import './App.css';
import Footer from './components/footer/footer';
import { setMyBoards } from './redux/actions/jamboardActions';
const apiBackUrl = import.meta.env.VITE_API_BACK_URL || 'http://localhost:3001'
const urlApi = `${apiBackUrl}/jamboard`
axios.defaults.baseURL = urlApi;

function App() {
    const {id} = useSelector(state=>{
      return state.user;
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

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

    useEffect(()=>{
      axios('/').then(({data})=>{
        if(data.success && !id){
          localStorage.setItem('role', 'guest');
        }
      }).catch((err)=>{
        console.error(err);
      })
      if (id) {
        localStorage.removeItem('role');
        
        dispatch(setMyBoards(id))
      }
    },[id])

    const isProjectRoute = location.pathname.startsWith('/project');
    
  return (
    <>
    {!isProjectRoute && (location.pathname===('/home' || '/')) && <NavBar/>}
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/log-in' element={<Login/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/home' element={<ProtectedVIew element={<Home/>}/>}/> 
      <Route path='/project/:id' element={<ProjectView/>}/>
      <Route path='*' element= {<ErrorView/>}/>
    </Routes>
    {!isProjectRoute && <Footer/>}
    </>
  )
} 

export default App
