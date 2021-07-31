import { Fragment } from "react";
import HeaderCart from "./headerCart";
import mealsImg from '../../assets/meals.jpg';
import classes from './header.module.css';


export default function Header(props) {


    return <Fragment>
        <header className={classes.header}>
            <h1>Restaurant</h1>
            <HeaderCart onClick={props.onCartShow} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="cart" />
        </div>
    </Fragment>
}