import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";

import { useAsset } from "../useAssets";

import Background from "components/common/Background";
// import IconButton from "components/common/Button/IconButton";
import * as Inputs from "components/common/Input";
// import Task from "components/Task";

import LocationTree from "./LocationTree";

import styles from "./asset-screen.module.scss";
import MaxWidthContainer from "components/common/MaxWidthContainer";

export default function AssetScreen() {
  const history = useHistory();
  const inventory = useAsset();
  const componentIsMounted = React.useRef(true);
  const routeMatch = useRouteMatch("/assets/:assetId");

  React.useEffect(() => {
    if (routeMatch?.params?.assetId) {
      inventory.getAssetById(routeMatch.params.assetId);
      history.push(`/assets/${routeMatch.params.assetId}`);
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
            dataId={inventory.asset?.id}
            onSubmit={inventory.handleSubmit}
            label="asset"
            initialValue={inventory.asset?.label}
            name="label"
            placeholder="enter asset (desk, photo album, etc.)"
          />
        </section>

        <section>
          <LocationTree
            handleSubmit={inventory.handleSubmit}
            assetAncestors={inventory.asset?.ancestors}
            assetDescendants={inventory.asset?.children}
            dataId={inventory.asset?.id}
          />
        </section>

        <Inputs.SelectorComponent
          dataId={inventory.asset?.id}
          initialValue={inventory.asset?.typeId}
          label="type"
          name="typeId"
          onSubmit={inventory.handleSubmit}
          options={inventory.assetTypes}
          placeholder="select an asset type"
        />

        <Inputs.InputComponent
          dataId={inventory.asset?.id}
          initialValue={inventory.asset?.description}
          label="description"
          name="description"
          onSubmit={inventory.handleSubmit}
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
