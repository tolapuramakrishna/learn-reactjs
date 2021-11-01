import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/index';

const Counter = () => {
  const count = useSelector(state => state.counter.counter)
  const show = useSelector(state => state.counter.showCounter)
  const dispatch = useDispatch()
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle())
  };
  const counterHandeler = (type) => {
    if (type === 1) {
      // dispatch({ type: 'increment' })
      dispatch(counterActions.increment())
    }
    else if (type === -1) {
      // dispatch({ type: 'decrement' })
      dispatch(counterActions.decrement())
    } else {
      dispatch(counterActions.increaseBy(5))
    }
  }
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{count}</div>}
      <div>
        <button onClick={counterHandeler.bind(null, -1)}>Decrement</button>
        <button onClick={counterHandeler.bind(null)}>Increase by 5</button>
        <button onClick={counterHandeler.bind(null, 1)}>Increment</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
