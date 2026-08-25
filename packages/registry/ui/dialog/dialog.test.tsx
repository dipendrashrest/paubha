import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  Dialog,
  DialogAction,
  DialogActions,
  DialogBody,
  DialogCancel,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

function BasicDialog(props: { onConfirm?: () => void }) {
  return (
    <Dialog>
      <DialogTrigger>Delete item</DialogTrigger>
      <DialogContent>
        <DialogBody>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogBody>
        <DialogActions>
          <DialogCancel>Cancel</DialogCancel>
          <DialogAction variant="error" onClick={props.onConfirm}>
            Delete
          </DialogAction>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("is closed until the trigger is activated", () => {
    render(<BasicDialog />);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click with role=alertdialog", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    expect(await screen.findByRole("alertdialog")).toBeInTheDocument();
  });

  it("links the title via aria-labelledby", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("alertdialog");
    const title = screen.getByText("Delete Item");
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
  });

  it("links the description via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("alertdialog");
    const description = screen.getByText("This action cannot be undone.");
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
  });

  it("closes when Cancel is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("alertdialog");
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("alertdialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  });

  it("does not close on an outside click, unlike a plain Modal", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("alertdialog");
    const overlay = document.querySelector(".fixed.inset-0.z-50");
    expect(overlay).not.toBeNull();
    fireEvent.pointerDown(overlay as Element);
    fireEvent.click(overlay as Element);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("calls the action button's onClick and closes the dialog", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<BasicDialog onConfirm={onConfirm} />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
    );
  });

  it("applies the error color classes when variant=error", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "bg-bg-error-solid",
    );
  });

  it("shows the focus-visible glow-focus shadow class on Cancel and Action", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("forwards a ref to the content element", async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Dialog open>
        <DialogContent ref={ref}>
          <DialogTitle>Delete Item</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await waitFor(() => expect(ref.current).toBeInstanceOf(HTMLDivElement));
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicDialog />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("alertdialog");
    expect(await axe(container)).toHaveNoViolations();
  });
});
