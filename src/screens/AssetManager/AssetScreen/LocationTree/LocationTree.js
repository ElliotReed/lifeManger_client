import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Link } from "react-router-dom";

// import AssetTypeSelector from "../../AssetTypeSelector";
import * as Inputs from "components/common/Input";
import IconButton from "components/common/Button/IconButton";
import ShowHideContainer from "components/common/ShowHideContainer";
// import LoadingSpinner from "components/common/LoadingSpinner";

// import { useAsset } from "screens/AssetManager/useAssets";
import AssetService from "services/AssetService";

import styles from "./locationTree.module.scss";

export default function LocationTree({
  dataId,
  handleSubmit,
  assetDescendants,
  assetAncestors,
}) {
  // const handleAssetTypeClick = (e) => {
  //   assets.setSelectedAssetTypeObjById(e.target.dataset.id);

  //   assets.getAssetsByType(e.target.dataset.id);
  // };

  return (
    <LocationTreeContainer>
      <AssetAncestors
        assetAncestors={assetAncestors}
        dataId={dataId}
        handleSubmit={handleSubmit}
      />
      <AssetDescendants assetDescendants={assetDescendants} />
    </LocationTreeContainer>
  );
}

function LocationTreeContainer({ children }) {
  return (
    <div className={styles.locationTreeContainer}>
      <h2 className={styles.treeHeader}>family tree</h2>
      {children}
    </div>
  );
}

function AssetAncestors({ dataId, assetAncestors, handleSubmit }) {
  const [showChangeLocation, setShowChangeLocation] = React.useState(false);
  const ancestorsClass = cx(
    styles.ancestors,
    showChangeLocation && styles.hide
  );

  return (
    <>
      <ul className={ancestorsClass}>
        {assetAncestors?.length === 0 && (
          <MainListElement
            handleClick={() => setShowChangeLocation(!showChangeLocation)}
            showAngleIcon={false}
          />
        )}
        {assetAncestors?.length > 0 &&
          assetAncestors.map((location, index) => (
            <MainListElement
              key={location?.id || index}
              index={index}
              item={location}
              handleClick={() => setShowChangeLocation(!showChangeLocation)}
              showAngleIcon={index + 1 < assetAncestors.length}
            />
          ))}
      </ul>

      <LocationPickerWrapper
        dataId={dataId}
        handleSubmit={handleSubmit}
        show={showChangeLocation}
        setShowChangeLocation={setShowChangeLocation}
      />
    </>
  );
}

function MainListElement({ item, handleClick, index = 0, showAngleIcon }) {
  return (
    <li className={styles.li}>
      <div className={styles.mainListElement}>
        <div className={styles.linkWrapper}>
          <LinkToRender item={item} />
          {index === 0 && <IconButton icon="edit" onClick={handleClick} />}
        </div>
        {showAngleIcon ? <AngleIcon /> : null}
      </div>
    </li>
  );
}

function LinkToRender({ item }) {
  return item ? (
    <Link to={item.links.href}>{item.label}</Link>
  ) : (
    <a rel="noopener">no location</a>
  );
}

function AngleIcon({ direction = "right" }) {
  return (
    <div className={styles.angleIcon}>
      {direction === "right" && (
        <FontAwesomeIcon icon={["fas", "angle-right"]} />
      )}
      {direction === "down" && <FontAwesomeIcon icon={["fas", "angle-down"]} />}
    </div>
  );
}

function AssetDescendants({ assetDescendants }) {
  const [showDecendants, setShowDecendants] = React.useState(false);
  return (
    <section className={styles.descendantsContainer}>
      <DescendantsHeader
        onClick={() => setShowDecendants(!showDecendants)}
        descendants={assetDescendants}
      />
      <ShowHideContainer show={showDecendants}>
        <ul className={styles.descendantList}>
          {assetDescendants?.map((descendant) => (
            <DescendantListItem descendant={descendant} key={descendant.id} />
          ))}
        </ul>
      </ShowHideContainer>
    </section>
  );
}

function DescendantListItem({ descendant }) {
  return (
    <li className={styles.descendantListItem}>
      <Link to={descendant.links.href}>{descendant.label}</Link>
    </li>
  );
}

function DescendantsHeader({ onClick, descendants }) {
  return (
    <header
      className={styles.descendantsHeader}
      onClick={descendants?.length > 0 ? onClick : undefined}
    >
      <p>
        <span className={styles.number}>{descendants?.length}</span>{" "}
        {descendants?.length === 1 ? "descendant" : "descendants"}
      </p>
      {descendants?.length > 0 && <AngleIcon direction="down" />}
    </header>
  );
}

function LocationPickerWrapper({
  show,
  handleSubmit,
  dataId = null,
  setShowChangeLocation,
}) {
  return (
    <div className={styles.bottomBar}>
      <ShowHideContainer show={show}>
        <LocationPicker
          handleSubmit={handleSubmit}
          dataId={dataId}
          setShowChangeLocation={setShowChangeLocation}
        />
      </ShowHideContainer>
    </div>
  );
}

function LocationPicker({ dataId, handleSubmit, setShowChangeLocation }) {
  const getAssets = (text) => {
    return AssetService.getAssets(`/assets?searchText=${text}`).then((data) => {
      return data.assets;
    });
  };

  const handlePicked = (e) => {
    handleSubmit(e);
    setShowChangeLocation(false);
  };

  return (
    <section className={styles.locationPicker}>
      {/* TODO add filtering by type
          <AssetTypeSelector
            list={assets.assetTypes}
            handleClick={handleAssetTypeClick}
          /> */}

      <Inputs.SearchTextComponent
        // shouldReset={shouldReset}
        dataId={dataId}
        handleSubmit={handlePicked}
        ListItemComponent={ListItemRow}
        label="search locations"
        name="search"
        placeholder="enter location"
        onSearchChange={getAssets}
      />
    </section>
  );
}

function ListItemRow({ item, handleSubmit, dataId }) {
  return (
    <form
      onSubmit={handleSubmit}
      data-id={dataId}
      className={styles.listItemRow}
    >
      <input readOnly hidden name="locationId" value={item.id} />

      <IconButton icon="check-circle" type="submit">
        {item.label}
      </IconButton>
    </form>
  );
}
