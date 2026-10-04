import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  CardHeader,
  CardHeaderActions,
  CardHeaderDescription,
  CardHeaderMedia,
  CardHeaderTitle,
} from "./card-header";

describe("CardHeader", () => {
  it("renders a simple title", () => {
    render(<CardHeader title="Project Overview" />);
    expect(screen.getByText("Project Overview")).toBeInTheDocument();
  });

  it("renders title, description, avatar, and actions slots", () => {
    render(
      <CardHeader
        title="Olivia Rhye"
        description="Product Designer"
        avatar={<span data-testid="avatar">OR</span>}
        actions={<button type="button">Edit</button>}
      />,
    );
    expect(screen.getByText("Olivia Rhye")).toBeInTheDocument();
    expect(screen.getByText("Product Designer")).toBeInTheDocument();
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("stacks children below the title row for tabs", () => {
    render(
      <CardHeader title="Analytics">
        <div role="tablist">
          <button type="button" role="tab" aria-selected="true">
            Overview
          </button>
        </div>
      </CardHeader>,
    );
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
  });

  it("forwards a ref to the root", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref} title="Ref test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("supports composition API pieces", () => {
    render(
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CardHeaderMedia>
              <span data-testid="media">M</span>
            </CardHeaderMedia>
            <div>
              <CardHeaderTitle>Composed</CardHeaderTitle>
              <CardHeaderDescription>Subtitle</CardHeaderDescription>
            </div>
          </div>
          <CardHeaderActions>
            <button type="button">Action</button>
          </CardHeaderActions>
        </div>
      </CardHeader>,
    );
    expect(screen.getByText("Composed")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.getByTestId("media")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("has no axe violations for a simple header", async () => {
    const { container } = render(
      <CardHeader title="Project Overview" description="Last updated today" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations with actions slot", async () => {
    const { container } = render(
      <CardHeader
        title="Team"
        actions={
          <>
            <button type="button">Edit</button>
            <button type="button">Add Member</button>
          </>
        }
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
