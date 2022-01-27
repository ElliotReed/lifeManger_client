import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthForm from "libs/authentication/AuthForm";
import MaxWidthContainer from "components/common/MaxWidthContainer";

import styles from "./auth.module.scss";

const Auth = ({ mode }) => {
  let location = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathnamme || "/";

  function backToOrigin() {
    console.log("from: ", from);
    navigate(from, { replace: true });
  }

  const modeText =
    mode === "login" ? `please sign in to use this app` : "create your account";
  return (
    <div className={styles.Auth}>
      <MaxWidthContainer>
        <p>{modeText}</p>
        <AuthForm mode={mode} backToOrigin={backToOrigin} />
      </MaxWidthContainer>
    </div>
  );
};

export default Auth;
