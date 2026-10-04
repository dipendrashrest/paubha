"use client";

import { Badge } from "@paubha/registry/ui/badge";
import { Button } from "@paubha/registry/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@paubha/registry/ui/table";
import { ComponentPlayground } from "../_shared/component-playground";

const rows = [
  {
    name: "Maya Okafor",
    email: "maya@example.com",
    role: "Admin",
    active: true,
  },
  {
    name: "Arjun Mehta",
    email: "arjun@example.com",
    role: "Editor",
    active: true,
  },
  {
    name: "Sofia Lindqvist",
    email: "sofia@example.com",
    role: "Viewer",
    active: false,
  },
];

function DemoTable(props: { variant?: "default" | "striped" | "bordered" }) {
  return (
    <Table variant={props.variant} aria-label="Members">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.email}>
            <TableCell>{row.name}</TableCell>
            <TableCell className="text-fg-secondary">{row.email}</TableCell>
            <TableCell className="text-fg-secondary">{row.role}</TableCell>
            <TableCell>
              <Badge
                size="sm"
                variant={row.active ? "success" : "gray"}
                showDot
              >
                {row.active ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="tertiary"
                  size="sm"
                  aria-label={`Edit ${row.name}`}
                >
                  Edit
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  destructive
                  aria-label={`Delete ${row.name}`}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableHero() {
  return (
    <ComponentPlayground
      code={`<Table aria-label="Members">
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Maya Okafor</TableCell>
      <TableCell className="text-fg-secondary">maya@example.com</TableCell>
      <TableCell className="text-fg-secondary">Admin</TableCell>
      <TableCell>
        <Badge size="sm" variant="success" showDot>Active</Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="tertiary" size="sm">Edit</Button>
          <Button variant="tertiary" size="sm" destructive>Delete</Button>
        </div>
      </TableCell>
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
    <ComponentPlayground
      code={'<Table variant="striped" aria-label="Members">...</Table>'}
    >
      <div className="w-full">
        <DemoTable variant="striped" />
      </div>
    </ComponentPlayground>
  );
}

export function TableBordered() {
  return (
    <ComponentPlayground
      code={'<Table variant="bordered" aria-label="Members">...</Table>'}
    >
      <div className="w-full">
        <DemoTable variant="bordered" />
      </div>
    </ComponentPlayground>
  );
}
