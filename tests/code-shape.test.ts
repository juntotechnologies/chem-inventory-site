import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

import { findViolations } from "./support/code-shape"

const ROOT = join(__dirname, "..")
const SCOPED_DIRECTORIES = ["app", "lib", "src"]
const SCOPED_FILES = ["vite.config.ts", "scripts/generate-seo.mjs", "scripts/prerender.mjs", "scripts/dev.mjs"]
const CODE_FILE = /\.(ts|tsx|mjs)$/
// Vendored or soon-to-be-replaced files that this check does not cover.
const LEGACY_EXEMPT = new Set(["app/components/inventory-dashboard.tsx"])

function listCode(directory: string): string[] {
  const found: string[] = []
  for (const name of readdirSync(join(ROOT, directory))) {
    const relative = `${directory}/${name}`
    if (statSync(join(ROOT, relative)).isDirectory()) found.push(...listCode(relative))
    else if (CODE_FILE.test(name)) found.push(relative)
  }
  return found
}

function scopedFiles(): string[] {
  const listed = SCOPED_DIRECTORIES.flatMap(listCode)
  return [...listed, ...SCOPED_FILES].filter((file) => !LEGACY_EXEMPT.has(file))
}

function violationsIn(file: string): string[] {
  return findViolations(file, readFileSync(join(ROOT, file), "utf8"))
}

describe("code shape", () => {
  it("keeps functions short, flat and unnested in every scoped file", () => {
    const problems = scopedFiles().flatMap(violationsIn)
    expect(problems).toEqual([])
  })
})
