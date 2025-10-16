"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, Sparkles, ImageIcon, Brain, Menu, X, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <Link href="/about" className="text-sm text-white">
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
            <Link href="/">
              <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700">
                Try It
              </Button>
            </Link>
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
                  className="block text-sm text-white transition-all hover:translate-x-1 hover:pl-2"
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
                <div className="pt-2 border-t border-white/10">
                  <Link 
                    href="/"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                      Try It
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 pointer-events-none"></div>
            </div>
          </>
        )}
      </nav>

      {/* Content */}
      <main className="px-4 pb-20 pt-12 lg:pt-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance font-sans text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              About VibePulse
            </h1>
            <p className="text-pretty text-lg text-white/70">
              Your AI music buddy that actually gets how you're feeling (sort of)
            </p>
          </div>

          <div className="space-y-8">
            {/* What is VibePulse */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="mb-4 text-2xl font-semibold text-white">What is VibePulse?</h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                VibePulse is basically your personal DJ. You know that feeling when you're
                in a specific mood but can't find the right music? Yeah, I built this to fix that. It may not be perfect, after all, this is AI but it was fun nonetheless.
              </p>
              <p className="text-white/70 leading-relaxed">
                Just tell it how you're feeling or share a photo that captures your vibe, and the AI does its
                thing—analyzing your mood and pulling together a playlist from Spotify that actually hits right. No more
                endless scrolling through playlists that don't quite match your energy.
              </p>
            </div>

            {/* How It Works */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-semibold text-white">How It Works</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Describe Your Mood</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Type whatever you're feeling—happy, sad, pumped up, chill, whatever. The AI understands natural
                      language, so just talk to it like you would a friend.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Upload a Photo</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Got a photo that captures your current vibe? Drop it in. The AI looks at the colors, the mood, the
                      whole atmosphere and figures out what kind of music matches that energy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">AI Analysis</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Behind the scenes, the AI breaks down your input—picking up on emotional cues, energy levels, and
                      the kind of musical vibe that would match your current state.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-pink-500">
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Your Playlist</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Get a personalized playlist pulled from Spotify's massive library. Each track is picked to match
                      your emotional wavelength—not just random songs, but stuff that actually fits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why VibePulse */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="mb-4 text-2xl font-semibold text-white">Why I Built This</h2>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-purple-400">•</span>
                  <span className="leading-relaxed">
                    <strong className="text-white">Exploring AI Development:</strong> Wanted to see firsthand how
                    AI-assisted development changes the building process and what's possible with modern tools.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-purple-400">•</span>
                  <span className="leading-relaxed">
                    <strong className="text-white">Solving a Real Problem:</strong> Music discovery based on mood is
                    genuinely useful—the AI understands emotional nuance and translates it into relevant
                    recommendations.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-purple-400">•</span>
                  <span className="leading-relaxed">
                    <strong className="text-white">Pushing Technical Boundaries:</strong> Combining computer vision,
                    natural language processing, and music APIs into one cohesive experience.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-purple-400">•</span>
                  <span className="leading-relaxed">
                    <strong className="text-white">Portfolio Piece:</strong> Showcasing what's possible when you
                    leverage AI tools effectively—rapid prototyping without sacrificing quality.
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 text-base font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/60"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try VibePulse Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
