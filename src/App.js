import * as React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import Layout from "components/Layout/Layout";
import RequireAuth from "libs/authentication/RequireAuth";

import Auth from "screens/Auth";
import AssetManager from "screens/AssetManager/Manager";
import AssetScreen from "screens/AssetManager/AssetScreen";
import AssetType from "screens/AssetManager/AssetType";
import AspectManager from "screens/AspectManager";
import Dashboard from "screens/Dashboard";
import HomeManager from "screens/HomeManager";
import Inventory from "screens/AssetManager/Inventory";
import MealManager from "screens/MealManager";
import NotFound from "screens/NotFound";
import { User } from "screens/User";
import Welcome from "screens/Welcome";
import { ColorTest } from "screens/ColorTest";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="color" element={<ColorTest />} />
        <Route path="/" element={<Welcome />} />
        <Route path="authorization">
          <Route path="sign-in" element={<Auth mode="login" />} />
          <Route path="create-account" element={<Auth mode="register" />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="aspects/*" element={<AspectManager />} />
          <Route path="assets" element={<AssetManager />} />
          <Route path="assets/:assetId" element={<AssetScreen />} />
          <Route path="household" element={<HomeManager />} />
          <Route path="meals" element={<MealManager />} />
          <Route path="overview" element={<Dashboard />} />
        </Route>

        <Route path="inventory/asset-types" element={<AssetType />} />
        <Route path="inventory/asset/:assetId" element={<AssetScreen />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="assets/asset-types" element={<AssetType />} />
        <Route path="user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
