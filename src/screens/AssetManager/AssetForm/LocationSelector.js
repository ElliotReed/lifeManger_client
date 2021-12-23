import * as React from "react";
import { useAsset } from "../useAssets";

export default function LocationSelector({ asset }) {
  /** "selectedType" here is state variable which will hold the
   * value of currently selected dropdown.
   */
  const Asset = useAsset();
  const [selectedType, setSelectedType] = React.useState("");
  const [assetTypeFilter, setAssetTypeFilter] = React.useState("");

  /** Function that will set different values to state variable
   * based on which dropdown is selectedType
   */
  const changeSelectOptionHandler = (event) => {
    setSelectedType(event.target.value);
  };

  const handleLocationChange = (event) => {};

  /** Different arrays for different dropdowns */
  const algorithm = [
    "Searching Algorithm",
    "Sorting Algorithm",
    "Graph Algorithm",
  ];
  const language = ["C++", "Java", "Python", "C#"];
  const dataStructure = ["Arrays", "LinkedList", "Stack", "Queue"];

  /** Type variable to store different array for different dropdown */
  let type = null;

  /** This will be used to create set of options that user will see */
  let options = null;

  const locationOptions = Asset.assets
    .map((assets) => (
      <option key={assets.id} value={assets.id}>
        {assets.label}
      </option>
    ))
    .filter((location) => location.typeId === selectedType.typeId);

  /** Setting Type variable according to dropdown */
  if (selectedType === "Algorithm") {
    type = algorithm;
  } else if (selectedType === "Language") {
    type = language;
  } else if (selectedType === "Data Structure") {
    type = dataStructure;
  }

  /** If "Type" is null or undefined then options will be null,
   * otherwise it will create a options iterable based on our array
   */
  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }
  return (
    <div
      style={{
        padding: "16px",
        margin: "16px",
      }}
    >
      <form>
        <div>
          {/** Bind changeSelectOptionHandler to onChange method of select.
           * This method will trigger every time different
           * option is selectedType.
           */}
          <label>type</label>
          <select value={selectedType} onChange={changeSelectOptionHandler}>
            <option>Choose...</option>
            {/* <option>Algorithm</option>
            <option>Language</option>
            <option>Data Structure</option> */}
            {Asset.assetTypes.map((assetType) => (
              <option key={assetType.id} value={assetType.id}>
                {assetType.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>location</label>
          <select
            value={Asset.asset.locationId}
            onChange={handleLocationChange}
          >
            {
              /** This is where we have used our options variable */
              (options, locationOptions)
            }
          </select>
        </div>
      </form>
    </div>
  );
}
