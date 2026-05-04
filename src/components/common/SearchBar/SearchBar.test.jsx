import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renders SearchBar component", () => {
    render(<SearchBar />);
    // screen.debug();
  });
});
