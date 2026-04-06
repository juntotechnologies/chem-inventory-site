import ReactDOM from "react-dom/client"

import App from "@/src/App"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
    <App />
  </ThemeProvider>,
)
