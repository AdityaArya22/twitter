import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        status:false,
        userData:null,
        accountType:"public"
    },
    reducers:{
        login:((state,action)=>{
            state.status = true,
            state.userData = action.payload
            state.accountType ? action.payload : "public"
        }),
        logout:((state,action)=>{
            state.status = false,
            state.userData = null
        })
    }
})


export const {login , logout} = authSlice.actions

export default authSlice.reducer