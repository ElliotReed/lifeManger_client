import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import AppProviders from "./context";

import "react-datepicker/dist/react-datepicker.css";
import "./utils/fontawesome";
import "./styles/main.scss";

import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("life-manager");

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
