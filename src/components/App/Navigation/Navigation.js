import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { AssetManagerLink, HomeManagerLink, MealManagerLink } from '../Links';
import UserProfile from '../User/UserProfile';
import './Navigation.css';

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showMenu: false,
		};

		this.handleMenuMouseDown = this.handleMenuMouseDown.bind(this);
	}

	handleMenuMouseDown() {
		this.toggleMenu();
		console.log('clicked');
		// e.stopPropagation();
	}

	toggleMenu = () => {
		this.setState({
			showMenu: !this.state.showMenu,
		});
	};
	render() {
		let visibility = 'hide';

		if (this.state.showMenu) {
			visibility = 'show';
		}

		return (
			<React.Fragment>
				<NavigationMenu visibility={visibility} onClick={this.handleMenuMouseDown} />
				<HeaderContainer>
					<div id="header__top-bar--left">
						<button id="menu__button-flyout" onClick={this.handleMenuMouseDown}>
							<i className="material-icons">menu</i>
						</button>
						<div id="logo">
							<a href="/" id="logo__link">
								<i className="material-icons">alarm</i>
								<div>lifeManager</div>
							</a>
						</div>
					</div>
					<div id="header__top-bar--right">
						<UserProfile user={this.props.user} handleLogout={this.props.handleLogout} />
						<ul id="nav__top-right">
							<li className="show-on-small-only">
								<a href="/home" data-activates="mobile-menu" className="button-collapse">
									<i className="material-icons">more_vert</i>
								</a>
								<ul id="mobile-menu" className="side-nav">
									<li>
										<Link to="/manager">
											<i className="material-icons">home</i>Manager
										</Link>
									</li>
									<li>
										<Link to="/asset">
											<i className="material-icons">style</i>asset
										</Link>
									</li>
									<li>
										<Link to="/mealplan">
											<i className="material-icons">kitchen</i>Meal Planner
										</Link>
									</li>
									<li>
										<Link to="/user">
											<i className="material-icons">account_circle</i>Profile
										</Link>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</HeaderContainer>
			</React.Fragment>
		);
	}
}

const NavigationMenu = props => {
	return (
		<nav id="mobile-menu" onClick={props.onClick} className={props.visibility}>
			<ul className="side-nav">
				<li>
					<Link to="/user">
						<i className="material-icons">account_circle</i>Profile
					</Link>
				</li>
				<li>
					<HomeManagerLink />
				</li>
				<li>
					<AssetManagerLink />
				</li>
				<li>
					<MealManagerLink />
				</li>
			</ul>
		</nav>
	);
};

const HeaderContainer = props => <header className="header__top-bar">{props.children}</header>;

export { Navbar, NavigationMenu };
