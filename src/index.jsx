import React from "react";
import { createRoot } from 'react-dom/client';

import App from "./App";
import AppProviders from "./context";

import "react-datepicker/dist/react-datepicker.css";
import "./utils/fontawesome";
import "./styles/main.scss";

const domNode = document.getElementById("life-manager");
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);

