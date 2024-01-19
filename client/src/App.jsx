import { Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Home from './views/home';
import Landing from './views/landing';
import NavBar from './components/navBar/navBar';
import Login from './components/login/login';
import SignUp from './components/signup/signup';

import './App.css';
import ProtectedVIew from './components/protectView/protectedView';

const apiBackUrl = import.meta.env.VITE_API_BACK_URL || 'http://localhost:3001'
const urlApi = `${apiBackUrl}/jamboard`
axios.defaults.baseURL = urlApi;

function App() {
 
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/log-in' element={<Login/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/home' element={<ProtectedVIew element={<Home/>}/>}/> 
      
    </Routes>
    </>
  )
}

export default App
