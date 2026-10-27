/** Builds absolute URLs on the canonical origin from site.json. */
import type { Site } from "../site-schema"

export const GENERATED_NOTE = "Generated from site.json by `npm run seo`. Do not edit by hand."

export function absoluteUrl(site: Site, path: string): string {
  return new URL(path, site.url).toString()
}
