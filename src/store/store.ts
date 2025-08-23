import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../store/authSlice"
import todoReducer from "../store/todoSlice"

export const store = configureStore({
  reducer: {
    auth : authReducer,
    todo : todoReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch