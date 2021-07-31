import './App.css';
import {  useState } from 'react';
import Header from './components/Header/header';
import Meals from './components/meals/meals';
import Cart from './components/Cart/cart';
import CartProvider from './store/cart-provider';

function App() {

  const [isCartShown,setIsCartShown]=useState(false);

  const showCartHandler =()=>{
    setIsCartShown(true);
  }

  const hideCartHandler =()=>{
    setIsCartShown(false)
  }
  return (
    <CartProvider>
     {isCartShown &&  <Cart onCartClose={hideCartHandler}/>}
      <Header onCartShow={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
