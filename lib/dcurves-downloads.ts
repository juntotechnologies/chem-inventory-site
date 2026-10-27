/** Reads the dcurves download count that the build wrote to public/dcurves-downloads.json. */
import { z } from "zod"

const DownloadsFile = z.object({ roundedDownloads: z.string().nullable().optional() })
const files = import.meta.glob("../public/dcurves-downloads.json", { eager: true, import: "default" })

export function readBuiltDownloads(): string | null {
  const parsed = DownloadsFile.safeParse(Object.values(files)[0])
  return parsed.success ? (parsed.data.roundedDownloads ?? null) : null
}
