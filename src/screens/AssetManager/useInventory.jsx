import * as React from "react";

import AssetService from "services/AssetService";

const assetContext = React.createContext({});

export function AssetProvider({ children }) {
  const asset = useAssetProvider();
  return (
    <assetContext.Provider value={asset}>{children}</assetContext.Provider>
  );
}

export const useInventory = () => {
  return React.useContext(assetContext);
};

export function useAssetProvider() {
  const [asset, setAsset] = React.useState({});
  const [assets, setAssets] = React.useState([]);
  const [assetTypes, setAssetType] = React.useState([]);
  const [locations, setLocations] = React.useState([]);

  React.useEffect(() => {
    AssetService.getAssetTypes().then((data) => setAssetType(data));
  }, []);

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

  const setLocationsByTypeId = async (typeId) => {
    AssetService.getAssetsByType(typeId).then((data) => setLocations(data));
  };

  const removeAssetFromList = (assetToRemove) => {
    return assets.filter((assetItem) => assetItem.id !== assetToRemove.id);
  };

  const updateAsset = (updatedAsset) => {
    const filteredAssets = removeAssetFromList(updatedAsset);

    if (updatedAsset.typeId !== filteredAssets[0].typeId) {
      setAssets(filteredAssets);
      return;
    }

    setAssets([...filteredAssets, updatedAsset]);
  };

  const createAssetType = (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    const id = target.dataset.id;
    const formData = new FormData(target);
    const fieldValues = Object.fromEntries(formData.entries());
    console.log("!created: ", fieldValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    const id = target.dataset.id;
    const formData = new FormData(target);
    const fieldValues = Object.fromEntries(formData.entries());

    if (id) {
      fieldValues.id = id;
      const updatedAsset = await AssetService.updateAsset(fieldValues);
      updateAsset(updatedAsset);
      return;
    }

    const newAsset = await AssetService.createAsset(fieldValues);
    updateAsset(newAsset);

    // console.log(JSON.stringify(item));
    // if (this.state.editMode) {
    // 	this.putItem(item);
    // } else {
    // 	this.postItem(item);
    // }
    // this.setState({ createUpdateFormIsVisible: false });
  };

  return {
    assets,
    setAssets,
    assetTypes,
    getAssetById,
    getAssetsByType,
    handleSubmit,
    asset,
    createAssetType,
    setLocationsByTypeId,
    returnAssetById,
    locations,
  };
}
