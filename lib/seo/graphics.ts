/** Renders the SVG sources for the favicon, the touch icon and the Open Graph image. */
import type { Site } from "../site-schema"
import { escapeHtml } from "./html"

const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"
const HEADLINE_LINE_CHARS = 20
const HEADLINE_LINE_GAP = 92

type Mark = { x: number; y: number; scale: number; stroke: number; color: string }

function rect(attributes: string): string {
  return `<rect ${attributes}/>`
}

function frame(width: number, height: number, body: string[]): string {
  const size = `width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"`
  return `<svg xmlns="http://www.w3.org/2000/svg" ${size}>${body.join("")}</svg>`
}

function markGroup(site: Site, mark: Mark): string {
  const place = `translate(${mark.x} ${mark.y}) scale(${mark.scale})`
  const style = `fill="none" stroke="${mark.color}" stroke-width="${mark.stroke}" stroke-linecap="round" stroke-linejoin="round"`
  return `<g transform="${place}" ${style}><path d="${site.brand.markPath}"/></g>`
}

function svgText(x: number, y: number, attributes: string, text: string): string {
  return `<text x="${x}" y="${y}" font-family="${FONT}" ${attributes}>${escapeHtml(text)}</text>`
}

function fitsOnLine(line: string | undefined, word: string, maxChars: number): boolean {
  return line !== undefined && line.length + word.length < maxChars
}

function appendWord(lines: string[], word: string, maxChars: number): void {
  const last = lines.length - 1
  if (fitsOnLine(lines[last], word, maxChars)) lines[last] += ` ${word}`
  else lines.push(word)
}

function packLines(words: string[], maxChars: number): string[] {
  const lines: string[] = []
  for (const word of words) appendWord(lines, word, maxChars)
  return lines
}

function headlineSvg(site: Site): string {
  const lines = packLines(site.headline.split(" "), HEADLINE_LINE_CHARS)
  const style = `font-size="80" font-weight="700" letter-spacing="-2.4" fill="${site.theme.light.foreground}"`
  const texts: string[] = []
  for (const [index, line] of lines.entries()) {
    texts.push(svgText(80, 280 + index * HEADLINE_LINE_GAP, style, line))
  }
  return texts.join("")
}

export function renderOgSvg(site: Site): string {
  const t = site.theme.light
  return frame(1200, 630, [
    rect(`width="1200" height="630" fill="${t.background}"`),
    rect(`width="16" height="630" fill="${t.primary}"`),
    markGroup(site, { x: 80, y: 60, scale: 1.75, stroke: 2, color: t.primary }),
    svgText(134, 98, `font-size="32" font-weight="700" fill="${t.foreground}"`, site.brand.name),
    headlineSvg(site),
    svgText(80, 440, `font-size="32" fill="${t.mutedForeground}"`, site.brand.fullName),
    rect(`x="80" y="520" width="1040" height="2" fill="${t.border}"`),
    svgText(80, 578, `font-size="28" font-weight="700" fill="${t.primary}"`, site.domain),
  ])
}

export function renderFaviconSvg(site: Site): string {
  const t = site.theme.light
  return frame(64, 64, [
    rect(`width="64" height="64" rx="14" fill="${t.primary}"`),
    markGroup(site, { x: 5.6, y: 5.6, scale: 2.2, stroke: 2, color: t.primaryForeground }),
  ])
}

export function renderTouchIconSvg(site: Site): string {
  const t = site.theme.light
  return frame(180, 180, [
    rect(`width="180" height="180" fill="${t.primary}"`),
    markGroup(site, { x: 18, y: 18, scale: 6, stroke: 1.6, color: t.primaryForeground }),
  ])
}
