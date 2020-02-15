import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './Gate.css';

class Gate extends Component {
  constructor(props) {
		super(props);
		this.state = {
			showSignup: false,
		};
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to='/manager'/>
    }

		const { showSignup } = this.state;
		return (
      <div id="User">
      <h1>Welcome to your Life Manager</h1>
				{!this.props.isLoggedIn && <Login handleLogin={this.props.handleLogin}/>}
				{showSignup && <Register />}
			</div>
		);
  }
}

export default Gate;