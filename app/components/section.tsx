/** The shared section frame: a header and the content. The split layout puts the header on the left, the stacked layout above. */
import type { ReactNode } from "react"

type Layout = "split" | "stacked"
type SectionProps = { id: string; eyebrow: string; title: string; lead: string; layout?: Layout; children: ReactNode }
type HeaderProps = Omit<SectionProps, "children" | "layout"> & { className: string }

const LAYOUT_CLASSES: Record<Layout, { header: string; body: string }> = {
  split: {
    header: "col-span-12 mb-12 text-center lg:sticky lg:top-24 lg:col-span-5 lg:mb-0 lg:self-start lg:text-left",
    body: "col-span-12 lg:col-span-7",
  },
  stacked: {
    header: "col-span-12 mb-12 text-center lg:col-span-7 lg:text-left",
    body: "col-span-12",
  },
}

function SectionHeader({ id, eyebrow, title, lead, className }: HeaderProps) {
  return (
    <div data-reveal-item className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-3 text-title">{title}</h2>
      <p className="mt-4 text-lead text-muted-foreground">{lead}</p>
    </div>
  )
}

export function Section({ id, children, layout = "split", ...header }: SectionProps) {
  const classes = LAYOUT_CLASSES[layout]
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <div className="shell grid-12">
        <SectionHeader id={id} className={classes.header} {...header} />
        <div className={classes.body}>{children}</div>
      </div>
    </section>
  )
}
