import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { site } from "../lib/site"
import { contrast, mix } from "./support/contrast"

const css = readFileSync(join(__dirname, "..", "app/globals.css"), "utf8")
const HOVER_QUERY = "@media (hover: hover) and (pointer: fine) {"
const REDUCED_QUERY = "@media (prefers-reduced-motion: reduce) {"
const AA_TEXT = 4.5
const ACCENT_MIX = 0.55

function braceChange(char: string): number {
  if (char === "{") return 1
  return char === "}" ? -1 : 0
}

/** The text inside the braces that follow the query. Braces are counted, so nested rules stay inside. */
function blockAfter(query: string): string {
  const open = css.indexOf(query) + query.length
  let depth = 1
  let at = open
  while (depth > 0 && at < css.length) depth += braceChange(css[at++])
  return css.slice(open, at - 1)
}

function bodiesFor(selector: RegExp): string[] {
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  return rules.filter((rule) => selector.test(rule[1])).map((rule) => rule[2])
}

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
