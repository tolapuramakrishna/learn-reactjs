import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/model";
import classes from "./cart.module.css";
import CartItem from "./cartItem";
import Checkout from "./checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false)
  const [isError, setisError] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const onOrderHanderler = () => {
    setShowCheckout(true)
  };

  const confirmOrder = async (userData) => {

    const resp = await fetch('https://react-d5572-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items,
        totalPrice:totalAmount
      })
    })
    if (!resp.ok) {
      setisError(true);
      return
    }
    setOrderSuccess(true)
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        ></CartItem>
      ))}
    </ul>
  );
  const cartModelContent = <React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {showCheckout && <Checkout onConfirm={confirmOrder} onCancel={props.onCartClose} />}
    {!showCheckout &&
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCartClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={onOrderHanderler}>
            Order
          </button>
        )}
      </div>}
  </React.Fragment>

  const orderErrorModel = <React.Fragment>
    <p>Something went wrong, Please try gain!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCartClose}>
        Close
      </button>
    </div>
  </React.Fragment>
  const orderSuccessModel = <React.Fragment>
    <p>Yay! Successfully ordered.</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCartClose}>
        Close
      </button>

    </div>
  </React.Fragment>
  return (
    <Modal onClose={props.onCartClose}>
      {!isError && !orderSuccess && cartModelContent}
      {isError && !orderSuccess && orderErrorModel}
      {!isError && orderSuccess && orderSuccessModel}

    </Modal>
  );
};

export default Cart;
