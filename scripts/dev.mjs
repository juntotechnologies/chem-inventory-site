/** Starts the dev server on all interfaces and prints only the tailnet link. */
import { createServer } from "vite"

function tailnetLink(server) {
  const { allowedHosts } = server.config.server
  const host = Array.isArray(allowedHosts) && allowedHosts.length > 0 ? allowedHosts[0] : "localhost"
  return `http://${host}:${server.httpServer.address().port}/`
}

async function main() {
  const server = await createServer({ logLevel: "error" })
  await server.listen()
  console.log(tailnetLink(server))
}

await main()
