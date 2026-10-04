import { cn } from "@paubha/registry/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export type TableVariant = "default" | "striped" | "bordered";

const TableVariantContext = React.createContext<TableVariant>("default");
/** True inside `TableHeader`, so header rows keep the thead's `bg-secondary` fill. */
const TableHeaderContext = React.createContext(false);

// Every Figma variant wraps the table in an elevated, 1px-bordered, radius-sm (8px)
// container that clips its contents (`overflow-clip`). `overflow-x-auto` keeps wide
// tables horizontally scrollable, so pair it with `overflow-y-hidden` rather than
// `overflow-hidden`, which would also kill the horizontal scroll.
const wrapperVariants = cva(
  "w-full overflow-x-auto overflow-y-hidden rounded-sm border bg-bg-elevated",
  {
    variants: {
      variant: {
        default: "border-border-default",
        striped: "border-border-default",
        bordered: "border-border-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TableProps
  extends React.ComponentPropsWithRef<"table">,
    VariantProps<typeof wrapperVariants> {}

/**
 * Native table semantics · TableHead renders th scope="col" · keyboard navigation is the
 * browser's native table/cell tabbing, no custom handling needed for a static table ·
 * name the table via aria-label or TableCaption · interactive cell content (buttons,
 * links) carries its own glow-focus ring
 */
export function Table({
  ref,
  className,
  variant = "default",
  ...props
}: TableProps) {
  return (
    <div className={cn(wrapperVariants({ variant }))}>
      <TableVariantContext.Provider value={variant ?? "default"}>
        <table
          ref={ref}
          className={cn("w-full border-collapse text-left", className)}
          {...props}
        />
      </TableVariantContext.Provider>
    </div>
  );
}

Table.displayName = "Table";

export function TableHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<"thead">) {
  return (
    <TableHeaderContext.Provider value={true}>
      <thead className={cn("bg-bg-secondary", className)} {...props} />
    </TableHeaderContext.Provider>
  );
}

TableHeader.displayName = "TableHeader";

export function TableBody({
  className,
  ...props
}: React.ComponentPropsWithRef<"tbody">) {
  return (
    <tbody
      className={cn("[&>tr:last-child]:border-b-0", className)}
      {...props}
    />
  );
}

TableBody.displayName = "TableBody";

export interface TableRowProps extends React.ComponentPropsWithRef<"tr"> {}

export function TableRow({ ref, className, ...props }: TableRowProps) {
  const variant = React.useContext(TableVariantContext);
  const inHeader = React.useContext(TableHeaderContext);

  return (
    <tr
      ref={ref}
      className={cn(
        "border-b",
        variant === "bordered"
          ? "border-border-strong"
          : "border-border-default",
        !inHeader && "bg-bg-primary",
        // Figma's striped variant fills the 1st, 3rd, … body rows.
        !inHeader && variant === "striped" && "odd:bg-bg-secondary",
        className,
      )}
      {...props}
    />
  );
}

TableRow.displayName = "TableRow";

/** Bordered variant draws a vertical divider after every column except the last. */
const columnDivider = "border-r border-border-strong last:border-r-0";

export function TableHead({
  className,
  ...props
}: React.ComponentPropsWithRef<"th">) {
  const variant = React.useContext(TableVariantContext);

  return (
    <th
      scope="col"
      className={cn(
        "h-11 px-5 text-ui-sm font-medium whitespace-nowrap text-fg-tertiary",
        variant === "bordered" && columnDivider,
        className,
      )}
      {...props}
    />
  );
}

TableHead.displayName = "TableHead";

export function TableCell({
  className,
  ...props
}: React.ComponentPropsWithRef<"td">) {
  const variant = React.useContext(TableVariantContext);

  return (
    <td
      className={cn(
        "h-16 px-5 text-body-md text-fg-primary",
        variant === "bordered" && columnDivider,
        className,
      )}
      {...props}
    />
  );
}

TableCell.displayName = "TableCell";

export function TableCaption({
  className,
  ...props
}: React.ComponentPropsWithRef<"caption">) {
  return (
    <caption
      className={cn("mt-3 text-body-sm text-fg-secondary", className)}
      {...props}
    />
  );
}

TableCaption.displayName = "TableCaption";
