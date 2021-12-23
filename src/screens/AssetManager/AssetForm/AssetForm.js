import * as React from "react";
import { useHistory } from "react-router";

import Button from "components/common/Button/Button";
// import ErrorMessage from '../../common/ErrorMessage';
import Form from "components/common/Form";
// import { PageHeader } from "components/Header";
import Tabs from "components/common/Tabs";

import * as Inputs from "components/common/Input";
import LocationSelector from "./LocationSelector";

import { useAsset } from "../useAssets";

import styles from "./asset-form.module.scss";

// function isEmpty(obj) {
//   for (var key in obj) {
//     if (obj.hasOwnProperty(key)) return false;
//   }
//   return true;
// }

function AssetTypeSelector({
  name,
  initialValue = "",
  label,
  options = [],
  placeholder,
}) {
  const [value, setValue] = React.useState(initialValue);
  const [selectedLabel, setSelectedLabel]= React.useState()

  const handleOnChange = (e) => {
    console.log(".dataset.value: ", e.target.dataset.value);
    setValue(e.target.dataset.value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div name="select" className={styles.AssetTypeSelector}>
      <label htmlFor={name}> {label} </label>
      <input type="text" name={name} value={value}></input>
      <div>
        <ul>
          {options.map((option) => {
            return (
              <li
                key={option.id}
                data-value={option.id}
                label={option.name}
                onClick={handleOnChange}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function AssetForm({
  asset = {
    label: "",
    typeId: "",
    description: "",
    locationId: "",
  },
  editMode,
  name,
  handleSubmit,
}) {
  const assetHook = useAsset();
  // const [item, setItem] = React.useState(selectedAsset || defaultItem);
  const history = useHistory();

  // const handleInputChange = (event) => {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.type === "checkbox" ? target.checked : target.value;

  //   setItem({
  //     ...item,
  //     [name]: value,
  //   });
  // };

  // const handleCheckBoxChange = (event) => {
  //   const { item } = this.state;
  //   const newSelection = event.target.value;
  //   let newSelectionArray;

  //   if (item.isContainer.indexOf(newSelection) > -1) {
  //     newSelectionArray = item.isContainer.filter((s) => s !== newSelection);
  //   } else {
  //     newSelectionArray = [...item.isContainer, newSelection];
  //   }

  //   this.setState((prevState) => ({
  //     item: { ...prevState.item, isContainer: newSelectionArray },
  //   }));
  // };

  // componentDidMount() {
  //   console.log(`componentDidMount`);
  //   const { item, editMode } = this.props;
  //   if (item && editMode) {
  //     this.setState({ item });
  //   }
  // }

  // return (
  //   const = this.props;
  //   const { item } = this.state;
  //   console.log(`In Mount: ${JSON.stringify(item)}`);

  const [selectedLocationType, setSelectedLocationType] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  let options = [];

  const handleLocationTypeChange = (e) => {
    setSelectedLocationType(e.target.value);
    assetHook.getAssetsByType(e.target.value);
    options = assetHook.assets;
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const initializeLocationTypes = async () => {
    const assetLocation = await assetHook.returnAssetById(
      assetHook.asset.locationId
    );
    setSelectedLocationType(assetLocation.typeId);
    assetHook.getAssetsByType(assetLocation.typeId);
  };

  const filterLocationSelect = (item) => {
    return (
      (item.typeId === selectedLocationType || item.id === selectedLocation) &&
      item.id !== assetHook.asset.id
    );
  };

  React.useEffect(() => {
    if (assetHook.asset.locationId) {
      initializeLocationTypes();
    }
  }, [assetHook.asset.locationId]);

  React.useEffect(() => {
    if (assetHook.asset.locationId) {
      setSelectedLocation(assetHook.asset.locationId);
    }
  }, [assetHook.asset.locationId]);

  return (
    <>
      <Form name={name} handleSubmit={handleSubmit} dataId={asset?.id}>
        <Form.Header title={editMode ? "Edit Item" : "Add Item"}></Form.Header>
        <Form.Body>
          <Inputs.Input
            type="text"
            name="label"
            initialValue={asset?.label}
            label="asset"
            placeholderText="enter asset label"
            focus={false}
          />
          <Inputs.TextArea
            initialValue={asset?.description}
            label="Description"
            rows="6"
            name="description"
            placeholder="Describe the item..."
          />
          <AssetTypeSelector
            label="type"
            name="typeId"
            options={assetHook.assetTypes}
            initialValue={asset?.typeId}
            placeholder="Select the item type..."
          />
          <Inputs.Select
            label="type"
            name="typeId"
            options={assetHook.assetTypes}
            initialValue={asset?.typeId}
            placeholder="Select the item type..."
          />
          <fieldset>
            <Inputs.StatelessSelect
              label="type of location"
              value={selectedLocationType}
              onChange={handleLocationTypeChange}
              name="asset-form-location-type"
            >
              {assetHook.assetTypes.map((assetType) => (
                <option key={assetType.id} value={assetType.id}>
                  {assetType.label}
                </option>
              ))}
            </Inputs.StatelessSelect>
            <Inputs.StatelessSelect
              label="select location"
              value={selectedLocation}
              onChange={handleLocationChange}
              name="locationId"
            >
              {assetHook.assets
                .filter((item) => filterLocationSelect(item))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
            </Inputs.StatelessSelect>
          </fieldset>
          {/* <Inputs.Select
            label="location"
            name="locationId"
            // this needs the correct value
            options={options}
            initialValue={asset?.locationId}
            placeholder="select the location"
          /> */}
        </Form.Body>
        <Form.Footer>
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={() => assetHook.setShowAddItemScreen(false)}
          >
            cancel
          </Button>
        </Form.Footer>
      </Form>
      {/* <LocationSelector asset={asset} /> */}
    </>
  );
}
{
  /* <PageHeader
  onClick={handleCreateUpdateForm}
></PageHeader> */
}
{
  /* <div className={styles.containerLocation}>
  <h6 className={styles.containerLocation__imperative}>
    Choose a Location <em>or</em> a Container
  </h6>
  <Tabs
  activeChild={!isEmpty(item) ? activeChild(item.locationId) : 0}
  >
    <div label="Locations">
      <Select
        label={"Location"}
        name={"locationId"}
        options={assets}
        placeholder={"Select the item location..."}
      />
    </div>
    <div label="Containers">
      <Select
        label={"Container"}
        name={"locationId"}
        options={assetList
          .filter((item) => item.isContainer)
          .map((option) => {
            return {
              id: option.id,
              name: option.name,
              description: option.description,
            };
          })}
        value={item.locationId}
        placeholder={"Select the container..."}
        handleChange={handleInputChange}
      />
    </div>
  </Tabs>
</div> */
}

{
  /*
<Select
  label={"Condition"}
  name={"conditionId"}
  options={optionTables.conditionOptions}
  value={item.conditionId}
  placeholder={"Select the condition of the item..."}
  handleChange={handleInputChange}
/> */
}
{
  /* <Input
      type="checkbox"
      name="isContainer"
      classNames="input-check__container"
      value={item.isContainer}
      handleOnChange={handleInputChange}
      label="Is this a Container?"
    /> */
}
