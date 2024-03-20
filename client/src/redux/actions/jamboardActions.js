import { setBoards, addBoard, removeBoard, filterMyBoards, resetBoards} from "../slices/jamboardSlice";
import Swal from "sweetalert2";
import axios from "axios";

export const setMyBoards = (user_id)=>{
    const endpoint = `/board/${user_id}`
    return async (dispatch)=>{
        try {
            const {data} = await axios(endpoint, {
                withCredentials: true,
              });
            
            dispatch(setBoards(data))

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

export const addNewBoard = (board)=>{
    return (dispatch)=>{
      dispatch(addBoard(board));
    }
}

export const deleteBoard = (board_id)=>{
  return (dispatch)=>{
    dispatch(removeBoard(board_id));
  }
}

export const filterBoards = (data)=>{
  return (dispatch)=>{
      dispatch(filterMyBoards(data));
  }
};

export const boardsReset = ()=>{
  return (dispatch)=>{
      dispatch(resetBoards());
  }
};