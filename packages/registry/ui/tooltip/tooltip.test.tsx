import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

function BasicTooltip() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Helpful info</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("is not visible until triggered", () => {
    render(<BasicTooltip />);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows on hover", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Helpful info",
    );
  });

  it("shows on focus", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Helpful info",
    );
  });

  it("dismisses on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
    );
  });

  it("links the trigger to the tooltip content via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    const tooltip = await screen.findByRole("tooltip");
    const trigger = screen.getByText("Hover me");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("forwards a ref to the underlying content element", async () => {
    const ref = React.createRef<HTMLDivElement>();
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent ref={ref}>Helpful info</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.hover(screen.getByText("Hover me"));
    await waitFor(() => expect(ref.current).toBeInstanceOf(HTMLDivElement));
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("renders the arrow at the confirmed Figma dimensions (6x5)", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    const arrowSvg = container.querySelector("svg");
    expect(arrowSvg).toHaveAttribute("width", "6");
    expect(arrowSvg).toHaveAttribute("height", "5");
  });
  it("uses Figma's layering token and opacity-in motion", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);
    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    const content = document.querySelector("[data-side]") as HTMLElement;
    expect(content.className).toContain("z-(--z-tooltip)");
    expect(content.className).toContain("duration-(--duration-fast)");
    expect(content.className).toContain(
      "motion-reduce:duration-(--duration-instant)",
    );
  });

  it("defaults the provider show delay to Figma's 400ms", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Helpful info</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    await user.hover(screen.getByText("Hover me"));
    await new Promise((r) => setTimeout(r, 200));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(
      await screen.findByRole("tooltip", {}, { timeout: 1000 }),
    ).toHaveTextContent("Helpful info");
  });

  it("has no axe violations when opened by keyboard focus", async () => {
    const user = userEvent.setup();
    const { container } = render(<BasicTooltip />);
    await user.tab();
    await screen.findByRole("tooltip");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations while closed", async () => {
    const { container } = render(<BasicTooltip />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
