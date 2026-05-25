import { describe, expect, it } from "vitest"

import { getDcurvesLibraryDescription } from "../lib/dcurves-copy"

describe("getDcurvesLibraryDescription", () => {
  it("uses the download count when present", () => {
    expect(getDcurvesLibraryDescription("63k")).toEqual({
      hasDownloadCount: true,
      downloads: "63k",
    })
  })

  it("uses widely-used copy when downloads are missing", () => {
    expect(getDcurvesLibraryDescription(null)).toEqual({
      hasDownloadCount: false,
      fallbackDescription: "a widely used open-source Python library",
    })
  })
})
