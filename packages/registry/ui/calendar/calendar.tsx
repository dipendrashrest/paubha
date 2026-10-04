"use client";

import { cn } from "@paubha/registry/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const WEEKDAYS_SHORT = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;
const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const MINI_MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
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
 * APG date grid: <table role="grid"> with roving tabindex on day buttons (one Tab
 * stop) · Arrows move by day/week, Home/End to week start/end, PageUp/PageDown by
 * month, Enter/Space selects · nav buttons carry aria-labels and
 * shadow-glow-focus · today has aria-current="date" · single mode uses solid brand
 * fill for the selected day · range mode paints from/to solid and in-between
 * brand-subtle as a continuous strip ·
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
  const gridRef = React.useRef<HTMLTableElement>(null);
  const shouldFocusRef = React.useRef(false);
  const today = startOfDay(new Date());

  // Roving tabindex: after a keyboard move, DOM focus follows the focus day.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-run when the focus day or month changes
  React.useEffect(() => {
    if (!shouldFocusRef.current) return;
    shouldFocusRef.current = false;
    gridRef.current
      ?.querySelector<HTMLButtonElement>('button[tabindex="0"]')
      ?.focus();
  }, [focusDay, visibleMonth]);

  const moveFocusTo = (next: Date) => {
    shouldFocusRef.current = true;
    setFocusDay(next);
    if (!isSameMonth(next, visibleMonth)) {
      setVisibleMonth(startOfMonth(next));
    }
  };

  const shiftMonth = (amount: number) => {
    const next = addMonths(visibleMonth, amount);
    const lastDay = new Date(
      next.getFullYear(),
      next.getMonth() + 1,
      0,
    ).getDate();
    moveFocusTo(
      new Date(
        next.getFullYear(),
        next.getMonth(),
        Math.min(focusDay.getDate(), lastDay),
      ),
    );
  };

  const onDayKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        moveFocusTo(addDays(focusDay, -1));
        break;
      case "ArrowRight":
        event.preventDefault();
        moveFocusTo(addDays(focusDay, 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocusTo(addDays(focusDay, -7));
        break;
      case "ArrowDown":
        event.preventDefault();
        moveFocusTo(addDays(focusDay, 7));
        break;
      case "Home":
        event.preventDefault();
        moveFocusTo(addDays(focusDay, -focusDay.getDay()));
        break;
      case "End":
        event.preventDefault();
        moveFocusTo(addDays(focusDay, 6 - focusDay.getDay()));
        break;
      case "PageUp":
        event.preventDefault();
        shiftMonth(-1);
        break;
      case "PageDown":
        event.preventDefault();
        shiftMonth(1);
        break;
      default:
        // Enter/Space activate the native button's onClick.
        break;
    }
  };

  const navButton = cn(
    "inline-flex shrink-0 items-center justify-center rounded-full bg-bg-secondary text-fg-primary outline-none",
    "hover:bg-bg-secondary-hover",
    "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
    isSm ? "size-5" : "size-7",
  );
  const navIcon = isSm ? "size-3" : "size-4";

  const prevButton = (
    <button
      type="button"
      aria-label="Previous month"
      onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
      className={navButton}
    >
      <ChevronLeft className={navIcon} aria-hidden />
    </button>
  );
  const nextButton = (
    <button
      type="button"
      aria-label="Next month"
      onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
      className={navButton}
    >
      <ChevronRight className={navIcon} aria-hidden />
    </button>
  );

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-md border border-border-default bg-bg-primary shadow-sm",
        isSm ? "w-[228px] p-4" : "w-[336px] p-5",
        className,
      )}
      {...props}
    >
      {isSm ? (
        <div className="mb-3 flex items-center justify-between">
          <p className="text-ui-sm text-fg-primary" aria-live="polite">
            {MINI_MONTH_FORMATTER.format(visibleMonth)}
          </p>
          <div className="flex gap-1">
            {prevButton}
            {nextButton}
          </div>
        </div>
      ) : (
        <div className="mb-5 flex items-center justify-between gap-2">
          {prevButton}
          <p
            className="text-ui-md font-semibold text-fg-primary"
            aria-live="polite"
          >
            {MONTH_FORMATTER.format(visibleMonth)}
          </p>
          {nextButton}
        </div>
      )}

      <table
        ref={gridRef}
        // biome-ignore lint/a11y/useSemanticElements: APG date picker requires role="grid" (interactive cells + roving tabindex); a native <table> only exposes role="table"
        role="grid"
        aria-label={MONTH_FORMATTER.format(visibleMonth)}
        className="w-full table-fixed border-separate border-spacing-0"
      >
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th
                key={day}
                scope="col"
                abbr={day}
                aria-label={day}
                className={cn(
                  "p-0 text-center text-ui-xs font-medium text-fg-tertiary",
                  isSm ? "pb-1.5" : "pb-2",
                )}
              >
                {isSm ? day[0] : day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].toISOString()}>
              {week.map((day, col) => {
                const outside = !isSameMonth(day, visibleMonth);
                const focused = isSameDay(day, focusDay);
                const isToday = isSameDay(day, today);
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
                const hasTo = currentRange.to != null;
                const active = isSelectedSingle || isRangeEdge || isInRange;
                const strip = isInRange || (isRangeEdge && hasTo);

                return (
                  <td
                    key={day.toISOString()}
                    aria-selected={
                      mode === "single"
                        ? isSelectedSingle || undefined
                        : isRangeEdge || isInRange || undefined
                    }
                    className={cn("p-0 text-center", isSm ? "pt-0.5" : "pt-1")}
                  >
                    <button
                      type="button"
                      tabIndex={focused ? 0 : -1}
                      aria-label={DAY_LABEL_FORMATTER.format(day)}
                      aria-current={isToday ? "date" : undefined}
                      onClick={() => handleSelect(day)}
                      onKeyDown={onDayKeyDown}
                      onFocus={() => setFocusDay(startOfDay(day))}
                      className={cn(
                        "relative inline-flex items-center justify-center rounded-full font-medium outline-none transition-colors",
                        "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
                        isSm ? "h-6 text-ui-xs" : "h-[34px] text-ui-sm",
                        strip ? "w-full" : isSm ? "w-6" : "w-9",
                        outside && !active && "text-fg-tertiary",
                        !outside && !active && "text-fg-primary",
                        !active && "hover:bg-bg-secondary-hover",
                        !active &&
                          !isSm &&
                          isToday &&
                          "bg-bg-brand-subtle text-fg-brand",
                        isInRange && "bg-bg-brand-subtle text-fg-brand",
                        (isSelectedSingle || isRangeEdge) &&
                          "bg-bg-brand-solid text-fg-on-brand hover:bg-bg-brand-solid",
                        // Continuous range strip: flat inner edges, 18px caps at
                        // range ends and at week-row boundaries.
                        strip && "rounded-none",
                        strip &&
                          (isRangeStart || (isInRange && col === 0)) &&
                          "rounded-l-[18px]",
                        strip &&
                          (isRangeEnd || (isInRange && col === 6)) &&
                          "rounded-r-[18px]",
                        isRangeStart &&
                          hasTo &&
                          col === 6 &&
                          "rounded-r-[18px]",
                        isRangeEnd && col === 0 && "rounded-l-[18px]",
                      )}
                    >
                      {day.getDate()}
                      {isSm && isToday && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute bottom-0.5 size-1 rounded-full",
                            active ? "bg-fg-on-brand" : "bg-bg-brand-solid",
                          )}
                        />
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
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
 * role="group" · selected chip uses brand-subtle fill · focus-visible uses
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
      // biome-ignore lint/a11y/useSemanticElements: <fieldset> is for form controls and brings border/legend styling; this is a plain button group
      role="group"
      aria-label="Week"
      className={cn(
        "flex w-[392px] items-start gap-1.5 rounded-md border border-border-default bg-bg-primary p-3 shadow-sm",
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
              "flex min-w-px flex-1 flex-col items-center justify-center gap-2 rounded-full py-3 outline-none",
              "focus-visible:shadow-[var(--shadow-glow-focus)] focus-visible:outline-none",
              isSelected
                ? "bg-bg-brand-subtle text-fg-brand"
                : "text-fg-primary hover:bg-bg-secondary-hover",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "text-ui-xs font-medium",
                isSelected ? "text-fg-brand" : "text-fg-tertiary",
              )}
            >
              {WEEKDAYS_SHORT[day.getDay()]}
            </span>
            <span className="text-ui-md font-semibold">{day.getDate()}</span>
          </button>
        );
      })}
    </div>
  );
}

CalendarWeek.displayName = "CalendarWeek";
