import { describe, expect, it } from "vitest"

import { site } from "../lib/site"
import type { ThemeTokens } from "../lib/site-schema"
import { hexToChannels } from "../lib/seo/palette"

const AA_TEXT = 4.5
const AAA_TEXT = 7

function luminance(hex: string): number {
  const [r, g, b] = hexToChannels(hex).map(linear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function linear(channel: number): number {
  const value = channel / 255
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

function pairs(tokens: ThemeTokens): [string, number, string, string][] {
  return [
    ["foreground on background", AAA_TEXT, tokens.foreground, tokens.background],
    ["muted text on background", AA_TEXT, tokens.mutedForeground, tokens.background],
    ["muted text on card", AA_TEXT, tokens.mutedForeground, tokens.card],
    ["accent on background", AA_TEXT, tokens.primary, tokens.background],
    ["button text on accent", AA_TEXT, tokens.primaryForeground, tokens.primary],
  ]
}

describe("palette contrast", () => {
  for (const mode of ["light", "dark"] as const) {
    for (const [name, minimum, front, back] of pairs(site.theme[mode])) {
      it(`${mode}: ${name} is at least ${minimum}:1`, () => {
        expect(contrast(front, back)).toBeGreaterThanOrEqual(minimum)
      })
    }
  }
})
