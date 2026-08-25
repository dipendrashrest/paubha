import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import { cn } from "../../lib/cn";

export const Accordion = AccordionPrimitive.Root;

export interface AccordionItemProps
  extends React.ComponentPropsWithRef<typeof AccordionPrimitive.Item> {}

export function AccordionItem({ ref, className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "overflow-hidden rounded-md border border-border-default bg-bg-primary",
        "data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
  extends React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger> {}

/**
 * header role=button (via Radix) with aria-expanded · content panel role=region with
 * aria-labelledby pointing at the header · Enter/Space toggles the section · Arrow keys
 * navigate between headers · Home/End jump to first/last header · disabled items get a
 * native disabled button (+ data-disabled) · focus ring visible on Tab
 */
export function AccordionTrigger({
  ref,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 p-4 text-left text-ui-md font-medium text-fg-primary outline-none",
          "focus-visible:shadow-[var(--shadow-glow-focus)]",
          "disabled:pointer-events-none disabled:text-fg-disabled",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden="true"
          className="size-6 shrink-0 text-fg-primary transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps
  extends React.ComponentPropsWithRef<typeof AccordionPrimitive.Content> {}

export function AccordionContent({
  ref,
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden border-t border-border-default text-body-sm text-fg-secondary",
        className,
      )}
      {...props}
    >
      <div className="p-4">{children}</div>
    </AccordionPrimitive.Content>
  );
}

AccordionContent.displayName = "AccordionContent";
