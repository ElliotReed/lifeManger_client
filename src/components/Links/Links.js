import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Links.module.scss";

export const AssetManagerLink = () => (
  <Link to="/asset">
    <i className="material-icons link__i">style</i>
    <span className="link__seperator">Asset Manager</span>
  </Link>
);
export const AspectManagerLink = () => (
  <Link to="/aspect">
    <FontAwesomeIcon icon="user-cog" />
    <span className="link__seperator">Aspect Manager</span>
  </Link>
);
export const HomeManagerLink = () => (
  <Link to="/housemaintenance">
    <i className="material-icons">spa</i>
    <span className="link__seperator">Home Manager</span>
  </Link>
);
export const MealManagerLink = () => (
  <Link to="/mealplan">
    <FontAwesomeIcon icon="utensils" />
    <span className="link__seperator">Meal Manager</span>
  </Link>
);

export const LifeManagerLink = () => (
  <Link to="/manager">
    <i className="material-icons">alarm</i>
    <span className="link__seperator">
      lifeManager<span>Organize your life!</span>
    </span>
  </Link>
);

export const BackLink = (props) => (
  <Link to={props.to}>
    <i className="material-icons">keyboard_backspace</i>
    <span className="link__seperator">{props.children}</span>
  </Link>
);
