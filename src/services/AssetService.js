import axiosInstance from "./authService/axios";

const AssetService = {
  getAssetCount: async () => {
    try {
      const response = await axiosInstance.get("/assets/count");
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  getAssetTypes: async () => {
    try {
      const response = await axiosInstance.get("/assetTypes");
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  getAssetsByType: async function (typeId) {
    try {
      const response = await axiosInstance.get(`/assets/?typeId=${typeId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createAssetType: async (assetType) => {
    try {
      const response = await axiosInstance.post(
        `/assets/asset-types`,
        assetType
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAssetType: async (assetType) => {
    try {
      const response = await axiosInstance.patch(
        `/assets/asset-types`,
        assetType
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAssets: async function (url) {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAssetById: async function (id) {
    try {
      const response = await axiosInstance.get(`/assets/asset/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createAsset: async function (newAsset) {
    try {
      const response = await axiosInstance.post("/assets", newAsset);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAsset: async function (asset) {
    try {
      const response = await axiosInstance.patch(
        `/assets/asset/${asset.id}`,
        asset
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteAsset: async function (asset) {
    try {
      const response = await axiosInstance.delete(`/assets/${asset.id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AssetService;
