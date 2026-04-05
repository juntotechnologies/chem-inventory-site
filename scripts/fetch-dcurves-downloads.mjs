import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

const PEPY_PROJECT_URL = "https://pepy.tech/projects/dcurves"
const SHIELDS_BADGE_URL = "https://img.shields.io/pepy/dt/dcurves"
const FALLBACK_ROUNDED_DOWNLOADS = "58k"
const OUTPUT_DIRECTORY = "public"
const OUTPUT_FILENAME = "dcurves-downloads.json"

function formatRoundedDownloads(totalDownloads) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: 2,
  }).format(totalDownloads)
}

function extractPepyTotalDownloads(html) {
  const totalDownloadsMatch = html.match(/"totalDownloads":(\d+)/)

  if (!totalDownloadsMatch) {
    return null
  }

  return Number(totalDownloadsMatch[1])
}

function extractBadgeValue(svg) {
  const badgeValueMatch = svg.match(/aria-label="downloads:\s*([^"]+)"/i)

  if (!badgeValueMatch) {
    return null
  }

  return badgeValueMatch[1]
}

async function fetchPepyDownloads() {
  const response = await fetch(PEPY_PROJECT_URL)

  if (!response.ok) {
    return null
  }

  const html = await response.text()
  const totalDownloads = extractPepyTotalDownloads(html)

  if (typeof totalDownloads !== "number" || !Number.isFinite(totalDownloads)) {
    return null
  }

  return {
    source: "pepy",
    totalDownloads,
    roundedDownloads: formatRoundedDownloads(totalDownloads),
  }
}

async function fetchShieldsDownloads() {
  const response = await fetch(SHIELDS_BADGE_URL)

  if (!response.ok) {
    return null
  }

  const svg = await response.text()
  const roundedDownloads = extractBadgeValue(svg)

  if (!roundedDownloads) {
    return null
  }

  return {
    source: "shields",
    totalDownloads: null,
    roundedDownloads,
  }
}

async function getDcurvesDownloads() {
  try {
    const pepyDownloads = await fetchPepyDownloads()

    if (pepyDownloads) {
      return pepyDownloads
    }

    const shieldsDownloads = await fetchShieldsDownloads()

    if (shieldsDownloads) {
      return shieldsDownloads
    }
  } catch {
    // Fall through to the static fallback.
  }

  return {
    source: "fallback",
    totalDownloads: null,
    roundedDownloads: FALLBACK_ROUNDED_DOWNLOADS,
  }
}

const downloads = await getDcurvesDownloads()
const outputPath = join(process.cwd(), OUTPUT_DIRECTORY, OUTPUT_FILENAME)

await mkdir(join(process.cwd(), OUTPUT_DIRECTORY), { recursive: true })
await writeFile(
  outputPath,
  JSON.stringify(
    {
      ...downloads,
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
)

