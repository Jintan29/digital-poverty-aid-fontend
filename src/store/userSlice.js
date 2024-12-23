import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:'Initalized',
    user:[]
}

export const userSilce = createSlice({
    name:'user', //ชื่อ Reduc
    initialState,

    reducers:{
        login:(state,action)=>{
            state.value = 'user login',
            state.user = action.payload //เอาข้อมูลของ user มาใส่
        },

        logout:(state)=>{
            state.value = 'user logout',
            state.user = null
            localStorage.clear()
        }
    }
})

export const{login,logout} = userSilce.actions

export default userSilce.reducer