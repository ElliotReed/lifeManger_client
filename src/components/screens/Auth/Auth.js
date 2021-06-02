import React from "react";
import { Redirect } from "react-router-dom";

import Button from "components/common/Button/Button";
import LoadingSpinner from "components/common/LoadingSpinner";
import MaxWidthContainer from "components/common/MaxWidthContainer";

import styles from "./auth.module.scss";

import AuthService from "services/authService/AuthService.js";

import { IsAuthenticatedContextConsumer } from "services/authService/IsAuthenticatedContext";

const Auth = ({ isAuthenticated, setIsAuthenticated }) => {
  const [changed, setChanged] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  async function login(setIsAuthenticated) {
    console.log("setIsAuthenticated: ", setIsAuthenticated);
    setLoading(true);
    AuthService.postLogin(loginData)
      .then((data) => {
        const accessToken = data.token;
        if (accessToken) {
          AuthService.setAccessTokenAndAuthenticate(accessToken);
        }
        setLoginData({ email: "", password: "" });
        setShouldRedirect(true);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log(err.message);
        setIsAuthenticated(false);
      });
    setLoading(false);
  }

  function handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setLoginData({ ...loginData, [name]: value });

    setChanged(true);
  }

  function handleSubmit(e, setIsAuthenticated) {
    e.preventDefault();
    login(setIsAuthenticated);
    // Here to remove warnings
    if (changed) {
    }
    console.log("submited: ", loginData);
  }

  return (
    <div className={styles.Auth}>
      {shouldRedirect && <Redirect to="/dashboard" />}
      {loading ? <LoadingSpinner /> : null}

      <h1>Auth</h1>
      <MaxWidthContainer>
        <IsAuthenticatedContextConsumer>
          {(context) => (
            <form
              className={styles.form}
              onSubmit={(e) => handleSubmit(e, context.setIsAuthenticated)}
            >
              <p>Sign In</p>
              <label>
                email
                <input
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                password
                <input
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </label>
              <Button type="submit">Sign In</Button>
            </form>
          )}
        </IsAuthenticatedContextConsumer>
      </MaxWidthContainer>
    </div>
  );
};

export default Auth;
