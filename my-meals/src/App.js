import './App.css';
import { Fragment, useEffect } from 'react';
import Header from './components/Header/header';
import Meals from './components/meals/meals';
import Cart from './components/Cart/cart';
// import CartProvider from './store/cart-provider';
import { useSelector, useDispatch } from 'react-redux'
import { uiActions } from './store/redux/ui-slice';
import Notification from './components/UI/notification'
import { fetchCartData, saveCart } from './store/redux/cart-slice';

let pageLoad = true

function App() {
  const cart = useSelector(state => state.cart)
  const ui = useSelector(state => state.ui)
  const notification = ui.notification
  const dispatch = useDispatch()
  // const [isCartShown, setIsCartShown] = useState(false);

  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (pageLoad) {
      pageLoad = false
      return
    }
    //1 way of doing 
    /*
    const saveCart = async () => {
      const response = await fetch('https://react-d5572-default-rtdb.asia-southeast1.firebasedatabase.app/cart/user1.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    }
    saveCart().catch(err => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    })
*/
    //2nd way
    if(cart.cartChange)
      dispatch(saveCart(cart))
  }, [cart, dispatch])

  const showCartHandler = () => {
    // setIsCartShown(true);
    dispatch(uiActions.toggle())
  }

  const hideCartHandler = () => {
    // setIsCartShown(false)
    dispatch(uiActions.toggle())
  }

  const closeNotification = () => {
    dispatch(uiActions.hideNotification())
  }
  /* If we use redux */
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
          closeNotification={closeNotification}
        />
      )}
      {ui.cartIsVisible && <Cart onCartClose={hideCartHandler} />}
      <Header onCartShow={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  )

  /* If we use react context & provider */
  // return (

  //   <CartProvider>
  //     {isCartShown && <Cart onCartClose={hideCartHandler} />}
  //     <Header onCartShow={showCartHandler} />
  //     <main>
  //       <Meals />
  //     </main>
  //   </CartProvider>
  // );
}

export default App;
