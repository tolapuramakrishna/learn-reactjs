import { useEffect, useState } from "react";
import CartIcon from "../Cart/cartIcon";
import classes from "./headerCart.module.css";
// import CartContext from "../../store/cart-context";
import { useSelector } from "react-redux";

const HeaderCart = (props) => {
  // const cartCtx = useContext(CartContext);
  const cartCtx = useSelector(state => state.cart)
  // const dispatch = useDispatch()
  const { items } = cartCtx;
//  const totalItemsInCart = items.reduce((total, item) => { return total + item.amount }, 0);
  const [cartItemsChange, setCartItemsChange] = useState(false)
  const btnClasses = `${classes.button} ${cartItemsChange ? classes.bump : ''}`
  useEffect(() => {
    if (items.length > 0) {
      setCartItemsChange(true);
    }

  }, [items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCtx.totalQuantity}</span>
    </button>
  );
};
export default HeaderCart;
