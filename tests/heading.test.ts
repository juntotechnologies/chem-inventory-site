import { describe, expect, it } from "vitest"

import { site } from "../lib/site"
import { splitAccent } from "../lib/heading"

describe("splitAccent", () => {
  it("splits around the last match of the word", () => {
    expect(splitAccent("The Operating System for Chemical Labs", "Chemical Labs")).toEqual(["The Operating System for ", "Chemical Labs", ""])
  })

  it("leaves the heading whole when the word is missing or empty", () => {
    expect(splitAccent("A heading", "other")).toEqual(["A heading", "", ""])
    expect(splitAccent("A heading", "")).toEqual(["A heading", "", ""])
  })

  it("finds the accent word of the site headline", () => {
    expect(site.headline).toContain(site.hero.accentWord)
  })
})
