import { useState } from "react";
import validation from './validation';
import axios from 'axios';
import Swal from "sweetalert2";

export default function SignUp() {
    const [errors, setErrors] = useState({});
    const [userData, setUserData]= useState({
        email:'',
        password:'',
        username:''//agregar a validation
    });

    function handleChange(event){
        setUserData({
            ...userData,
            [event.target.name]: `${event.target.value}`
        });
        setErrors(
            validation({
            ...userData,
            [event.target.name]: `${event.target.value}`
        }));
    }
    function submitHandler (e){
        e.preventDefault();
        if(!errors.email && !errors.password && !errors.username){
            axios.post('/signup',
                userData).then(({data})=>{
                if(data){
                    Swal.fire(
                        '¡Excelente!',
                        '¡Te registraste con exito!',
                        'success'
                      )
                }
            }).catch(error=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error',
                  })
                console.error(error);
            });
            
        }
    }

    return (
        <section className="flex flex-col w-full justify-center items-center">
        <h2 className="text-3xl text-center py-4">Regístrese</h2>
            <form id="signup" onSubmit={submitHandler}
            className="flex flex-col w-96 bg-gray-800 bg-opacity-90 p-6 m-4 rounded-xl">
                <div className="field flex flex-col mt-2">
                    <label htmlFor="username"
                    className="font-semibold  text-white text-xl" >Nombre de usuario:</label>
                    <input id="username"
                    className="rounded-2xl px-4 py-1 mt-4 text-black"
                    placeholder="Username" 
                    onChange={handleChange}  
                    name="username" 
                    type="text"  required/>
                </div>
                <div className="h-4 my-1">
                    <span className="text-red-500 font-normal" >{errors.username ? `${errors.username}*`: errors.username}</span>
                </div>
                <div className="field flex flex-col mt-2">
                    <label htmlFor="email"
                    className="font-semibold  text-white text-xl" >Email</label>
                    <input id="email"
                    className="rounded-2xl px-4 py-1 mt-4 text-black"
                    placeholder="Ingrese su email" 
                    onChange={handleChange}  
                    name="email" 
                    type="email"  required/>
                </div>
                <div className="h-4 my-1">
                    <span className="text-red-500 font-normal" >{errors.email ? `${errors.email}*`: errors.email}</span>
                </div>
                <div className="field flex flex-col mt-2">
                    <label htmlFor="password" className="font-semibold black text-white text-xl" >Contraseña</label>
                    <input 
                    id="password"
                    className="rounded-2xl px-4 py-1 mt-4 text-black"
                    placeholder="Ingrese su constraseña" 
                    onChange={handleChange} 
                    name="password" 
                    type="password" required/>
                </div>
                <div className="h-4 my-1">
                    <span className="text-red-500 font-normal" >{errors.password ? `${errors.password}*`: errors.password}</span>
                </div>

                <div className="flex justify-center">
                    <input className='rounded-full text-xl text-white bg-sky-500 px-6 py-2 font-semibold mt-2 hover:bg-white hover:text-sky-500 mx-auto' type="submit" value='Enviar'/>
                </div>
                
        </form>
        </section>
    );
}