/** Renders app/color-palette.css from the theme tokens in site.json. */
import type { Site, ThemeTokens } from "../site-schema"
import { GENERATED_NOTE } from "./urls"

export function hexToChannels(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function hyphenLower(char: string): string {
  return `-${char.toLowerCase()}`
}

function cssName(token: string): string {
  return token.replace(/[A-Z]/g, hyphenLower)
}

function declaration([token, hex]: [string, string]): string {
  return `  --${cssName(token)}: ${hexToChannels(hex).join(" ")};`
}

function declarations(tokens: ThemeTokens, scheme: "light" | "dark"): string {
  const lines = Object.entries(tokens).map(declaration)
  return [`  color-scheme: ${scheme};`, ...lines].join("\n")
}

export function renderPaletteCss(theme: Site["theme"]): string {
  const note = `/* ${GENERATED_NOTE}\n * Values are RGB channels so Tailwind opacity modifiers work. */`
  const light = `:root {\n${declarations(theme.light, "light")}\n}`
  const dark = `@media (prefers-color-scheme: dark) {\n  :root {\n${declarations(theme.dark, "dark").replace(/^/gm, "  ")}\n  }\n}`
  return `${note}\n${light}\n\n${dark}\n`
}
