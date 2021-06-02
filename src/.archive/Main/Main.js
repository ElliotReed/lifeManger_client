import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Splash from '../../components/Gate';
import Manager from '../../components/Manager';
import HomeManager from '../../components/HomeManager';
import AssetManagerManagerManager from '../../components/AssetManager';
import MealPlan from '../../components/MealPlan';
import User from '../../components/User';
import './Main.module.scss';
import ProtectedRoute from '../../components/ProtectedRoute';

const Main = props => {
	const isLoggedIn = props.isLoggedIn;

	return (
		<main id="main">
			<Switch>
				<Route
					exact
					path="/"
					render={props => (
						<Splash {...props} isLoggedIn={isLoggedIn} />
					)}
				/>
				<Route exact path="/manager" component={Manager} />
				<ProtectedRoute
					exact
					path="/housemaintenance"
					component={HouseMaintenance}
				/>
				<Route
					exact
					path="/asset"
					render={props => (
						<AssetManager {...props} isLoggedIn={isLoggedIn} />
					)}
				/>
				<ProtectedRoute exact path="/mealplan" component={MealPlan} />
				<ProtectedRoute exact path="/user" component={User} />
			</Switch>
		</main>
	);
};

export default Main;
