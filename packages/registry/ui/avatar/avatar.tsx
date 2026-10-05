"use client";

import { cn } from "@paubha/registry/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { BadgeCheck, Building2, User } from "lucide-react";
import * as React from "react";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-fg-brand select-none",
  {
    variants: {
      size: {
        xs: "size-6 text-[10px] leading-[14px]",
        sm: "size-8 text-ui-xs",
        md: "size-10 text-ui-md leading-[18px]",
        lg: "size-12 text-ui-lg leading-5",
        xl: "size-16 text-[22px] leading-[26px]",
        "2xl": "size-20 text-[28px] leading-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/** Online/offline presence dot — sizes and ring widths read off Figma's `_Avatar online`. */
const presenceVariants = cva(
  "absolute right-0 bottom-0 z-10 rounded-full border-bg-primary",
  {
    variants: {
      size: {
        xs: "size-1.5 border-[0.5px]",
        sm: "size-2 border",
        md: "size-2.5 border-[1.5px]",
        lg: "size-3 border-2",
        xl: "size-3.5 border-2",
        "2xl": "size-4 border-2",
      },
      indicator: {
        online: "bg-bg-success-solid",
        offline: "bg-fg-disabled",
      },
    },
  },
);

/** Company/verified badge — a bg-primary disc carrying a Lucide glyph in fg-brand. */
const badgeVariants = {
  xs: { box: "size-3", icon: "size-2" },
  sm: { box: "size-3", icon: "size-2" },
  md: { box: "size-3", icon: "size-2" },
  lg: { box: "size-[13px]", icon: "size-[9px]" },
  xl: { box: "size-[18px]", icon: "size-3.5" },
  "2xl": { box: "size-[22px]", icon: "size-[18px]" },
} as const;

/** Placeholder user glyph is half the avatar's diameter in every Figma variant. */
const userIconSize = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
  "2xl": "size-10",
} as const;

export type AvatarSize = NonNullable<
  VariantProps<typeof avatarVariants>["size"]
>;
export type AvatarType = "image" | "initials" | "icon";
export type AvatarIndicator =
  | "none"
  | "online"
  | "offline"
  | "company"
  | "verified";

const indicatorLabel: Record<Exclude<AvatarIndicator, "none">, string> = {
  online: "online",
  offline: "offline",
  company: "company account",
  verified: "verified",
};

export interface AvatarProps
  extends Omit<React.ComponentPropsWithRef<"span">, "children"> {
  src?: string;
  alt?: string;
  initials?: string;
  /**
   * What the avatar shows. Defaults to `image` when `src` is set, `initials` when `alt`/`initials`
   * yield letters, otherwise `icon`. A failed image falls back to initials, then the icon.
   */
  type?: AvatarType;
  size?: AvatarSize;
  indicator?: AvatarIndicator;
}

function initialsFrom(alt?: string, initials?: string) {
  if (initials?.trim()) return initials.trim().slice(0, 2).toUpperCase();
  if (!alt?.trim()) return "";
  const parts = alt.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function useResolvedType(
  src: string | undefined,
  fallback: string,
  type: AvatarType | undefined,
) {
  const [failed, setFailed] = React.useState(false);
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset the fallback whenever `src` changes to a new image
  React.useEffect(() => {
    setFailed(false);
  }, [src]);
  const requested = type ?? (src ? "image" : fallback ? "initials" : "icon");
  let resolved: AvatarType = requested;
  if (resolved === "image" && (!src || failed))
    resolved = fallback ? "initials" : "icon";
  if (resolved === "initials" && !fallback) resolved = "icon";
  return { resolved, onError: () => setFailed(true) };
}

function accessibleNameFor(
  alt: string | undefined,
  initials: string | undefined,
  indicator: AvatarIndicator,
) {
  const label = alt ?? initials ?? "Avatar";
  return indicator === "none"
    ? label
    : `${label}, ${indicatorLabel[indicator]}`;
}

/**
 * role=img · accessible name comes from `alt`/`initials`, suffixed with the indicator when present
 * (e.g. "Maya Chen, verified") so presence/verification is never conveyed by color or glyph alone ·
 * a broken image URL falls back to initials, then the user icon · the image, glyphs and indicator
 * are aria-hidden (the wrapper's aria-label carries the meaning) · non-interactive, no focus state —
 * wrap in a separately labelled link if it opens a profile
 */
export function Avatar({
  ref,
  className,
  src,
  alt,
  initials,
  type,
  size = "md",
  indicator = "none",
  ...props
}: AvatarProps) {
  const fallback = initialsFrom(alt, initials);
  const { resolved, onError } = useResolvedType(src, fallback, type);

  return (
    <span
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      role="img"
      aria-label={accessibleNameFor(alt, initials, indicator)}
      data-type={resolved}
      {...props}
    >
      {resolved === "icon" ? (
        <User
          aria-hidden="true"
          className={cn("text-fg-primary", userIconSize[size])}
          strokeWidth={1.5}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border border-border-default bg-bg-brand-subtle">
          {resolved === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt=""
              className="size-full object-cover"
              onError={onError}
            />
          ) : (
            <span aria-hidden="true">{fallback}</span>
          )}
        </span>
      )}
      {indicator === "online" || indicator === "offline" ? (
        <span
          className={presenceVariants({ size, indicator })}
          aria-hidden="true"
        />
      ) : null}
      {indicator === "company" || indicator === "verified" ? (
        <span
          className={cn(
            "absolute right-0 bottom-0 z-10 flex items-center justify-center rounded-full bg-bg-primary text-fg-brand",
            badgeVariants[size].box,
          )}
          aria-hidden="true"
        >
          {indicator === "company" ? (
            <Building2 className={badgeVariants[size].icon} />
          ) : (
            <BadgeCheck className={badgeVariants[size].icon} />
          )}
        </span>
      ) : null}
    </span>
  );
}

Avatar.displayName = "Avatar";

const profilePhotoVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full border-4 border-bg-primary bg-bg-primary shadow-md font-semibold text-[28px] leading-8 text-fg-brand select-none",
  {
    variants: {
      size: {
        sm: "size-18",
        md: "size-24",
        lg: "size-40",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const profileSizes = {
  sm: { icon: "size-9", box: "size-5", badge: "size-4" },
  md: { icon: "size-12", box: "size-[27px]", badge: "size-[23px]" },
  lg: { icon: "size-20", box: "size-[45px]", badge: "size-[41px]" },
} as const;

export type AvatarProfilePhotoSize = NonNullable<
  VariantProps<typeof profilePhotoVariants>["size"]
>;

export interface AvatarProfilePhotoProps
  extends Omit<React.ComponentPropsWithRef<"span">, "children"> {
  src?: string;
  alt?: string;
  initials?: string;
  type?: AvatarType;
  size?: AvatarProfilePhotoSize;
  verified?: boolean;
}

/**
 * role=img · large profile identity (72/96/160px) with a primary-surface ring and shadow-md ·
 * accessible name comes from `alt`/`initials`, suffixed with ", verified" when `verified` · same
 * image → initials → icon fallback as Avatar · non-interactive, no focus state
 */
export function AvatarProfilePhoto({
  ref,
  className,
  src,
  alt,
  initials,
  type,
  size = "md",
  verified = false,
  ...props
}: AvatarProfilePhotoProps) {
  const fallback = initialsFrom(alt, initials);
  const { resolved, onError } = useResolvedType(src, fallback, type);
  const dims = profileSizes[size];

  return (
    <span
      ref={ref}
      className={cn(profilePhotoVariants({ size }), className)}
      role="img"
      aria-label={accessibleNameFor(
        alt,
        initials,
        verified ? "verified" : "none",
      )}
      data-type={resolved}
      {...props}
    >
      {resolved === "icon" ? (
        <User
          aria-hidden="true"
          className={cn("text-fg-primary", dims.icon)}
          strokeWidth={1.5}
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border border-border-default bg-bg-brand-subtle">
          {resolved === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt=""
              className="size-full object-cover"
              onError={onError}
            />
          ) : (
            <span aria-hidden="true">{fallback}</span>
          )}
        </span>
      )}
      {verified ? (
        <span
          className={cn(
            "absolute right-0 bottom-0 z-10 flex items-center justify-center rounded-full bg-bg-primary text-fg-brand",
            dims.box,
          )}
          aria-hidden="true"
        >
          <BadgeCheck className={dims.badge} />
        </span>
      ) : null}
    </span>
  );
}

AvatarProfilePhoto.displayName = "AvatarProfilePhoto";

export interface AvatarGroupProps extends React.ComponentPropsWithRef<"div"> {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
}

/**
 * role=group · shows up to `max` avatars, collapsing the rest into a "+N" indicator with its own
 * aria-label · each avatar keeps its own accessible name (status included) · non-interactive
 */
export function AvatarGroup({
  className,
  max = 4,
  size = "md",
  children,
  ...props
}: AvatarGroupProps) {
  const items = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<AvatarProps> =>
      React.isValidElement<AvatarProps>(child),
  );
  const visible = max > 0 ? items.slice(0, max) : items;
  const overflow = items.length - visible.length;

  return (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> is form semantics, not appropriate for a visual avatar stack
    <div role="group" className={cn("flex items-center", className)} {...props}>
      {visible.map((child, index) => (
        <span
          key={child.key ?? index}
          className={cn("relative flex shrink-0", index > 0 && "-ml-2")}
          style={{ zIndex: visible.length - index }}
        >
          {React.cloneElement(child, {
            size,
            className: cn(
              "ring-2 ring-bg-primary border border-border-default",
              child.props.className,
            ),
          })}
        </span>
      ))}
      {overflow > 0 ? (
        <span
          className={cn(
            avatarVariants({ size }),
            "-ml-2 shrink-0 border border-border-default bg-bg-secondary font-medium text-fg-secondary ring-2 ring-bg-primary",
          )}
          style={{ zIndex: 0 }}
          role="img"
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

AvatarGroup.displayName = "AvatarGroup";

const avatarAddButtonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-border-strong bg-bg-secondary text-fg-secondary transition-colors focus-visible:outline-none focus-visible:border-border-brand focus-visible:shadow-[var(--shadow-glow-focus)]",
  {
    variants: {
      size: {
        md: "size-10 text-base leading-4 hover:border-fg-secondary hover:shadow-[0_0_0_4px_rgba(71,84,103,0.24)]",
        lg: "size-12 text-xl leading-5 hover:border-border-brand hover:shadow-[var(--shadow-glow-focus)]",
        xl: "size-16 text-2xl leading-6 hover:border-border-brand hover:shadow-[var(--shadow-glow-focus)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type AvatarAddButtonSize = NonNullable<
  VariantProps<typeof avatarAddButtonVariants>["size"]
>;

export interface AvatarAddButtonProps
  extends React.ComponentPropsWithRef<"button"> {
  size?: AvatarAddButtonSize;
}

/**
 * role=button (native <button>) · Enter/Space activates · focus ring visible on Tab via
 * shadow-glow-focus (Figma's own mockup only shows a hover state, but every interactive
 * component needs a visible keyboard focus indicator per the design system, so the same
 * treatment is applied to focus-visible) · accessible name defaults to "Add", overridable
 * via aria-label · the "+" glyph is decorative (aria-hidden)
 */
export function AvatarAddButton({
  ref,
  className,
  size = "md",
  type = "button",
  "aria-label": ariaLabel = "Add",
  ...props
}: AvatarAddButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={cn(avatarAddButtonVariants({ size }), className)}
      {...props}
    >
      <span aria-hidden="true">+</span>
    </button>
  );
}

AvatarAddButton.displayName = "AvatarAddButton";

export type AvatarLabelGroupSize = "sm" | "md" | "lg" | "xl";

const labelGroupText: Record<
  AvatarLabelGroupSize,
  { name: string; secondary: string }
> = {
  sm: { name: "text-ui-sm", secondary: "text-ui-xs" },
  md: { name: "text-ui-md leading-[18px]", secondary: "text-ui-sm leading-4" },
  lg: { name: "text-ui-lg leading-[18px]", secondary: "text-ui-md leading-4" },
  xl: { name: "text-[18px] leading-[18px]", secondary: "text-ui-lg leading-4" },
};

export interface AvatarLabelGroupProps
  extends React.ComponentPropsWithRef<"div"> {
  avatar: React.ReactNode;
  name: React.ReactNode;
  secondaryText?: React.ReactNode;
  size?: AvatarLabelGroupSize;
}

/**
 * Non-interactive composition, no role of its own; the avatar keeps its own role=img.
 * `size` (sm/md/lg/xl) sets both the avatar (32/40/48/64px) and the label type scale.
 * secondaryText is optional supporting text (email, role) below the name.
 */
export function AvatarLabelGroup({
  ref,
  className,
  avatar,
  name,
  secondaryText,
  size = "md",
  ...props
}: AvatarLabelGroupProps) {
  const text = labelGroupText[size];
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-3", className)}
      {...props}
    >
      {React.isValidElement<AvatarProps>(avatar)
        ? React.cloneElement(avatar, { size })
        : avatar}
      <div className="flex flex-col font-medium">
        <p className={cn("text-fg-primary", text.name)}>{name}</p>
        {secondaryText ? (
          <p className={cn("text-fg-secondary", text.secondary)}>
            {secondaryText}
          </p>
        ) : null}
      </div>
    </div>
  );
}

AvatarLabelGroup.displayName = "AvatarLabelGroup";

export { avatarVariants, profilePhotoVariants };
