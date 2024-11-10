import * as React from "react";
import { it, expect, describe, beforeAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Modal from "src/components/Modal";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Modal", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  const testContent = "Hey, my name is Paul and this thing is between you all";

  it("should render proper message", () => {
    render(<Modal title="Modal" content={testContent} />);

    const modal = screen.getByTestId("dialog");

    expect(modal).toHaveTextContent(testContent);
  });

  it("should be hidden after clicking on button", async () => {
    render(<Modal title="Modal" content={testContent} />);

    const modal = screen.getByTestId("dialog");
    const closeButton = screen.getByTestId("close-button");

    const user = userEvent.setup();
    await user.click(closeButton);

    expect(modal).not.toBeVisible();
  });
});
