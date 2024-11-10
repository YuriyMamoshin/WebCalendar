import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Checkbox from "src/components/Checkbox";
import "@testing-library/jest-dom/vitest";

describe("Checkbox", () => {
  it("should not be checked by default and render proper label", () => {
    render(<Checkbox label="Check me" />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument;
    expect(checkbox).not.toBeChecked();

    const label = screen.getByTestId("label");
    expect(label).toHaveTextContent(/check/i);
  });
});
