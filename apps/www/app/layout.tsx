import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });
// Utility mono font only (code, data, tags), never a second brand typeface.
// Exposed as --font-jetbrains-mono and consumed by theme.css's --font-mono.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  metadataBase: new URL("https://paubha.tech"),
  title: {
    template: "%s · Paubha",
    default: "Paubha · Open-source components for React & Tailwind",
  },
  description:
    "An open-source component library for React and Tailwind CSS, with a matching Figma design system.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider
          theme={{
            defaultTheme: "dark",
            enableSystem: false,
            storageKey: "paubha-theme",
            enabled: true,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
