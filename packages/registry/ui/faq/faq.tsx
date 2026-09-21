import type * as React from "react";
import { cn } from "../../lib/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion/accordion";

export interface FaqItem {
  question: React.ReactNode;
  answer: React.ReactNode;
  /** Stable value for AccordionItem — falls back to index. */
  value?: string;
}

export interface FaqProps
  extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: FaqItem[];
  /** Accordion type — defaults to single. */
  type?: "single" | "multiple";
}

/**
 * FAQ section · Accordion handles keyboard/ARIA · section labelled by title
 * when provided · focus rings come from AccordionTrigger
 */
export function Faq({
  ref,
  className,
  title = "FAQ",
  description,
  items,
  type = "single",
  ...props
}: FaqProps) {
  const titleId = typeof title === "string" ? "faq-heading" : undefined;

  const accordionClassName = cn(
    "flex flex-col gap-2",
    title != null && "mt-8",
  );

  const accordionItems = items.map((item, i) => {
    const value =
      item.value ??
      (typeof item.question === "string" ? item.question : `faq-${i}`);
    return (
      <AccordionItem key={value} value={value}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      className={cn("w-full", className)}
      {...props}
    >
      {title != null ? (
        <h2
          id={titleId}
          className="text-center text-display-xs font-semibold text-fg-primary"
        >
          {title}
        </h2>
      ) : null}
      {description != null ? (
        <p className="mx-auto mt-3 max-w-lg text-center text-body-md text-fg-secondary">
          {description}
        </p>
      ) : null}
      {type === "multiple" ? (
        <Accordion type="multiple" className={accordionClassName}>
          {accordionItems}
        </Accordion>
      ) : (
        <Accordion type="single" collapsible className={accordionClassName}>
          {accordionItems}
        </Accordion>
      )}
    </section>
  );
}

Faq.displayName = "Faq";
