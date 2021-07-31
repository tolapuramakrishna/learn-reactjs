import { Fragment } from "react";
import MealsInventory from "./mealsInventory";
import Summary from "./summary";

const Meals = () => {
  return (
    <Fragment>
      <Summary />
      <MealsInventory />
    </Fragment>
  );
};
export default Meals;
