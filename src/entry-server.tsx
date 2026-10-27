/** Server entry: renders the page to an HTML string for the build prerender. */
import { renderToString } from "react-dom/server"

import App from "@/src/App"

export function render(): string {
  return renderToString(<App />)
}
