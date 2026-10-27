import { describe, expect, it } from "vitest"

import { site } from "../lib/site"
import { contrast, mix } from "./support/contrast"
import { blockAfter, bodiesFor, css } from "./support/css"

const HOVER_QUERY = "@media (hover: hover) and (pointer: fine) {"
const REDUCED_QUERY = "@media (prefers-reduced-motion: reduce) {"
const AA_TEXT = 4.5
const ACCENT_MIX = 0.55

describe("pointer light", () => {
  it("never resets the glow image with a background shorthand on a button or a card", () => {
    const bodies = bodiesFor(/\.(btn|lift)\b/)
    expect(bodies.length).toBeGreaterThan(3)
    for (const body of bodies) expect(body).not.toMatch(/(^|[;\s])background:/)
  })

  it("shows the button and card hover only where a pointer can hover", () => {
    const gated = blockAfter(HOVER_QUERY)
    expect(gated).toContain(".btn:hover")
    const outside = css.replace(gated, "")
    expect(outside).not.toMatch(/\.(btn|lift):hover/)
  })

  it("turns the edge light and the lit dots off for reduced motion", () => {
    const reduced = blockAfter(REDUCED_QUERY)
    expect(reduced).toContain(".sheen::before")
    expect(reduced).toContain(".hero-lit")
  })
})

describe("accent word contrast", () => {
  for (const mode of ["light", "dark"] as const) {
    it(`${mode}: each color stop passes AA on the background`, () => {
      const { primary, foreground, background } = site.theme[mode]
      expect(contrast(primary, background)).toBeGreaterThanOrEqual(AA_TEXT)
      expect(contrast(mix(primary, foreground, ACCENT_MIX), background)).toBeGreaterThanOrEqual(AA_TEXT)
    })
  }
})
