import classes from "./cartItem.module.css";

const CartItem = props => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.actions}>
          <button onClick={props.onRemove}>−</button>
          <button onClick={props.onAdd}>+</button>
        </div>
        <div className={classes.summary}>
          <span className={classes.amount}>{props.amount} x</span>
          <span className={classes.price}>{price}</span>
        </div>
      </div>

    </li>
  );
}
export default CartItem;