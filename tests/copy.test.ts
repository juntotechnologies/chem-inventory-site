import { describe, expect, it } from "vitest"

import { UI_LABELS } from "../app/ui-labels"
import { site } from "../lib/site"
import { countWords } from "../lib/site-schema"
import { render } from "../src/entry-server"

const BANNED = /\b(seamless(ly)?|elevate[sd]?|empower(s|ed|ing)?|robust|streamline[sd]?|cutting-edge|tailored|bespoke|white glove|custom software)\b/i
const REMOVED_PITCH = /built with you|designed directly with your team|developed with your team|focused\. tailored/i
const DASHES = /[–—]/
const MAX_SENTENCE_WORDS = 25
const NOT_COPY = /^(https?:|mailto:|#|\/)/

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return NOT_COPY.test(value) ? [] : [value]
  if (value === null || typeof value !== "object") return []
  return Object.values(value).flatMap(collectStrings)
}

function sentencesOf(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean)
}

function siteCopy() {
  return [site.headline, site.tagline, site.title, site.description, site.brand, site.hero, site.features]
}

const allCopy = collectStrings([UI_LABELS, siteCopy()])

describe("site copy", () => {
  it("holds no filler word or tailoring pitch", () => {
    for (const text of allCopy) {
      expect(text).not.toMatch(BANNED)
      expect(text).not.toMatch(REMOVED_PITCH)
    }
  })

  it("holds no em dash or en dash", () => {
    for (const text of allCopy) expect(text).not.toMatch(DASHES)
  })

  it("keeps every sentence to 25 words or fewer", () => {
    const sentences = allCopy.flatMap(sentencesOf)
    for (const sentence of sentences) expect(countWords(sentence)).toBeLessThanOrEqual(MAX_SENTENCE_WORDS)
  })
})

describe("rendered page", () => {
  const html = render()

  it("leads with the planned headline", () => {
    expect(site.headline).toBe("The Operating System for Chemical Labs")
    expect(html).toContain(`>${site.headline}</h1>`)
  })

  it("has no Built With You section and no mock stat tiles", () => {
    expect(html).not.toMatch(REMOVED_PITCH)
    expect(html).not.toContain("1738")
  })

  it("renders every feature group from site.json", () => {
    for (const feature of site.features) expect(html).toContain(feature.statement)
  })

  it("opens the hero body with the factual line, then the origin", () => {
    expect(UI_LABELS.hero.body.startsWith(`${site.tagline} `)).toBe(true)
    expect(UI_LABELS.hero.body).toContain("direct work inside a commercial chemistry lab")
  })

  it("shows a real screenshot in the hero and no mock dashboard", () => {
    expect(html).toContain(`src="${site.hero.screenshot.src}"`)
    expect(html).not.toMatch(/Chemical Inventory Dashboard|Select a section from the sidebar/)
  })

  it("dates the video and links the static demo beside it", () => {
    const video = html.slice(html.indexOf('id="video"'), html.indexOf('id="features"'))
    expect(video).toContain("Early walkthrough")
    expect(video).toContain(UI_LABELS.video.caption)
    expect(video).toContain(`href="${site.links.demo}"`)
  })

  it("lists the three benefits", () => {
    expect(UI_LABELS.product.benefits).toHaveLength(3)
    for (const benefit of UI_LABELS.product.benefits) expect(html).toContain(benefit.statement)
  })
})
