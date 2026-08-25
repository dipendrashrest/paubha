import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/cn";

export type ToggleGroupSize = "sm" | "md" | "lg";

const ToggleGroupSizeContext = React.createContext<ToggleGroupSize>("md");

export interface ToggleGroupProps
  extends React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> {
  size?: ToggleGroupSize;
}

/**
 * Built on Radix RadioGroup so it gets the exact ARIA contract a segmented control needs:
 * role="radiogroup" · each item role="radio" with aria-checked · Arrow keys navigate
 * between items · disabled items get a native disabled state · focus ring visible on Tab
 */
export function ToggleGroup({ ref, className, size = "md", ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupSizeContext.Provider value={size}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn(
          "inline-flex items-center gap-0.5 rounded-md bg-bg-secondary p-1",
          className,
        )}
        {...props}
      />
    </ToggleGroupSizeContext.Provider>
  );
}

ToggleGroup.displayName = "ToggleGroup";

const toggleGroupItemVariants = cva(
  "flex items-center justify-center rounded-sm font-medium whitespace-nowrap outline-none",
  {
    variants: {
      size: {
        sm: "h-[22px] px-3 text-ui-xs",
        md: "h-[30px] px-4 text-ui-md",
        lg: "h-[38px] px-5 text-ui-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface ToggleGroupItemProps
  extends Omit<React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>, "children">,
    VariantProps<typeof toggleGroupItemVariants> {
  children?: React.ReactNode;
}

export function ToggleGroupItem({
  ref,
  className,
  size,
  children,
  ...props
}: ToggleGroupItemProps) {
  const contextSize = React.useContext(ToggleGroupSizeContext);

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupItemVariants({ size: size ?? contextSize }),
        "text-fg-secondary",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        "data-[state=checked]:bg-bg-primary data-[state=checked]:text-fg-primary data-[state=checked]:shadow-xs",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
}

ToggleGroupItem.displayName = "ToggleGroupItem";
