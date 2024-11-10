import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Datepicker from "src/components/Datepicker";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Datepicker", () => {
  it("should not show dropdown by default", () => {
    render(<Datepicker />);

    const dropdown = screen.queryByTestId("dropdown");

    expect(dropdown).not.toBeInTheDocument;
  });

  it("should show dropdown after click", async () => {
    render(<Datepicker />);

    const toggle = screen.getByTestId("dropdown-toggle");
    const user = userEvent.setup();
    await user.click(toggle);
    const dropdown = screen.getByTestId("dropdown");

    expect(dropdown).toBeInTheDocument;
  });

  it("should show today by default", () => {
    render(<Datepicker />);

    const today = new Date();
    const formattedToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join(" - ");
    const input = screen.getByTestId("dropdown-toggle");

    expect(input).toHaveValue(formattedToday);
  });
});
