import * as React from "react";
import { it, expect, describe, beforeAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Toast from "src/components/Toast";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Toast", () => {
  const testMessage = "Hello";

  it("should not have any messages by default", () => {
    render(<Toast message={testMessage} duration={5} />);

    const container = screen.getByTestId("container");

    expect(container).toBeEmptyDOMElement;
  });

  it("should have message with proper text after click", async () => {
    render(<Toast message={testMessage} duration={5} />);

    const openButton = screen.getByTestId("open-button");

    const user = userEvent.setup();
    await user.click(openButton);
    const container = screen.getByTestId("container");

    expect(container).toHaveTextContent(testMessage);
  });
});
