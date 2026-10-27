/** Renders robots.txt: allow every listed crawler and name the sitemap. */
import type { Site } from "../site-schema"
import { GENERATED_NOTE, absoluteUrl } from "./urls"

function crawlerBlock(agent: string): string {
  return `User-agent: ${agent}\nAllow: /`
}

export function renderRobots(site: Site): string {
  const blocks = site.seo.crawlers.map(crawlerBlock).join("\n\n")
  const sitemap = `Sitemap: ${absoluteUrl(site, "/sitemap.xml")}`
  return `# ${GENERATED_NOTE}\n\n${blocks}\n\n${sitemap}\n`
}
