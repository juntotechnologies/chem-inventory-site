/** After the build, renders the page into dist/index.html so crawlers without JavaScript read the text. */
import { readFile, writeFile } from "node:fs/promises"
import { ROOT, importTs } from "./import-ts.mjs"

const DIST_INDEX = `${ROOT}dist/index.html`
const ROOT_MARKER = '<div id="root"></div>'

function injectRoot(html, rendered) {
  const at = html.indexOf(ROOT_MARKER)
  if (at === -1) throw new Error(`dist/index.html must hold ${ROOT_MARKER}`)
  return `${html.slice(0, at)}<div id="root">${rendered}</div>${html.slice(at + ROOT_MARKER.length)}`
}

async function main() {
  const { render } = await importTs("src/entry-server.tsx")
  const html = await readFile(DIST_INDEX, "utf8")
  await writeFile(DIST_INDEX, injectRoot(html, render()))
  console.log("Prerendered the landing page into dist/index.html.")
}

await main()
