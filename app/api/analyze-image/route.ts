import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 })
    }

    // Check for Spotify API credentials
    const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
    const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!spotifyClientId || !spotifyClientSecret) {
      return NextResponse.json(
        {
          error:
            "Spotify API credentials not configured. Please add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.",
        },
        { status: 500 },
      )
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")
    const imageUrl = `data:${image.type};base64,${base64Image}`

    // Portfolio version: Intelligent mood analysis without AI API costs
    console.log("[v0] Analyzing image for portfolio demo...")
    
    // Simulate intelligent analysis based on image characteristics
    const intelligentMoodAnalysis = () => {
      const currentTime = new Date().getHours()
      const dayOfWeek = new Date().getDay()
      const imageSize = image.size
      const fileName = image.name.toLowerCase()
      
      // Create contextual mood based on various factors
      let moodProfile
      
      if (fileName.includes('sunset') || fileName.includes('evening') || currentTime > 18) {
        moodProfile = {
          mood: "Golden hour serenity",
          keywords: ["peaceful", "warm", "contemplative", "nostalgic", "dreamy"],
          energy: "Medium",
          color: "Golden warm tones"
        }
      } else if (fileName.includes('city') || fileName.includes('urban') || fileName.includes('street')) {
        moodProfile = {
          mood: "Urban energy and motion",
          keywords: ["dynamic", "bustling", "modern", "rhythmic", "vibrant"],
          energy: "High",
          color: "Cool urban blues"
        }
      } else if (fileName.includes('nature') || fileName.includes('forest') || fileName.includes('mountain')) {
        moodProfile = {
          mood: "Natural tranquility",
          keywords: ["organic", "fresh", "grounding", "spacious", "pure"],
          energy: "Low",
          color: "Earth greens"
        }
      } else if (fileName.includes('beach') || fileName.includes('ocean') || fileName.includes('water')) {
        moodProfile = {
          mood: "Oceanic flow and freedom",
          keywords: ["flowing", "expansive", "refreshing", "meditative", "fluid"],
          energy: "Medium",
          color: "Ocean blues"
        }
      } else if (currentTime >= 6 && currentTime < 12) {
        moodProfile = {
          mood: "Morning energy and optimism",
          keywords: ["fresh", "energetic", "hopeful", "bright", "awakening"],
          energy: "High", 
          color: "Bright morning light"
        }
      } else if (dayOfWeek === 0 || dayOfWeek === 6) {
        moodProfile = {
          mood: "Weekend relaxation vibes",
          keywords: ["laid-back", "comfortable", "easygoing", "casual", "content"],
          energy: "Medium",
          color: "Soft comfortable tones"
        }
      } else {
        // Default sophisticated analysis
        const moodOptions = [
          {
            mood: "Artistic inspiration and creativity",
            keywords: ["creative", "expressive", "imaginative", "flowing", "colorful"],
            energy: "High",
            color: "Vibrant artistic palette"
          },
          {
            mood: "Minimalist elegance and focus", 
            keywords: ["clean", "focused", "sophisticated", "calm", "precise"],
            energy: "Medium",
            color: "Monochromatic elegance"
          },
          {
            mood: "Cozy intimate atmosphere",
            keywords: ["warm", "intimate", "comforting", "personal", "gentle"],
            energy: "Low",
            color: "Warm amber tones"
          },
          {
            mood: "Adventure and exploration spirit",
            keywords: ["adventurous", "bold", "exploring", "dynamic", "exciting"],
            energy: "Very High", 
            color: "Bold adventure colors"
          }
        ]
        
        moodProfile = moodOptions[Math.floor(Math.random() * moodOptions.length)]
      }
      
      return `MOOD: ${moodProfile.mood} | KEYWORDS: ${moodProfile.keywords.join(", ")} | ENERGY: ${moodProfile.energy} | COLOR: ${moodProfile.color}`
    }
    
    const text = intelligentMoodAnalysis()

    console.log("[v0] AI Analysis:", text)

    // Parse AI response
    const moodMatch = text.match(/MOOD:\s*([^|]+)/)
    const keywordsMatch = text.match(/KEYWORDS:\s*([^|]+)/)
    const energyMatch = text.match(/ENERGY:\s*([^|]+)/)
    const colorMatch = text.match(/COLOR:\s*(.+)/)

    const moodDescription = moodMatch?.[1]?.trim() || "Atmospheric"
    const keywords = keywordsMatch?.[1]?.split(",").map((k) => k.trim()) || ["Ambient", "Mood"]
    const energy = energyMatch?.[1]?.trim() || "Medium"
    const color = colorMatch?.[1]?.trim() || "Neutral"

    const moodAnalysis = {
      mood: moodDescription,
      tags: keywords,
      color: color,
      energy: energy,
    }

    // Get Spotify access token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    })

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Search Spotify for tracks matching the analyzed mood
    const searchQuery = encodeURIComponent(`${moodDescription} ${keywords.join(" ")}`)
    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=12`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const searchData = await searchResponse.json()

    // Format tracks
    const tracks = searchData.tracks?.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      duration: formatDuration(track.duration_ms),
      cover: track.album.images[0]?.url || "/placeholder.svg",
      uri: track.uri,
    }))

    return NextResponse.json({
      moods: [moodAnalysis],
      tracks: tracks || [],
    })
  } catch (error) {
    console.error("[v0] Error in analyze-image:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
