import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

function BasicAccordion(props: { type?: "single" | "multiple" }) {
  return (
    <Accordion type={props.type ?? "single"} collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>First content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>Second content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" disabled>
        <AccordionTrigger>Disabled section</AccordionTrigger>
        <AccordionContent>Disabled content</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("renders three headers as buttons with aria-expanded", () => {
    render(<BasicAccordion />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
  });

  it("shows the default-open panel content as a region", () => {
    render(<BasicAccordion />);
    expect(screen.getByRole("region")).toHaveTextContent("First content");
  });

  it("toggles a section open on click", async () => {
    const user = userEvent.setup();
    render(<BasicAccordion />);
    await user.click(screen.getByRole("button", { name: "Second section" }));
    expect(
      screen.getByRole("button", { name: "Second section" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("navigates between headers with arrow keys", async () => {
    const user = userEvent.setup();
    render(<BasicAccordion />);
    screen.getByRole("button", { name: "First section" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("button", { name: "Second section" })).toHaveFocus();
  });

  it("natively disables a disabled item's header button", () => {
    render(<BasicAccordion />);
    expect(
      screen.getByRole("button", { name: "Disabled section" }),
    ).toBeDisabled();
  });

  it("shows the focus-visible glow-focus shadow class on triggers", () => {
    render(<BasicAccordion />);
    expect(screen.getByRole("button", { name: "First section" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("forwards a ref to the underlying trigger button", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger ref={ref}>A</AccordionTrigger>
          <AccordionContent>A content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has no axe violations", async () => {
    const { container } = render(<BasicAccordion />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
