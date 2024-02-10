import { Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Home from './views/home';
import Landing from './views/landing';
import NavBar from './components/navBar/navBar';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import ProtectedVIew from './components/protectView/protectedView';
import ProjectView from './views/projectView';

import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';


import { useEffect } from 'react';
import { logOutUser } from './redux/actions/userActions';


import './App.css';
import ProjectBar from './components/projectBar/projectBar';
const apiBackUrl = import.meta.env.VITE_API_BACK_URL || 'http://localhost:3001'
const urlApi = `${apiBackUrl}/jamboard`
axios.defaults.baseURL = urlApi;

function App() {
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


    const isProjectRoute = location.pathname.startsWith('/project');
  


  return (
    <>
    {!isProjectRoute ? <NavBar/> :<ProjectBar/>}
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/log-in' element={<Login/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/home' element={<ProtectedVIew element={<Home/>}/>}/> 
      <Route path='/project/:id' element= {<ProtectedVIew element={<ProjectView/>}/>}/>
    </Routes>
    </>
  )
} 

export default App
