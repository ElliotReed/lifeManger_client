import * as React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

import { useAuth } from "./useAuth";

export default function RequireAuth({ children }) {
  const auth = useAuth();
  let location = useLocation();

  React.useEffect(() => {
    console.log("requireauth: ", auth);
  }, [auth.initialized]);

  if (auth.initialized && !auth.user) {
    return (
      <Navigate
        to="/authorization/sign-in"
        state={{ from: location }}
        replace
      />
    );
  }
  return <Outlet />;
}
