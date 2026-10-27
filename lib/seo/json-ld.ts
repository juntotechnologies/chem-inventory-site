/** Builds the JSON-LD graph: one Organization and one SoftwareApplication. */
import type { Feature, Site } from "../site-schema"
import { absoluteUrl } from "./urls"

function organizationId(site: Site): string {
  return `${site.brand.maker.url}#organization`
}

function buildOrganization(site: Site) {
  return {
    "@type": "Organization",
    "@id": organizationId(site),
    name: site.brand.maker.name,
    url: site.brand.maker.url,
  }
}

function featureTitle(feature: Feature): string {
  return feature.title
}

function buildSoftware(site: Site) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${site.url}#software`,
    name: site.brand.name,
    alternateName: site.brand.alias,
    description: site.description,
    url: site.url,
    image: absoluteUrl(site, site.seo.og.image),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    featureList: site.features.map(featureTitle),
    publisher: { "@id": organizationId(site) },
  }
}

export function buildJsonLd(site: Site) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildOrganization(site), buildSoftware(site)],
  }
}
