import axiosInstance from "services/authService/axios";

class AuthService {
  constructor() {
    this.accessToken = "";
    this.isAuthenticated = false;
  }

  setAccessTokenAndAuthenticate(token) {
    this.accessToken = token;
    this.isAuthenticated = true;
  }

  async initializeTokens() {
    try {
      const response = await axiosInstance.get("auth/tokens");
      return response.statusText;
    } catch (error) {
      throw error;
    }
  }

  async postLogin(loginData) {
    try {
      const response = await axiosInstance.post("auth/login", loginData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postLogout() {
    try {
      const response = await axiosInstance.post("auth/logout");
      this.accessToken = "";
      this.isAuthenticated = false;
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postNewUser(newUser) {
    try {
      const response = await axiosInstance.post("auth/register", newUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
