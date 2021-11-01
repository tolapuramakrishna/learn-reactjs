import { Fragment } from 'react';
// import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './pages/Auth'
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom'
import UserProfile from './pages/UserProfile';
import Products from './pages/products';
import Orders from './pages/orders';
import ProductDetail from './pages/productDetails';
function App() {
  const auth = useSelector(state => state.auth.authentication)

  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='home' />
          </Route>
          <Route path="/home"  >
            {!auth && <Auth />}
            {auth && <p>Welcome</p>}
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
          <Route path="/profile">
            {auth && <UserProfile />}
          </Route>
          <Route path="/orders">
            {auth && <Orders />}
          </Route>

        </Switch>
      </main>
    </Fragment>
    // <Counter />
  );
}

export default App;
