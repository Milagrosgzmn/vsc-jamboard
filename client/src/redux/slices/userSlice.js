import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        id:'',
        username:'',
        email:'',
        contacts:[],
        contactsBackUp:[]
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
            state.contactsBackUp = action.payload;
        },
        deleteContact: (state, action)=>{
            const newContactsList = state.contacts.filter(contact => contact.id !== action.payload);
            state.contacts = newContactsList;
            state.contactsBackUp = newContactsList;
        },
        filterMyContacts:(state, action)=>{
            const newContactsList = state.contactsBackUp.slice().filter(contact =>{
                return contact.username.toLowerCase().includes(action.payload)
            });
            state.contacts = newContactsList;
        },
        resetContacts :(state)=>{
            state.contacts = state.contactsBackUp;
        }
    }
});

export const {setUser, resetUser, setContacts, deleteContact, filterMyContacts, resetContacts} = userSlice.actions;
export default userSlice.reducer;