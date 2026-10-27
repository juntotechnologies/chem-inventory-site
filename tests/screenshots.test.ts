import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import raw from "../site.json"
import { site } from "../lib/site"
import type { Screenshot } from "../lib/site-schema"
import rules from "./support/copy-rules.json"
import { isWebp, readWebpSize } from "./support/webp-size"

const PUBLIC = join(__dirname, "..", "public")
const APP_IMAGES = "images/app"

type Named = { name: string; screenshot: Screenshot }

function named(): Named[] {
  const features = site.features.map((feature) => ({ name: feature.id, screenshot: feature.screenshot }))
  return [{ name: "hero", screenshot: site.hero.screenshot }, ...features]
}

function fileOf(screenshot: Screenshot): string {
  return join(PUBLIC, screenshot.src)
}

function hasNoScreenshot(feature: { screenshot: unknown }): boolean {
  return feature.screenshot === null || feature.screenshot === undefined
}

describe("feature screenshots", () => {
  it("gives every feature group a screenshot in site.json", () => {
    expect(raw.features.filter(hasNoScreenshot)).toEqual([])
  })

  it("gives the hero a screenshot in site.json", () => {
    expect(hasNoScreenshot(raw.hero)).toBe(false)
  })

  for (const { name, screenshot } of named()) {
    describe(name, () => {
      it("has a file on disk", () => {
        expect(existsSync(fileOf(screenshot))).toBe(true)
      })

      it(`is ${rules.maxScreenshotBytes} bytes or smaller`, () => {
        expect(statSync(fileOf(screenshot)).size).toBeLessThanOrEqual(rules.maxScreenshotBytes)
      })

      it("is a WebP file of the declared size", () => {
        const file = readFileSync(fileOf(screenshot))
        expect(isWebp(file)).toBe(true)
        expect(readWebpSize(file)).toEqual({ width: screenshot.width, height: screenshot.height })
      })

      it("has alt text that describes the screen", () => {
        expect(screenshot.alt.split(/\s+/).length).toBeGreaterThanOrEqual(8)
      })
    })
  }

  it("uses a different file and different alt text for each screenshot", () => {
    const shots = named().map((item) => item.screenshot)
    expect(new Set(shots.map((shot) => shot.src)).size).toBe(shots.length)
    expect(new Set(shots.map((shot) => shot.alt)).size).toBe(shots.length)
  })

  it("leaves no unused image in public/images/app", () => {
    const used = new Set(named().map((item) => item.screenshot.src.replace(/^\//, "")))
    const onDisk = readdirSync(join(PUBLIC, APP_IMAGES)).map((name) => `${APP_IMAGES}/${name}`)
    expect(onDisk.filter((path) => !used.has(path))).toEqual([])
  })
})
