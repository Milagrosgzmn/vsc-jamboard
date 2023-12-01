import { createSlice } from "@reduxjs/toolkit";

export const jamboardSlice = createSlice({
    name:'jamboard',
    initialState:{
        boards:[],
    },
    reducers:{
        setBoards : (state, action)=>{
            state.boards= action.payload;
        }
    }
});

export const {setBoards} = jamboardSlice.actions;
export default jamboardSlice.reducer;