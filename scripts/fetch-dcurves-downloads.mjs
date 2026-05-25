import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

const SHIELDS_BADGE_JSON_URL = "https://img.shields.io/pepy/dt/dcurves.json"
const OUTPUT_DIRECTORY = "public"
const OUTPUT_FILENAME = "dcurves-downloads.json"

async function fetchShieldsDownloads() {
  const response = await fetch(SHIELDS_BADGE_JSON_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch dcurves downloads: ${response.status} ${response.statusText}`)
  }

  const badge = await response.json()
  const roundedDownloads = badge.message

  if (typeof roundedDownloads !== "string" || !roundedDownloads.trim()) {
    throw new Error("Shields response did not include a download count")
  }

  return {
    source: "shields",
    totalDownloads: null,
    roundedDownloads: roundedDownloads.trim(),
  }
}

async function getDcurvesDownloads() {
  return fetchShieldsDownloads()
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
