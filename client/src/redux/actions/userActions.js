import { setUser, resetUser, deleteContact, setContacts, filterMyContacts, resetContacts } from "../slices/userSlice";
import axios from 'axios';
import Swal from 'sweetalert2'

export const setMyUser = (data)=>{
    return (dispatch)=>{
        dispatch(setUser(data));
    }
};

export const logOutUser = ()=>{
    const endpoint = '/logOut'
    return async (dispatch)=>{
        try {
            const {data} = await axios(endpoint, {
                withCredentials: true,
              });
            if(data.success){
                dispatch(resetUser())
            }
            localStorage.removeItem('tokenExpires')
        } catch (error) {
             console.error(error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error.',
          })
        }
    }
}

export const removeContact = (user_id,contact_id)=>{
    const ids = [user_id, contact_id].join('_');
    const endpoint = `/contact/${ids}`
    return async (dispatch)=>{
        try {
            const {data} = await axios.delete(endpoint, {
                withCredentials: true,
              });
            if(data.success){
                Swal.fire({
                  title: "¡Contacto eliminado!",
                  icon: "success"
                });
                dispatch(deleteContact(contact_id))
            }
        } catch (error) {
             console.error(error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error.',
          })
        }
    }
}

export const setMyContacts = (user_id)=>{
    const endpoint = `/contact/${user_id}`
    return async (dispatch)=>{
        try {
            const {data} = await axios(endpoint, {
                withCredentials: true,
              });
            
            dispatch(setContacts(data))

        } catch (error) {
             console.error(error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error.',
          })
        }
    }
}

export const filterContacts = (data)=>{
  return (dispatch)=>{
      dispatch(filterMyContacts(data));
  }
};
export const contactsReset = ()=>{
  return (dispatch)=>{
      dispatch(resetContacts());
  }
};