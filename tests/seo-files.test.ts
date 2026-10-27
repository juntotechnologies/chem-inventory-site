import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { site } from "../lib/site"
import { IMAGE_FILES, INDEX_HTML_PATH, TEXT_FILES } from "../lib/seo/files"
import { injectHead, renderHeadBlock } from "../lib/seo/head"
import { SOURCE_KEY, readSize, readText, sha256 } from "../lib/seo/png"

const ROOT = join(__dirname, "..")

function onDisk(path: string): Buffer {
  return readFileSync(join(ROOT, path))
}

describe("generated text files", () => {
  for (const file of TEXT_FILES) {
    it(`${file.path} matches site.json`, () => {
      expect(onDisk(file.path).toString("utf8")).toBe(file.render(site))
    })
  }
})

describe("index.html head block", () => {
  it("matches site.json", () => {
    const current = onDisk(INDEX_HTML_PATH).toString("utf8")
    expect(injectHead(current, renderHeadBlock(site))).toBe(current)
  })
})

describe("generated images", () => {
  for (const file of IMAGE_FILES) {
    it(`${file.path} comes from the current site.json`, () => {
      const png = onDisk(file.path)
      expect(readText(png, SOURCE_KEY)).toBe(sha256(file.svg(site)))
      expect(readSize(png).width).toBe(file.width)
    })
  }

  it("makes the Open Graph image 1200 by 630", () => {
    const { width, height } = readSize(onDisk("public/og.png"))
    expect({ width, height }).toEqual({ width: 1200, height: 630 })
  })
})
