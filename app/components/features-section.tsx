/** The features section: 4 to 6 feature groups, each with a title, one statement and an optional screenshot. */
import { Section } from "@/app/components/section"
import { UI_LABELS } from "@/app/ui-labels"
import type { Feature } from "@/lib/site-schema"
import { site } from "@/lib/site"

type Screenshot = NonNullable<Feature["screenshot"]>

function FeatureScreenshot({ screenshot }: { screenshot: Screenshot }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-lg border bg-card">
      <img src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} loading="lazy" decoding="async" className="h-auto w-full" />
    </figure>
  )
}

function FeatureGroup({ feature }: { feature: Feature }) {
  return (
    <li data-reveal-item className="border-t py-10 text-center first:border-t-0 first:pt-0 lg:text-left">
      <h3 className="text-heading">{feature.title}</h3>
      <p className="mt-2 text-body text-muted-foreground">{feature.statement}</p>
      {feature.screenshot && <FeatureScreenshot screenshot={feature.screenshot} />}
    </li>
  )
}

function renderFeature(feature: Feature) {
  return <FeatureGroup key={feature.id} feature={feature} />
}

function Benefit({ title, statement }: { title: string; statement: string }) {
  return (
    <li data-reveal-item className="border-t py-6 text-center lg:text-left">
      <h4 className="text-body font-semibold">{title}</h4>
      <p className="mt-1 text-body text-muted-foreground">{statement}</p>
    </li>
  )
}

function renderBenefit(benefit: { title: string; statement: string }) {
  return <Benefit key={benefit.title} {...benefit} />
}

function BenefitList() {
  return (
    <div id="benefits" className="mt-16 scroll-mt-24 border-t pt-10">
      <h3 data-reveal-item className="text-center text-heading lg:text-left">{UI_LABELS.product.benefitsLabel}</h3>
      <ul className="mt-4">{UI_LABELS.product.benefits.map(renderBenefit)}</ul>
    </div>
  )
}

export function FeaturesSection() {
  const { eyebrow, title, lead } = UI_LABELS.product
  return (
    <Section id="features" eyebrow={eyebrow} title={title} lead={lead}>
      <ul>{site.features.map(renderFeature)}</ul>
      <BenefitList />
    </Section>
  )
}
