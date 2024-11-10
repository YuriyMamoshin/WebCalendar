import * as React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Link from "src/components/Link";
import "@testing-library/jest-dom/vitest";

describe("Link", () => {
  it("should render proper label and have a href attribute when is not disabled", () => {
    render(<Link label="Link" reference="https://www.google.com/" />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument;
    expect(link).toHaveTextContent(/link/i);
    expect(link).toHaveAttribute("href");
  });

  it("shouldn't have a href attribute when is disabled", () => {
    render(
      <Link label="Link" disabled={true} reference="https://www.google.com/" />
    );

    const link = screen.getByText("Link");

    expect(link).toBeInTheDocument;
    expect(link).not.toHaveAttribute("href");
  });
});
