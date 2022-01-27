import { Route } from "react-router-dom";

import Auth from "screens/Auth";
import { useAuth } from "./useAuth";

export default function ControlledRoute({ element: Element, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.user) {
          return <Auth mode="login" />;
        }
        return <Element {...props} />;
      }}
    ></Route>
  );
}
