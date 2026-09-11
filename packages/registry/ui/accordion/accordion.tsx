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

/**
 * AccordionV2 — "restrained" variant (additive only; does not alter `Accordion`/`AccordionItem`/
 * `AccordionTrigger`/`AccordionContent` above).
 *
 * 🆕 v2 built as an interpretation, not a transcribed Figma spec. No dedicated
 * "Accordion v2 — restrained" frame could be located this session despite a time-boxed search:
 * the `2120:2`–`2120:19` canvas range was confirmed (by node-id arithmetic cross-checked against
 * Switch's confirmed `2120:9`) to map exactly onto the original 19 free-tier components
 * (Button…Tabs, plus Avatar at `0:1`) and does NOT include Accordion — Accordion was added later,
 * in the same 2026-08-25 batch as Kbd/Card/Slider/etc. (see `STATUS.md`). The `2120:20` "Build
 * Log" meta-page has no per-entry node ids. Accordion's own build commit (`5a606f9`, "feat(ui):
 * add Accordion") doesn't record a node id either — same gap as Card's undiscoverable page. Kbd's
 * real sibling canvas from the same build batch (`2169:19985`) was checked directly and has no
 * nested Accordion frame. Pagination's full canvas (`6033:30`, containing both its real v1
 * `6089:35899` and real "v2 — restrained" `6318:9133` frames) was walked in full and contains only
 * Pagination symbols. Same dead end as SelectV2's search — see SYNC_LOG.md for the full trail and
 * an open question for a human to confirm or correct this once/if Accordion's real v2 frame is
 * added to Figma.
 *
 * Absent Accordion's own spec, this applies Pagination's confirmed real v2 intent — same
 * tokens/sizes, squircle `radius/md` chrome, a tighter internal scale, one added `hover` state
 * missing from v1's real symbol set — translated the only way that's meaningful for a stacked
 * header list rather than a pill control: v1's boxed items (always-visible `border-default` +
 * `bg-primary` card per item) become a flatter, borderless list (one bottom divider between rows,
 * no per-item box), the trigger gains a real `hover` state v1's trigger never had
 * (`hover:bg-bg-secondary-hover`), and padding is tightened (`p-4` → `p-3`). Chevron, focus ring,
 * and disabled treatment are unchanged from `Accordion`. This is a deliberate, flagged
 * interpretation — see SYNC_LOG.md.
 */
export const AccordionV2 = AccordionPrimitive.Root;

export interface AccordionItemV2Props
  extends React.ComponentPropsWithRef<typeof AccordionPrimitive.Item> {}

export function AccordionItemV2({ ref, className, ...props }: AccordionItemV2Props) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "overflow-hidden border-b border-border-default last:border-b-0",
        "data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

AccordionItemV2.displayName = "AccordionItemV2";

export interface AccordionTriggerV2Props
  extends React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger> {}

/**
 * Same roles/keyboard behavior as AccordionTrigger (header role=button via Radix, aria-expanded,
 * content panel role=region, Enter/Space/Arrow/Home/End, native disabled + data-disabled) ·
 * restrained/borderless chrome with a real hover state v1 never had · focus ring visible on Tab
 */
export function AccordionTriggerV2({
  ref,
  className,
  children,
  ...props
}: AccordionTriggerV2Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 rounded-md p-3 text-left text-ui-md font-medium text-fg-primary outline-none transition-colors",
          "hover:bg-bg-secondary-hover",
          "focus-visible:shadow-[var(--shadow-glow-focus)]",
          "disabled:pointer-events-none disabled:text-fg-disabled disabled:hover:bg-transparent",
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

AccordionTriggerV2.displayName = "AccordionTriggerV2";

export interface AccordionContentV2Props
  extends React.ComponentPropsWithRef<typeof AccordionPrimitive.Content> {}

/** Same structure as AccordionContent — tighter padding, no border-t (v2's item has no boxed chrome to divide). */
export function AccordionContentV2({
  ref,
  className,
  children,
  ...props
}: AccordionContentV2Props) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn("overflow-hidden text-body-sm text-fg-secondary", className)}
      {...props}
    >
      <div className="p-3 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  );
}

AccordionContentV2.displayName = "AccordionContentV2";
