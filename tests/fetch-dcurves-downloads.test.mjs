import { describe, expect, it } from "vitest"

import { fetchShieldsDownloads, getDcurvesDownloads } from "../scripts/fetch-dcurves-downloads.mjs"

function createJsonResponse(body, ok = true) {
  return {
    ok,
    status: ok ? 200 : 500,
    statusText: ok ? "OK" : "Server Error",
    async json() {
      return body
    },
  }
}

describe("fetchShieldsDownloads", () => {
  it("reads the compact download count from Shields JSON", async () => {
    const downloads = await fetchShieldsDownloads(async () => createJsonResponse({ message: "63k" }))

    expect(downloads).toEqual({
      source: "shields",
      totalDownloads: null,
      roundedDownloads: "63k",
    })
  })

  it("trims the Shields message", async () => {
    const downloads = await fetchShieldsDownloads(async () => createJsonResponse({ message: " 63k " }))

    expect(downloads.roundedDownloads).toBe("63k")
  })

  it("falls back to unavailable data when Shields cannot be fetched", async () => {
    const downloads = await getDcurvesDownloads(async () => {
      throw new Error("network down")
    })

    expect(downloads).toEqual({
      source: "unavailable",
      totalDownloads: null,
      roundedDownloads: null,
    })
  })

  it("falls back to unavailable data when Shields omits the count", async () => {
    const downloads = await getDcurvesDownloads(async () => createJsonResponse({}))

    expect(downloads.roundedDownloads).toBeNull()
  })
})
