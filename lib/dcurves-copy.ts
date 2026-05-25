export function getDcurvesLibraryDescription(downloads: string | null) {
  if (downloads) {
    return {
      hasDownloadCount: true,
      downloads,
    } as const
  }

  return {
    hasDownloadCount: false,
    fallbackDescription: "a widely used open-source Python library",
  } as const
}
