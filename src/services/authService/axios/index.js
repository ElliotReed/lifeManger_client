import Axios from "axios";
import AuthService from "services/authService/AuthService.js";

const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((req) => {
  if (AuthService.accessToken !== "") {
    req.headers.Authorization = `Bearer ${AuthService.accessToken}`;
  }
  return req;
});

axiosInstance.interceptors.response.use((res) => {
  const accessToken = res.headers["x-access-token"];
  if (!accessToken) return res;
  AuthService.setAccessTokenAndAuthenticate(accessToken);
  return res;
});

export default axiosInstance;
