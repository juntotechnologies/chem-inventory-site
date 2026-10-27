/** Writes every generated file to disk. This module is the only one that touches the file system. */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import type { Site } from "../site-schema"
import { IMAGE_FILES, INDEX_HTML_PATH, TEXT_FILES, type ImageFile, type TextFile } from "./files"
import { injectHead, renderHeadBlock } from "./head"
import { renderPng } from "./raster"

async function writeFileDeep(root: string, path: string, content: string | Buffer): Promise<void> {
  const target = join(root, path)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, content)
}

async function writeText(root: string, site: Site, file: TextFile): Promise<void> {
  await writeFileDeep(root, file.path, file.render(site))
}

async function writeImage(root: string, site: Site, file: ImageFile): Promise<void> {
  await writeFileDeep(root, file.path, renderPng(file.svg(site), file.width))
}

async function writeIndexHtml(root: string, site: Site): Promise<void> {
  const current = await readFile(join(root, INDEX_HTML_PATH), "utf8")
  await writeFileDeep(root, INDEX_HTML_PATH, injectHead(current, renderHeadBlock(site)))
}

export async function writeAll(root: string, site: Site): Promise<void> {
  for (const file of TEXT_FILES) await writeText(root, site, file)
  for (const file of IMAGE_FILES) await writeImage(root, site, file)
  await writeIndexHtml(root, site)
}
