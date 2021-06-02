import axiosInstance from "./authService/axios";

const AspectService = {
  getAspects: async function () {
    try {
      const response = await axiosInstance.get("/aspect");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAspectById: async function (id) {
    try {
      const response = await axiosInstance.get(`/aspect/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  postNewAspect: async function (newAspect) {
    try {
      const response = await axiosInstance.post("/aspect", newAspect);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAspect: async function (aspect) {
    try {
      const response = await axiosInstance.patch(
        `/aspect/${aspect.id}`,
        aspect
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteAspect: async function (aspect) {
    try {
      const response = await axiosInstance.delete(`/aspect/${aspect.id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AspectService;
