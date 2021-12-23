import { Switch, Route } from "react-router-dom";

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

export default function RouterConfig() {
  return (
    <Switch>
      <ControlledRoute path="/assets/:assetId" component={AssetScreen} />
      <ControlledRoute path="/assets" component={AssetManager} />
      <ControlledRoute path="/inventory/asset-types" component={AssetType} />
      <ControlledRoute
        path="/inventory/asset/:assetId"
        component={AssetScreen}
      />
      <ControlledRoute path="/inventory" component={Inventory} />
      <ControlledRoute path="assets/asset-types" component={AssetType} />
      <ControlledRoute exact path="/aspects" component={AspectManager} />
      <ControlledRoute path="/aspects/tasks/" component={AspectManager} />
      <ControlledRoute path="/overview" exact component={Dashboard} />
      <ControlledRoute exact path="/household" component={HomeManager} />
      <ControlledRoute exact path="/meals" component={MealManager} />
      <ControlledRoute exact path="/user" component={User} />
      <ControlledRoute exact path="/" component={Gate} />
      <Route path="/" component={NotFound} />
    </Switch>
  );
}
