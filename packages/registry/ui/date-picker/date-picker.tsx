"use client";

import { cn } from "@paubha/registry/lib/cn";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "../button/button";
import { Calendar } from "../calendar/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export interface DatePickerProps
  extends Omit<
    React.ComponentPropsWithRef<"div">,
    "defaultValue" | "onChange"
  > {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Date field · Popover + Calendar · trigger is a Button with glow-focus ·
 * calendar grid handles day keyboard nav · controlled + uncontrolled
 */
export function DatePicker({
  ref,
  className,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  disabled = false,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const select = (date: Date | undefined) => {
    if (!isControlled) setUncontrolled(date);
    onValueChange?.(date);
    if (date != null) setOpen(false);
  };

  return (
    <div ref={ref} className={cn("inline-flex", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="md"
            disabled={disabled}
            leadingIcon={<CalendarIcon aria-hidden="true" />}
            aria-label={current ? DATE_FORMATTER.format(current) : placeholder}
            className="min-w-[12.5rem] justify-start font-medium"
          >
            {current ? DATE_FORMATTER.format(current) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto border-0 bg-transparent p-0 shadow-none"
        >
          <Calendar value={current} onValueChange={select} size="sm" />
        </PopoverContent>
      </Popover>
    </div>
  );
}

DatePicker.displayName = "DatePicker";
