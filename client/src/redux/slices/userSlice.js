import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        id:'',
        username:'',
        email:'',
        contacts:[]
    },
    reducers:{
        setUser : (state, action)=>{
            state.id= action.payload.id;
            state.username= action.payload.username;
            state.email= action.payload.email;
        },
        resetUser : (state)=>{
            state.id = '';
            state.username='';
            state.email = '';
        },
        setContacts : (state, action)=>{
            state.contacts = action.payload;
        },
        deleteContact: (state, action)=>{
            const newContactsList = state.contacts.filter(contact => contact.id !== action.payload);
            state.contacts = newContactsList;
        }
    }
});

export const {setUser, resetUser, setContacts, deleteContact} = userSlice.actions;
export default userSlice.reducer;