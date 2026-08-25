import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

function BasicSelect(props: {
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
}) {
  return (
    <Select onValueChange={props.onValueChange}>
      <SelectTrigger
        aria-label="Framework"
        disabled={props.disabled}
        error={props.error}
      >
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue" disabled>
          Vue
        </SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders a combobox with the placeholder text", () => {
    render(<BasicSelect />);
    expect(
      screen.getByRole("combobox", { name: "Framework" }),
    ).toHaveTextContent("Select a framework");
  });

  it("opens the listbox and shows options on trigger click", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole("combobox", { name: "Framework" }));
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
  });

  it("selects an option and calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicSelect onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox", { name: "Framework" }));
    await user.click(await screen.findByRole("option", { name: "React" }));
    expect(onValueChange).toHaveBeenCalledWith("react");
    await waitFor(() =>
      expect(
        screen.getByRole("combobox", { name: "Framework" }),
      ).toHaveTextContent("React"),
    );
  });

  it("marks a disabled option as such", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole("combobox", { name: "Framework" }));
    expect(await screen.findByRole("option", { name: "Vue" })).toHaveAttribute(
      "data-disabled",
    );
  });

  it("disables the trigger when disabled is set", () => {
    render(<BasicSelect disabled />);
    expect(screen.getByRole("combobox", { name: "Framework" })).toBeDisabled();
  });

  it("sets aria-invalid on the trigger when error is set", () => {
    render(<BasicSelect error />);
    expect(
      screen.getByRole("combobox", { name: "Framework" }),
    ).toHaveAttribute("aria-invalid", "true");
  });

  it("closes the listbox on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole("combobox", { name: "Framework" }));
    await screen.findByRole("listbox");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
    );
  });

  it("forwards a ref to the trigger element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Select>
        <SelectTrigger ref={ref} aria-label="Framework">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicSelect />);
    await user.click(screen.getByRole("combobox", { name: "Framework" }));
    await screen.findByRole("listbox");
    expect(await axe(container)).toHaveNoViolations();
  });
});
