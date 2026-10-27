import { describe, expect, it } from "vitest"

import { fillTemplate } from "../lib/template"

describe("fillTemplate", () => {
  it("fills every named slot", () => {
    expect(fillTemplate("{a} and {b} and {a}", { a: "1", b: "2" })).toBe("1 and 2 and 1")
  })

  it("leaves an unknown slot as written", () => {
    expect(fillTemplate("{missing}", {})).toBe("{missing}")
  })
})
