import * as React from "react";

import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import MainPageWrapper from "components/common/MainPageWrapper";

// import { Header } from "components/Header";
import style from "./layout.module.scss";

// MobileMenu is deactivated in favor of footer nav
export default function Layout({ children }) {
  const siteTitle = process.env.REACT_APP_SITE_TITLE;
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className={style.siteWrapper}>
      <Header
        siteTitle={siteTitle}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      {/* <Header /> */}
      <MainPageWrapper>
        {children}
        {/* <MobileMenu isActive={isActive} setIsActive={setIsActive} /> */}
      </MainPageWrapper>
      <Footer siteTitle={siteTitle} />
    </div>
  );
}
