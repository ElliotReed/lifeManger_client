import * as React from "react";

import { useAxios } from "./axios/useAxios";

const authContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(authContext);
};

function useAuthProvider() {
  const axiosInstance = useAxios();
  const [user, setUser] = React.useState(null);

  const initializeApp = async () => {
    try {
      const response = await axiosInstance.get("auth/tokens");
      const authenticatedUser = response.data;
      if (authenticatedUser.error) {
        console.error(authenticatedUser.error.message);
        setUser(null);
        return;
      }

      setUser(authenticatedUser);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (authData) => {
    try {
      const response = await axiosInstance.post("auth/login", authData);
      const authenticatedUser = response.data;
      setUser(authenticatedUser);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("auth/logout");
      response.status === 204 && setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (authData) => {
    console.log("authData: ", authData);
    try {
      const response = await axiosInstance.post("auth/register", authData);
      const authenticatedUser = response.data;
      setUser(authenticatedUser);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    initializeApp();
    // eslint-disable-next-line
  }, []);

  return {
    login,
    logout,
    register,
    user,
  };
}
