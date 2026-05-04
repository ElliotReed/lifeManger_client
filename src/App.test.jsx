import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import AppProviders from "./context";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(
      <AppProviders>
        <App />
      </AppProviders>,
      div
    );
  });
});
