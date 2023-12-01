import { setBoards } from "../slices/jamboardSlice";

export const setMyBoards = (boards)=>{
    return (dispatch)=>{
        dispatch(setBoards(boards));
    }
};