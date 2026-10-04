import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { PageHeader } from "./page-header";

describe("PageHeader", () => {
  it("renders a simple title", () => {
    render(<PageHeader title="Projects" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Projects" }),
    ).toBeInTheDocument();
  });

  it("renders title and actions", () => {
    render(
      <PageHeader
        title="Projects"
        actions={<button type="button">New project</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "New project" }),
    ).toBeInTheDocument();
  });

  it("renders breadcrumb above the title", () => {
    render(
      <PageHeader
        title="Settings"
        breadcrumb={
          <nav aria-label="Breadcrumb">
            <ol>
              <li>Home</li>
            </ol>
          </nav>
        }
      />,
    );
    expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
  });

  it("renders description under the title", () => {
    render(
      <PageHeader
        title="Team"
        description="Manage members and permissions."
      />,
    );
    expect(
      screen.getByText("Manage members and permissions."),
    ).toBeInTheDocument();
  });

  it("renders tabs below the title row", () => {
    render(
      <PageHeader
        title="Analytics"
        tabs={
          <div role="tablist">
            <button type="button" role="tab" aria-selected="true">
              Overview
            </button>
          </div>
        }
      />,
    );
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
  });

  it("forwards a ref to the root", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PageHeader ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations for a simple header", async () => {
    const { container } = render(
      <PageHeader title="Projects" description="All active projects." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with breadcrumb, actions, and tabs", async () => {
    const { container } = render(
      <PageHeader
        title="Projects"
        description="Track delivery across teams."
        breadcrumb={
          <nav aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
            </ol>
          </nav>
        }
        actions={
          <>
            <button type="button">Edit</button>
            <button type="button">Share</button>
          </>
        }
        tabs={
          <div role="tablist">
            <button type="button" role="tab" aria-selected="true">
              Overview
            </button>
            <button type="button" role="tab" aria-selected="false">
              Activity
            </button>
          </div>
        }
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
