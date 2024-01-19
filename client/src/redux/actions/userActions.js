import { setUser, resetUser } from "../slices/userSlice";
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
