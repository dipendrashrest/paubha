import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "../../lib/test-axe";
import { Toast, ToastProvider, useToast } from "./toast";

describe("Toast", () => {
  it("renders with role=alert and the given title/description", () => {
    render(<Toast title="Saved" description="Your changes were saved." />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Saved");
    expect(alert).toHaveTextContent("Your changes were saved.");
  });

  it("uses aria-live=polite for info and success variants", () => {
    const { rerender } = render(<Toast variant="info" title="Info" />);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "polite");

    rerender(<Toast variant="success" title="Success" />);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "polite");
  });

  it("uses aria-live=assertive for warning and error variants", () => {
    const { rerender } = render(<Toast variant="warning" title="Warning" />);
    expect(screen.getByRole("alert")).toHaveAttribute(
      "aria-live",
      "assertive",
    );

    rerender(<Toast variant="error" title="Error" />);
    expect(screen.getByRole("alert")).toHaveAttribute(
      "aria-live",
      "assertive",
    );
  });

  it("does not render a dismiss button without onDismiss", () => {
    render(<Toast title="Saved" />);
    expect(
      screen.queryByRole("button", { name: "Dismiss" }),
    ).not.toBeInTheDocument();
  });

  it("calls onDismiss when the close button is activated", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Toast title="Saved" onDismiss={onDismiss} />);
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("forwards a ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Toast ref={ref} title="Saved" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations across variants", async () => {
    const { container, rerender } = render(
      <Toast variant="info" title="Info" description="An info toast." />,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <Toast
        variant="error"
        title="Error"
        description="An error toast."
        onDismiss={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

function ToastLauncher() {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast({ title: "Saved!" })}>
      Save
    </button>
  );
}

describe("ToastProvider / useToast", () => {
  it("throws when useToast is called outside a ToastProvider", () => {
    function Broken() {
      useToast();
      return null;
    }
    expect(() => render(<Broken />)).toThrow(
      "useToast must be used within a <ToastProvider>",
    );
  });

  it("shows a toast when toast() is called, and auto-dismisses it after duration", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider duration={50}>
        <ToastLauncher />
      </ToastProvider>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Saved!");

    await waitFor(
      () => expect(screen.queryByRole("alert")).not.toBeInTheDocument(),
      { timeout: 1000 },
    );
  });

  it("does not auto-dismiss when duration is 0", async () => {
    function ZeroDurationLauncher() {
      const { toast } = useToast();
      return (
        <button
          type="button"
          onClick={() => toast({ title: "Persistent", duration: 0 })}
        >
          Save
        </button>
      );
    }
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ZeroDurationLauncher />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
