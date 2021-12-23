import * as React from "react";
import axios from "axios";

const axiosContext = React.createContext();

export function AxiosProvider({ children }) {
  const axiosInstance = useAxiosProvider();
  return (
    <axiosContext.Provider value={axiosInstance}>
      {children}
    </axiosContext.Provider>
  );
}

export const useAxios = () => {
  return React.useContext(axiosContext);
};

function useAxiosProvider() {
  const [accessToken, setAccessToken] = React.useState("");

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use((req) => {
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  });

  axiosInstance.interceptors.response.use((res) => {
    const responseAccessToken = res.headers["x-access-token"];
    if (!responseAccessToken) {
      setAccessToken("");
      return res;
    }
    setAccessToken(responseAccessToken);
    return res;
  });

  return axiosInstance;
}
