import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './MealPlan.scss';

class MealPlan extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meals: [],
			name: '',
			mealID: null,
			mealName: '',
		};
	}

	render() {
		if (!this.props.isLoggedIn) {
			return <Redirect to="/" />;
		}

		return (
			<React.Fragment>
				<h2>Meal Planner</h2>
				<div className="meal-planner__table-wrapper">
					<table className="meal-planner__table">
						<thead>
							<tr>
								<th></th>
								<th>Monday</th>
								<th>Tuesday</th>
								<th>Wednesday</th>
								<th>Thursday</th>
								<th>Friday</th>
								<th>Saturday</th>
								<th>Sunday</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">Breakfast</th>
								<td>Breakfast</td>
								<td>Breakfast</td>
								<td>Breakfast</td>
								<td>Breakfast</td>
								<td>Breakfast</td>
								<td>Breakfast</td>
								<td>Breakfast</td>
							</tr>
							<tr>
								<th scope="row">Lunch</th>
								<td>Yogurt</td>
								<td>Black bean burger wrap</td>
								<td>Eggs</td>
								<td>Ramen</td>
								<td>Oatmeal</td>
								<td>Ramen => Hummas </td>
								<td>Salad</td>
							</tr>
							<tr>
								<th scope="row">Dinner</th>
								<td>Salad</td>
								<td>Spaghetti => Mac & Cheese & Peas</td>
								<td>Snug</td>
								<td>Chimichanga => Nuggets</td>
								<td>Chicken Bowl</td>
								<td>Salad => Ramen</td>
								<td>Veggie Burger</td>
							</tr>
						</tbody>
					</table>
				</div>
			</React.Fragment>
		);
	}
}

export default MealPlan;
