import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverContentV2,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  PopoverV2,
} from "./popover";

function BasicPopover() {
  return (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Popover Title</PopoverTitle>
        <PopoverDescription>
          This is a popover content area.
        </PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("is closed until the trigger is activated", () => {
    render(<BasicPopover />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click and shows its content", async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    expect(await screen.findByRole("dialog")).toHaveTextContent(
      "Popover Title",
    );
  });

  it("sets aria-expanded on the trigger to reflect open state", async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    const trigger = screen.getByRole("button", { name: "Open popover" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    await waitFor(() =>
      expect(trigger).toHaveAttribute("aria-expanded", "true"),
    );
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    const trigger = screen.getByRole("button", { name: "Open popover" });
    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });

  it("closes when PopoverClose is activated", async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("forwards a ref to the content element", async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Popover open>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent ref={ref}>
          <PopoverTitle>Title</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );
    await waitFor(() => expect(ref.current).toBeInstanceOf(HTMLDivElement));
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicPopover />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    await screen.findByRole("dialog");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("PopoverClose has a focus-visible ring class (real, confirmed gap fixed)", async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    const closeButton = await screen.findByRole("button", { name: "Close" });
    expect(closeButton.className).toContain(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("supports the documented side prop via Radix pass-through", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent side="left">
          <PopoverTitle>Left-side content</PopoverTitle>
        </PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    expect(await screen.findByRole("dialog")).toHaveAttribute(
      "data-side",
      "left",
    );
  });
});

function BasicPopoverV2(props: { disabled?: boolean }) {
  return (
    <PopoverV2>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContentV2 disabled={props.disabled}>
        <PopoverTitle>Popover Title</PopoverTitle>
        <PopoverDescription>
          This is a popover content area.
        </PopoverDescription>
        <PopoverClose>Close</PopoverClose>
      </PopoverContentV2>
    </PopoverV2>
  );
}

describe("PopoverV2 (restrained)", () => {
  it("opens on trigger click and shows its content", async () => {
    const user = userEvent.setup();
    render(<BasicPopoverV2 />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    expect(await screen.findByRole("dialog")).toHaveTextContent(
      "Popover Title",
    );
  });

  it("marks the panel data-disabled to match Figma's confirmed dimmed disabled state", async () => {
    const user = userEvent.setup();
    render(<BasicPopoverV2 disabled />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("data-disabled");
    expect(dialog.className).toContain("data-[disabled]:opacity-50");
  });

  it("does not set data-disabled by default", async () => {
    const user = userEvent.setup();
    render(<BasicPopoverV2 />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    expect(await screen.findByRole("dialog")).not.toHaveAttribute(
      "data-disabled",
    );
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicPopoverV2 />);
    await user.click(screen.getByRole("button", { name: "Open popover" }));
    await screen.findByRole("dialog");
    expect(await axe(container)).toHaveNoViolations();
  });
});
