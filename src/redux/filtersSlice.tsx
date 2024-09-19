import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface filterState{
    value:string[]
}

const initialState:filterState={
    value:[]
}

export const filterSlice=createSlice({
    name:'filterString',
    initialState,
    reducers:{
        addString:(state,action:PayloadAction<String>)=>{
            state.value.push(action.payload)
        },
        removeString:(state,action:PayloadAction<String>)=>
        {
            state.value=state.value.filter(item=>item!=action.payload)
        },
        removeAll:(state)=>
        {
            state.value=[]
        }
    }
})

export const {addString,removeString,removeAll}=filterSlice.actions

export default filterSlice.reducer