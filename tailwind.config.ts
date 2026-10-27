import type { Config } from "tailwindcss"

const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const pair = (name: string) => ({ DEFAULT: channel(name), foreground: channel(`${name}-foreground`) })

const SYSTEM_SANS = [
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
]

// One type scale. Line heights sit on a 4 px grid.
type TypeStep = [string, { lineHeight: string; letterSpacing?: string; fontWeight?: string }]

const TYPE_SCALE: Record<string, TypeStep> = {
  display: ["clamp(2.5rem, 1.75rem + 3.2vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "600" }],
  title: ["clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "600" }],
  heading: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em", fontWeight: "600" }],
  lead: ["clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", { lineHeight: "1.6" }],
  body: ["1rem", { lineHeight: "1.5rem" }],
  small: ["0.875rem", { lineHeight: "1.25rem" }],
  label: ["0.8125rem", { lineHeight: "1rem", letterSpacing: "0.02em", fontWeight: "500" }],
}

const config = {
  darkMode: "media",
  future: { hoverOnlyWhenSupported: true },
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: channel("border"),
        input: channel("input"),
        ring: channel("ring"),
        background: channel("background"),
        foreground: channel("foreground"),
        primary: pair("primary"),
        secondary: pair("secondary"),
        destructive: pair("destructive"),
        muted: pair("muted"),
        accent: pair("accent"),
        popover: pair("popover"),
        card: pair("card"),
      },
      fontFamily: { sans: SYSTEM_SANS },
      fontSize: TYPE_SCALE,
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
