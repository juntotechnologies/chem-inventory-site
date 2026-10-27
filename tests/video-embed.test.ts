import { describe, expect, it } from "vitest"

import { buildEmbedUrl } from "../lib/video-embed"

const EMBED = "https://www.youtube.com/embed/abc123"

describe("buildEmbedUrl", () => {
  it("adds muted autoplay and a loop on request", () => {
    expect(buildEmbedUrl(EMBED, true)).toBe(`${EMBED}?autoplay=1&mute=1&loop=1&playlist=abc123`)
  })

  it("loops without autoplay when autoplay is off", () => {
    expect(buildEmbedUrl(EMBED, false)).toBe(`${EMBED}?loop=1&playlist=abc123`)
  })

  it("keeps an existing query", () => {
    expect(buildEmbedUrl(`${EMBED}?rel=0`, false)).toContain("rel=0&loop=1")
  })
})
