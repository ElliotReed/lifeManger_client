import React from "react";
import { Switch, Route } from "react-router-dom";

import Auth from "screens/Auth";
import Welcome from "screens/Welcome";

export default function PublicRouterConfig() {
  return (
    <Switch>
      <Route
        path="/sign-in"
        exact
        render={(props) => <Auth {...props} mode="login" />}
      />
      <Route
        path="/create-account"
        exact
        render={(props) => <Auth {...props} mode="register" />}
      />
      <Route path="/" exact component={Welcome} />
    </Switch>
  );
}
