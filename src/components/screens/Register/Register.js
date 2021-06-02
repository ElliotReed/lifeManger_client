import { useState } from "react";
import { Redirect } from "react-router-dom";

import Button from "components/common/Button";
import LoadingSpinner from "components/common/LoadingSpinner";
import MaxWidthContainer from "components/common/MaxWidthContainer";

import styles from "./register.module.scss";

import AuthService from "services/authService/AuthService.js";

import { IsAuthenticatedContextConsumer } from "services/authService/IsAuthenticatedContext";

export default function Register({ isAuthenticated, setIsAuthenticated }) {
  const [changed, setChanged] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  async function login(setIsAuthenticated) {
    console.log("setIsAuthenticated: ", setIsAuthenticated);
    setLoading(true);
    AuthService.postNewUser(newUser)
      .then((user) => {
        console.log("user: ", user);
        return AuthService.postLogin(user);
      })
      .then((data) => {
        const accessToken = data.token;
        if (accessToken) {
          AuthService.setAccessTokenAndAuthenticate(accessToken);
        }
        setNewUser({ email: "", password: "" });
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

    setNewUser({ ...newUser, [name]: value });

    setChanged(true);
  }

  function handleSubmit(e, setIsAuthenticated) {
    e.preventDefault();
    login(setIsAuthenticated);
    // Here to remove warnings
    if (changed) {
    }
    console.log("submited: ", newUser);
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
              <p>Create account</p>
              <label>
                email
                <input
                  name="email"
                  type="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                password
                <input
                  name="password"
                  type="password"
                  value={newUser.password}
                  onChange={handleChange}
                />
              </label>
              <Button type="submit">Create account</Button>
            </form>
          )}
        </IsAuthenticatedContextConsumer>
      </MaxWidthContainer>
    </div>
  );
}
