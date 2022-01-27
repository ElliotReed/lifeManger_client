import * as React from "react";
import { useNavigate } from "react-router-dom";

import * as Inputs from "components/common/Input";
import FieldForm from "components/common/FieldForm";

import { useAsset } from "../useAssets";

import styles from "./asset-type.module.scss";
import AssetTypeSelector from "../AssetTypeSelector";

export default function AssetType() {
  const navigation = useNavigate();
  const inventory = useAsset();
  const [showAdd, setShowAdd] = React.useState(false);

  return (
    <div className={styles.AssetType}>
      <button onClick={() => navigation.goBack()}>back</button>
      <h1>asset types</h1>
      <button onClick={() => setShowAdd(true)}>+</button>
      {showAdd && (
        <FieldForm
          dataId={inventory.selectedAssetType.id}
          handleSubmit={inventory.handleAssetTypeSubmit}
          labelText="new asset type"
        >
          <Inputs.Input label="new asset type" name="label" />
        </FieldForm>
      )}

      <AssetTypeSelector
        list={inventory.assetTypes}
        handleClick={(e) =>
          inventory.setSelectedAssetTypeObjById(e.target.dataset.id)
        }
      />
      <section>
        <FieldForm
          dataId={inventory.selectedAssetType.id}
          handleSubmit={inventory.handleAssetTypeSubmit}
          labelText="asset type"
          shownValue={inventory.selectedAssetType.label}
        >
          <Inputs.Input
            initialValue={inventory.selectedAssetType.label}
            focus
            label="edit asset type"
            name="label"
            placeholderText=""
          />
        </FieldForm>
      </section>
    </div>
  );
}
