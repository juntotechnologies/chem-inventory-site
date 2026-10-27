/** Vite config: React, the @ alias, and servers that a tailnet device can reach. */
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

import { tailnetHosts } from "./lib/tailnet"

export default defineConfig(({ command, mode }) => {
  const isServer = command === "serve" && mode !== "test"
  const reachable = { host: true, allowedHosts: isServer ? tailnetHosts() : [] }
  return {
    plugins: [react()],
    resolve: { alias: { "@": path.resolve(__dirname) } },
    server: { ...reachable, strictPort: true },
    preview: { ...reachable, strictPort: true },
  }
})
