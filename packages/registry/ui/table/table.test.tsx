import { render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { axe } from "../../lib/test-axe";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

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

  it("applies striped classes to even rows when variant=striped", () => {
    render(<BasicTable variant="striped" />);
    const rows = screen.getAllByRole("row");
    expect(rows[2]).toHaveClass("even:bg-bg-secondary");
  });

  it("applies a bordered, rounded wrapper when variant=bordered", () => {
    const { container } = render(<BasicTable variant="bordered" />);
    expect(container.firstChild).toHaveClass("rounded-md", "border");
  });

  it("clips vertical overflow on the bordered wrapper so the header background can't square off past the rounded corners", () => {
    const { container } = render(<BasicTable variant="bordered" />);
    expect(container.firstChild).toHaveClass("overflow-y-hidden");
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
