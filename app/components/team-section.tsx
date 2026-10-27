/** The team section: one person card with a portrait and a short bio. */
import { Section } from "@/app/components/section"
import { UI_LABELS } from "@/app/ui-labels"
import { getDcurvesLibraryDescription } from "@/lib/dcurves-copy"
import { readBuiltDownloads } from "@/lib/dcurves-downloads"
import { fillTemplate } from "@/lib/template"

const { member, bio } = UI_LABELS.team

function DcurvesSentence() {
  const library = getDcurvesLibraryDescription(readBuiltDownloads())
  const description = library.hasDownloadCount
    ? fillTemplate(bio.dcurvesWithCount, { downloads: library.downloads })
    : library.fallbackDescription
  return (
    <>
      {bio.dcurvesLead}{" "}
      <a href={UI_LABELS.links.dcurves} target="_blank" rel="noreferrer" className="font-medium text-primary underline underline-offset-4">dcurves</a>
      , {description}.
    </>
  )
}

function Bio() {
  return (
    <p className="mt-4 text-body text-muted-foreground">
      {bio.before.join(" ")} <DcurvesSentence /> {bio.after.join(" ")}
    </p>
  )
}

function Portrait() {
  return (
    <img src={member.image} alt={member.imageAlt} width={640} height={640} loading="lazy" decoding="async" className="mx-auto aspect-square w-40 rounded-lg object-cover md:w-full" />
  )
}

function PersonCard() {
  return (
    <div className="lift grid items-start gap-6 rounded-lg border bg-card p-6 text-center md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:p-8 md:text-left">
      <Portrait />
      <div>
        <h3 className="text-heading">{member.name}</h3>
        <p className="text-small font-medium text-primary">{member.title}</p>
        <Bio />
      </div>
    </div>
  )
}

export function TeamSection() {
  const { eyebrow, title, lead } = UI_LABELS.team
  return (
    <Section id="team" eyebrow={eyebrow} title={title} lead={lead}>
      <div data-reveal-item>
        <PersonCard />
      </div>
    </Section>
  )
}
