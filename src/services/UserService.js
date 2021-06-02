import axiosInstance from "./authService/axios";

const UserService = {
  getUserById: async function () {
    try {
      const response = await axiosInstance.get("/users/user");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
