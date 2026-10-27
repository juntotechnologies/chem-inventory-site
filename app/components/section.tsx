/** The shared section frame: one header pattern on the left, the content on the right. */
import type { ReactNode } from "react"

type SectionProps = { id: string; eyebrow: string; title: string; lead: string; children: ReactNode }

function SectionHeader({ id, eyebrow, title, lead }: Omit<SectionProps, "children">) {
  return (
    <div data-reveal-item className="col-span-12 mb-12 text-center lg:sticky lg:top-24 lg:col-span-5 lg:mb-0 lg:self-start lg:text-left">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-3 text-title">{title}</h2>
      <p className="mt-4 text-lead text-muted-foreground">{lead}</p>
    </div>
  )
}

export function Section({ id, children, ...header }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <div className="shell grid-12">
        <SectionHeader id={id} {...header} />
        <div className="col-span-12 lg:col-span-7">{children}</div>
      </div>
    </section>
  )
}
