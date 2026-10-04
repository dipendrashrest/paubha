import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

function BasicToggleGroup(props: { onValueChange?: (value: string) => void }) {
  return (
    <ToggleGroup defaultValue="day" onValueChange={props.onValueChange}>
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month" disabled>
        Month
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

describe("ToggleGroup", () => {
  it("renders a radiogroup with three radio items", () => {
    render(<BasicToggleGroup />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("marks the default item as checked", () => {
    render(<BasicToggleGroup />);
    expect(screen.getByRole("radio", { name: "Day" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("switches selection on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicToggleGroup onValueChange={onValueChange} />);
    await user.click(screen.getByRole("radio", { name: "Week" }));
    expect(onValueChange).toHaveBeenCalledWith("week");
  });

  it("navigates between items with arrow keys", async () => {
    const user = userEvent.setup();
    render(<BasicToggleGroup />);
    screen.getByRole("radio", { name: "Day" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "Week" })).toHaveFocus();
  });

  it("disables an item", () => {
    render(<BasicToggleGroup />);
    expect(screen.getByRole("radio", { name: "Month" })).toBeDisabled();
  });

  it("shows the focus-visible glow-focus shadow class on items", () => {
    render(<BasicToggleGroup />);
    expect(screen.getByRole("radio", { name: "Day" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("has hover/active feedback classes on unchecked items", () => {
    render(<BasicToggleGroup />);
    expect(screen.getByRole("radio", { name: "Week" })).toHaveClass(
      "data-[state=unchecked]:hover:bg-bg-secondary-hover",
      "data-[state=unchecked]:active:bg-bg-tertiary-hover",
    );
  });

  it("propagates size from the group to items via context", () => {
    render(
      <ToggleGroup defaultValue="a" size="lg">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("radio", { name: "A" })).toHaveClass("text-ui-lg");
  });

  it("forwards a ref to the underlying item element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <ToggleGroup defaultValue="a">
        <ToggleGroupItem ref={ref} value="a">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it.each([
    ["sm", "h-6", "px-3", "text-ui-xs"],
    ["md", "h-8", "px-4", "text-ui-md"],
    ["lg", "h-10", "px-5", "text-ui-lg"],
  ] as const)("applies Figma %s item metrics", (size, h, px, text) => {
    render(
      <ToggleGroup defaultValue="a" size={size}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole("radio", { name: "A" })).toHaveClass(h, px, text);
  });

  it("styles the track per Figma (bg-secondary, 4px padding, 2px gap, radius-md)", () => {
    render(<BasicToggleGroup />);
    expect(screen.getByRole("radiogroup")).toHaveClass(
      "bg-bg-secondary",
      "p-1",
      "gap-0.5",
      "rounded-md",
    );
  });

  it("supports controlled value", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = React.useState("day");
      return (
        <ToggleGroup value={value} onValueChange={setValue}>
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
        </ToggleGroup>
      );
    }
    render(<Controlled />);
    await user.click(screen.getByRole("radio", { name: "Week" }));
    expect(screen.getByRole("radio", { name: "Week" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("has no axe violations", async () => {
    const { container } = render(<BasicToggleGroup />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it.each(["sm", "md", "lg"] as const)(
    "has no axe violations at size %s with a labelled, fully disabled group",
    async (size) => {
      const { container } = render(
        <ToggleGroup aria-label="Range" defaultValue="a" size={size} disabled>
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
        </ToggleGroup>,
      );
      expect(await axe(container)).toHaveNoViolations();
    },
  );
});
