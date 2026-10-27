/** Renders /.well-known/agents.json: the same agent rules as agents.txt, as JSON. */
import type { Site } from "../site-schema"
import { absoluteUrl } from "./urls"

export function renderAgentsJson(site: Site): string {
  const rules = {
    name: site.brand.name,
    url: site.url,
    summary: site.description,
    mayDo: site.seo.agentsMay,
    mayNotDo: site.seo.agentsMayNot,
    contact: site.links.booking,
    demo: site.links.demo,
    sitemap: absoluteUrl(site, "/sitemap.xml"),
    llms: absoluteUrl(site, "/llms.txt"),
  }
  return `${JSON.stringify(rules, null, 2)}\n`
}
