import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { commentsProps} from "../navigations/types";
import AddComment from "../sheets/AddComment";


export interface commentState{
    item:commentsProps[]
}

const initialState:commentState={
    item:[]
}

export const commentsSlice=createSlice({
    name:'CommentsString',
    initialState,
    reducers:{
        getComments:(state,action:PayloadAction<commentsProps[]>)=>
        {
            state.item=[...action.payload]
        },
        newComment:(state,action:PayloadAction<commentsProps>)=>{
            state.item.push(action.payload)
        }
    }
})

export const {getComments,newComment}=commentsSlice.actions
export default commentsSlice.reducer