import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LifeFlow from './LifeFlow/LifeFlow'
import { AssetManagerLink, HomeManagerLink, MealManagerLink } from '../App/Links';
import './Organizer.scss';

class Organizer extends Component {
	render() {
		if (!this.props.isLoggedIn) {
			return <Redirect to="/" />;
		}

		return (
			<main className="organizer">
				<h1>Organize your life!</h1>
				<LifeFlow />
				<ul className="organizer__list-wrapper">
					<li className="link__card asset">
						<AssetManagerLink />
					</li>
					<li className="link__card meal-planner">
						<MealManagerLink />
					</li>
					<li className="link__card maintenance">
						<HomeManagerLink />
					</li>
				</ul>
			</main>
		);
	}
}

export default Organizer;
