import * as React from "react";

import AuthForm from "libs/authentication/AuthForm";
import MaxWidthContainer from "components/common/MaxWidthContainer";

import styles from "./auth.module.scss";

const Auth = ({ mode }) => {
  const modeText =
    mode === "login" ? `please sign in to use this app` : "create your account";
  return (
    <div className={styles.Auth}>
      <MaxWidthContainer>
        <p>{modeText}</p>
        <AuthForm mode={mode} />
      </MaxWidthContainer>
    </div>
  );
};

export default Auth;
