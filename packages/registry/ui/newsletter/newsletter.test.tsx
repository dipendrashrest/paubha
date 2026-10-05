import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Newsletter } from "./newsletter";

describe("Newsletter", () => {
  it("submits email", async () => {
    const user = userEvent.setup();
    const onSubscribe = vi.fn();
    render(<Newsletter onSubscribe={onSubscribe} />);
    await user.type(screen.getByLabelText("Email"), "a@b.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(onSubscribe).toHaveBeenCalledWith("a@b.com");
    expect(screen.getByText("You’re subscribed.")).toBeInTheDocument();
  });

  it("shows an error and does not submit an invalid email", async () => {
    const user = userEvent.setup();
    const onSubscribe = vi.fn();
    const { container } = render(<Newsletter onSubscribe={onSubscribe} />);
    const input = screen.getByLabelText("Email");
    await user.type(input, "maya@example");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(onSubscribe).not.toHaveBeenCalled();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email address.");
    expect(await axe(container)).toHaveNoViolations();
    await user.type(input, ".com");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Newsletter />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
