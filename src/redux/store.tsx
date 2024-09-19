import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './filtersSlice'
import commentsReducer from './CommentsSlice'
import usersReducers from './usersSlice'
export const store=configureStore({
    reducer:{
        filters:filterReducer,
        comments:commentsReducer,
        users:usersReducers
    }
})

export type RootState=ReturnType<typeof store.getState>

export type AppDispatch=typeof store.dispatch