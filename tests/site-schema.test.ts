import { describe, expect, it } from "vitest"

import raw from "../site.json"
import { SiteSchema, countWords } from "../lib/site-schema"

function withFeatures(count: number) {
  const features = Array.from({ length: count }, () => raw.features[0])
  return { ...raw, features }
}

describe("site.json schema", () => {
  it("accepts the committed file", () => {
    expect(SiteSchema.safeParse(raw).success).toBe(true)
  })

  it("holds 4 to 6 feature groups", () => {
    expect(SiteSchema.safeParse(withFeatures(3)).success).toBe(false)
    expect(SiteSchema.safeParse(withFeatures(7)).success).toBe(false)
    expect(SiteSchema.safeParse(withFeatures(4)).success).toBe(true)
  })

  it("rejects a statement of more than 20 words", () => {
    const long = Array(21).fill("word").join(" ")
    const features = [{ ...raw.features[0], statement: long }, ...raw.features.slice(1)]
    expect(SiteSchema.safeParse({ ...raw, features }).success).toBe(false)
  })

  it("rejects a feature group without a screenshot", () => {
    const features = [{ ...raw.features[0], screenshot: null }, ...raw.features.slice(1)]
    expect(SiteSchema.safeParse({ ...raw, features }).success).toBe(false)
  })

  it("rejects a hero without a screenshot", () => {
    expect(SiteSchema.safeParse({ ...raw, hero: {} }).success).toBe(false)
  })

  it("counts words", () => {
    expect(countWords("  one two  three ")).toBe(3)
  })
})
