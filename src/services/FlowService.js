import axiosInstance from "./authService/axios";

const FlowService = {
  getFlow: async () => {
    try {
      const response = await axiosInstance.get("/flow");
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  updateFlow: async (flowAction) => {
    try {
      const response = await axiosInstance.patch(
        `/flow/${flowAction.id}`,
        flowAction
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};

export default FlowService;
