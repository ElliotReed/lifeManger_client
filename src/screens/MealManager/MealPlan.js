import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./MealPlan.module.scss";
import db from "./db";

const MealCard = (props) => {
  const id = props.meal;
  const meal = db.meals.filter((meal) => meal.id === id)[0];
  const [showRecipe, setShowRecipe] = React.useState(false);

  function toggle() {
    setShowRecipe(!showRecipe);
  }
  return (
    <div className={styles.MealCard} key={meal.id}>
      <div>{meal.name}</div>
      <button onClick={toggle}>
        {showRecipe ? (
          <FontAwesomeIcon icon={["fas", "chevron-up"]} />
        ) : (
          <FontAwesomeIcon icon={["fas", "chevron-down"]} />
        )}
      </button>
      <div className={showRecipe ? null : styles.hidden}>
        <p>Ingredients:</p>
        <ul className={styles.ingredients}>
          {meal.recipe.ingredients.map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
        <p>Steps:</p>
        <ol className={styles.steps}>
          {meal.recipe.steps.map((step) => (
            <li>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const CurrentMeals = () => {
  const now = new Date();
  const today = now.getDay();
  return (
    <div className={styles.CurrentMeals}>
      <h4>Current Meals</h4>
      <table>
        <thead>
          <tr>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Snack</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <MealCard meal={db.meal_plan.breakfast[today]} />
            </td>
            <td>
              <MealCard meal={db.meal_plan.lunch[today]} />
            </td>
            <td>
              <MealCard meal={db.meal_plan.snack[today]} />
            </td>
            <td>
              <MealCard meal={db.meal_plan.dinner[today]} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

class MealPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      name: "",
      mealID: null,
      mealName: "",
    };
  }

  render() {
    return (
      <div className={styles.MealPlanner}>
        <h2>Meal Planner</h2>
        <CurrentMeals />
        <div>
          <h4>Weekly Meals</h4>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Breakfast</th>
                {db.meal_plan.breakfast.map((meal, index) => {
                  return (
                    <td key={index}>
                      <MealCard meal={meal} />
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row">Lunch</th>
                {db.meal_plan.lunch.map((meal, index) => {
                  return (
                    <td key={index}>
                      <MealCard meal={meal} />
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row">Snack</th>
                {db.meal_plan.snack.map((meal, index) => {
                  return (
                    <td key={index}>
                      <MealCard meal={meal} />
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row">Dinner</th>
                {db.meal_plan.dinner.map((meal, index) => {
                  return (
                    <td key={index}>
                      <MealCard meal={meal} />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MealPlan;
