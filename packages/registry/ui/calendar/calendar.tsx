"use client";

import { cn } from "@paubha/registry/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const DAY_LABEL_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export type CalendarRange = { from?: Date; to?: Date };

export interface CalendarProps
  extends Omit<
    React.ComponentPropsWithRef<"div">,
    "defaultValue" | "onChange"
  > {
  mode?: "single" | "range";
  /** Controlled selected date (single mode). */
  value?: Date;
  /** Uncontrolled initial date (single mode). */
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  /** Controlled range (range mode). */
  rangeValue?: CalendarRange;
  /** Uncontrolled initial range (range mode). */
  defaultRangeValue?: CalendarRange;
  onRangeValueChange?: (range: CalendarRange) => void;
  /** Controlled visible month. */
  month?: Date;
  /** Uncontrolled initial visible month. */
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  /** md = full month panel; sm = compact mini calendar. */
  size?: "md" | "sm";
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return startOfDay(next);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function compareDay(a: Date, b: Date): number {
  return startOfDay(a).getTime() - startOfDay(b).getTime();
}

function isDateInRange(date: Date, range: CalendarRange): boolean {
  if (!range.from || !range.to) return false;
  const t = startOfDay(date).getTime();
  const from = startOfDay(range.from).getTime();
  const to = startOfDay(range.to).getTime();
  return t > from && t < to;
}

/** Build a 6×7 grid of dates starting on the Sunday of the week that contains month start. */
function getMonthGrid(month: Date): Date[] {
  const first = startOfMonth(month);
  const start = addDays(first, -first.getDay());
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(addDays(start, i));
  }
  return days;
}

function useControllableDate(
  controlled: Date | undefined,
  defaultValue: Date | undefined,
): [Date, (next: Date) => void] {
  const [uncontrolled, setUncontrolled] = React.useState(
    () => defaultValue ?? new Date(),
  );
  const value = controlled ?? uncontrolled;
  const setValue = React.useCallback(
    (next: Date) => {
      if (controlled === undefined) setUncontrolled(next);
    },
    [controlled],
  );
  return [value, setValue];
}

/**
 * Month calendar with prev/next navigation, weekday headers, and day cells ·
 * role="grid" with arrow-key day navigation · Enter/Space selects · nav buttons
 * carry aria-labels and shadow-glow-focus · single mode uses solid brand fill for
 * the selected day · range mode paints from/to solid and in-between brand-subtle ·
 * controlled + uncontrolled for month, value, and rangeValue
 */
export function Calendar({
  ref,
  className,
  mode = "single",
  value,
  defaultValue,
  onValueChange,
  rangeValue,
  defaultRangeValue,
  onRangeValueChange,
  month: monthProp,
  defaultMonth,
  onMonthChange,
  size = "md",
  ...props
}: CalendarProps) {
  const [visibleMonth, setVisibleMonthInternal] = useControllableDate(
    monthProp,
    defaultMonth ??
      value ??
      defaultValue ??
      defaultRangeValue?.from ??
      new Date(),
  );

  const [selected, setSelected] = React.useState<Date | undefined>(() =>
    value !== undefined ? value : defaultValue,
  );
  const [range, setRange] = React.useState<CalendarRange>(() =>
    rangeValue !== undefined ? rangeValue : (defaultRangeValue ?? {}),
  );
  const [focusDay, setFocusDay] = React.useState<Date>(() =>
    startOfDay(
      value ??
        defaultValue ??
        rangeValue?.from ??
        defaultRangeValue?.from ??
        visibleMonth,
    ),
  );

  const isSingleControlled = value !== undefined;
  const isRangeControlled = rangeValue !== undefined;

  const currentSelected = isSingleControlled ? value : selected;
  const currentRange = isRangeControlled ? rangeValue : range;

  React.useEffect(() => {
    if (isSingleControlled) {
      setSelected(value);
      if (value) setFocusDay(startOfDay(value));
    }
  }, [isSingleControlled, value]);

  React.useEffect(() => {
    if (isRangeControlled) {
      setRange(rangeValue ?? {});
      if (rangeValue?.from) setFocusDay(startOfDay(rangeValue.from));
    }
  }, [isRangeControlled, rangeValue]);

  const setVisibleMonth = (next: Date) => {
    const normalized = startOfMonth(next);
    setVisibleMonthInternal(normalized);
    onMonthChange?.(normalized);
  };

  const selectSingle = (day: Date) => {
    const next = startOfDay(day);
    if (!isSingleControlled) setSelected(next);
    onValueChange?.(next);
    setFocusDay(next);
    if (!isSameMonth(next, visibleMonth)) {
      setVisibleMonth(startOfMonth(next));
    }
  };

  const selectRange = (day: Date) => {
    const next = startOfDay(day);
    let updated: CalendarRange;

    if (!currentRange.from || (currentRange.from && currentRange.to)) {
      updated = { from: next, to: undefined };
    } else {
      if (compareDay(next, currentRange.from) < 0) {
        updated = { from: next, to: currentRange.from };
      } else {
        updated = { from: currentRange.from, to: next };
      }
    }

    if (!isRangeControlled) setRange(updated);
    onRangeValueChange?.(updated);
    setFocusDay(next);
    if (!isSameMonth(next, visibleMonth)) {
      setVisibleMonth(startOfMonth(next));
    }
  };

  const handleSelect = (day: Date) => {
    if (mode === "range") selectRange(day);
    else selectSingle(day);
  };

  const days = getMonthGrid(visibleMonth);
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const isSm = size === "sm";
  const cellSize = isSm ? "size-8" : "size-9";
  const navSize = isSm ? "size-6" : "size-7";

  const moveFocus = (delta: number) => {
    const next = addDays(focusDay, delta);
    setFocusDay(next);
    if (!isSameMonth(next, visibleMonth)) {
      setVisibleMonth(startOfMonth(next));
    }
  };

  const onGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        moveFocus(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        moveFocus(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(-7);
        break;
      case "ArrowDown":
        event.preventDefault();
        moveFocus(7);
        break;
      case "Home":
        event.preventDefault();
        setFocusDay(addDays(focusDay, -focusDay.getDay()));
        break;
      case "End":
        event.preventDefault();
        setFocusDay(addDays(focusDay, 6 - focusDay.getDay()));
        break;
      case "PageUp":
        event.preventDefault();
        {
          const next = addMonths(visibleMonth, -1);
          setVisibleMonth(next);
          setFocusDay(
            new Date(
              next.getFullYear(),
              next.getMonth(),
              Math.min(
                focusDay.getDate(),
                new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate(),
              ),
            ),
          );
        }
        break;
      case "PageDown":
        event.preventDefault();
        {
          const next = addMonths(visibleMonth, 1);
          setVisibleMonth(next);
          setFocusDay(
            new Date(
              next.getFullYear(),
              next.getMonth(),
              Math.min(
                focusDay.getDate(),
                new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate(),
              ),
            ),
          );
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        handleSelect(focusDay);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-border-default bg-bg-primary shadow-sm",
        isSm ? "w-[268px] p-3" : "w-[312px] p-5",
        className,
      )}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-sm border border-border-default bg-bg-primary text-fg-primary outline-none",
            "hover:bg-bg-secondary-hover",
            "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
            navSize,
          )}
        >
          <ChevronLeft className={isSm ? "size-3.5" : "size-4"} aria-hidden />
        </button>
        <p
          className={cn(
            "text-ui-md font-semibold text-fg-primary",
            isSm && "text-ui-sm",
          )}
          aria-live="polite"
        >
          {MONTH_FORMATTER.format(visibleMonth)}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-sm border border-border-default bg-bg-primary text-fg-primary outline-none",
            "hover:bg-bg-secondary-hover",
            "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
            navSize,
          )}
        >
          <ChevronRight className={isSm ? "size-3.5" : "size-4"} aria-hidden />
        </button>
      </div>

      <div
        role="grid"
        aria-label={MONTH_FORMATTER.format(visibleMonth)}
        tabIndex={0}
        onKeyDown={onGridKeyDown}
        className="outline-none focus-visible:shadow-[var(--shadow-glow-focus)]"
      >
        <div role="row" className="mb-1 grid grid-cols-7">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              role="columnheader"
              aria-label={day}
              className={cn(
                "flex items-center justify-center text-ui-xs text-fg-tertiary",
                cellSize,
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {weeks.map((week) => (
          <div
            key={week[0].toISOString()}
            role="row"
            className="grid grid-cols-7"
          >
            {week.map((day) => {
              const outside = !isSameMonth(day, visibleMonth);
              const focused = isSameDay(day, focusDay);
              const isSelectedSingle =
                mode === "single" &&
                currentSelected != null &&
                isSameDay(day, currentSelected);
              const isRangeStart =
                mode === "range" &&
                currentRange.from != null &&
                isSameDay(day, currentRange.from);
              const isRangeEnd =
                mode === "range" &&
                currentRange.to != null &&
                isSameDay(day, currentRange.to);
              const isInRange =
                mode === "range" && isDateInRange(day, currentRange);
              const isRangeEdge = isRangeStart || isRangeEnd;

              return (
                <div
                  key={day.toISOString()}
                  role="gridcell"
                  aria-selected={
                    mode === "single"
                      ? isSelectedSingle || undefined
                      : isRangeEdge || isInRange || undefined
                  }
                  className="flex items-center justify-center"
                >
                  <button
                    type="button"
                    tabIndex={focused ? 0 : -1}
                    aria-label={DAY_LABEL_FORMATTER.format(day)}
                    aria-current={focused ? "date" : undefined}
                    onClick={() => handleSelect(day)}
                    onFocus={() => setFocusDay(startOfDay(day))}
                    className={cn(
                      "inline-flex items-center justify-center rounded-full text-ui-sm font-medium outline-none transition-colors",
                      "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
                      cellSize,
                      outside &&
                        !isSelectedSingle &&
                        !isRangeEdge &&
                        !isInRange &&
                        "text-fg-tertiary",
                      !outside &&
                        !isSelectedSingle &&
                        !isRangeEdge &&
                        !isInRange &&
                        "text-fg-primary hover:bg-bg-secondary-hover",
                      isInRange &&
                        "rounded-none bg-bg-brand-subtle text-fg-brand",
                      (isSelectedSingle || isRangeEdge) &&
                        "bg-bg-brand-solid text-fg-on-brand hover:bg-bg-brand-solid",
                      isRangeStart && currentRange.to && "rounded-r-none",
                      isRangeEnd && currentRange.from && "rounded-l-none",
                    )}
                  >
                    {day.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar";

export interface CalendarMiniProps extends Omit<CalendarProps, "size"> {}

/** Compact calendar, size="sm" convenience wrapper. */
export function CalendarMini(props: CalendarMiniProps) {
  return <Calendar size="sm" {...props} />;
}

CalendarMini.displayName = "CalendarMini";

export interface CalendarWeekProps
  extends Omit<
    React.ComponentPropsWithRef<"div">,
    "defaultValue" | "onChange"
  > {
  /** Controlled selected day within the week strip. */
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  /** Anchor date whose week (Su–Sa) is shown. Defaults to today / value. */
  weekOf?: Date;
}

/**
 * Horizontal strip of 7 day chips for the week containing `weekOf` ·
 * role="group" · selected chip uses solid brand fill · focus-visible uses
 * shadow-glow-focus · controlled + uncontrolled selection
 */
export function CalendarWeek({
  ref,
  className,
  value,
  defaultValue,
  onValueChange,
  weekOf,
  ...props
}: CalendarWeekProps) {
  const [selected, setSelected] = React.useState<Date>(() =>
    startOfDay(value ?? defaultValue ?? weekOf ?? new Date()),
  );
  const isControlled = value !== undefined;
  const current = isControlled ? startOfDay(value) : selected;

  React.useEffect(() => {
    if (isControlled) setSelected(startOfDay(value));
  }, [isControlled, value]);

  const anchor = startOfDay(weekOf ?? current);
  const weekStart = addDays(anchor, -anchor.getDay());
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const select = (day: Date) => {
    const next = startOfDay(day);
    if (!isControlled) setSelected(next);
    onValueChange?.(next);
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Week"
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border-default bg-bg-primary p-2 shadow-sm",
        className,
      )}
      {...props}
    >
      {days.map((day) => {
        const isSelected = isSameDay(day, current);
        return (
          <button
            key={day.toISOString()}
            type="button"
            aria-label={DAY_LABEL_FORMATTER.format(day)}
            aria-pressed={isSelected}
            onClick={() => select(day)}
            className={cn(
              "inline-flex size-9 flex-col items-center justify-center rounded-full text-ui-xs font-medium outline-none",
              "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
              isSelected
                ? "bg-bg-brand-solid text-fg-on-brand"
                : "text-fg-primary hover:bg-bg-secondary-hover",
            )}
          >
            <span
              aria-hidden="true"
              className="text-ui-xs leading-none text-inherit opacity-70"
            >
              {WEEKDAYS[day.getDay()]}
            </span>
            <span className="text-ui-sm leading-none">{day.getDate()}</span>
          </button>
        );
      })}
    </div>
  );
}

CalendarWeek.displayName = "CalendarWeek";
