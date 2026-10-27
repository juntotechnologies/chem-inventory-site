/** Renders agents.txt: what the site is and what an automated agent may do. */
import type { Site } from "../site-schema"
import { GENERATED_NOTE, absoluteUrl } from "./urls"

function ruleLines(prefix: string, rules: string[]): string {
  const lines: string[] = []
  for (const rule of rules) lines.push(`${prefix}: ${rule}`)
  return lines.join("\n")
}

function profileLines(site: Site): string {
  return [
    `Site: ${site.brand.name}`,
    `URL: ${site.url}`,
    `Summary: ${site.description}`,
    `Operator: ${site.brand.maker.name}`,
    `Machine-readable summary: ${absoluteUrl(site, "/llms.txt")}`,
  ].join("\n")
}

function contactLines(site: Site): string {
  return [`Contact: ${site.links.booking}`, `Demo: ${site.links.demo}`].join("\n")
}

export function renderAgents(site: Site): string {
  const rules = `User-agent: *\n${ruleLines("Allow", site.seo.agentsMay)}\n${ruleLines("Disallow", site.seo.agentsMayNot)}`
  return `# ${GENERATED_NOTE}\n\n${profileLines(site)}\n\n${rules}\n\n${contactLines(site)}\n`
}
