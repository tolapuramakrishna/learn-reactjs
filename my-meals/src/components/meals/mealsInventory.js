import classes from "./mealsInventory.module.css";
import MealItem from "./Mealitem/mealItem";
import { useEffect, useState } from "react";


const MealsInventory = () => {
  const [dishesList, setDishes] = useState([])
  const [error, setError] = useState()
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    const getDishes = async () => {
      const resp = await fetch('https://react-d5572-default-rtdb.asia-southeast1.firebasedatabase.app/dishes.json');
      if (!resp.ok) {
        throw new Error('Something went worng!')
      }
      const respData = await resp.json();
      const dishes = []
      for (let key in respData) {
        dishes.push({
          id: key,
          name: respData[key].name,
          desc: respData[key].description,
          price: respData[key].price

        })
      }
      setDishes(dishes);
      setLoader(false)
    }
    getDishes().catch(err => {
      // console.log(err);
      setLoader(false)
      setError(err.message)
    });

  }, [])
  if (loader) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  const meals = dishesList.map((item, ind) => <MealItem key={ind} meal={item} />);
  return (
    <div className={classes["meals-list"]}>
      <ul>{meals}</ul>
    </div>
  );
};
export default MealsInventory;
