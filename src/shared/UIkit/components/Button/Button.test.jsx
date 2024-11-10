import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "src/components/Button";
import "@testing-library/jest-dom/vitest";

describe("Button", () => {
  it("should render proper label", () => {
    render(<Button label="Button" />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument;
    expect(button).toHaveTextContent(/button/i);
  });

  it("should be disabled when corresponding prop is passed", () => {
    render(<Button label="Input" disabled={true} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument;
    expect(button).toBeDisabled();
  });
});
