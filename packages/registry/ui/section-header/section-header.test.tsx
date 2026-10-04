import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { SectionHeader } from "./section-header";

describe("SectionHeader", () => {
  it("renders a simple title", () => {
    render(<SectionHeader title="Members" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Members" }),
    ).toBeInTheDocument();
  });

  it("renders title, description, and actions", () => {
    render(
      <SectionHeader
        title="Members"
        description="People with access to this workspace."
        actions={<button type="button">Invite</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "Members" })).toBeInTheDocument();
    expect(
      screen.getByText("People with access to this workspace."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Invite" })).toBeInTheDocument();
  });

  it("renders a search slot", () => {
    render(
      <SectionHeader
        title="Files"
        search={<input type="search" aria-label="Search files" />}
      />,
    );
    expect(screen.getByLabelText("Search files")).toBeInTheDocument();
  });

  it("renders tabs below the title row", () => {
    render(
      <SectionHeader
        title="Activity"
        tabs={
          <div role="tablist">
            <button type="button" role="tab" aria-selected="true">
              All
            </button>
          </div>
        }
      />,
    );
    expect(screen.getByRole("tab", { name: "All" })).toBeInTheDocument();
  });

  it("applies a bottom border when bordered", () => {
    const { container } = render(
      <SectionHeader title="Bordered" bordered />,
    );
    expect(container.firstChild).toHaveClass("border-b", "border-border-default");
  });

  it("forwards a ref to the root", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SectionHeader ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no axe violations for a simple header", async () => {
    const { container } = render(
      <SectionHeader
        title="Members"
        description="People with access to this workspace."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with search, actions, and tabs", async () => {
    const { container } = render(
      <SectionHeader
        title="Files"
        description="Shared documents and uploads."
        search={<input type="search" aria-label="Search files" />}
        actions={<button type="button">Upload</button>}
        tabs={
          <div role="tablist">
            <button type="button" role="tab" aria-selected="true">
              All
            </button>
            <button type="button" role="tab" aria-selected="false">
              Shared
            </button>
          </div>
        }
        bordered
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
