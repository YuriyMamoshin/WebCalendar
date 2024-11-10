import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Select from "src/components/Select";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Select", () => {
  const testOptions = [
    { label: "08:30", value: "08:30" },
    { label: "09:00", value: "09:00" },
  ];

  it("should not show dropdown by default", () => {
    render(<Select label="Select" options={testOptions} />);

    const dropdown = screen.queryByTestId("dropdown");

    expect(dropdown).not.toBeInTheDocument();
  });

  it("should show dropdown after click", async () => {
    render(<Select label="Select" options={testOptions} />);
    const toggle = screen.getByTestId("dropdown-toggle");

    const user = userEvent.setup();
    await user.click(toggle);

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  it("should have empty value and placeholder by default", () => {
    render(
      <Select label="Select" options={testOptions} placeholder="Select me" />
    );

    const output = screen.queryByTestId("output");

    expect(output).not.toHaveValue();
    expect(output).toHaveTextContent(/select/i);
  });
});
