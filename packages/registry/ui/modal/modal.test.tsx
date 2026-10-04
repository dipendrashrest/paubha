import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Button } from "../button/button";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./modal";

function BasicModal(props: { onConfirm?: () => void }) {
  return (
    <Modal>
      <ModalTrigger>Delete item</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete item?</ModalTitle>
          <ModalClose />
        </ModalHeader>
        <ModalBody>
          <ModalDescription>This action cannot be undone.</ModalDescription>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary">Cancel</Button>
          <Button destructive onClick={props.onConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

describe("Modal", () => {
  it("is closed until the trigger is activated", () => {
    render(<BasicModal />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click with role=dialog and aria-modal", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("links the title via aria-labelledby", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("dialog");
    const title = screen.getByText("Delete item?");
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
  });

  it("links the description via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("dialog");
    const description = screen.getByText("This action cannot be undone.");
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
  });

  it("renders a close button with an accessible name", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    expect(
      await screen.findByRole("button", { name: "Close" }),
    ).toBeInTheDocument();
  });

  it("closes when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("calls the confirm button's onClick from within the footer", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(<BasicModal onConfirm={onConfirm} />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("forwards a ref to the content element", async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Modal open>
        <ModalContent ref={ref}>
          <ModalTitle>Delete item?</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    await waitFor(() => expect(ref.current).toBeInstanceOf(HTMLDivElement));
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    await screen.findByRole("dialog");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("falls back to an X icon with aria-label=Close when no children are given", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("renders its own children instead of the fallback icon when given", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <ModalTrigger>Open</ModalTrigger>
        <ModalContent>
          <ModalTitle>Delete item?</ModalTitle>
          <ModalClose>Cancel</ModalClose>
        </ModalContent>
      </Modal>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Close" }),
    ).not.toBeInTheDocument();
  });
  it("restores focus to the trigger on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    const trigger = screen.getByRole("button", { name: "Delete item" });
    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("traps Tab focus inside the dialog", async () => {
    const user = userEvent.setup();
    render(<BasicModal />);
    await user.click(screen.getByRole("button", { name: "Delete item" }));
    const dialog = await screen.findByRole("dialog");
    for (let i = 0; i < 5; i++) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it("layers overlay and content on the z-overlay / z-modal tokens", async () => {
    render(
      <Modal open>
        <ModalContent>
          <ModalTitle>Title</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveClass("z-(--z-modal)", "bg-bg-elevated", "rounded-lg");
    const overlay = document.querySelector(".bg-bg-overlay");
    expect(overlay).toHaveClass("z-(--z-overlay)");
  });

  it.each([
    ["sm", "max-w-[400px]"],
    ["md", "max-w-[560px]"],
    ["lg", "max-w-[720px]"],
  ] as const)("size=%s applies %s", async (size, cls) => {
    render(
      <Modal open>
        <ModalContent size={size}>
          <ModalTitle>Title</ModalTitle>
        </ModalContent>
      </Modal>,
    );
    expect(await screen.findByRole("dialog")).toHaveClass(cls);
  });

  it("uses the Figma header/body/footer spacing", async () => {
    render(
      <Modal open>
        <ModalContent>
          <ModalHeader data-testid="h">
            <ModalTitle>Title</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalBody data-testid="b" />
          <ModalFooter data-testid="f" />
        </ModalContent>
      </Modal>,
    );
    expect(await screen.findByTestId("h")).toHaveClass("px-6", "py-4");
    expect(screen.getByTestId("h")).not.toHaveClass("gap-4");
    expect(screen.getByTestId("b")).toHaveClass("px-6", "pt-1", "pb-4");
    expect(screen.getByTestId("f")).toHaveClass("gap-3", "px-6", "py-4");
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it.each(["sm", "lg"] as const)(
    "has no axe violations at size=%s",
    async (size) => {
      const { baseElement } = render(
        <Modal open>
          <ModalContent size={size}>
            <ModalHeader>
              <ModalTitle>Invite teammates</ModalTitle>
              <ModalClose />
            </ModalHeader>
            <ModalBody>
              <ModalDescription>
                Send email invitations to your workspace.
              </ModalDescription>
            </ModalBody>
          </ModalContent>
        </Modal>,
      );
      await screen.findByRole("dialog");
      expect(await axe(baseElement)).toHaveNoViolations();
    },
  );
});
