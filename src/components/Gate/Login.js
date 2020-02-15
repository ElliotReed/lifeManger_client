import React, { Component } from 'react';
// import { useMutation } from '@apollo/react-hooks';

import { InputText } from '../UI/Input';
import './Login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	// handleFormSubmit = event => {
	// 	event.preventDefault();
	// 	axios
	// 		.post('/user_account/login', {
	// 			email: this.state.email,
	// 			password: this.state.password,
	// 		})
	// 		.then(res => {
	// 			// console.log(res.data);
	// 			if (res.data) {this.props.handleLogin(res.data)};
	// 		});
	// }
	handleFormSubmit = event => {
		event.preventDefault();
	};

	getInputValue = (name, value) => {
		// console.log(`Name: ${name}, Value: ${value}`);
		this.setState({
			[name]: value,
		});
	};

	render() {
		return (
			<form id="Form" value="Login" onSubmit={this.handleFormSubmit}>
				<h1>Login</h1>
				<InputText
					type="email"
					name="email"
					labelText="Email"
					placeholderText="Email"
					errorMessage="You must enter an email address"
					getInputValue={this.getInputValue}
				/>
				<InputText
					type="password"
					name="password"
					labelText="Password"
					placeholderText=""
					errorMessage="You must enter a password"
					getInputValue={this.getInputValue}
				/>
				<input type="submit" value="Login" />
			</form>
		);
	}
}

export default Login;
