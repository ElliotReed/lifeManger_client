import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./Gate.module.scss";

class Gate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignup: false,
    };
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Navigate to="/manager" />;
    }

    const { showSignup } = this.state;
    return (
      <div id="User">
        <h1>Welcome to your Life Manager</h1>
        {!this.props.isLoggedIn && (
          <Login handleLogin={this.props.handleLogin} />
        )}
        {showSignup && <Register />}
      </div>
    );
  }
}

export default Gate;
