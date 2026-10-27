/** Imports a TypeScript module from a script, using the project's Vite config for aliases and plugins. */
import { fileURLToPath } from "node:url"
import { loadConfigFromFile, runnerImport } from "vite"

export const ROOT = fileURLToPath(new URL("..", import.meta.url))

export async function importTs(relativePath) {
  const loaded = await loadConfigFromFile({ command: "build", mode: "production" }, undefined, ROOT)
  const { module } = await runnerImport(`${ROOT}${relativePath}`, { ...loaded?.config, configFile: false })
  return module
}
