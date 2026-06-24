import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px", // Increased from 1400px to 1536px for better centering
      },
    },
    extend: {
      colors: {
        white: "rgb(var(--palette-white) / <alpha-value>)",
        black: "rgb(var(--palette-black) / <alpha-value>)",
        gray: {
          50: "rgb(var(--palette-gray-50) / <alpha-value>)",
          100: "rgb(var(--palette-gray-100) / <alpha-value>)",
          400: "rgb(var(--palette-gray-400) / <alpha-value>)",
          500: "rgb(var(--palette-gray-500) / <alpha-value>)",
          600: "rgb(var(--palette-gray-600) / <alpha-value>)",
          700: "rgb(var(--palette-gray-700) / <alpha-value>)",
          900: "rgb(var(--palette-gray-900) / <alpha-value>)",
        },
        blue: {
          50: "rgb(var(--palette-blue-50) / <alpha-value>)",
          100: "rgb(var(--palette-blue-100) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        "light-blue": "rgb(var(--palette-light-blue) / <alpha-value>)",
        "dark-blue": "rgb(var(--palette-navy) / <alpha-value>)",
        teal: "rgb(var(--palette-teal) / <alpha-value>)",
        "teal-deep": "rgb(var(--palette-teal-deep) / <alpha-value>)",
        coral: "rgb(var(--palette-coral) / <alpha-value>)",
        "coral-deep": "rgb(var(--palette-coral-deep) / <alpha-value>)",
        "coral-dark": "rgb(var(--palette-coral-dark) / <alpha-value>)",
        "coral-darker": "rgb(var(--palette-coral-darker) / <alpha-value>)",
        "coral-soft": "rgb(var(--palette-coral-soft) / <alpha-value>)",
        "coral-soft-hover": "rgb(var(--palette-coral-soft-hover) / <alpha-value>)",
        "soft-gray": "rgb(var(--palette-soft-gray) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
