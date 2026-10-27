/** The hero: headline, origin line and two actions on the left; a real screenshot of the app on the right. */
import type { CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"

import { ScreenshotFrame } from "@/app/components/screenshot-frame"
import { UI_LABELS } from "@/app/ui-labels"
import { Button } from "@/components/ui/button"
import { splitAccent } from "@/lib/heading"
import { site } from "@/lib/site"

function riseDelay(ms: number) {
  return { "--rise-delay": `${ms}ms` } as CSSProperties
}

function BookButton() {
  return (
    <span className="sheen">
      <Button asChild size="lg">
        <a href={UI_LABELS.links.booking} target="_blank" rel="noopener noreferrer">{UI_LABELS.actions.bookMeeting}</a>
      </Button>
    </span>
  )
}

function DemoButton() {
  return (
    <Button asChild size="lg" variant="outline">
      <a href={UI_LABELS.links.staticDemo}>
        {UI_LABELS.actions.staticDemo}
        <ArrowUpRight />
      </a>
    </Button>
  )
}

function HeroActions() {
  return (
    <div className="btn-row mx-auto mt-8 lg:mx-0">
      <BookButton />
      <DemoButton />
    </div>
  )
}

function Headline() {
  const [before, accent, after] = splitAccent(UI_LABELS.hero.title, UI_LABELS.hero.accentWord)
  return (
    <>
      {before}
      {accent && <span className="accent-word">{accent}</span>}
      {after}
    </>
  )
}

function HeroCopy() {
  return (
    <div className="col-span-12 text-center lg:col-span-5 lg:text-left">
      <p className="eyebrow rise rise-text" style={riseDelay(0)}>{UI_LABELS.hero.eyebrow}</p>
      <h1 className="rise rise-text mt-4 text-display" style={riseDelay(80)}><Headline /></h1>
      <p className="rise rise-text mx-auto mt-6 max-w-[34rem] text-lead text-muted-foreground lg:mx-0" style={riseDelay(160)}>{UI_LABELS.hero.body}</p>
      <div className="rise" style={riseDelay(240)}><HeroActions /></div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="hero relative isolate pb-16 pt-12 md:pb-24 md:pt-20">
      <div aria-hidden="true" className="hero-field" />
      <div aria-hidden="true" className="hero-lit" />
      <div className="shell grid-12 items-center gap-y-12">
        <HeroCopy />
        <div className="rise col-span-12 lg:col-span-7" style={riseDelay(200)}>
          <ScreenshotFrame screenshot={site.hero.screenshot} priority />
        </div>
      </div>
    </section>
  )
}
