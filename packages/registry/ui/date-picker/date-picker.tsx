"use client";

import { cn } from "@paubha/registry/lib/cn";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { Button } from "../button/button";
import { Calendar } from "../calendar/calendar";
import { Input } from "../input/input";
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
 * Date field · Popover + Calendar panel · trigger is a Button with glow-focus ·
 * calendar grid is the APG date grid (arrow keys, roving tabindex) · selecting a
 * day only stages it, Apply commits and closes, Cancel/Escape discards ·
 * Today stages today · controlled + uncontrolled
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
  const [draft, setDraft] = React.useState<Date | undefined>(undefined);
  const [month, setMonth] = React.useState<Date>(new Date());
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setDraft(current);
      setMonth(current ?? new Date());
    }
    setOpen(next);
  };

  const apply = () => {
    if (!isControlled) setUncontrolled(draft);
    onValueChange?.(draft);
    setOpen(false);
  };

  const today = () => {
    const now = new Date();
    setDraft(now);
    setMonth(now);
  };

  return (
    <div ref={ref} className={cn("inline-flex", className)} {...props}>
      <Popover open={open} onOpenChange={handleOpenChange}>
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
          aria-label="Choose date"
          className="w-[336px] overflow-clip rounded-md border border-border-default bg-bg-elevated p-0 shadow-lg"
        >
          <Calendar
            value={draft}
            onValueChange={setDraft}
            month={month}
            onMonthChange={setMonth}
            className="w-full rounded-none border-0 bg-transparent shadow-none"
          />
          <div className="flex items-center gap-2 border-t border-border-default p-4">
            <Input
              readOnly
              size="sm"
              aria-label="Selected date"
              placeholder={placeholder}
              value={draft ? DATE_FORMATTER.format(draft) : ""}
              leadingIcon={<CalendarIcon aria-hidden="true" />}
              className="flex-1"
            />
            <Button type="button" variant="secondary" size="sm" onClick={today}>
              Today
            </Button>
          </div>
          <div className="flex items-center gap-2 border-t border-border-default p-4">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" size="sm" className="flex-1" onClick={apply}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

DatePicker.displayName = "DatePicker";
