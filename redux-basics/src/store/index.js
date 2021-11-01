import { configureStore, createSlice } from "@reduxjs/toolkit"
import { authSlice } from "./auth"

// const { createStore } = require("redux")

const InitialState = { counter: 0, showCounter: true }

const counterSlice = createSlice({
    name: 'counter',
    initialState: InitialState,
    reducers: {
        increment(state) {
            state.counter++
        },
        decrement(state) {
            state.counter--
        },
        increaseBy(state, action) {
            state.counter = state.counter + action.payload
        },
        toggle(state) {
            state.showCounter = !state.showCounter
        }
    }
})
// const counterReducer = (state = { counter: 0 }, action) => {
//     if (action.type === 'increment') {
//         return { counter: state.counter + 1 }
//     }

//     if (action.type === 'decrement') {
//         return { counter: state.counter - 1 }
//     }

//     return state
// }



const store = configureStore({
    reducer: { counter: counterSlice.reducer, auth: authSlice.reducer }
});
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
