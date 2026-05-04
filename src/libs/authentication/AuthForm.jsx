import * as React from "react";
import { useAuth } from "./useAuth";

const initialState = {
  email: "",
  password: "",
};

export default function AuthForm({ mode, backToOrigin }) {
  const [authData, setAuthData] = React.useState(initialState);
  const auth = useAuth();

  const modeText = mode === "login" ? "sign in" : "create account";

  function handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAuthData({ ...authData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (mode === "login") {
      auth.login(authData, backToOrigin);
    }

    if (mode === "register") {
      auth.register(authData, backToOrigin);
    }

    setAuthData(initialState);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>{modeText}</p>
      <label htmlFor="email">email</label>
      <input
        autoComplete="email"
        name="email"
        onChange={handleChange}
        type="email"
        value={authData.email}
        autoComplete="username"
      />
      <label htmlFor="password">password</label>
      <input
        autoComplete={mode === "register" ? "new-password" : "current-password"}
        name="password"
        type="password"
        onChange={handleChange}
        value={authData.password}
      />
      <input type="submit" value={modeText} />
    </form>
  );
}
