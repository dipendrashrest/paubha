import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

function BasicTable(props: { variant?: "default" | "striped" | "bordered" }) {
  return (
    <Table variant={props.variant} aria-label="Users">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alex Johnson</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Williams</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  it("renders a native table with column headers", () => {
    render(<BasicTable />);
    expect(screen.getByRole("table", { name: "Users" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
  });

  it("gives each header cell scope=col", () => {
    render(<BasicTable />);
    for (const header of screen.getAllByRole("columnheader")) {
      expect(header).toHaveAttribute("scope", "col");
    }
  });

  it("renders body rows and cells", () => {
    render(<BasicTable />);
    expect(screen.getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("Alex Johnson")).toBeInTheDocument();
  });

  it("fills odd body rows when variant=striped, never the header row", () => {
    render(<BasicTable variant="striped" />);
    const [headerRow, firstRow] = screen.getAllByRole("row");
    expect(firstRow).toHaveClass("odd:bg-bg-secondary");
    expect(headerRow).not.toHaveClass("odd:bg-bg-secondary", "bg-bg-primary");
  });

  it("gives body rows the bg-primary surface and header cells the ui-sm tertiary style", () => {
    render(<BasicTable />);
    const [headerRow, firstRow] = screen.getAllByRole("row");
    expect(firstRow).toHaveClass("bg-bg-primary", "border-border-default");
    expect(headerRow?.parentElement).toHaveClass("bg-bg-secondary");
    expect(screen.getAllByRole("columnheader")[0]).toHaveClass(
      "h-11",
      "px-5",
      "text-ui-sm",
      "font-medium",
      "text-fg-tertiary",
    );
    expect(screen.getByText("Alex Johnson")).toHaveClass(
      "h-16",
      "px-5",
      "text-body-md",
    );
  });

  it("wraps every variant in an elevated, bordered, radius-sm container", () => {
    for (const variant of ["default", "striped", "bordered"] as const) {
      const { container, unmount } = render(<BasicTable variant={variant} />);
      expect(container.firstChild).toHaveClass(
        "rounded-sm",
        "border",
        "bg-bg-elevated",
        "overflow-y-hidden",
        variant === "bordered"
          ? "border-border-strong"
          : "border-border-default",
      );
      unmount();
    }
  });

  it("draws strong column dividers on every cell but the last when variant=bordered", () => {
    render(<BasicTable variant="bordered" />);
    const [first] = screen.getAllByRole("columnheader");
    expect(first).toHaveClass(
      "border-r",
      "border-border-strong",
      "last:border-r-0",
    );
    expect(screen.getByText("Alex Johnson")).toHaveClass("border-r");
    expect(screen.getAllByRole("row")[1]).toHaveClass("border-border-strong");
  });

  it("does not draw column dividers outside the bordered variant", () => {
    render(<BasicTable />);
    expect(screen.getByText("Alex Johnson")).not.toHaveClass("border-r");
  });

  it("lets className override row and cell styles", () => {
    render(
      <Table aria-label="Override">
        <TableBody>
          <TableRow className="bg-bg-tertiary">
            <TableCell className="text-fg-secondary">A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByRole("row")).toHaveClass("bg-bg-tertiary");
    expect(screen.getByRole("row")).not.toHaveClass("bg-bg-primary");
    expect(screen.getByText("A")).not.toHaveClass("text-fg-primary");
  });

  it("forwards a ref to the underlying table element", () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <Table ref={ref} aria-label="Ref test">
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it("has no axe violations for all three variants", async () => {
    const { container, rerender } = render(<BasicTable variant="default" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<BasicTable variant="striped" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<BasicTable variant="bordered" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
