import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { authentication: false }
export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        login(state) {
            state.authentication = true
        },
        logout(state) {
            state.authentication = false
        }
    }
})