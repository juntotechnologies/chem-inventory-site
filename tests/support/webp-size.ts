/** Reads the pixel size of a WebP file from its first chunk: lossy (VP8), lossless (VP8L) or extended (VP8X). */
export type PixelSize = { width: number; height: number }

const CHUNK_AT = 12

function readLossy(file: Buffer): PixelSize {
  return { width: file.readUInt16LE(26) & 0x3fff, height: file.readUInt16LE(28) & 0x3fff }
}

function readLossless(file: Buffer): PixelSize {
  const bits = file.readUInt32LE(21)
  return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
}

function readExtended(file: Buffer): PixelSize {
  return { width: file.readUIntLE(24, 3) + 1, height: file.readUIntLE(27, 3) + 1 }
}

const READERS: Record<string, (file: Buffer) => PixelSize> = {
  "VP8 ": readLossy,
  VP8L: readLossless,
  VP8X: readExtended,
}

export function isWebp(file: Buffer): boolean {
  return file.toString("ascii", 0, 4) === "RIFF" && file.toString("ascii", 8, 12) === "WEBP"
}

export function readWebpSize(file: Buffer): PixelSize {
  const read = READERS[file.toString("ascii", CHUNK_AT, CHUNK_AT + 4)]
  if (!read) throw new Error("unknown WebP chunk")
  return read(file)
}
