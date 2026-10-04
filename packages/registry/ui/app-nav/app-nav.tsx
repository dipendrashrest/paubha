import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

/* -------------------------------------------------------------------------- */
/* AppNav: top bar                                                            */
/* -------------------------------------------------------------------------- */

export interface AppNavProps extends React.ComponentPropsWithRef<"header"> {
  /** Brand mark / logo slot. */
  logo?: React.ReactNode;
  /** Trailing actions (avatar, buttons, etc.). */
  actions?: React.ReactNode;
}

/**
 * banner landmark (header) · brand + nav links + actions · interactive children
 * must provide their own focus rings via AppNavLink / button slots
 */
export function AppNav({
  ref,
  className,
  logo,
  actions,
  children,
  ...props
}: AppNavProps) {
  return (
    <header
      ref={ref}
      className={cn(
        "flex h-14 items-center gap-8 border-b border-border-default bg-bg-primary px-6",
        className,
      )}
      {...props}
    >
      {logo}
      {children}
      {actions ? (
        <div className="ml-auto flex shrink-0 items-center gap-3">
          {actions}
        </div>
      ) : null}
    </header>
  );
}

AppNav.displayName = "AppNav";

export interface AppNavBrandProps extends React.ComponentPropsWithRef<"div"> {}

/** Logo + product name cluster for the top bar. */
export function AppNavBrand({
  ref,
  className,
  children,
  ...props
}: AppNavBrandProps) {
  return (
    <div
      ref={ref}
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

AppNavBrand.displayName = "AppNavBrand";

export interface AppNavLinksProps extends React.ComponentPropsWithRef<"nav"> {}

/**
 * nav landmark · wrap AppNavLink children · default aria-label="Primary"
 */
export function AppNavLinks({
  ref,
  className,
  "aria-label": ariaLabel = "Primary",
  children,
  ...props
}: AppNavLinksProps) {
  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn("flex h-full items-stretch gap-6", className)}
      {...props}
    >
      {children}
    </nav>
  );
}

AppNavLinks.displayName = "AppNavLinks";

export interface AppNavLinkProps
  extends Omit<React.ComponentPropsWithRef<"a">, "href"> {
  href?: string;
  /** Marks the current section: aria-current="page" + active styles. */
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

/**
 * link or button · active gets aria-current="page" · Enter/Space activates when
 * rendered as button · focus ring via shadow-glow-focus
 */
export function AppNavLink({
  ref,
  className,
  href,
  active = false,
  children,
  onClick,
  ...props
}: AppNavLinkProps) {
  const styles = cn(
    "inline-flex h-full items-center border-b-2 text-ui-md outline-none transition-colors",
    "focus-visible:shadow-[var(--shadow-glow-focus)]",
    active
      ? "border-fg-primary font-semibold text-fg-primary"
      : "border-transparent font-medium text-fg-secondary hover:text-fg-primary",
    className,
  );

  if (href != null) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-current={active ? "page" : undefined}
        className={styles}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-current={active ? "page" : undefined}
      className={styles}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...(props as React.ComponentPropsWithRef<"button">)}
    >
      {children}
    </button>
  );
}

AppNavLink.displayName = "AppNavLink";

/* -------------------------------------------------------------------------- */
/* AppSidebar                                                                 */
/* -------------------------------------------------------------------------- */

export interface AppSidebarProps extends React.ComponentPropsWithRef<"aside"> {
  logo?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * complementary landmark (aside) · logo + scrollable sections + footer ·
 * items provide their own focus rings
 */
export function AppSidebar({
  ref,
  className,
  logo,
  footer,
  children,
  ...props
}: AppSidebarProps) {
  return (
    <aside
      ref={ref}
      className={cn(
        "flex w-60 flex-col border-r border-border-default bg-bg-primary",
        className,
      )}
      {...props}
    >
      {logo ? (
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border-default px-4">
          {logo}
        </div>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3">
        {children}
      </div>
      {footer ? (
        <div className="shrink-0 border-t border-border-default p-3">
          {footer}
        </div>
      ) : null}
    </aside>
  );
}

AppSidebar.displayName = "AppSidebar";

export interface AppSidebarSectionProps
  extends React.ComponentPropsWithRef<"div"> {
  /** Optional section heading above the item list. */
  label?: React.ReactNode;
}

export function AppSidebarSection({
  ref,
  className,
  label,
  children,
  ...props
}: AppSidebarSectionProps) {
  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
      {label ? (
        <p className="px-2 text-ui-xs font-medium text-fg-tertiary">{label}</p>
      ) : null}
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}

AppSidebarSection.displayName = "AppSidebarSection";

export interface AppSidebarItemProps
  extends Omit<React.ComponentPropsWithRef<"a">, "href"> {
  href?: string;
  active?: boolean;
  /** Leading icon node (pass a Lucide icon sized by the consumer). */
  icon?: React.ReactNode;
  /** Trailing slot (badge, chevron, etc.). */
  trailing?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

/**
 * link or button · active: bg-bg-brand-subtle + text-fg-brand + aria-current ·
 * focus ring via shadow-glow-focus · icon is decorative unless sole content
 */
export function AppSidebarItem({
  ref,
  className,
  href,
  active = false,
  icon,
  trailing,
  children,
  onClick,
  ...props
}: AppSidebarItemProps) {
  const styles = cn(
    "flex h-[34px] w-full items-center gap-2 rounded-sm px-2 text-ui-sm outline-none transition-colors",
    "focus-visible:shadow-[var(--shadow-glow-focus)]",
    active
      ? "bg-bg-brand-subtle font-medium text-fg-brand"
      : "font-medium text-fg-secondary hover:bg-bg-tertiary-hover hover:text-fg-primary",
    className,
  );

  const content = (
    <>
      {icon ? (
        <span
          className="flex size-4 shrink-0 items-center justify-center [&>svg]:size-4"
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate text-left">{children}</span>
      {trailing ? <span className="shrink-0">{trailing}</span> : null}
    </>
  );

  if (href != null) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-current={active ? "page" : undefined}
        className={styles}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-current={active ? "page" : undefined}
      className={styles}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      {...(props as React.ComponentPropsWithRef<"button">)}
    >
      {content}
    </button>
  );
}

AppSidebarItem.displayName = "AppSidebarItem";

/* -------------------------------------------------------------------------- */
/* AppIconNav: floating icon dock                                             */
/* -------------------------------------------------------------------------- */

export interface AppIconNavProps extends React.ComponentPropsWithRef<"nav"> {}

/**
 * nav landmark · floating icon dock · default aria-label="App"
 */
export function AppIconNav({
  ref,
  className,
  "aria-label": ariaLabel = "App",
  children,
  ...props
}: AppIconNavProps) {
  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-6 rounded-lg border border-border-default bg-bg-primary px-4 py-2",
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  );
}

AppIconNav.displayName = "AppIconNav";

export interface AppIconNavItemProps
  extends React.ComponentPropsWithRef<"button"> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

/**
 * button · accessible name from label · active uses text-fg-brand · focus ring
 * via shadow-glow-focus
 */
export function AppIconNavItem({
  ref,
  className,
  icon,
  label,
  active = false,
  ...props
}: AppIconNavItemProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex flex-col items-center gap-1 rounded-sm outline-none transition-colors",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        active ? "text-fg-brand" : "text-fg-secondary hover:text-fg-primary",
        className,
      )}
      {...props}
    >
      <span
        className="flex size-5 items-center justify-center [&>svg]:size-5"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="text-ui-xs font-medium">{label}</span>
    </button>
  );
}

AppIconNavItem.displayName = "AppIconNavItem";

export interface AppIconNavActionProps
  extends React.ComponentPropsWithRef<"button"> {
  icon: React.ReactNode;
  /** Required accessible name for the brand action. */
  "aria-label": string;
}

/**
 * button · brand solid circle · aria-label required · focus ring via
 * shadow-glow-focus
 */
export function AppIconNavAction({
  ref,
  className,
  icon,
  ...props
}: AppIconNavActionProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-brand-solid text-fg-on-brand outline-none transition-colors",
        "hover:bg-bg-brand-solid-hover",
        "active:bg-bg-brand-solid-active",
        "focus-visible:shadow-[var(--shadow-glow-focus)]",
        className,
      )}
      {...props}
    >
      <span
        className="flex size-5 items-center justify-center [&>svg]:size-5"
        aria-hidden="true"
      >
        {icon}
      </span>
    </button>
  );
}

AppIconNavAction.displayName = "AppIconNavAction";
