import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { authActions } from '../store';
import classes from './Header.module.css';

const Header = () => {
  const history=useHistory()
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.authentication)

  const logoutHandler = () => {
    dispatch(authActions.logout())
    history.replace('/home')
  }
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        <ul>
          <li>
            <NavLink to='/home' activeClassName={classes.active} > Home</NavLink>
          </li>
          <li>
            <NavLink to='/products' activeClassName={classes.active} > Products</NavLink>
          </li>
          {auth &&
            <Fragment>
              <li>
                <NavLink to='/orders' activeClassName={classes.active}>My Orders</NavLink>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </Fragment>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
