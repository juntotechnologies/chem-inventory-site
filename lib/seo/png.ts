/** Reads and writes PNG metadata: the image size and the source hash kept in a tEXt chunk. */
import { createHash } from "node:crypto"

export const SOURCE_KEY = "source-sha256"
const SIGNATURE_LENGTH = 8
const IEND_LENGTH = 12
const CHUNK_OVERHEAD = 12

type Chunk = { type: string; data: Buffer }

export function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex")
}

function crcEntry(n: number): number {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
}

function buildCrcTable(): Uint32Array {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) table[n] = crcEntry(n)
  return table
}

const CRC_TABLE = buildCrcTable()

function crc32(bytes: Buffer): number {
  let crc = 0xffffffff
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 255] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function encodeChunk(type: string, data: Buffer): Buffer {
  const body = Buffer.concat([Buffer.from(type, "latin1"), data])
  const length = Buffer.alloc(4)
  const crc = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

function readChunks(png: Buffer): Chunk[] {
  const chunks: Chunk[] = []
  let offset = SIGNATURE_LENGTH
  while (offset < png.length) {
    const length = png.readUInt32BE(offset)
    const type = png.toString("latin1", offset + 4, offset + 8)
    chunks.push({ type, data: png.subarray(offset + 8, offset + 8 + length) })
    offset += length + CHUNK_OVERHEAD
  }
  return chunks
}

export function embedText(png: Buffer, key: string, value: string): Buffer {
  const text = encodeChunk("tEXt", Buffer.from(`${key}\0${value}`, "latin1"))
  const head = png.subarray(0, png.length - IEND_LENGTH)
  return Buffer.concat([head, text, png.subarray(png.length - IEND_LENGTH)])
}

function textKey(chunk: Chunk): string {
  return chunk.data.toString("latin1").split("\0")[0]
}

function isTextChunk(key: string, chunk: Chunk): boolean {
  return chunk.type === "tEXt" && textKey(chunk) === key
}

export function readText(png: Buffer, key: string): string | null {
  const chunk = readChunks(png).find(isTextChunk.bind(null, key))
  return chunk ? chunk.data.toString("latin1").split("\0")[1] : null
}

export function readSize(png: Buffer): { width: number; height: number } {
  const header = readChunks(png)[0]
  if (header?.type !== "IHDR") throw new Error("not a PNG file")
  return { width: header.data.readUInt32BE(0), height: header.data.readUInt32BE(4) }
}
