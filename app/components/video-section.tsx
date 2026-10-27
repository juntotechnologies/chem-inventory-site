/** The video section: a header and the product video, with the embed URL built in one place. */
import { Section } from "@/app/components/section"
import { UI_LABELS } from "@/app/ui-labels"
import { buildEmbedUrl } from "@/lib/video-embed"

const ALLOWED_FEATURES = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

function VideoFrame() {
  const { embedUrl, title } = UI_LABELS.video
  return (
    <div data-reveal-item className="aspect-video overflow-hidden rounded-lg border bg-card">
      <iframe src={buildEmbedUrl(embedUrl, true)} title={title} loading="lazy" allow={ALLOWED_FEATURES} allowFullScreen className="h-full w-full" />
    </div>
  )
}

export function VideoSection() {
  const { eyebrow, title, lead } = UI_LABELS.video
  return (
    <Section id="video" eyebrow={eyebrow} title={title} lead={lead}>
      <VideoFrame />
    </Section>
  )
}
