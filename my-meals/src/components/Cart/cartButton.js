import classes from "./cartButton.module.css"
import { Fragment } from "react"

const CartButton =props=>{
    return (
        <Fragment>
              <span className={classes.minus}>-</span>
            <span className={classes.value}>3</span> 
            <span className={classes.plus}>+</span>
        </Fragment>
    )
}

export default CartButton;