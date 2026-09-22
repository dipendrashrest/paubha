import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@paubha/registry/lib/cn";

export type TableVariant = "default" | "striped" | "bordered";

const TableVariantContext = React.createContext<TableVariant>("default");

const wrapperVariants = cva("w-full overflow-x-auto", {
  variants: {
    variant: {
      default: "",
      striped: "",
      // Figma's bordered variant wraps the table in `overflow-clip` so the header's
      // solid background doesn't square off past the rounded corners. `overflow-x-auto`
      // (base) only clips horizontally, so pair it with `overflow-y-hidden` here rather
      // than `overflow-hidden`, which would also kill the horizontal scroll behavior.
      bordered: "overflow-y-hidden rounded-md border border-border-default",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TableProps
  extends React.ComponentPropsWithRef<"table">,
    VariantProps<typeof wrapperVariants> {}

/**
 * Native table semantics · TableHead renders th scope="col" · keyboard navigation is the
 * browser's native table/cell tabbing — no custom handling needed for a static table
 */
export function Table({ ref, className, variant = "default", ...props }: TableProps) {
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
  return <thead className={cn("bg-bg-secondary", className)} {...props} />;
}

TableHeader.displayName = "TableHeader";

export function TableBody({
  className,
  ...props
}: React.ComponentPropsWithRef<"tbody">) {
  return (
    <tbody className={cn("[&>tr:last-child]:border-b-0", className)} {...props} />
  );
}

TableBody.displayName = "TableBody";

export interface TableRowProps extends React.ComponentPropsWithRef<"tr"> {}

export function TableRow({ ref, className, ...props }: TableRowProps) {
  const variant = React.useContext(TableVariantContext);

  return (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border-default",
        variant === "striped" && "even:bg-bg-secondary",
        className,
      )}
      {...props}
    />
  );
}

TableRow.displayName = "TableRow";

export function TableHead({
  className,
  ...props
}: React.ComponentPropsWithRef<"th">) {
  return (
    <th
      scope="col"
      className={cn(
        "px-4 py-3 text-ui-sm font-semibold whitespace-nowrap text-fg-primary",
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
  return (
    <td
      className={cn("px-4 py-3 text-ui-sm text-fg-primary", className)}
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
