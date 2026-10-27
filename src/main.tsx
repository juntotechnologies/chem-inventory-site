/** Browser entry: hydrates the prerendered page, or renders it fresh in dev. */
import { createRoot, hydrateRoot } from "react-dom/client"

import App from "@/src/App"
import "@/app/globals.css"

const container = document.getElementById("root")!

if (container.hasChildNodes()) hydrateRoot(container, <App />)
else createRoot(container).render(<App />)
