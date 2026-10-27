/** Builds the YouTube embed URL: muted autoplay and a loop when asked. */
const VIDEO_ID = /\/embed\/([^/?]+)/

export function buildEmbedUrl(embedUrl: string, autoplay: boolean): string {
  const url = new URL(embedUrl)
  const id = VIDEO_ID.exec(url.pathname)?.[1]
  if (autoplay) {
    url.searchParams.set("autoplay", "1")
    url.searchParams.set("mute", "1")
  }
  if (id) {
    url.searchParams.set("loop", "1")
    url.searchParams.set("playlist", id)
  }
  return url.toString()
}
