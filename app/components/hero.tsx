/** The hero: headline, origin line and two actions on the left; the product demo on the right. */
import type { CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"

import { InventoryDashboard } from "@/app/components/inventory-dashboard"
import { UI_LABELS } from "@/app/ui-labels"
import { Button } from "@/components/ui/button"

function riseDelay(ms: number) {
  return { "--rise-delay": `${ms}ms` } as CSSProperties
}

function HeroActions() {
  return (
    <div className="btn-row mx-auto mt-8 lg:mx-0">
      <Button asChild size="lg">
        <a href={UI_LABELS.links.booking} target="_blank" rel="noopener noreferrer">{UI_LABELS.actions.bookMeeting}</a>
      </Button>
      <Button asChild size="lg" variant="outline">
        <a href={UI_LABELS.links.staticDemo}>
          {UI_LABELS.actions.staticDemo}
          <ArrowUpRight />
        </a>
      </Button>
    </div>
  )
}

function HeroCopy() {
  return (
    <div className="col-span-12 text-center lg:col-span-5 lg:text-left">
      <p className="eyebrow rise" style={riseDelay(0)}>{UI_LABELS.hero.eyebrow}</p>
      <h1 className="rise mt-4 text-display" style={riseDelay(80)}>{UI_LABELS.hero.title}</h1>
      <p className="rise mx-auto mt-6 max-w-[34rem] text-lead text-muted-foreground lg:mx-0" style={riseDelay(160)}>{UI_LABELS.hero.body}</p>
      <div className="rise" style={riseDelay(240)}><HeroActions /></div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="shell grid-12 items-center gap-y-12">
        <HeroCopy />
        <div className="rise col-span-12 flex justify-center lg:col-span-7" style={riseDelay(200)}>
          <InventoryDashboard />
        </div>
      </div>
    </section>
  )
}
