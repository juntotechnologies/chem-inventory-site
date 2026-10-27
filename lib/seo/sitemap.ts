/** Renders sitemap.xml with one entry per page in site.json. */
import type { Site } from "../site-schema"
import { GENERATED_NOTE, absoluteUrl } from "./urls"

const XMLNS = "http://www.sitemaps.org/schemas/sitemap/0.9"

function urlEntry(site: Site, page: { path: string }): string {
  return `  <url>\n    <loc>${absoluteUrl(site, page.path)}</loc>\n  </url>`
}

export function renderSitemap(site: Site): string {
  const entries: string[] = []
  for (const page of site.seo.pages) entries.push(urlEntry(site, page))
  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<!-- ${GENERATED_NOTE} -->`
  return `${header}\n<urlset xmlns="${XMLNS}">\n${entries.join("\n")}\n</urlset>\n`
}
