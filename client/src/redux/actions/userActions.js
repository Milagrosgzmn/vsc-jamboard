import { setUser } from "../slices/userSlice";

export const setMyUser = (data)=>{
    return (dispatch)=>{
        dispatch(setUser(data));
    }
};