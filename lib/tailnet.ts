/** Reads this machine's tailnet host name from the Tailscale CLI, or returns none. */
import { execFileSync } from "node:child_process"
import { z } from "zod"

const TailscaleStatus = z.object({ Self: z.object({ DNSName: z.string().min(1) }) })
const STATUS_TIMEOUT_MS = 3000

function readStatus(): unknown {
  const output = execFileSync("tailscale", ["status", "--json"], { encoding: "utf8", timeout: STATUS_TIMEOUT_MS })
  return JSON.parse(output)
}

export function tailnetHosts(): string[] {
  try {
    const status = TailscaleStatus.parse(readStatus())
    return [status.Self.DNSName.replace(/\.$/, "")]
  } catch {
    return []
  }
}
