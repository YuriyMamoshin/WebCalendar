import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Textarea from "src/components/Textarea";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Textarea", () => {
  it("should render proper label", () => {
    render(<Textarea label="Textarea" />);

    const label = screen.getByTestId("label");

    expect(label).toBeInTheDocument;
    expect(label).toHaveTextContent(/area/i);
  });

  it("should have correct value after typing", async () => {
    render(<Textarea label="Textarea" />);

    const area = screen.getByTestId("textarea");

    expect(area).toBeInTheDocument;

    const user = userEvent.setup();
    await user.type(area, "Lorem ipsum fish dog cat bat pet");

    expect(area).toHaveValue("Lorem ipsum fish dog cat bat pet");
  });
});
