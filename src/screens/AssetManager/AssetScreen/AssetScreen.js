import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useNavigate, useMatch, Link } from "react-router-dom";

import { useAsset } from "../useAssets";
import AssetService from "services/AssetService";

import Background from "components/common/Background";
// import IconButton from "components/common/Button/IconButton";
import * as Inputs from "components/common/Input";
// import Task from "components/Task";

import LocationTree from "./LocationTree";

import styles from "./asset-screen.module.scss";
import MaxWidthContainer from "components/common/MaxWidthContainer";

async function callUpdateService(event) {
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

  fieldValues.id = id;
  const updatedAsset = await AssetService.updateAsset(fieldValues);
  return updatedAsset;
}

export default function AssetScreen() {
  const navigate = useNavigate();
  const inventory = useAsset();
  const componentIsMounted = React.useRef(true);
  const routeMatch = useMatch("assets/:assetId");
  const [asset, setAsset] = React.useState({});

  function isLocationInDescendants(newLocationId) {
    if (
      asset.descendants?.filter((descendant) => {
        return descendant.id === newLocationId;
      }).length > 0
    ) {
      return true;
    }
    return false;
  }

  const getAssetById = async (itemId) => {
    const asset = await AssetService.getAssetById(itemId);
    setAsset(asset);
  };

  const isProperty = () => {
    const typeIdOfProperty = inventory?.assetTypes?.filter(
      (type) => type.label === "property"
    )[0]?.id;

    if (asset.typeId === typeIdOfProperty) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event) => {
    if (isProperty()) {
      event.preventDefault();
      return;
    }
    const updatedAsset = await callUpdateService(event);
    setAsset(updatedAsset);
  };

  React.useEffect(() => {
    console.log("routeMatch: ", routeMatch);
    if (routeMatch?.params?.assetId) {
      getAssetById(routeMatch.params.assetId);
      navigate(`/assets/${routeMatch.params.assetId}`);
    }

    return () => {
      componentIsMounted.current = false;
    };
  }, [routeMatch?.params?.assetId]);

  return (
    <div className={styles.AssetScreen}>
      <Background x={-100} y={-200} size={2} />
      <header>
        <div className={styles.iconWrapper}>
          <Link to="/assets">
            <FontAwesomeIcon icon={["fas", "long-arrow-alt-left"]} />
          </Link>
        </div>
      </header>

      <MaxWidthContainer>
        <section>
          <Inputs.InputComponent
            dataId={asset?.id}
            onSubmit={handleSubmit}
            label="asset"
            initialValue={asset?.label}
            name="label"
            placeholder="enter asset (desk, photo album, etc.)"
          />
        </section>

        <section>
          <LocationTree
            isProperty={isProperty}
            handleSubmit={handleSubmit}
            assetAncestors={asset?.ancestors}
            assetDescendants={asset?.descendants}
            dataId={asset?.id}
          />
        </section>

        <Inputs.SelectorComponent
          dataId={asset?.id}
          initialValue={asset?.typeId}
          label="type"
          name="typeId"
          onSubmit={handleSubmit}
          options={inventory.assetTypes}
          placeholder="select an asset type"
        />

        <Inputs.InputComponent
          dataId={asset?.id}
          initialValue={asset?.description}
          label="description"
          name="description"
          onSubmit={handleSubmit}
          placeholder="enter a description"
          rows="4"
          cols="400"
          autoComplete="off"
          type="textarea"
        />
        {/* TODO add asset tasks
      <Task id={inventory.asset?.id} /> */}
      </MaxWidthContainer>
    </div>
  );
}
