import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AssetManager from "screens/AssetManager";

import Auth from "screens/Auth";
import Welcome from "screens/Welcome";

export default function PublicRouterConfig() {
  return (
    // <BrowserRouter>
    <Routes>
      {/* <Route
        path="/sign-in"
        render={(props) => <Auth {...props} mode="login" />}
      />
      <Route
        path="/create-account"
        render={(props) => <Auth {...props} mode="register" />}
      /> */}
      <Route path="/" element={<Welcome />} />
      <Route path="authorization">
        <Route path="sign-in" element={<Auth mode="login" />} />
        <Route path="create-account" element={<Auth mode="register" />} />
      </Route>
    </Routes>
    // </BrowserRouter>
  );
}
