import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Status } from "../pages/authUser/authType"

interface IFormTodo {
    title : string,
    description : string,
    attachment : string | null,
}

interface ITodo extends IFormTodo {
    id : number,
    completed : boolean,
}
interface IinititalState {
    todo : ITodo[],
    status : string | null,
    error : string | null
}

const initialState:IinititalState = {
    todo : [],
    status : null,
    error : null,
}

export const getTodos = createAsyncThunk<ITodo[] ,void, {rejectValue : string}> (
    'todo/getTodos',
    async (_,thunkAPI) =>{
        try {
            const response = await axios.get("http://loclahost:300/api/todo", 
                {
                    headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")} `
                }
                }
            )
            return response.data.data
        } catch (error:any) {
             console.error("Error from server:", error.response?.data?.message || error.message)
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }

    }
)
export const createTodos = createAsyncThunk<ITodo[] ,void, {rejectValue : string}> (
    'todo/createTodos',
    async (_,thunkAPI) =>{
        try {
            const response = await axios.post("http://loclahost:300/api/todo" ,
                {
                    headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")} `
                }
                }

            )
            return response.data.data
        } catch (error:any) {
             console.error("Error from server:", error.response?.data?.message || error.message)
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }

    }
)
export const editTodos = createAsyncThunk<ITodo ,{id :number, data: IFormTodo }, {rejectValue : string}> (
    'todo/createTodos',
    async ({id, data},thunkAPI) =>{
        try {
            const response = await axios.put("http://loclahost:300/api/todo/"+id,data,  
                {
                    headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")} `
                }
                }
            )
            return  response.data.data
        } catch (error:any) {
             console.error("Error from server:", error.response?.data?.message || error.message)
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }

    }
)
export const deleteTodos = createAsyncThunk<number ,number, {rejectValue : string}> (
    'todo/deleteTodos',
    async (id,thunkAPI) =>{
        try {
            await axios.delete("http://loclahost:300/api/todo/"+id,  
                {
                    headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")} `
                }
                }
            )
            return id
        } catch (error:any) {
             console.error("Error from server:", error.response?.data?.message || error.message)
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }

    }
)
export const toggleComplete = createAsyncThunk<ITodo ,number, {rejectValue : string}> (
    'todo/toggleComplete',
    async (id,thunkAPI) =>{
        try {
            const response = await axios.patch("http://loclahost:300/api/todo/toggle/"+id,{},  
                {
                    headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")} `
                }
                }
            )
            return response.data.data
        } catch (error:any) {
             console.error("Error from server:", error.response?.data?.message || error.message)
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }

    }
)

const todoSlice = createSlice({
    name : "todo",
    initialState,
    reducers :{},
    extraReducers(builder) {
        builder.addCase(getTodos.pending, (state) =>{
            state.status = Status.Loading
        })
        .addCase(getTodos.fulfilled, (state, action) =>{
            state.status = Status.Success
            state.todo = action.payload
        })
        .addCase(getTodos.rejected, (state, action)=>{
            state.status = Status.Error
            state.error = action.payload || "Error"
        })
        .addCase(createTodos.pending, (state) =>{
            state.status = Status.Loading
        })
        .addCase(createTodos.fulfilled, (state, action) =>{
            state.status = Status.Success
            state.todo = action.payload
        })
        .addCase(createTodos.rejected, (state, action)=>{
            state.status = Status.Error
            state.error = action.payload || "Error"
        })
        .addCase(editTodos.pending, (state) =>{
            state.status = Status.Loading
            
        })
        .addCase(editTodos.fulfilled, (state, action) =>{
            state.status = Status.Success
            const index = state.todo.findIndex(t=> t.id === action.payload.id)
             if (index !== -1) {
                state.todo[index] = action.payload 
            }
        })
        .addCase(editTodos.rejected, (state, action)=>{
            state.status = Status.Error
            state.error = action.payload || "Error"
        })
        .addCase(deleteTodos.pending, (state) =>{
            state.status = Status.Loading
        })
        .addCase(deleteTodos.fulfilled, (state, action) =>{
            state.status = Status.Success
            const index = state.todo.findIndex(t => t.id === action.payload )
            if(index !== -1){
                state.todo.splice(index, 1)
            }
        })
        .addCase(deleteTodos.rejected, (state, action)=>{
            state.status = Status.Error
            state.error = action.payload || "Error"
        })
        .addCase(toggleComplete.pending, (state) =>{
            state.status = Status.Loading
        })
        .addCase(toggleComplete.fulfilled, (state, action) =>{
            state.status = Status.Success
            const index = state.todo.findIndex(t => t.id === action.payload.id )
            if(index !== -1){
                state.todo[index].completed = action.payload.completed
            }
        })
        .addCase(toggleComplete.rejected, (state, action)=>{
            state.status = Status.Error
            state.error = action.payload || "Error"
        })
    }
})

export default todoSlice.reducer

