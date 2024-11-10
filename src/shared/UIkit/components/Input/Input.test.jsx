import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "src/components/Input";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Input", () => {
  it("should render proper label", () => {
    render(<Input label="Input" />);

    const label = screen.getByTestId("label");

    expect(label).toBeInTheDocument;
    expect(label).toHaveTextContent(/input/i);
  });

  it("should have correct value after typing", async () => {
    render(<Input label="Input" />);

    const input = screen.getByTestId("input");

    const user = userEvent.setup();
    await user.type(input, "Lorem ipsum fish dog cat bat pet");

    expect(input).toBeInTheDocument;
    expect(input).toHaveValue("Lorem ipsum fish dog cat bat pet");
  });

  it("should not have error by dafault", () => {
    render(<Input label="Input" />);

    const error = screen.queryByTestId("error");

    expect(error).not.toBeInTheDocument();
  });

  it("should have error when prop error passed", () => {
    render(<Input label="Input" error={true} />);

    const error = screen.getByTestId("error");

    expect(error).toBeInTheDocument();
  });

  it("should be disabled when corresponding prop is passed", () => {
    render(<Input label="Input" disabled={true} />);

    const input = screen.getByTestId("input");

    expect(input).toBeInTheDocument;
    expect(input).toBeDisabled();
  });
});
