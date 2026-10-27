import { describe, expect, it } from "vitest"

import { site } from "../lib/site"
import type { ThemeTokens } from "../lib/site-schema"
import { contrast } from "./support/contrast"

const AA_TEXT = 4.5
const AAA_TEXT = 7

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
