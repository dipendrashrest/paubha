import { cn } from "@paubha/registry/lib/cn";
import { Search } from "lucide-react";
import type * as React from "react";
import { Input, type InputProps } from "../input/input";

export interface SearchFieldProps extends Omit<InputProps, "type"> {
  /** Override the default Search leading icon. */
  icon?: React.ReactNode;
}

/**
 * Search input · Input with Search icon · type=search · caller should
 * provide aria-label or wrap in Field · glow-focus from Input
 */
export function SearchField({
  className,
  icon,
  placeholder = "Search…",
  "aria-label": ariaLabel = "Search",
  ...props
}: SearchFieldProps) {
  return (
    <Input
      type="search"
      aria-label={ariaLabel}
      placeholder={placeholder}
      leadingIcon={icon ?? <Search aria-hidden="true" />}
      className={cn(className)}
      {...props}
    />
  );
}

SearchField.displayName = "SearchField";
