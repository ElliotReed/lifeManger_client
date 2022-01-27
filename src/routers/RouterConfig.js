import { Routes, Route, BrowserRouter } from "react-router-dom";

import ControlledRoute from "libs/authentication/ControlledRoute";

import AssetManager from "screens/AssetManager/Manager";
import AssetType from "screens/AssetManager/AssetType";
import AspectManager from "screens/AspectManager";
import Dashboard from "screens/Dashboard";
import Gate from "screens/Gate";
import HomeManager from "screens/HomeManager";
import Inventory from "screens/AssetManager/Inventory";
import AssetScreen from "screens/AssetManager/AssetScreen";
import MealManager from "screens/MealManager";

import NotFound from "screens/NotFound";
import { User } from "screens/User";
import RequireAuth from "libs/authentication/RequireAuth";

import Welcome from "screens/Welcome";
import Auth from "screens/Auth";

export default function RouterConfig() {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="authorization">
        <Route path="sign-in" element={<Auth mode="login" />} />
        <Route path="create-account" element={<Auth mode="register" />} />
      </Route>
      <Route
        path="assets"
        element={
          <RequireAuth>
            <AssetManager />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="assets/:assetId"
        element={
          <RequireAuth>
            <AssetScreen />
          </RequireAuth>
        }
      />
      <Route
        path="aspects"
        element={
          <RequireAuth>
            <AspectManager />
          </RequireAuth>
        }
      />
      <Route
        path="household"
        element={
          <RequireAuth>
            <HomeManager />
          </RequireAuth>
        }
      />
      <Route
        path="meals"
        element={
          <RequireAuth>
            <MealManager />
          </RequireAuth>
        }
      />
      <Route
        path="overview"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route path="inventory/asset-types" element={<AssetType />} />
      <Route path="inventory/asset/:assetId" element={<AssetScreen />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="assets/asset-types" element={<AssetType />} />
      <Route path="aspects/tasks/" element={<AspectManager />} />
      <Route path="user" element={<User />} />
      {/* <Route path="/" element={<Gate />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    // </BrowserRouter>
  );
}
