/** Renders the generated <head> block of index.html and injects it between markers. */
import type { Site } from "../site-schema"
import { ogAlt } from "./graphics"
import { escapeHtml, metaTag, safeJson } from "./html"
import { buildJsonLd } from "./json-ld"
import { absoluteUrl } from "./urls"

export const HEAD_START = "<!-- seo:start (generated from site.json by `npm run seo`; do not edit) -->"
export const HEAD_END = "<!-- seo:end -->"
export const ICON_PATHS = { favicon: "/favicon.svg", touch: "/apple-touch-icon.png" } as const

function basicTags(site: Site): string[] {
  return [
    `<title>${escapeHtml(site.title)}</title>`,
    metaTag("name", "description", site.description),
    `<link rel="canonical" href="${site.url}" />`,
    metaTag("name", "robots", "index, follow, max-image-preview:large"),
  ]
}

function themeTags(site: Site): string[] {
  const light = `<meta name="theme-color" content="${site.theme.light.background}" media="(prefers-color-scheme: light)" />`
  const dark = `<meta name="theme-color" content="${site.theme.dark.background}" media="(prefers-color-scheme: dark)" />`
  return [light, dark]
}

function iconTags(): string[] {
  return [
    `<link rel="icon" type="image/svg+xml" href="${ICON_PATHS.favicon}" />`,
    `<link rel="apple-touch-icon" href="${ICON_PATHS.touch}" />`,
  ]
}

function propertyTag([key, value]: [string, string]): string {
  return metaTag("property", key, value)
}

function nameTag([key, value]: [string, string]): string {
  return metaTag("name", key, value)
}

function openGraphTags(site: Site): string[] {
  const pairs: [string, string][] = [
    ["og:type", "website"],
    ["og:site_name", site.brand.name],
    ["og:title", site.title],
    ["og:description", site.description],
    ["og:url", site.url],
    ["og:locale", site.locale],
  ]
  return [...pairs.map(propertyTag), ...openGraphImageTags(site)]
}

function openGraphImageTags(site: Site): string[] {
  const { og } = site.seo
  const pairs: [string, string][] = [
    ["og:image", absoluteUrl(site, og.image)],
    ["og:image:width", String(og.width)],
    ["og:image:height", String(og.height)],
    ["og:image:alt", ogAlt(site)],
  ]
  return pairs.map(propertyTag)
}

function twitterTags(site: Site): string[] {
  const { og } = site.seo
  const pairs: [string, string][] = [
    ["twitter:card", "summary_large_image"],
    ["twitter:title", site.title],
    ["twitter:description", site.description],
    ["twitter:image", absoluteUrl(site, og.image)],
    ["twitter:image:alt", ogAlt(site)],
  ]
  return pairs.map(nameTag)
}

function jsonLdTag(site: Site): string {
  return `<script type="application/ld+json">\n${safeJson(buildJsonLd(site))}\n</script>`
}

function allTags(site: Site): string[] {
  return [...basicTags(site), ...themeTags(site), ...iconTags(), ...openGraphTags(site), ...twitterTags(site), jsonLdTag(site)]
}

export function renderHeadBlock(site: Site): string {
  return [HEAD_START, ...allTags(site), HEAD_END].join("\n    ")
}

export function injectHead(html: string, block: string): string {
  const start = html.indexOf(HEAD_START)
  const end = html.indexOf(HEAD_END)
  if (start === -1 || end === -1 || end < start) {
    throw new Error("index.html must hold the seo:start and seo:end markers")
  }
  return html.slice(0, start) + block + html.slice(end + HEAD_END.length)
}
