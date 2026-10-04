import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function BasicMenu(props: {
  onSelectEdit?: () => void;
  onSelectDelete?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={props.onSelectEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
        <DropdownMenuItem destructive onSelect={props.onSelectDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("is closed until the trigger is activated", () => {
    render(<BasicMenu />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu with its items on trigger click", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "Delete" }),
    ).toBeInTheDocument();
  });

  it("selects an item via click and calls its onSelect handler", async () => {
    const user = userEvent.setup();
    const onSelectEdit = vi.fn();
    render(<BasicMenu onSelectEdit={onSelectEdit} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onSelectEdit).toHaveBeenCalledTimes(1);
  });

  it("marks an item disabled and skips it on selection", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const disabledItem = await screen.findByRole("menuitem", {
      name: "Duplicate",
    });
    expect(disabledItem).toHaveAttribute("data-disabled");
  });

  it("closes the menu on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });

  it("calls onSelect when a destructive item is chosen", async () => {
    const user = userEvent.setup();
    const onSelectDelete = vi.fn();
    render(<BasicMenu onSelectDelete={onSelectDelete} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onSelectDelete).toHaveBeenCalledTimes(1);
  });

  it("forwards a ref to the content element", async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent ref={ref}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await waitFor(() => expect(ref.current).toBeInstanceOf(HTMLDivElement));
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await screen.findByRole("menu");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives the panel the confirmed radius/md token", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await screen.findByRole("menu")).toHaveClass("rounded-md");
  });

  it("gives a default item the brand-tinted active (pressed) treatment", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const item = await screen.findByRole("menuitem", { name: "Edit" });
    expect(item).toHaveClass(
      "active:bg-bg-brand-subtle",
      "active:text-fg-brand",
    );
  });

  it("gives a destructive item error-tinted active treatment instead of brand", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const item = await screen.findByRole("menuitem", { name: "Delete" });
    expect(item).toHaveClass(
      "active:bg-bg-error-subtle",
      "active:text-fg-error",
    );
  });

  it("layers the portalled panel on --z-popover so it sits above dialogs", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await screen.findByRole("menu")).toHaveClass("z-(--z-popover)");
  });

  it("uses the Figma 13/18 ui-sm label and focus treatment on items", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const item = await screen.findByRole("menuitem", { name: "Edit" });
    expect(item).toHaveClass(
      "text-ui-sm",
      "data-[highlighted]:bg-bg-secondary-hover",
      "data-[highlighted]:focus-visible:bg-bg-secondary",
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("swaps every fill to error-tinted for destructive items", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const item = await screen.findByRole("menuitem", { name: "Delete" });
    expect(item).toHaveClass(
      "data-[highlighted]:focus-visible:bg-bg-error-subtle",
      "data-[highlighted]:active:bg-bg-error-subtle",
    );
    expect(item).not.toHaveClass(
      "data-[highlighted]:focus-visible:bg-bg-secondary",
      "data-[highlighted]:active:bg-bg-brand-subtle",
    );
  });

  it("moves the highlight with arrow keys and skips disabled items", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);
    screen.getByRole("button", { name: "Open menu" }).focus();
    await user.keyboard("{Enter}");
    const edit = await screen.findByRole("menuitem", { name: "Edit" });
    await waitFor(() => expect(edit).toHaveFocus());
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
  });

  it("renders the shortcut in the tertiary ui-xs style", async () => {
    render(
      <DropdownMenu open>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem shortcut="⌘K">Edit file</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(await screen.findByText("⌘K")).toHaveClass(
      "text-ui-xs",
      "font-medium",
      "text-fg-tertiary",
    );
  });

  it("has no axe violations with a destructive item highlighted via keyboard", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicMenu />);
    screen.getByRole("button", { name: "Open menu" }).focus();
    await user.keyboard("{Enter}");
    await screen.findByRole("menu");
    await user.keyboard("{ArrowDown}");
    expect(await axe(container)).toHaveNoViolations();
  });
});
