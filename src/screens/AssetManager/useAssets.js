import * as React from "react";

import { replaceItemInArray } from "utils/array";
import AssetService from "services/AssetService";
import { useNavigate } from "react-router";

const assetContext = React.createContext({});

export function AssetProvider({ children }) {
  const asset = useAssetProvider();
  return (
    <assetContext.Provider value={asset}>{children}</assetContext.Provider>
  );
}

export const useAsset = () => {
  return React.useContext(assetContext);
};

export function useAssetProvider() {
  const [asset, setAsset] = React.useState({});
  const [assets, setAssets] = React.useState([]);
  const [assetTypes, setAssetTypes] = React.useState([]);
  const [selectedAssetType, setSelectedAssetType] = React.useState({});

  const [showAddItemScreen, setShowAddItemScreen] = React.useState(false);

  React.useEffect(() => {
    AssetService.getAssetTypes().then((data) => setAssetTypes(data));
    // AssetService.getAssets(`/assets`).then((data) => {
    //   setAssets(data.assets);
    //   setAssetCount(data.count);
    // });
  }, []);

  const getAssets = (text) => {
    AssetService.getAssets(`/assets?searchText=${text}`).then((data) => {
      setAssets(data.assets);
    });
  };

  const getAssetsByType = (typeId) => {
    if (!assets.some((item) => item.typeId === typeId)) {
      AssetService.getAssetsByType(typeId).then((data) =>
        setAssets([...assets, ...data])
      );
    }
  };

  const getAssetById = async (itemId) => {
    const asset = await AssetService.getAssetById(itemId);
    setAsset(asset);
  };

  const returnAssetById = async (itemId) => {
    const asset = await AssetService.getAssetById(itemId);
    return asset;
  };

  const removeAssetFromList = (assetToRemove) => {
    return assets.filter((assetItem) => assetItem.id !== assetToRemove.id);
  };

  const handleSubmit = async (event) => {
    console.log("event: ", event);
    let id;
    let fieldValues;

    if (!event.nonevent) {
      event.preventDefault();
      const target = event.currentTarget;
      id = target.dataset.id;
      const formData = new FormData(target);
      fieldValues = Object.fromEntries(formData.entries());
    } else {
      id = event.id;
      fieldValues = event.fieldValues;
    }
    console.log("fieldValues: ", fieldValues);
    // return; // to prevent actually submit, remove when ready

    if (id) {
      fieldValues.id = id;
      const updatedAsset = await AssetService.updateAsset(fieldValues);
      setAsset(updatedAsset);
      return updatedAsset;
    }

    const response = await AssetService.createAsset(fieldValues);
    setAsset(response.data);
    return response;
  };

  const createAssetType = (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    const id = target.dataset.id;
    const formData = new FormData(target);
    const fieldValues = Object.fromEntries(formData.entries());
    console.log("!created: ", fieldValues);
  };

  const handleAssetTypeSubmit = async (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    const id = target.dataset.id;
    const formData = new FormData(target);
    const fieldValues = Object.fromEntries(formData.entries());

    if (id) {
      fieldValues.id = id;
      const updatedAssetType = await AssetService.updateAssetType(fieldValues);
      setSelectedAssetType(updatedAssetType);
      setAssetTypes(replaceItemInArray(updatedAssetType, assetTypes));
      return;
    }

    const newAssetType = await AssetService.createAssetType(fieldValues);
    setAssetTypes([newAssetType, ...assetTypes]);
  };

  const setSelectedAssetTypeObjById = (id) => {
    setSelectedAssetType({
      ...assetTypes.filter((assetType) => assetType.id === id)[0],
    });
  };

  return {
    asset,
    getAssets,
    assets,
    setAssets,
    getAssetById,
    getAssetsByType,
    handleSubmit,
    setAsset,
    returnAssetById,
    assetTypes,
    createAssetType,
    selectedAssetType,
    setSelectedAssetType,
    setSelectedAssetTypeObjById,
    handleAssetTypeSubmit,
    showAddItemScreen,
    setShowAddItemScreen,
  };
}
