import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialCart = { items: [], totalPrice: 0, totalQuantity: 0, cartChange: false }
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice;
        },
        addItemsToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++;
            state.totalPrice = state.totalPrice + newItem.price;
            state.cartChange = true;
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            } else {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id)
            state.totalQuantity--;
            state.totalPrice = state.totalPrice - existingItem.price;
            state.cartChange = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
            }
        }
    }
})

export const saveCart = (cart) => {
    return async (dispatch) => {
        const saveCart = async () => {
            const response = await fetch('https://react-d5572-default-rtdb.asia-southeast1.firebasedatabase.app/cart/user1.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                    totalPrice: cart.totalPrice
                })
            })
            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }

        }

        // debounce
        try {
            await saveCart()
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        }
        catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-d5572-default-rtdb.asia-southeast1.firebasedatabase.app/cart/user1.json')
            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
            const data = await response.json()
            return data
        }

        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
                totalPrice: cartData.totalPrice
            }))
        } catch (err) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice;