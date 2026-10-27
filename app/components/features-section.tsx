/** The features section: 4 to 6 feature groups, each with a title, one statement and a real screenshot, then the benefits. */
import { ScreenshotFrame } from "@/app/components/screenshot-frame"
import { Section } from "@/app/components/section"
import { UI_LABELS } from "@/app/ui-labels"
import type { Feature } from "@/lib/site-schema"
import { site } from "@/lib/site"

type BenefitProps = { title: string; statement: string }

function FeatureGroup({ feature }: { feature: Feature }) {
  return (
    <li data-reveal-item className="grid-12 gap-y-6 border-t py-12 first:border-t-0 first:pt-0">
      <h3 className="col-span-12 text-center text-heading lg:col-span-4 lg:text-left">{feature.title}</h3>
      <p className="col-span-12 text-center text-body text-muted-foreground lg:col-span-8 lg:text-left">{feature.statement}</p>
      <div className="col-span-12 mt-2">
        <ScreenshotFrame screenshot={feature.screenshot} />
      </div>
    </li>
  )
}

function renderFeature(feature: Feature) {
  return <FeatureGroup key={feature.id} feature={feature} />
}

function Benefit({ title, statement }: BenefitProps) {
  return (
    <li data-reveal-item className="col-span-12 border-t py-6 text-center lg:col-span-4 lg:text-left">
      <h4 className="text-body font-semibold">{title}</h4>
      <p className="mt-1 text-body text-muted-foreground">{statement}</p>
    </li>
  )
}

function renderBenefit(benefit: BenefitProps) {
  return <Benefit key={benefit.title} {...benefit} />
}

function BenefitList() {
  return (
    <div id="benefits" className="mt-16 scroll-mt-24 border-t pt-10">
      <h3 data-reveal-item className="text-center text-heading lg:text-left">{UI_LABELS.product.benefitsLabel}</h3>
      <ul className="grid-12 mt-4 gap-x-8">{UI_LABELS.product.benefits.map(renderBenefit)}</ul>
    </div>
  )
}

export function FeaturesSection() {
  const { eyebrow, title, lead } = UI_LABELS.product
  return (
    <Section id="features" eyebrow={eyebrow} title={title} lead={lead} layout="stacked">
      <ul>{site.features.map(renderFeature)}</ul>
      <BenefitList />
    </Section>
  )
}
