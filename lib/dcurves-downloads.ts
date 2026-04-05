const PEPY_PROJECT_URL = "https://pepy.tech/projects/dcurves"
const SHIELDS_BADGE_URL = "https://img.shields.io/pepy/dt/dcurves"
const FALLBACK_ROUNDED_DOWNLOADS = "58k"

export const DCURVES_DOWNLOADS_REVALIDATE_SECONDS = 21600

type DownloadsSource = "pepy" | "shields" | "fallback"

export type DcurvesDownloads = {
  source: DownloadsSource
  totalDownloads: number | null
  roundedDownloads: string
}

function formatRoundedDownloads(totalDownloads: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: 2,
  }).format(totalDownloads)
}

function extractPepyTotalDownloads(html: string) {
  const totalDownloadsMatch = html.match(/"totalDownloads":(\d+)/)

  if (!totalDownloadsMatch) {
    return null
  }

  return Number(totalDownloadsMatch[1])
}

function extractBadgeValue(svg: string) {
  const badgeValueMatch = svg.match(/aria-label="downloads:\s*([^"]+)"/i)

  if (!badgeValueMatch) {
    return null
  }

  return badgeValueMatch[1]
}

async function fetchPepyDownloads() {
  const response = await fetch(PEPY_PROJECT_URL, {
    next: { revalidate: DCURVES_DOWNLOADS_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    return null
  }

  const html = await response.text()
  const totalDownloads = extractPepyTotalDownloads(html)

  if (typeof totalDownloads !== "number" || !Number.isFinite(totalDownloads)) {
    return null
  }

  return {
    source: "pepy" as const,
    totalDownloads,
    roundedDownloads: formatRoundedDownloads(totalDownloads),
  }
}

async function fetchShieldsDownloads() {
  const response = await fetch(SHIELDS_BADGE_URL, {
    next: { revalidate: DCURVES_DOWNLOADS_REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    return null
  }

  const svg = await response.text()
  const roundedDownloads = extractBadgeValue(svg)

  if (!roundedDownloads) {
    return null
  }

  return {
    source: "shields" as const,
    totalDownloads: null,
    roundedDownloads,
  }
}

export async function getDcurvesDownloads(): Promise<DcurvesDownloads> {
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
