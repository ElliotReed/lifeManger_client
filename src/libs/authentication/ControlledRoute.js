import { Route } from "react-router-dom";

import Auth from "screens/Auth";
import { useAuth } from "./useAuth";

export default function ControlledRoute({ component: Component, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.user) {
          return <Auth mode="login" />;
        }
        return <Component {...props} />;
      }}
    ></Route>
  );
}
