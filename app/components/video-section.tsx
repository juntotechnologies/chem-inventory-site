"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoSectionProps {
  // For YouTube or Vimeo embed
  embedUrl?: string
  // For direct video URL (if you host it elsewhere)
  videoUrl?: string
  title: string
  autoplay?: boolean
}

export default function VideoSection({ embedUrl, videoUrl, title, autoplay = false }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Handle direct video playback controls
  const handlePlayPause = () => {
    const video = document.getElementById("demo-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    const video = document.getElementById("demo-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Add autoplay and loop parameters to YouTube URL if requested
  const getEmbedUrl = () => {
    if (!embedUrl) return ""

    // Extract video ID from YouTube URL if it's a YouTube embed
    const youtubeIdMatch = embedUrl.match(/embed\/([^/?]+)/)
    const videoId = youtubeIdMatch ? youtubeIdMatch[1] : null

    // Base parameters
    const params = []

    // Add autoplay and mute parameters if autoplay is requested
    if (autoplay) {
      params.push("autoplay=1", "mute=1")
    }

    // Add loop parameter and playlist (required for looping YouTube videos)
    if (videoId) {
      params.push("loop=1", `playlist=${videoId}`)
    }

    // Combine parameters with the URL
    if (params.length > 0) {
      // Check if the URL already has parameters
      if (embedUrl.includes("?")) {
        return `${embedUrl}&${params.join("&")}`
      } else {
        return `${embedUrl}?${params.join("&")}`
      }
    }

    return embedUrl
  }

  return (
    <section className="w-full py-4 md:py-6 lg:py-10 bg-gradient-to-b from-[#F1F5F9] to-background">
      <div className="container px-2 sm:px-4 md:px-6 content-container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
          <div className="inline-block rounded-full bg-primary px-2 py-1 text-xs sm:text-sm text-white font-medium">
            See It In Action
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#1E3A8A]">{title}</h2>
          <p className="max-w-[600px] text-sm text-muted-foreground">
            Watch how CIMS simplifies chemical inventory management with its intuitive interface and powerful features.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden shadow-xl border">
          {embedUrl ? (
            // YouTube/Vimeo embed
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl()}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : videoUrl ? (
            // Direct video file
            <div className="aspect-video w-full bg-black relative">
              <video
                id="demo-video"
                src={videoUrl}
                className="w-full h-full object-contain"
                poster="/placeholder.svg?height=720&width=1280"
                playsInline
                muted={isMuted}
                autoPlay={autoplay}
                loop={autoplay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              ></video>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button
                  onClick={handlePlayPause}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                </button>

                <button
                  onClick={handleMute}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
                </button>
              </div>
            </div>
          ) : (
            // Placeholder when no video is available
            <div className="aspect-video w-full bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <Play className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Video demonstration coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
