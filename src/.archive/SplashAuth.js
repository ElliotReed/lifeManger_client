import React, { Component } from 'react';
import auth from '../auth';
import Login from '../components/Gate/Login';

class Splash extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Welcome to your Life Manager</h1>
				{!auth.isAuthenticated() && <Login />}

				<button
					onClick={() => {
						auth.login(() => {
							this.props.history.push('/asset');
						});
					}}
				>
					Login
				</button>
			</div>
		);
	}
}

export default Splash;
