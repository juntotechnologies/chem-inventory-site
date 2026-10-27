/** The landing page: header, five sections and the footer. */
import { FeaturesSection } from "@/app/components/features-section"
import { Hero } from "@/app/components/hero"
import { PricingSection } from "@/app/components/pricing-section"
import { SiteFooter } from "@/app/components/site-footer"
import { SiteNav } from "@/app/components/site-nav"
import { TeamSection } from "@/app/components/team-section"
import { VideoSection } from "@/app/components/video-section"
import { UI_LABELS } from "@/app/ui-labels"
import { useRevealOnScroll } from "@/lib/reveal"

const SKIP_LINK_CLASS =
  "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"

function SkipLink() {
  return <a href="#main" className={SKIP_LINK_CLASS}>{UI_LABELS.menu.skipToContent}</a>
}

function Sections() {
  return (
    <main id="main">
      <Hero />
      <VideoSection />
      <FeaturesSection />
      <TeamSection />
      <PricingSection />
    </main>
  )
}

export default function Home() {
  useRevealOnScroll()
  return (
    <>
      <SkipLink />
      <SiteNav />
      <Sections />
      <SiteFooter />
    </>
  )
}
