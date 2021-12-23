import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocationTree from "./LocationTree";

describe("LocationTree", () => {
  it("renders LocationTree component", () => {
    render(<LocationTree />);
    screen.debug();
  });
});
