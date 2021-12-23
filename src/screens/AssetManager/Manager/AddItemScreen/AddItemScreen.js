import * as React from "react";
import { useHistory } from "react-router";

import { useAsset } from "../../useAssets";

import Background from "components/common/Background";
import Button from "components/common/Button";
import Form from "components/common/Form";
import * as Inputs from "components/common/Input";
import MaxWidthContainer from "components/common/MaxWidthContainer";

import styles from "./add-item-screen.module.scss";

export default function AddItemScreen() {
  const [initialValue, setInitialValue] = React.useState("");
  const asset = useAsset();
  const history = useHistory();

  const handleSubmit = async (event) => {
    const newAsset = await asset.handleSubmit(event);
    console.log("newAsset: ", newAsset);
    history.push(newAsset.links.href);
  };

  return (
    <section className={styles.AddItemScreen}>
      <Background x={0} y={-200} size={2} />
      <MaxWidthContainer>
        <Form name="add-asset" handleSubmit={handleSubmit} dataId={asset?.id}>
          <Form.Header title="Add Item"></Form.Header>
          <Form.Body>
            <Inputs.FullScreen name="label" initialValue={initialValue} />
          </Form.Body>
          <Form.Footer>
            <Button
              type="button"
              onClick={() => asset.setShowAddItemScreen(false)}
            >
              cancel
            </Button>
            <Button type="submit">Save</Button>
          </Form.Footer>
        </Form>
      </MaxWidthContainer>
    </section>
  );
}
