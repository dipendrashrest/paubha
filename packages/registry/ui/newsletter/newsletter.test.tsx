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

  it("has no axe violations", async () => {
    const { container } = render(<Newsletter />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
