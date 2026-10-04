import { render, screen } from "@testing-library/react";
import { Home } from "lucide-react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  BreadcrumbDropdown,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  Breadcrumbs,
} from "./breadcrumbs";

function BasicTrail() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
      <BreadcrumbItem current>Installation</BreadcrumbItem>
    </Breadcrumbs>
  );
}

describe("Breadcrumbs", () => {
  it("renders a nav with an accessible label of Breadcrumb", () => {
    render(<BasicTrail />);
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });

  it("renders each item as a link, except the current page", () => {
    render(<BasicTrail />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(
      screen.queryByRole("link", { name: "Installation" }),
    ).not.toBeInTheDocument();
  });

  it("marks the current page with aria-current=page", () => {
    render(<BasicTrail />);
    const current = screen.getByText("Installation").closest("li");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders separators that are hidden from assistive technology", () => {
    render(<BasicTrail />);
    const nav = screen.getByRole("navigation");
    const hiddenSeparators = nav.querySelectorAll("li[aria-hidden='true']");
    expect(hiddenSeparators).toHaveLength(2);
  });

  it("does not render a trailing separator after the last item", () => {
    render(<BasicTrail />);
    const list = screen.getByRole("navigation").querySelector("ol");
    const separators = list?.querySelectorAll("li[aria-hidden='true']") ?? [];
    expect(separators).toHaveLength(2);
  });

  it("defaults to chevron separators", () => {
    const { container } = render(<BasicTrail />);
    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(2);
  });

  it("renders slash separators when separator=slash", () => {
    render(
      <Breadcrumbs separator="slash">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
        <BreadcrumbItem current>Project Atlas</BreadcrumbItem>
      </Breadcrumbs>,
    );
    const nav = screen.getByRole("navigation");
    const separators = nav.querySelectorAll("li[aria-hidden='true']");
    expect(separators).toHaveLength(2);
    for (const sep of separators) {
      expect(sep).toHaveTextContent("/");
    }
  });

  it("renders a leading icon before the crumb label", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/" icon={<Home data-testid="home-icon" />}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem current>Settings</BreadcrumbItem>
      </Breadcrumbs>,
    );
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Home/ })).toContainElement(
      screen.getByTestId("home-icon"),
    );
  });

  it("shows the focus-visible glow-focus shadow class on link items", () => {
    render(<BasicTrail />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("forwards a ref to the underlying anchor", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <Breadcrumbs>
        <BreadcrumbItem ref={ref} href="/">
          Home
        </BreadcrumbItem>
      </Breadcrumbs>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("has no axe violations for a full trail", async () => {
    const { container } = render(<BasicTrail />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("BreadcrumbEllipsis", () => {
  it("renders a button labeled Show more breadcrumbs", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbEllipsis />
        <BreadcrumbItem current>General</BreadcrumbItem>
      </Breadcrumbs>,
    );
    expect(
      screen.getByRole("button", { name: "Show more breadcrumbs" }),
    ).toBeInTheDocument();
  });

  it("shows the focus-visible glow-focus shadow class", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbEllipsis />
      </Breadcrumbs>,
    );
    expect(
      screen.getByRole("button", { name: "Show more breadcrumbs" }),
    ).toHaveClass("focus-visible:shadow-[var(--shadow-glow-focus)]");
  });

  it("has no axe violations in a collapsed trail", async () => {
    const { container } = render(
      <Breadcrumbs>
        <BreadcrumbItem href="/" icon={<Home />}>
          Home
        </BreadcrumbItem>
        <BreadcrumbEllipsis />
        <BreadcrumbItem href="/settings">Settings</BreadcrumbItem>
        <BreadcrumbItem current>General</BreadcrumbItem>
      </Breadcrumbs>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("BreadcrumbDropdown", () => {
  it("renders a button with aria-haspopup and aria-current=page", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbDropdown>Project Atlas</BreadcrumbDropdown>
      </Breadcrumbs>,
    );
    const trigger = screen.getByRole("button", { name: /Project Atlas/ });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger.closest("li")).toHaveAttribute("aria-current", "page");
  });

  it("shows the focus-visible glow-focus shadow class", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbDropdown>Project Atlas</BreadcrumbDropdown>
      </Breadcrumbs>,
    );
    expect(screen.getByRole("button", { name: /Project Atlas/ })).toHaveClass(
      "focus-visible:shadow-[var(--shadow-glow-focus)]",
    );
  });

  it("has no axe violations with a dropdown current crumb", async () => {
    const { container } = render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
        <BreadcrumbDropdown>Project Atlas</BreadcrumbDropdown>
      </Breadcrumbs>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
