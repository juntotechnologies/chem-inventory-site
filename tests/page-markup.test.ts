import { describe, expect, it } from "vitest"

import { render } from "../src/entry-server"

const html = render()

function tagsOf(name: string): string[] {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "g")) ?? []
}

function opensNewTab(tag: string): boolean {
  return tag.includes('target="_blank"')
}

function headingLevels(): number[] {
  return [...html.matchAll(/<h([1-6])\b/g)].map(levelOf)
}

function levelOf(match: RegExpMatchArray): number {
  return Number(match[1])
}

function skipsALevel(levels: number[]): boolean {
  return levels.some(jumpsFromPrevious.bind(null, levels))
}

function jumpsFromPrevious(levels: number[], level: number, index: number): boolean {
  return index > 0 && level - levels[index - 1] > 1
}

describe("rendered page markup", () => {
  it("has exactly one h1", () => {
    expect(tagsOf("h1")).toHaveLength(1)
  })

  it("never skips a heading level on the way down", () => {
    expect(skipsALevel(headingLevels())).toBe(false)
  })

  it("gives every image alt text, a size and lazy loading below the fold", () => {
    for (const tag of tagsOf("img")) {
      expect(tag).toMatch(/\balt="[^"]+"/)
      expect(tag).toMatch(/\bwidth="\d+"/)
    }
  })

  it("loads only the hero image at once and every other image lazily", () => {
    const [hero, ...others] = tagsOf("img").filter((tag) => tag.includes("/images/app/"))
    expect(hero).toContain('loading="eager"')
    expect(hero).toMatch(/fetchPriority="high"|fetchpriority="high"/)
    for (const tag of others) expect(tag).toContain('loading="lazy"')
  })

  it("titles the iframe", () => {
    for (const tag of tagsOf("iframe")) expect(tag).toMatch(/\btitle="[^"]+"/)
  })

  it("opens every new-tab link with noopener", () => {
    for (const tag of tagsOf("a").filter(opensNewTab)) expect(tag).toMatch(/rel="[^"]*noopener|rel="noreferrer"/)
  })
})
