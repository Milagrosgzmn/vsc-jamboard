import { createSlice } from "@reduxjs/toolkit";

export const jamboardSlice = createSlice({
    name:'jamboard',
    initialState:{
        boards:[],
        boardsBackUp:[]
    },
    reducers:{
        setBoards : (state, action)=>{
            state.boards= action.payload;
            state.boardsBackUp= action.payload;
        },
        addBoard: (state, action)=>{
            state.boards= [...state.boards, action.payload];
            state.boardsBackUp= [...state.boardsBackUp, action.payload];
        },
        removeBoard:(state,action)=>{
            const newBoards = state.boards.slice().filter(({id})=> id!== action.payload);
            state.boards = newBoards;
            state.boardsBackUp = newBoards;
        },
        filterMyBoards:(state, action)=>{
            const newBoards = state.boardsBackUp.slice().filter(board =>{
                return board.name.toLowerCase().includes(action.payload)
            });
            state.boards = newBoards;
        },
        resetBoards :(state)=>{
            state.boards = state.boardsBackUp;
        }
    }
});

export const {setBoards, addBoard, removeBoard, filterMyBoards, resetBoards} = jamboardSlice.actions;
export default jamboardSlice.reducer;