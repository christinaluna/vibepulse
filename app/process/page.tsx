import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageSquare, Code, Palette, Zap, Music } from "lucide-react"

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-2 text-white">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span className="text-xl font-semibold">VibePulse</span>
          </div>
        </Link>
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/about" className="text-xs md:text-sm text-white/80 transition-colors hover:text-white">
            About
          </Link>
          <Link href="/process" className="text-xs md:text-sm text-white">
            Process
          </Link>
          <a
            href="https://github.com/christinaluna/vibepulse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-white/80 transition-colors hover:text-white"
          >
            GitHub
          </a>
          <Link href="/">
            <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700">
              Try It
            </Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="px-4 pb-20 pt-12 lg:pt-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-balance font-sans text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              How I Built VibePulse
            </h1>
            <p className="text-pretty text-lg text-white/70">
              A story about building with AI (and learning a ton along the way)
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="mb-4 text-2xl font-semibold text-white">The Story</h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                As a developer, I wanted to explore how AI is changing the way we build software. VibePulse became my
                experiment—could I build a full-stack app using AI-assisted development and see how it compares to
                traditional coding workflows?
              </p>
              <p className="text-white/70 leading-relaxed">
                I used Figma Make, V0, Vercel's AI assistant, to handle the heavy lifting. Instead of writing every line of code
                myself, I focused on architecture decisions, feature requirements, and iterative refinement. The result?
                A fully functional app built in a fraction of the time it would normally take (It took me an hour to put this together).
              </p>
            </div>

            {/* The Process */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="mb-6 text-2xl font-semibold text-white">How It Went Down</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-500">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Step 1: Defining the Vision</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      I started with a clear product vision: an AI-powered music recommendation engine that analyzes
                      mood through text and images. I described the requirements to V0 and let it scaffold the initial
                      architecture.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Step 2: Design Implementation</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      I created a quick UI using Figma Make with the futuristic aesthetic I wanted, purple gradients (what says AI more than purple gradients), glassmorphism,
                      subtle animations. Shared it with V0 and it translated the visual language into production-ready
                      code using modern CSS techniques and Tailwind.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Step 3: Tech Stack Setup</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      V0 set up a Next.js 15 app with React Server Components, TypeScript, and Tailwind CSS v4. The
                      entire project structure, routing, and component architecture was generated based on best
                      practices—no boilerplate setup needed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Step 4: Spotify API Integration</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      I specified the need for Spotify integration, and V0 built the OAuth flow, API routes, and data
                      fetching logic. It handled authentication, token management, and search queries—all the tedious
                      API work abstracted away.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Step 5: AI-Powered Analysis</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      The core feature: AI mood detection. V0 integrated GPT-4 Vision for image analysis and natural
                      language processing for text input. The AI extracts emotional context and maps it to musical
                      characteristics for accurate recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-white">Step 6: Iteration & Refinement</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      I iterated on UX details—adding suggested moods, making tracks link to Spotify, optimizing mobile
                      responsiveness, implementing share functionality. Each refinement was a conversation with V0,
                      rapidly prototyping and testing ideas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <h2 className="mb-4 text-2xl font-semibold text-white">What Powers This Thing</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-white">V0 by Vercel</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    The AI assistant that turned my descriptions into actual working code. Honestly, this project
                    wouldn't exist without it.
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-white">Spotify API</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Gives the app access to Spotify's entire music library so it can search for tracks and build
                    playlists based on your mood.
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-white">Next.js & React</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    The modern web frameworks that make everything run smoothly and look good. They handle all the
                    behind-the-scenes stuff.
                  </p>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-white">AI Vision Models</h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    The AI tech that looks at your photos and figures out the mood and vibe so it can recommend matching
                    music.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 backdrop-blur-xl">
              <h2 className="mb-4 text-2xl font-semibold text-white">What I Learned</h2>
              <p className="mb-4 text-white/70 leading-relaxed">
                Building VibePulse showed me that AI-assisted development isn't about replacing developers, it's about
                amplifying what we can do. I spent less time on boilerplate and more time on product decisions, feature
                design, and user experience.
              </p>
              <p className="text-white/70 leading-relaxed">
                The workflow shift is significant: instead of writing every function and component from scratch, I
                focused on architecture, requirements, and iteration. V0 handled implementation details while I guided
                the product vision. This is what modern development looks like and it's pretty damn efficient.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-8 text-base font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/60"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try VibePulse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
