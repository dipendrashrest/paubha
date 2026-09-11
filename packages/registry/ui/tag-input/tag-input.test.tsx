import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { TagInput } from "./tag-input";

function ControlledTagInput(props: {
  initial?: string[];
  onTagsChange?: (tags: string[]) => void;
  error?: boolean;
  disabled?: boolean;
}) {
  const [tags, setTags] = React.useState(props.initial ?? []);
  return (
    <TagInput
      tags={tags}
      onTagsChange={(next) => {
        setTags(next);
        props.onTagsChange?.(next);
      }}
      error={props.error}
      disabled={props.disabled}
      aria-label="Tags"
    />
  );
}

describe("TagInput", () => {
  it("renders existing tags with remove buttons", () => {
    render(<ControlledTagInput initial={["React", "Figma"]} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove React" })).toBeInTheDocument();
  });

  it("adds a tag on Enter", async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<ControlledTagInput onTagsChange={onTagsChange} />);
    const input = screen.getByPlaceholderText("Add tag...");
    await user.type(input, "React{Enter}");
    expect(onTagsChange).toHaveBeenLastCalledWith(["React"]);
  });

  it("adds a tag on comma", async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<ControlledTagInput onTagsChange={onTagsChange} />);
    const input = screen.getByPlaceholderText("Add tag...");
    await user.type(input, "React,");
    expect(onTagsChange).toHaveBeenLastCalledWith(["React"]);
  });

  it("does not add a duplicate tag by default", async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<ControlledTagInput initial={["React"]} onTagsChange={onTagsChange} />);
    const input = screen.getByPlaceholderText("Add tag...");
    await user.type(input, "React{Enter}");
    expect(onTagsChange).not.toHaveBeenCalled();
  });

  it("removes the last tag on backspace when the input is empty", async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<ControlledTagInput initial={["React", "Figma"]} onTagsChange={onTagsChange} />);
    const input = screen.getByPlaceholderText("Add tag...");
    await user.click(input);
    await user.keyboard("{Backspace}");
    expect(onTagsChange).toHaveBeenLastCalledWith(["React"]);
  });

  it("removes a specific tag when its remove button is clicked", async () => {
    const user = userEvent.setup();
    const onTagsChange = vi.fn();
    render(<ControlledTagInput initial={["React", "Figma"]} onTagsChange={onTagsChange} />);
    await user.click(screen.getByRole("button", { name: "Remove React" }));
    expect(onTagsChange).toHaveBeenLastCalledWith(["Figma"]);
  });

  it("marks the group aria-disabled and disables the input when disabled", () => {
    render(<ControlledTagInput initial={["React"]} disabled />);
    expect(screen.getByRole("group")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByPlaceholderText("Add tag...")).toBeDisabled();
  });

  it("has no axe violations for default, with tags, and error states", async () => {
    const { container, rerender } = render(<ControlledTagInput />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<ControlledTagInput initial={["React", "Figma"]} />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<ControlledTagInput initial={["React"]} error />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("switches the focus-visible ring to the error-tinted glow when error is set (audit fix)", () => {
    const { container, rerender } = render(<ControlledTagInput initial={["React"]} />);
    const group = screen.getByRole("group");
    expect(group).toHaveClass("has-[input:focus-visible]:shadow-[var(--shadow-glow-focus)]");
    expect(group).not.toHaveClass(
      "has-[input:focus-visible]:shadow-[var(--shadow-glow-focus-error)]",
    );

    rerender(<ControlledTagInput initial={["React"]} error />);
    expect(container.querySelector('[role="group"]')).toHaveClass(
      "has-[input:focus-visible]:shadow-[var(--shadow-glow-focus-error)]",
    );
    expect(container.querySelector('[role="group"]')).not.toHaveClass(
      "has-[input:focus-visible]:shadow-[var(--shadow-glow-focus)]",
    );
  });
});
