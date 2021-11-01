import classes from "./mealItem.module.css";
import Card from "../../UI/card";
import item_img from "../../../assets/biryani.jpg";
// import { useContext } from "react";
// import CartContext from "../../../store/cart-context";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/redux/cart-slice";

const MealItem = (props) => {
  const price = `$${props.meal.price.toFixed(2)}`;
  // const cartCtx=useContext(CartContext);
  // const cartCtx = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const addItemHandler=(amount)=>{
    dispatch(cartActions.addItemsToCart({
      id:props.meal.id,
      name:props.meal.name,
      amount:amount,
      price:props.meal.price
    }))
  }
  return (
    <li className={classes["meal-item"]}>
      <Card>
        <div className={classes["card-body"]}>
          <img src={item_img} alt="Food item" />
          <h3 className={classes.name}>{props.meal.name}</h3>
          <span className={classes.description}>{props.meal.desc}</span>
          <span className={classes.price}>{price}</span>
          <div className={classes["add-btn"]}>
            <button onClick={()=>addItemHandler(1)}>Add Now</button>
          </div>
        </div>
      </Card>
    </li>
  );
};
export default MealItem;
