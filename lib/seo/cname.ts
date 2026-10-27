/** Renders the CNAME file that names the custom domain. */
import type { Site } from "../site-schema"

export function renderCname(site: Site): string {
  return `${site.domain}\n`
}
