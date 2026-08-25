"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@asteria-ui/registry/ui/table";
import { ComponentPlayground } from "../_shared/component-playground";

const rows = [
  { name: "Alex Johnson", email: "alex@example.com", role: "Admin", status: "Active" },
  { name: "Sam Williams", email: "sam@example.com", role: "Editor", status: "Active" },
  { name: "Jamie Brown", email: "jamie@example.com", role: "Viewer", status: "Inactive" },
];

function DemoTable(props: { variant?: "default" | "striped" | "bordered" }) {
  return (
    <Table variant={props.variant} aria-label="Users">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.email}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableHero() {
  return (
    <ComponentPlayground
      code={`<Table aria-label="Users">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alex Johnson</TableCell>
      <TableCell>alex@example.com</TableCell>
      <TableCell>Admin</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    ...
  </TableBody>
</Table>`}
    >
      <div className="w-full">
        <DemoTable />
      </div>
    </ComponentPlayground>
  );
}

export function TableStriped() {
  return (
    <ComponentPlayground code={'<Table variant="striped" aria-label="Users">...</Table>'}>
      <div className="w-full">
        <DemoTable variant="striped" />
      </div>
    </ComponentPlayground>
  );
}

export function TableBordered() {
  return (
    <ComponentPlayground code={'<Table variant="bordered" aria-label="Users">...</Table>'}>
      <div className="w-full">
        <DemoTable variant="bordered" />
      </div>
    </ComponentPlayground>
  );
}
