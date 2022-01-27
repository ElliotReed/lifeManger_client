import * as React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "components/common/LoadingSpinner";
import AssetService from "services/AssetService";

import styles from "./rootSelector.module.scss";

export default function RootSelector() {
  const [propertyAssets, setPropertyAssets] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    return AssetService.getAssets(`/assets/roots`).then((data) => {
      setPropertyAssets(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <RootSelectorContainer isLoading={isLoading}>
      <PropertyList propertyAssets={propertyAssets} />
    </RootSelectorContainer>
  );
}

function RootSelectorContainer({ isLoading, children }) {
  return (
    <section className={styles.rootSelector}>
      {isLoading && <LoadingSpinner />}
      <h2 className={styles.sectionHeading}>properties</h2>
      {children}
    </section>
  );
}

function PropertyList({ propertyAssets }) {
  return (
    <ul className={styles.propertyList}>
      {propertyAssets.map((propertyAsset) => (
        <li key={propertyAsset.id} className={styles.propertyListItem}>
          <PropertyAssetLink propertyAsset={propertyAsset} />
          {propertyAsset.directDescendants.length > 0 && (
            <DescendantsList propertyAsset={propertyAsset} />
          )}
        </li>
      ))}
    </ul>
  );
}

function DescendantsList({ propertyAsset }) {
  return (
    <ul className={styles.descendantList}>
      {propertyAsset.directDescendants.map((descendant) => (
        <li key={descendant.id} className={styles.descendantListItem}>
          <Link
            to={descendant.links.href}
            className={styles.descendantListLink}
          >
            {descendant.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function PropertyAssetLink({ propertyAsset }) {
  return (
    <h3 className={styles.propertyHeading}>
      <Link to={propertyAsset.links.href} className={styles.propertyLink}>
        {propertyAsset.label}
      </Link>
    </h3>
  );
}
