import * as React from "react";
import { useNavigate } from "react-router";

import { useAsset } from "../../useAssets";

import Background from "components/common/Background";
import Button, { ButtonGroup } from "components/common/Button";
import Form from "components/common/Form";
import * as Inputs from "components/common/Input";
import MaxWidthContainer from "components/common/MaxWidthContainer";

import styles from "./add-item-screen.module.scss";

export default function AddItemScreen() {
  const [initialValue, setInitialValue] = React.useState("");
  const asset = useAsset();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const newAsset = await asset.handleSubmit(event);
    console.log("newAsset: ", newAsset);
    navigate(newAsset.links.href);
  };

  return (
    <section className={styles.AddItemScreen}>
      <Background x={0} y={-200} size={2} />
      <MaxWidthContainer>
        <Form name="add-asset" handleSubmit={handleSubmit}>
          <Form.Header title="Add Item"></Form.Header>
          <Form.Body>
            <Inputs.FullScreen name="label" initialValue={initialValue} />
          </Form.Body>
          <Form.Footer>
            <ButtonGroup position="end">
              <Button
                type="button"
                onClick={() => asset.setShowAddItemScreen(false)}
              >
                cancel
              </Button>
              <Button type="submit">Save</Button>
            </ButtonGroup>
          </Form.Footer>
        </Form>
      </MaxWidthContainer>
    </section>
  );
}
