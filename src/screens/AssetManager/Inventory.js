import * as React from "react";
import { Link, useHistory } from "react-router-dom";

import SearchBar from "components/common/SearchBar";

import AssetTypeSelector from "./AssetTypeSelector";

import { useAsset } from "./useAssets";

function AssetRow({ asset }) {
  return (
    <li key={asset.id}>
      <Link to={`/inventory/asset/${asset.id}`}>{asset.label}</Link>
    </li>
  );
}

export default function Inventory() {
  const history = useHistory();
  const inventory = useAsset();

  const handleAssetTypeClick = (e) => {
    inventory.setSelectedAssetTypeObjById(e.target.dataset.id);

    inventory.getAssetsByType(e.target.dataset.id);
    history.push("/inventory/assets");
  };

  return (
    <>
      <section>
        <h1>inventory page</h1>
        <p>asset count: {inventory.assetCount}</p>
      </section>
      <section>top tasks</section>
      <section>
        <div>
          <p>what type of asset are you looking for?</p>
          <AssetTypeSelector
            list={inventory.assetTypes}
            handleClick={handleAssetTypeClick}
          />
        </div>
        <Link to="/inventory/asset-types">asset types</Link>
      </section>
      <section>
        <SearchBar placeholder="enter an asset..." data={inventory.assets} />
        {/* {inventory.assets && (
          <ul>
            {inventory.assets
              .filter(
                (asset) => asset.typeId === inventory.selectedAssetType.id
              )
              .map((asset) => (
                <AssetRow key={asset.id} asset={asset} />
              ))}
          </ul>
        )} */}
      </section>
    </>
  );
}
