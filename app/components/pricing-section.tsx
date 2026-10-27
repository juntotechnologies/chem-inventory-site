/** The pricing section: one plan with two actions that open an email. */
import { Section } from "@/app/components/section"
import { UI_LABELS } from "@/app/ui-labels"
import { Button } from "@/components/ui/button"

const { pricing, actions, mailto } = UI_LABELS

function Bullet({ text }: { text: string }) {
  return <li className="border-t py-3 text-body last:border-b">{text}</li>
}

function renderBullet(text: string) {
  return <Bullet key={text} text={text} />
}

function PlanActions() {
  return (
    <div className="btn-row mt-8">
      <Button asChild><a href={mailto.enterprisePricingInquiry}>{actions.askPricing}</a></Button>
      <Button asChild variant="outline"><a href={mailto.enterpriseInquiry}>{actions.discussFit}</a></Button>
    </div>
  )
}

function PlanCard() {
  return (
    <div className="lift rounded-lg border bg-card p-6 text-center md:p-8 lg:text-left">
      <h3 className="text-heading">{pricing.planName}</h3>
      <p className="mt-2 text-body text-muted-foreground">{pricing.planBody}</p>
      <ul className="mt-6">{pricing.bullets.map(renderBullet)}</ul>
      <PlanActions />
    </div>
  )
}

export function PricingSection() {
  return (
    <Section id="pricing" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead}>
      <div data-reveal-item>
        <PlanCard />
      </div>
    </Section>
  )
}
