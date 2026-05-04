import React from "react";
import styles from "./Form.module.scss";

function FormHeader({ title, children }) {
  return (
    <header className={styles.FormHeader}>
      <h3 className={styles.title}>{title}</h3>
    </header>
  );
}

function FormBody({ children }) {
  return <section className={styles.FormBody}>{children}</section>;
}

function FormFooter({ children }) {
  return <footer className={styles.FormFooter}>{children}</footer>;
}

export default function Form({ handleSubmit, children, name, dataId }) {
  return (
    <form
      name={name}
      className={styles.Form}
      onSubmit={handleSubmit}
      data-id={dataId}
    >
      {children}
    </form>
  );
}

Form.Header = FormHeader;
Form.Body = FormBody;
Form.Footer = FormFooter;
