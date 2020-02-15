import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import handleCookie from './cookie';
import { Header } from 'components/Header';
import Gate from 'components/Gate';
import HomeManager from 'components/DomesticLife/HomeManager';
import AssetManager from 'components/DomesticLife/AssetManager';
import Flow from 'components/screens/flow';
import AspectManager from 'components/screens/flow';
import MealManager from 'components/DomesticLife/MealManager';
import { User } from 'components/User';
import styles from 'app.module.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
	faCheckSquare,
	faCoffee,
	faUserCog,
} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee, faUserCog);

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: true,
			user: {
				name: '',
				email: '',
			},
		};
	}

	componentDidMount() {
		if (handleCookie.get_cookie('isLoggedIn') === '1') {
			this.setState({ isLoggedIn: true });
		}
		// this.getUser();
	}

	// getUser = () => {
	// 	axios
	// 		.get(`/user_account/verify`)
	// 		.then(res => {
	// 			this.setState({ isLoggedIn: true });
	// 			this.setState({
	// 				user: {
	// 					name: res.data.name,
	// 					email: res.data.email,
	// 				},
	// 			});
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	// handleLogout = () => {
	// 	axios
	// 		.get(`/user_account/logout`)
	// 		.then(res => {
	// 			console.log(`client logout status: ${res.status}`);
	// 			if (res.status === 200) {
	// 				this.setState({
	// 					isLoggedIn: false,
	// 					user: {
	// 						name: 'Login',
	// 						email: '',
	// 					},
	// 				});
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	handleLogin = user => {
		if (!user) console.log('Login failed');
		this.setState({ isLoggedIn: true });
		this.setState({
			user: {
				name: user.name,
				email: user.email,
			},
		});
	};

	render() {
		const { isLoggedIn, user } = this.state;

		return (
			<BrowserRouter>
				<Header>
					<nav className={styles.nav}>
						<ul>
							<li>
								<NavLink exact to="/flow" activeClassName={styles.activeLink} >
									Flow
								</NavLink>
							</li>
						</ul>
					</nav>
				</Header>
				<div className={styles.mainWrapper}>
				{/* <div className={styles.main}> */}

					<Switch>
						<Route path="/flow" component={Flow} />
						<Route
							exact
							path="/"
							render={props => (
								<Gate
									{...props}
									isLoggedIn={isLoggedIn}
									handleLogin={this.handleLogin}
								/>
							)}
						/>
						<Route
							exact
							path="/housemaintenance"
							render={props => (
								<HomeManager
									{...props}
									isLoggedIn={isLoggedIn}
								/>
							)}
						/>
						<Route
							exact
							path="/asset"
							render={props => (
								<AssetManager
									{...props}
									isLoggedIn={isLoggedIn}
								/>
							)}
						/>
						<Route
							exact
							path="/aspect"
							render={props => (
								<AspectManager
									{...props}
									isLoggedIn={isLoggedIn}
								/>
							)}
						/>
						<Route
							exact
							path="/mealplan"
							render={props => (
								<MealManager
									{...props}
									isLoggedIn={isLoggedIn}
								/>
							)}
						/>
						<Route
							exact
							path="/user"
							render={props => (
								<User {...props} isLoggedIn={isLoggedIn} />
							)}
						/>
					</Switch>
				{/* </div> */}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
