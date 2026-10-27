import { readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { UI_LABELS } from "../app/ui-labels"
import { site } from "../lib/site"
import { renderOgSvg } from "../lib/seo/graphics"
import { INDEX_HTML_PATH, TEXT_FILES } from "../lib/seo/files"
import { render } from "../src/entry-server"
import { bannedClaimsIn } from "./support/claims"
import rules from "./support/copy-rules.json"

const ROOT = join(__dirname, "..")
const NOT_COPY = /^(https?:|mailto:|#|\/)/

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return NOT_COPY.test(value) ? [] : [value]
  if (value === null || typeof value !== "object") return []
  return Object.values(value).flatMap(collectStrings)
}

function fromDisk(path: string): [string, string] {
  return [path, readFileSync(join(ROOT, path), "utf8")]
}

function sources(): [string, string][] {
  const generated = [...TEXT_FILES.map((file) => file.path), INDEX_HTML_PATH].map(fromDisk)
  const labels: [string, string] = ["UI_LABELS and site.json", collectStrings([UI_LABELS, site]).join("\n")]
  return [labels, ["rendered page", render()], ["og image text", renderOgSvg(site)], ...generated]
}

function offenders(): string[] {
  return sources().flatMap(([name, text]) => bannedClaimsIn(text).map((term) => `${name}: "${term}"`))
}

describe("banned claim words", () => {
  it("lists the words from the product evidence report", () => {
    expect(rules.bannedClaims).toEqual(expect.arrayContaining(["immutable", "audit-ready", "Part 11", "forecast", "amend"]))
  })

  it("never appear in page text, generated files or the og image", () => {
    expect(offenders()).toEqual([])
  })

  it("are caught when one returns", () => {
    for (const text of ["An audit-ready report", "Custom fields", "It is immutable", "Part 11 ready", "Forecasting views"]) {
      expect(bannedClaimsIn(text)).not.toEqual([])
    }
  })

  it("leave ordinary words alone", () => {
    for (const text of ["An ideal deal", "Audit Log", "Update the batch", "Approve nothing else"]) {
      expect(bannedClaimsIn(text)).toEqual([])
    }
  })
})
