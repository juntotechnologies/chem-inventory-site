import resolveConfig from "tailwindcss/resolveConfig"
import { describe, expect, it } from "vitest"

import { UI_LABELS } from "../app/ui-labels"
import { MENU_ID, WIDE_QUERY, isOpening, setInert } from "../lib/menu"
import { render } from "../src/entry-server"
import config from "../tailwind.config"
import { bodiesFor } from "./support/css"

const html = render()

function menuPanel(): string {
  const panel = new RegExp(`<nav[^>]*id="${MENU_ID}"[^>]*>([\\s\\S]*?)</nav>`).exec(html)
  return panel?.[1] ?? ""
}

function linksIn(markup: string): string[] {
  return markup.match(/<a\b[^>]*>/g) ?? []
}

function isSectionLink(tag: string): boolean {
  return /href="#[a-z-]+"/.test(tag)
}

function textOf(markup: string): string {
  return markup.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

describe("phone menu markup", () => {
  it("holds every section link and exactly one action", () => {
    const links = linksIn(menuPanel())
    expect(links.filter(isSectionLink)).toHaveLength(UI_LABELS.nav.length)
    expect(links.filter((tag) => !isSectionLink(tag))).toHaveLength(1)
  })

  it("does not list the demo or contact actions, which the page shows in its own sections", () => {
    const text = textOf(menuPanel())
    expect(text).not.toContain(UI_LABELS.actions.staticDemo)
    expect(text).not.toContain(UI_LABELS.actions.contactUs)
    expect(text).toContain(UI_LABELS.actions.bookMeeting)
  })
})

describe("menu helpers", () => {
  it("reads the toggle state", () => {
    expect(isOpening({ newState: "open" })).toBe(true)
    expect(isOpening({ newState: "closed" })).toBe(false)
  })

  it("sets and clears inert on every region", () => {
    const regions = [{ inert: false }, { inert: false }]
    setInert(regions, true)
    expect(regions.every((region) => region.inert)).toBe(true)
    setInert(regions, false)
    expect(regions.some((region) => region.inert)).toBe(false)
  })

  it("closes at the same width where Tailwind hides the burger", () => {
    const screens = resolveConfig(config).theme.screens as Record<string, string>
    expect(WIDE_QUERY).toBe(`(min-width: ${screens.md})`)
  })
})

describe("phone menu styles", () => {
  const panel = bodiesFor(/\.menu-panel\s*$/).join("\n")

  it("covers the screen below the header with an opaque background", () => {
    expect(panel).toContain("inset: 4rem 0 0 0")
    expect(panel).toContain("background: rgb(var(--background))")
  })

  it("keeps scroll inside the menu and locks the page behind it", () => {
    expect(panel).toContain("overscroll-behavior: contain")
    expect(bodiesFor(/html:has\(\.menu-panel:popover-open\)/).join("\n")).toContain("overflow: hidden")
  })

  it("never makes the panel a grid, so WebKit cannot stretch rows to the panel height", () => {
    expect(panel).not.toMatch(/display:\s*grid/)
    expect(bodiesFor(/\.btn-row\s*$/)[0]).toContain("align-content: start")
  })
})
