/** The video section: an early walkthrough, a caption that dates it, and a link to the current static demo. */
import { DemoAction } from "@/app/components/action-links"
import { Section } from "@/app/components/section"
import { UI_LABELS } from "@/app/ui-labels"
import { buildEmbedUrl } from "@/lib/video-embed"

const ALLOWED_FEATURES = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

function VideoFrame() {
  const { embedUrl, frameTitle } = UI_LABELS.video
  return (
    <div data-reveal-item className="aspect-video overflow-hidden rounded-lg border bg-card">
      <iframe src={buildEmbedUrl(embedUrl, true)} title={frameTitle} loading="lazy" allow={ALLOWED_FEATURES} allowFullScreen className="h-full w-full" />
    </div>
  )
}

export function VideoSection() {
  const { eyebrow, title, caption } = UI_LABELS.video
  return (
    <Section id="video" eyebrow={eyebrow} title={title} lead={caption}>
      <VideoFrame />
      <div data-reveal-item className="mt-6 flex justify-center lg:justify-start">
        <DemoAction />
      </div>
    </Section>
  )
}
