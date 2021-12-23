import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import * as Inputs from "components/common/Input";

import styles from "./fieldForm.module.scss";

export default function FieldForm({
  initialValue = "",
  children,
  dataId,
  handleSubmit,
  label = "",
  name,
  placeholder,
  ...rest
}) {
  return (
    <div className={styles.FieldForm}>
      <form data-id={dataId} onSubmit={handleSubmit}>
        <Inputs.InputComponent
          handleSubmit={handleSubmit}
          name={name}
          label={label}
          initialValue={initialValue}
          placeholder={placeholder}
          {...rest}
        />
      </form>
    </div>
  );
}
