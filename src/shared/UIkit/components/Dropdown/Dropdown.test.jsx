import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Dropdown from "src/components/Dropdown";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Dropdown", () => {
  const testItems = [
    { label: "Day", value: "Day" },
    { label: "Week", value: "Week" },
  ];

  it("should not show dropdown by default", () => {
    render(<Dropdown label="Dropdown" items={testItems} />);

    const dropdown = screen.queryByTestId("dropdown");

    expect(dropdown).not.toBeInTheDocument;
  });

  it("should show dropdown after click", async () => {
    render(<Dropdown label="Dropdown" items={testItems} />);

    const toggle = screen.getByTestId("dropdown-toggle");
    const user = userEvent.setup();
    await user.click(toggle);
    const dropdown = screen.getByTestId("dropdown");

    expect(dropdown).toBeInTheDocument;
  });

  it("should have empty value and placeholder by default", () => {
    render(
      <Dropdown
        label="Dropdown"
        items={testItems}
        placeholder="Select something"
      />
    );

    const output = screen.queryByTestId("output");

    expect(output).not.toHaveValue();
    expect(output).toHaveTextContent(/select/i);
  });
});
