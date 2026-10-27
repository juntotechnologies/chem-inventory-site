/** Renders llms.txt: a short markdown summary for language-model crawlers. */
import type { Feature, Site } from "../site-schema"

function featureLine(feature: Feature): string {
  return `- ${feature.title}: ${feature.statement}`
}

function linkLine(name: string, url: string, note: string): string {
  return `- [${name}](${url}): ${note}`
}

function linkLines(site: Site): string[] {
  return [
    linkLine("Landing page", site.url, "Overview of the product."),
    linkLine("Static demo", site.links.demo, "Try the app with sample data."),
    linkLine("Book a meeting", site.links.booking, "Contact the maker and book a call."),
    linkLine(site.brand.maker.name, site.links.hub, "The company that makes ChemInventory."),
  ]
}

export function renderLlms(site: Site): string {
  const intro = `> ${site.description}`
  const maker = `${site.brand.name} (short name ${site.brand.alias}) is made by ${site.brand.maker.name}.`
  const features = site.features.map(featureLine).join("\n")
  const links = linkLines(site).join("\n")
  return `# ${site.brand.name}\n\n${intro}\n\n${maker}\n\n## Features\n\n${features}\n\n## Links\n\n${links}\n`
}
