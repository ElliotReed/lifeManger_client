import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useMatch,
  useLocation,
} from "react-router-dom";

import { useAsset } from "../useAssets";
import AssetService from "services/AssetService";

import Background from "components/common/Background";
import Drawer from "components/common/Drawer";
import * as Inputs from "components/common/Input";
import LoadingSpinner from "components/common/LoadingSpinner";
import MaxWidthContainer from "components/common/MaxWidthContainer";
// import Selector from "components/common/Selector";

import AddItemScreen from "./AddItemScreen";
import RootSelector from "./RootSelector";
// import AssetManagerSelectorList from "./SelectorList";
// import AssetTypeSelector from "./AssetTypeSelector";

import styles from "./manager.module.scss";

export default function Manager() {
  const asset = useAsset();
  let navigate = useNavigate();
  let match = useMatch("assets");
  const location = useLocation();

  const [selectedType, setSelectedType] = React.useState("");
  const [shouldShowAddAssetType, setShouldShowAssetType] =
    React.useState(false);

  const handleAssetTypeClick = (e) => {
    asset.setSelectedAssetTypeObjById(e.target.dataset.id);

    asset.getAssetsByType(e.target.dataset.id);
    // navigation("/assets");
  };

  const getAssets = (text) => {
    return AssetService.getAssets(`/assets?searchText=${text}`).then((data) => {
      return data.assets;
    });
  };

  const handleTypeChange = (e) => {
    if (e.target.value === "add") {
      setShouldShowAssetType(true);
      return;
    }
    setSelectedType(e.target.value);
    asset.getAssetsByType(e.target.value);
  };

  React.useEffect(() => {
    console.log(location);
    if (location.pathname === "/assets") {
      asset.setShowAddItemScreen(false);
    }

    if (location.pathname === "/asset/add") {
      asset.setShowAddItemScreen(true);
    }
  }, [location]);

  return (
    <div id="AssetManager" className={styles.assetManager}>
      <Background x={-200} y={-100} size={3} />

      <Outlet />

      <MaxWidthContainer>
        <header className={styles.header}>
          <h1>assetManager</h1>
        </header>
        <section>
          <AssetCount />
        </section>
        <section className={styles.tasks}>top tasks</section>
        <button
          className={styles.addBtn}
          onClick={() => {
            asset.setShowAddItemScreen(true);
            navigate("add");
          }}
        >
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </button>
        <section className={styles.search}>
          <Inputs.SearchTextComponent
            ListItemComponent={ListItemRow}
            label="search assets"
            name="search"
            placeholder="find an asset..."
            onSearchChange={getAssets}
          />
        </section>
      </MaxWidthContainer>
      <RootSelector />
    </div>
  );
}

function AssetCount() {
  const [assetCount, setAssetCount] = React.useState(null);

  React.useEffect(() => {
    AssetService.getAssetCount().then((data) => setAssetCount(data.count));
  }, []);
  return (
    <p className={styles.count}>
      <span>{assetCount}</span> items
    </p>
  );
}

function ListItemRow({ item }) {
  return (
    <Link to={item.links.href} className={styles.dataItem}>
      {item.label}
    </Link>
  );
}

// possible use case for Selector in input and for fitltering
// function AssetSelector() {
//   return (
//     <div id="AssetSelector" className={styles.AssetSelector}>
//       {!asset.assets ? <LoadingSpinner /> : null}
//       {asset.assets && (
//         <Selector>
//           <Selector.Header>
//             <Inputs.StatelessSelect
//               value={selectedType}
//               onChange={handleTypeChange}
//               label="select type"
//               name="asset-manager-select"
//             >
//               {!selectedType && <option>Choose...</option>}
//               {asset.assetTypes.map((assetType) => (
//                 <option key={assetType.id} value={assetType.id}>
//                   {assetType.label}
//                 </option>
//               ))}
//               <option value="add">+ add asset type</option>
//             </Inputs.StatelessSelect>
//           </Selector.Header>
//           <Selector.List>
//             {asset.assets.map((item) => (
//               <ListItemRow key={item.id} item={item} />
//             ))}
//           </Selector.List>
//         </Selector>
//       )}
//     </div>
//   );
// }
