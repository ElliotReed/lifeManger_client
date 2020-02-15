import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './User.css';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLogin: {},
			userRegister: {},
			showLogin: true,
			showSignup: false,
		};
	}

	// addItem = event => {
	// 	event.preventDefault();
	// 	const name = event.target.name.value;
	// 	axios
	// 		.post('/user_account/', {
	// 			name: name,
	// 		})
	// 		.then(response => {
	// 			this.getItem();
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	// getItem = id => {
	// 	if (!id) {
	// 		return;
	// 	}
	// 	axios
	// 		.get(`/user_account/${id}`)
	// 		.then(res => {
	// 			this.setState({
	// 				name: res.data.name,
	// 			});
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	// updateItem = event => {
	// 	event.preventDefault();
	// 	const id = this.state.id;
	// 	axios
	// 		.put(`/user_account/${id}`, {
	// 			name: this.state.name,
	// 		})
	// 		.then(res => {
	// 			console.log(res);
	// 		});
	// };

	// deleteItem = event => {
	// 	const id = this.state.id;
	// 	axios.delete(`/user_account/${id}`).then(res => {
	// 		this.setState({
	// 			name: 'Deleted',
	// 			id: null,
	// 		});
	// 	});
	// };

	handleInputChange = event => {
		const target = event.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;

		this.setState({
			[name]: value,
		});
	};

	handleSelectorClick = event => {
		const id = event.target.id;
		this.setState({
			id: id,
		});
		this.getItem(id);
	};

	handleClick = event => {
		const target = event.target.id;
		if (target === 'login') {
			this.setState({ showLogin: true });
		} else if (target === 'new-account') {
			this.setState({ showSignup: true });
		}
		// console.log(`handle click`)
	};

	handleFormSubmit = event => {
		event.preventDefault();
		console.log(`Submitted`);
	}


	IndexPage = () => {
		return (
			<React.Fragment>
				<h1>User Profile</h1>
				<p className="index-page">
					<button id="login" onClick={this.handleClick}>
						Login
					</button>
					<span>or</span>
					<button id="new-account" onClick={this.handleClick}>
						create a new account
					</button>
					.
				</p>
			</React.Fragment>
		);
	};

	render() {
		if (!this.props.isLoggedIn) {
      return <Redirect to='/'/>
		}

		const { showLogin, showSignup, } = this.state;
		return (
			<div id="User">
				{!showLogin && !showSignup && this.IndexPage()}
			</div>
		);
	}
}

export default User;
