import React from "react";
import { createRoot } from 'react-dom/client';

import App from "./App";
import AppProviders from "./context";

import "react-datepicker/dist/react-datepicker.css";
import "./utils/fontawesome";
import "styles/main.scss";

import reportWebVitals from "./reportWebVitals";

const domNode = document.getElementById("life-manager");
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
