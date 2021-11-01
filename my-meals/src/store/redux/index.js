import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({ reducer: { cart: cartSlice.reducer, ui: uiSlice.reducer } })


// export const authActions = authSlice.actions;
export default store;