import { useReducer } from "react";
import CartContext from "./cart-context";

const IntialCartState = {
  items: [],
  totalAmount: 0,
};
const CartReducer = (state, action) => {
  if (action.type === "ADD" || action.type === "UPDATE") {
    let updatedItems;
    const existingId = state.items.findIndex((x) => x.id === action.item.id);
    if (existingId > -1) {
      const existingItem = state.items[existingId];
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingId] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    const totalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    return {
      items: updatedItems,
      totalAmount: totalAmount,
    };
  } else if (action.type === "REMOVE") {
    const existingId = state.items.findIndex((x) => x.id === action.id);
    let updatedItems;
    if (existingId > -1) {
      let existedItem = state.items[existingId];
      if (existedItem.amount === 1) {
        updatedItems = state.items.filter((x) => x.id !== action.id);
      } else {
        const updatedItem = { ...existedItem, amount: existedItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingId] = updatedItem;
      }
      const updatedTotalAmount = state.totalAmount - existedItem.price;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }else{
        return {
            items: state.items,
            totalAmount: state.totalAmount,
          };
    }
  } else if(action.type === 'CLEAR'){
    return IntialCartState;
  }
  return IntialCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    CartReducer,
    IntialCartState
  );
  const addToCartHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeFromCartHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };
  const clearCartHandler = (id) => {
    dispatchCartState({ type: "CLEAR"});
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
    clearCart:clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
