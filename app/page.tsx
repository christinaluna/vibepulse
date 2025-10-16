"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Sparkles, Music, Loader2, ExternalLink, Menu, X } from "lucide-react"
import { useState, useRef } from "react"
import Link from "next/link"

type MoodAnalysis = {
  mood: string
  tags: string[]
  color: string
  energy: string
}

type Track = {
  id: string
  title: string
  artist: string
  duration: string
  cover: string
  uri?: string
}

export default function Home() {
  const [mood, setMood] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasQueried, setHasQueried] = useState(false)
  const [detectedMoods, setDetectedMoods] = useState<MoodAnalysis[]>([])
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleMoodSubmit = async (moodText?: string) => {
    const queryMood = moodText || mood
    if (!queryMood.trim()) return

    setIsLoading(true)
    setHasQueried(true)

    try {
      const response = await fetch("/api/analyze-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: queryMood }),
      })

      const data = await response.json()

      if (data.error) {
        console.error("[v0] Error analyzing mood:", data.error)
        alert(data.error)
        return
      }

      setDetectedMoods(data.moods || [])
      setPlaylist(data.tracks || [])

      // Scroll to results after a brief delay to ensure content is rendered
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 100)
    } catch (error) {
      console.error("[v0] Error:", error)
      alert("Failed to analyze mood. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setHasQueried(true)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => setUploadedImage(e.target?.result as string)
    reader.readAsDataURL(file)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.error) {
        console.error("[v0] Error analyzing image:", data.error)
        alert(data.error)
        return
      }

      setDetectedMoods(data.moods || [])
      setPlaylist(data.tracks || [])

      // Scroll to results after a brief delay to ensure content is rendered
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 100)
    } catch (error) {
      console.error("[v0] Error:", error)
      alert("Failed to analyze image. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      {/* Navigation */}
      <nav className="relative px-6 py-4 lg:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white z-50 relative">
            <div className="flex items-center gap-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              <span className="text-xl font-semibold">VibePulse</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm text-white/80 transition-colors hover:text-white">
              About
            </Link>
            <Link href="/process" className="text-sm text-white/80 transition-colors hover:text-white">
              Process
            </Link>
            <a
              href="https://github.com/christinaluna/vibepulse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              GitHub
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-xl transition-all hover:bg-white/20"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute top-full right-6 mt-2 w-48 rounded-xl border border-white/20 bg-black/40 backdrop-blur-xl z-50 md:hidden shadow-2xl shadow-purple-500/20">
              <div className="p-4 space-y-3">
                <Link 
                  href="/about" 
                  className="block text-sm text-white/80 transition-all hover:text-white hover:translate-x-1 hover:pl-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                    About
                  </span>
                </Link>
                <Link 
                  href="/process" 
                  className="block text-sm text-white/80 transition-all hover:text-white hover:translate-x-1 hover:pl-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                    Process
                  </span>
                </Link>
                <a
                  href="https://github.com/christinaluna/vibepulse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-white/80 transition-all hover:text-white hover:translate-x-1 hover:pl-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                    GitHub
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </span>
                </a>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 pointer-events-none"></div>
            </div>
          </>
        )}
      </nav>

      {/* Hero Section */}
      <main className="px-4 pb-20 pt-12 lg:pt-20">
        <div className="mx-auto max-w-3xl">
          {/* Heading */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance font-sans text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Built with AI. Inspired by you.
            </h1>
            <p className="text-pretty text-base text-white/70 md:text-lg">
              Tell me how you're feeling or drop a photo — I'll create the perfect soundtrack for your vibe.
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            {/* Text Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="I'm feeling..."
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleMoodSubmit()}
                disabled={isLoading}
                className="h-14 border-white/10 bg-white/5 text-white placeholder:text-white/40 backdrop-blur-xl focus:border-white/20 focus:ring-white/20"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-sm text-white/40">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* File Upload */}
            <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-12 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="rounded-full bg-white/10 p-3">
                  <Upload className="h-6 w-6 text-white/60" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80">Drop a photo here</p>
                  <p className="text-xs text-white/50">or click to browse your files</p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              size="lg"
              onClick={() => handleMoodSubmit()}
              disabled={isLoading || !mood.trim()}
              className="h-14 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-base font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/60 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Playlist
                </>
              )}
            </Button>
          </div>
        </div>

        {hasQueried && detectedMoods.length > 0 && (
          <div ref={resultsRef} className="mx-auto mt-24 max-w-6xl">
            <h2 className="mb-8 text-center text-2xl font-semibold text-white">Detected Moods</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {detectedMoods.map((moodData, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <h3 className="mb-3 text-lg font-semibold text-white">{moodData.mood}</h3>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {moodData.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Color: {moodData.color}</span>
                    <span>Energy: {moodData.energy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasQueried && playlist.length > 0 && (
          <div className="mx-auto mt-24 max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-white" />
                <h2 className="text-2xl font-semibold text-white">Generated Playlist</h2>
              </div>
              <span className="text-sm text-white/60">{playlist.length} tracks</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {playlist.map((track) => (
                <a
                  key={track.id}
                  href={track.uri ? `https://open.spotify.com/track/${track.id}` : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10 hover:scale-[1.02]"
                >
                  <img
                    src={track.cover || "/placeholder.svg?height=56&width=56"}
                    alt={track.title}
                    className="h-14 w-14 rounded-md object-cover"
                  />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <h3 className="truncate text-sm font-semibold text-white">{track.title}</h3>
                      <ExternalLink className="h-3 w-3 text-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="truncate text-xs text-white/60">{track.artist}</p>
                  </div>
                  <span className="text-xs text-white/50">{track.duration}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 px-4 py-8 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-white/60">
            Built using{" "}
            <span className="text-white/80 font-medium">Next.js</span>,{" "}
            <span className="text-white/80 font-medium">TypeScript</span>,{" "}
            <span className="text-white/80 font-medium">Tailwind CSS</span>,{" "}
            <span className="text-white/80 font-medium">Spotify API</span>,{" "}
            <span className="text-white/80 font-medium">Radix UI</span>,{" "}
            <span className="text-white/80 font-medium">Figma Make</span>, and{" "}
            <span className="text-white/80 font-medium">V0</span> ❤️
          </p>
        </div>
      </footer>
    </div>
  )
}
