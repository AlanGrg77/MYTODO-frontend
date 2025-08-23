import { createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
import { Status } from "../pages/authUser/authType"

interface ILoginUser{
    email : string | null,
    password : string | null
}

interface IUser extends ILoginUser{
    id : string | null,
    username?: string | null,
    confirmPassword ?: string | null
    token ?: string | null,
    role : string | null
}

interface IRUser {
    username : string,
    email : string,
    password : string,
    confirmPassword : string,
}

interface IAuthState{
    user : IUser,
    status : Status | null,
    error : string | null
}

const initialState:IAuthState = {
    user : {
        id : null,
        username : null,
        password : null,
        confirmPassword : null,
        email : null,
        token : null,
        role : null

    },
    status : null,
    error : null
}


export const registerUser = createAsyncThunk<IUser,IRUser,{rejectValue : string}>(
    "auth/registerData",
    async (data,thunkAPI)=>{
        try {
            console.log('sending',data)
            const response = await axios.post('http://localhost:3000/api/auth/register',data)
            console.log("Server response:", response.data);
            return response.data
        } catch (error:any) {
            console.error("Error from server:", error.response?.data?.message || error.message)
            return thunkAPI.rejectWithValue(error.response?.data?.message)
            
        }
    }
)

export const loginUser = createAsyncThunk<{token : string, user : IUser},ILoginUser,{rejectValue : string}>(
    "auth/loginUser",
    async (data,thunkAPI)=>{
        try {
            console.log('sending',data)
            const response = await axios.post('http://localhost:3000/api/auth/login',data)
            console.log("Server response:", response.data);
            localStorage.setItem("userToken",response.data.token)
            return {token : response.data.token , user : response.data.data}
        } catch (error:any) {
            console.error("Error from server:", error.response?.data?.message || error.message)
            return thunkAPI.rejectWithValue(error.response?.data?.message)
            
        }
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setLogout: (state) =>{
            state.user = initialState.user; // Reset user state
            state.status = null;
            state.error = null;
        },
        setStatus: (state,action: PayloadAction<Status | null>) =>{
            state.status = action.payload;
            state.status = null
        }
        },
    extraReducers(builder) {
        builder.addCase(registerUser.pending, (state) =>{
            state.status = Status.Loading
        })
        .addCase(registerUser.fulfilled, (state)=>{
            state.status = Status.Success
            
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.status = Status.Error,
            state.error = action.payload || "Error"
        })

        .addCase(loginUser.pending, (state) =>{
            state.status = Status.Loading
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.status = Status.Success,
            state.user.token = action.payload.token
            state.user.username = action.payload.user.username
            state.user.email = action.payload.user.email
            state.user.password = action.payload.user.password
            state.user.role = action.payload.user.role
            state.user.id = action.payload.user.id
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.status = Status.Error,
            state.error = action.payload || "Error"
        })
    }
})

export const { setLogout , setStatus }  = authSlice.actions
export default authSlice.reducer
