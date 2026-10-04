import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Button } from "../button/button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Save changes</Button>);
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });

  it("forwards a ref to the underlying <button>", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges a custom className without dropping variant classes", () => {
    render(<Button className="mt-4">Click</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("mt-4");
    expect(button).toHaveClass("bg-bg-brand-solid");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("activates on Enter and Space when focused", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    await user.keyboard("{ }");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("shows the focus-visible glow-focus shadow class", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("disables the button and blocks clicks when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("disables interaction and announces aria-busy while loading", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a leadingIcon slot sized to the button's size", () => {
    render(
      <Button leadingIcon={<svg data-testid="icon" />} size="lg">
        Continue
      </Button>,
    );
    expect(screen.getByTestId("icon")).toHaveClass("size-5");
  });

  it("scales the icon slot per size: sm 16px, md/lg 20px, xl/2xl 24px (Figma canvas 2120:2)", () => {
    const expectations: Array<
      [NonNullable<React.ComponentProps<typeof Button>["size"]>, string]
    > = [
      ["sm", "size-4"],
      ["md", "size-5"],
      ["lg", "size-5"],
      ["xl", "size-6"],
      ["2xl", "size-6"],
    ];
    for (const [size, expectedClass] of expectations) {
      const { unmount } = render(
        <Button leadingIcon={<svg data-testid="icon" />} size={size}>
          Continue
        </Button>,
      );
      expect(screen.getByTestId("icon")).toHaveClass(expectedClass);
      unmount();
    }
  });

  it("secondary variant darkens its border on hover/active and switches to border-brand on focus", () => {
    render(<Button variant="secondary">Click</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-border-default");
    expect(button).toHaveClass("hover:border-border-strong");
    expect(button).toHaveClass("active:border-border-strong");
    expect(button).toHaveClass("focus-visible:border-border-brand");
  });

  it("renders the 2xl size at 64px with 32px padding", () => {
    render(<Button size="2xl">Click</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-16", "px-8", "gap-3", "text-ui-lg");
  });

  it("tertiary variant is transparent with tertiary-hover fill", () => {
    render(<Button variant="tertiary">Click</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-transparent", "text-fg-primary");
    expect(button).toHaveClass("hover:bg-bg-tertiary-hover");
    expect(button).toHaveClass("active:bg-bg-tertiary");
  });

  it("link variant keeps fg-brand without an underline", () => {
    render(<Button variant="link">Click</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-fg-brand");
    expect(button.className).not.toMatch(/underline/);
  });

  it("primary destructive uses error-solid fills and the error focus ring", () => {
    render(<Button destructive>Delete</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "bg-bg-error-solid",
      "text-fg-on-error",
      "hover:bg-bg-error-solid-hover",
      "active:bg-bg-error-solid-active",
      "focus-visible:shadow-[var(--shadow-glow-focus-error)]",
    );
    expect(button).not.toHaveClass("bg-bg-brand-solid");
    expect(button).not.toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("secondary destructive uses border-error, fg-error and error-subtle hover", () => {
    render(
      <Button variant="secondary" destructive>
        Delete
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "border-border-error",
      "bg-bg-primary",
      "text-fg-error",
      "hover:bg-bg-error-subtle",
      "active:bg-bg-error-subtle",
      "focus-visible:shadow-[var(--shadow-glow-focus-error)]",
    );
    expect(button).not.toHaveClass("text-fg-primary");
  });

  it.each(["tertiary", "link"] as const)(
    "%s destructive uses fg-error and error-subtle hover",
    (variant) => {
      render(
        <Button variant={variant} destructive>
          Delete
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "text-fg-error",
        "hover:bg-bg-error-subtle",
        "focus-visible:shadow-[var(--shadow-glow-focus-error)]",
      );
    },
  );

  it("has no axe violations across default, disabled, and loading states", async () => {
    const { container, rerender } = render(<Button>Default</Button>);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Button disabled>Disabled</Button>);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Button loading>Loading</Button>);
    expect(await axe(container)).toHaveNoViolations();

    for (const variant of [
      "primary",
      "secondary",
      "tertiary",
      "link",
    ] as const) {
      rerender(
        <Button variant={variant} destructive>
          Delete
        </Button>,
      );
      expect(await axe(container)).toHaveNoViolations();
    }
  });
});
