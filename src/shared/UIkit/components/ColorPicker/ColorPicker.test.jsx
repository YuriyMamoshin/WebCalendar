import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import ColorPicker from "src/components/ColorPicker";
import "@testing-library/jest-dom/vitest";

describe("ColorPicker", () => {
  it("should render proper label", () => {
    const testingColors = ["#9F2957", "#D90056"];
    render(<ColorPicker label="Pick the color" colors={testingColors} />);

    const picker = screen.getByTestId("color-picker");

    expect(picker).toBeInTheDocument;
    expect(picker).toHaveTextContent(/color/i);
  });

  it("should render correct colors", () => {
    const testingColors = ["#9F2957", "#D90056"];

    render(<ColorPicker label="Pick the color" colors={testingColors} />);

    const colors = screen.getAllByRole("radio");
    expect(colors).toHaveLength(2);
    testingColors.forEach((color, index) => {
      expect(colors[index]).toHaveAttribute("value", color);
    });
  });
});
