import { createSlice } from "@reduxjs/toolkit";

export const jamboardSlice = createSlice({
    name:'jamboard',
    initialState:{
        boards:[],
    },
    reducers:{
        setBoards : (state, action)=>{
            state.boards= action.payload;
        },
        addBoard: (state, action)=>{
            state.boards= [...state.boards, action.payload];
        },
        removeBoard:(state,action)=>{
            const newBoards = state.boards.slice().filter(({id})=> id!== action.payload);
            state.boards = newBoards;
        }

    }
});

export const {setBoards, addBoard, removeBoard} = jamboardSlice.actions;
export default jamboardSlice.reducer;