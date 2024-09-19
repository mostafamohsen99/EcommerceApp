import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { userProps } from "../navigations/types";



const initialState:userProps={
    userName:'',
    email:'',
    profilePic:'' ,
    uid:''
}

export const usersSlice=createSlice({
    name:'userString',
    initialState,
    reducers:{
        addUser(state,action:PayloadAction<userProps>)
        {
            state.userName=action.payload.userName
            state.email=action.payload.email
            state.profilePic=action.payload.profilePic
            state.uid=action.payload.uid
        },
        removeUser(state,action:PayloadAction<userProps>)
        {
            state.userName=''
            state.email=''
            state.profilePic=''
        }
    }
})

export const {addUser,removeUser}=usersSlice.actions
export default usersSlice.reducer