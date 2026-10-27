/** Turns an SVG string into a PNG that records the hash of its source. */
import { Resvg } from "@resvg/resvg-js"
import { SOURCE_KEY, embedText, sha256 } from "./png"

const FONT_OPTIONS = { loadSystemFonts: true, defaultFontFamily: "Helvetica Neue" }

export function renderPng(svg: string, width: number): Buffer {
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: width }, font: FONT_OPTIONS })
  return embedText(resvg.render().asPng(), SOURCE_KEY, sha256(svg))
}
