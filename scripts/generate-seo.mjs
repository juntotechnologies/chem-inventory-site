/** Regenerates every file derived from site.json. Run with `npm run seo`. */
import { ROOT, importTs } from "./import-ts.mjs"

async function main() {
  const { site } = await importTs("lib/site.ts")
  const { writeAll } = await importTs("lib/seo/write.ts")
  await writeAll(ROOT, site)
  console.log("Generated files written from site.json.")
}

await main()
