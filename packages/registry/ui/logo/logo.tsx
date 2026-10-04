import { cn } from "@paubha/registry/lib/cn";
import type * as React from "react";

export type LogoVariant = "icon" | "wordmark" | "combined" | "combined-dark";
/** Figma `Logo/Icon` sizes (px). */
export type LogoIconSize = 16 | 20 | 24 | 32 | 40 | 48;
/** Figma `Logo/Wordmark` sizes (px tall). */
export type LogoWordmarkSize = 20 | 24 | 28 | 32;
/** Figma `Logo/Combined` sizes (px tall), shared by both themes. */
export type LogoCombinedSize = 24 | 32 | 40 | 48;

type LogoBaseProps = Omit<React.ComponentPropsWithRef<"div">, "children">;

export type LogoProps = LogoBaseProps &
  (
    | {
        /** Brand mark only — favicons, app icons, compact branding. */
        variant: "icon";
        /** Rendered size in px. Default 40. */
        size?: LogoIconSize;
      }
    | {
        /** Text-only lockup — headers, footers, documentation. */
        variant: "wordmark";
        /** Rendered height in px. Default 28. */
        size?: LogoWordmarkSize;
      }
    | {
        /**
         * `combined`: icon + wordmark, primary lockup for nav bars and hero
         * sections. Theme-aware: the wordmark follows `fg-primary`.
         * `combined-dark`: icon + white wordmark for dark or brand-colored
         * surfaces regardless of the app's active theme.
         */
        variant?: "combined" | "combined-dark";
        /** Rendered height in px. Default 40. */
        size?: LogoCombinedSize;
      }
  );

// Vector data is copied verbatim from Figma's exported SVGs
// (Logo/Icon 6201:21388, viewBox 0 0 40 40; "Paubha" wordmark 6598:1480,
// viewBox 0 0 83.1634 17.328). Do not hand-edit — re-export from Figma.
const ICON_PATHS = [
  "M38.0275 4.29495C29.4659 7.67069 13.709 18.9274 19.1751 36.9483C26.5477 35.4684 40.6399 26.8657 38.0275 4.29495Z",
  "M1.7261 13.9911C0.654814 33.4405 11.9124 35.7376 17.8163 36.6687C16.6454 33.029 16.5254 27.7476 17.2482 24.4393C15.2944 18.5544 5.45008 14.4068 1.7261 13.9911Z",
  "M10.3675 15.7594C13.7466 17.1157 16.5823 20.5863 17.5778 22.152C17.3141 21.2529 20.906 15.8152 22.7272 13.233C21.1698 10.4967 17.4347 4.84409 15.1621 3.2017C13.2599 6.06745 11.107 13.0482 10.3675 15.7594Z",
] as const;

const WORDMARK_PATHS = [
  "M75.0034 17.328C73.6594 17.328 72.5794 17.024 71.7634 16.416C70.9474 15.792 70.5394 14.928 70.5394 13.824C70.5394 12.72 70.8834 11.856 71.5714 11.232C72.2594 10.608 73.3074 10.16 74.7154 9.88801L78.9634 9.04801C78.9634 8.13601 78.7554 7.45601 78.3394 7.00801C77.9234 6.54401 77.3074 6.31201 76.4914 6.31201C75.7554 6.31201 75.1714 6.48801 74.7394 6.84001C74.3234 7.17601 74.0354 7.66401 73.8754 8.30401L70.7554 8.16001C71.0114 6.80001 71.6354 5.76001 72.6274 5.04001C73.6194 4.30401 74.9074 3.93601 76.4914 3.93601C78.3154 3.93601 79.6914 4.40001 80.6194 5.32801C81.5634 6.24001 82.0354 7.55201 82.0354 9.26401V13.92C82.0354 14.256 82.0914 14.488 82.2034 14.616C82.3314 14.744 82.5154 14.808 82.7554 14.808H83.1634V17.04C83.0674 17.072 82.9074 17.096 82.6834 17.112C82.4754 17.128 82.2594 17.136 82.0354 17.136C81.5074 17.136 81.0354 17.056 80.6194 16.896C80.2034 16.72 79.8834 16.424 79.6594 16.008C79.4354 15.576 79.3234 14.992 79.3234 14.256L79.5874 14.448C79.4594 15.008 79.1794 15.512 78.7474 15.96C78.3314 16.392 77.8034 16.728 77.1634 16.968C76.5234 17.208 75.8034 17.328 75.0034 17.328ZM75.6274 15.096C76.3154 15.096 76.9074 14.96 77.4034 14.688C77.8994 14.416 78.2834 14.04 78.5554 13.56C78.8274 13.08 78.9634 12.512 78.9634 11.856V11.136L75.6514 11.808C74.9634 11.952 74.4674 12.168 74.1634 12.456C73.8754 12.728 73.7314 13.088 73.7314 13.536C73.7314 14.032 73.8914 14.416 74.2114 14.688C74.5474 14.96 75.0194 15.096 75.6274 15.096Z",
  "M57.2506 17.04V7.62939e-06H60.3226V7.15201H59.9386C60.0666 6.41601 60.3226 5.81601 60.7066 5.35201C61.0906 4.87201 61.5626 4.52001 62.1226 4.29601C62.6826 4.05601 63.2986 3.93601 63.9706 3.93601C64.9146 3.93601 65.7066 4.14401 66.3466 4.56001C67.0026 4.96001 67.4906 5.52801 67.8106 6.26401C68.1466 7.00001 68.3146 7.84801 68.3146 8.80801V17.04H65.2426V9.55201C65.2426 8.51201 65.0666 7.73601 64.7146 7.22401C64.3626 6.69601 63.8106 6.43201 63.0586 6.43201C62.2266 6.43201 61.5626 6.70401 61.0666 7.24801C60.5706 7.79201 60.3226 8.58401 60.3226 9.62401V17.04H57.2506Z",
  "M49.5668 17.328C48.6708 17.328 47.8868 17.136 47.2148 16.752C46.5588 16.368 46.0468 15.832 45.6788 15.144L45.6068 17.04H42.6788V7.62939e-06H45.7508V6.04801C46.1028 5.45601 46.6068 4.96001 47.2628 4.56001C47.9188 4.14401 48.6868 3.93601 49.5668 3.93601C50.6708 3.93601 51.6228 4.21601 52.4228 4.77601C53.2388 5.32001 53.8628 6.09601 54.2948 7.10401C54.7428 8.09601 54.9668 9.27201 54.9668 10.632C54.9668 11.992 54.7428 13.176 54.2948 14.184C53.8628 15.176 53.2388 15.952 52.4228 16.512C51.6228 17.056 50.6708 17.328 49.5668 17.328ZM48.8708 14.832C49.7508 14.832 50.4548 14.464 50.9828 13.728C51.5108 12.976 51.7748 11.944 51.7748 10.632C51.7748 9.30401 51.5108 8.27201 50.9828 7.53601C50.4708 6.80001 49.7748 6.43201 48.8948 6.43201C48.2388 6.43201 47.6708 6.60001 47.1908 6.93601C46.7268 7.25601 46.3668 7.72801 46.1108 8.35201C45.8708 8.97601 45.7508 9.73601 45.7508 10.632C45.7508 11.496 45.8708 12.248 46.1108 12.888C46.3668 13.512 46.7268 13.992 47.1908 14.328C47.6548 14.664 48.2148 14.832 48.8708 14.832Z",
  "M32.9168 17.328C31.6208 17.328 30.5888 16.904 29.8208 16.056C29.0688 15.192 28.6928 14 28.6928 12.48V4.22401H31.7648V11.712C31.7648 12.784 31.9408 13.576 32.2928 14.088C32.6608 14.584 33.2128 14.832 33.9488 14.832C34.7808 14.832 35.4208 14.56 35.8688 14.016C36.3328 13.456 36.5648 12.648 36.5648 11.592V4.22401H39.6368V17.04H36.8288L36.7568 13.512L37.1408 13.632C36.9488 14.848 36.4928 15.768 35.7728 16.392C35.0528 17.016 34.1008 17.328 32.9168 17.328Z",
  "M18.7784 17.328C17.4344 17.328 16.3544 17.024 15.5384 16.416C14.7224 15.792 14.3144 14.928 14.3144 13.824C14.3144 12.72 14.6584 11.856 15.3464 11.232C16.0344 10.608 17.0824 10.16 18.4904 9.88801L22.7384 9.04801C22.7384 8.13601 22.5304 7.45601 22.1144 7.00801C21.6984 6.54401 21.0824 6.31201 20.2664 6.31201C19.5304 6.31201 18.9464 6.48801 18.5144 6.84001C18.0984 7.17601 17.8104 7.66401 17.6504 8.30401L14.5304 8.16001C14.7864 6.80001 15.4104 5.76001 16.4024 5.04001C17.3944 4.30401 18.6824 3.93601 20.2664 3.93601C22.0904 3.93601 23.4664 4.40001 24.3944 5.32801C25.3384 6.24001 25.8104 7.55201 25.8104 9.26401V13.92C25.8104 14.256 25.8664 14.488 25.9784 14.616C26.1064 14.744 26.2904 14.808 26.5304 14.808H26.9384V17.04C26.8424 17.072 26.6824 17.096 26.4584 17.112C26.2504 17.128 26.0344 17.136 25.8104 17.136C25.2824 17.136 24.8104 17.056 24.3944 16.896C23.9784 16.72 23.6584 16.424 23.4344 16.008C23.2104 15.576 23.0984 14.992 23.0984 14.256L23.3624 14.448C23.2344 15.008 22.9544 15.512 22.5224 15.96C22.1064 16.392 21.5784 16.728 20.9384 16.968C20.2984 17.208 19.5784 17.328 18.7784 17.328ZM19.4024 15.096C20.0904 15.096 20.6824 14.96 21.1784 14.688C21.6744 14.416 22.0584 14.04 22.3304 13.56C22.6024 13.08 22.7384 12.512 22.7384 11.856V11.136L19.4264 11.808C18.7384 11.952 18.2424 12.168 17.9384 12.456C17.6504 12.728 17.5064 13.088 17.5064 13.536C17.5064 14.032 17.6664 14.416 17.9864 14.688C18.3224 14.96 18.7944 15.096 19.4024 15.096Z",
  "M0 17.04V7.62939e-06H6.6C8.6 7.62939e-06 10.16 0.480008 11.28 1.44001C12.4 2.40001 12.96 3.72801 12.96 5.42401C12.96 6.56001 12.704 7.54401 12.192 8.37601C11.68 9.19201 10.952 9.81601 10.008 10.248C9.064 10.68 7.928 10.896 6.6 10.896H3.12V17.04H0ZM3.12 8.18401H6.456C7.512 8.18401 8.32 7.95201 8.88 7.48801C9.456 7.02401 9.744 6.33601 9.744 5.42401C9.744 4.52801 9.456 3.85601 8.88 3.40801C8.32 2.94401 7.512 2.71201 6.456 2.71201H3.12V8.18401Z",
] as const;

const ICON_SIZE: Record<LogoIconSize, string> = {
  16: "size-4",
  20: "size-5",
  24: "size-6",
  32: "size-8",
  40: "size-10",
  48: "size-12",
};

const WORDMARK_SIZE: Record<LogoWordmarkSize, string> = {
  20: "h-5",
  24: "h-6",
  28: "h-7",
  32: "h-8",
};

// Combined lockup scales uniformly off the 40px master: gap = 0.2 × height,
// wordmark height = 17.328/40 × height (Figma 6599:138).
const COMBINED_SIZE: Record<
  LogoCombinedSize,
  { gap: string; icon: string; wordmark: string }
> = {
  24: { gap: "gap-[4.8px]", icon: "size-6", wordmark: "h-[10.397px]" },
  32: { gap: "gap-[6.4px]", icon: "size-8", wordmark: "h-[13.862px]" },
  40: { gap: "gap-2", icon: "size-10", wordmark: "h-[17.328px]" },
  48: { gap: "gap-[9.6px]", icon: "size-12", wordmark: "h-[20.794px]" },
};

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0 fill-bg-brand-solid", className)}
    >
      {ICON_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function LogoWordmarkPaths() {
  return WORDMARK_PATHS.map((d) => <path key={d} d={d} />);
}

/**
 * role=img · accessible name is the brand name ("Paubha"); the inner SVGs are
 * aria-hidden since the wrapper already carries the name · non-interactive,
 * no focus state · purely decorative/branding content, not a control
 */
export function Logo({
  ref,
  className,
  variant = "combined",
  size,
  ...props
}: LogoProps) {
  let content: React.ReactNode;

  if (variant === "icon") {
    content = <LogoMark className={ICON_SIZE[(size as LogoIconSize) ?? 40]} />;
  } else if (variant === "wordmark") {
    // Figma's Logo/Wordmark frame is 86×28 with the glyphs inset at
    // (1.92, 0.96); the frame box is reproduced so sizes match Figma exactly.
    content = (
      <svg
        viewBox="0 0 86 28"
        aria-hidden="true"
        focusable="false"
        fill="currentColor"
        className={cn(
          "aspect-[86/28] w-auto shrink-0 text-fg-primary",
          WORDMARK_SIZE[(size as LogoWordmarkSize) ?? 28],
        )}
      >
        <g transform="translate(1.92 0.96)">
          <LogoWordmarkPaths />
        </g>
      </svg>
    );
  } else {
    const s = COMBINED_SIZE[(size as LogoCombinedSize) ?? 40];
    content = (
      <span className={cn("inline-flex items-center", s.gap)}>
        <LogoMark className={s.icon} />
        <svg
          viewBox="0 0 83.1634 17.328"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
          className={cn(
            "aspect-[83.1634/17.328] w-auto shrink-0",
            s.wordmark,
            variant === "combined-dark"
              ? "text-fg-on-brand"
              : "text-fg-primary",
          )}
        >
          <LogoWordmarkPaths />
        </svg>
      </span>
    );
  }

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Paubha"
      data-variant={variant}
      className={cn("inline-flex shrink-0 items-center", className)}
      {...props}
    >
      {content}
    </div>
  );
}

Logo.displayName = "Logo";
