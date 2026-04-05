import { getDcurvesDownloads } from "@/lib/dcurves-downloads"

export const revalidate = 21600

export async function GET() {
  const downloads = await getDcurvesDownloads()

  return Response.json({
    ...downloads,
    updatedCadence: "up to every 6 hours",
  })
}
