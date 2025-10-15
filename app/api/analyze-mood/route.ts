import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { mood } = await request.json()

    if (!mood) {
      return NextResponse.json({ error: "Mood is required" }, { status: 400 })
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

    // Analyze mood and generate search query
    const moodAnalysis = analyzeMoodText(mood)

    // Search Spotify for tracks matching the mood
    const searchQuery = encodeURIComponent(`${mood} ${moodAnalysis.tags.join(" ")}`)
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
    console.error("[v0] Error in analyze-mood:", error)
    return NextResponse.json({ error: "Failed to analyze mood" }, { status: 500 })
  }
}

function analyzeMoodText(mood: string): any {
  const lowerMood = mood.toLowerCase()

  if (
    lowerMood.includes("angry") ||
    lowerMood.includes("rage") ||
    lowerMood.includes("enraged") ||
    lowerMood.includes("furious") ||
    lowerMood.includes("mad")
  ) {
    return {
      mood: "Angry & Intense",
      tags: ["Heavy Metal", "Hard Rock", "Aggressive", "Intense", "Powerful"],
      color: "Fiery Red",
      energy: "Very High",
    }
  } else if (
    lowerMood.includes("anxious") ||
    lowerMood.includes("nervous") ||
    lowerMood.includes("stressed") ||
    lowerMood.includes("worried")
  ) {
    return {
      mood: "Anxious & Tense",
      tags: ["Alternative", "Indie", "Emotional", "Raw"],
      color: "Dark Gray",
      energy: "High",
    }
  } else if (lowerMood.includes("romantic") || lowerMood.includes("love") || lowerMood.includes("crush")) {
    return {
      mood: "Romantic & Loving",
      tags: ["Love Songs", "R&B", "Soul", "Romantic"],
      color: "Soft Pink",
      energy: "Medium",
    }
  } else if (lowerMood.includes("nostalgic") || lowerMood.includes("memories") || lowerMood.includes("throwback")) {
    return {
      mood: "Nostalgic & Reflective",
      tags: ["Classic", "Retro", "Throwback", "Memories"],
      color: "Warm Amber",
      energy: "Medium",
    }
  } else if (lowerMood.includes("confident") || lowerMood.includes("powerful") || lowerMood.includes("boss")) {
    return {
      mood: "Confident & Empowered",
      tags: ["Hip Hop", "Rap", "Confident", "Bold"],
      color: "Gold",
      energy: "High",
    }
  } else if (lowerMood.includes("chill") || lowerMood.includes("vibe") || lowerMood.includes("laid back")) {
    return {
      mood: "Chill & Laid Back",
      tags: ["Lo-fi", "Chill", "Smooth", "Relaxed"],
      color: "Teal",
      energy: "Low",
    }
  } else if (lowerMood.includes("party") || lowerMood.includes("dance") || lowerMood.includes("club")) {
    return {
      mood: "Party & Dance",
      tags: ["EDM", "Dance", "Party", "Electronic"],
      color: "Neon Purple",
      energy: "Very High",
    }
  } else if (lowerMood.includes("happy") || lowerMood.includes("joy") || lowerMood.includes("excited")) {
    return {
      mood: "Joyful & Uplifting",
      tags: ["Happy", "Energetic", "Positive", "Upbeat"],
      color: "Bright Yellow",
      energy: "High",
    }
  } else if (
    lowerMood.includes("sad") ||
    lowerMood.includes("melancholic") ||
    lowerMood.includes("down") ||
    lowerMood.includes("depressed")
  ) {
    return {
      mood: "Melancholic & Reflective",
      tags: ["Sad", "Emotional", "Introspective", "Mellow"],
      color: "Deep Blue",
      energy: "Low",
    }
  } else if (
    lowerMood.includes("calm") ||
    lowerMood.includes("relax") ||
    lowerMood.includes("peaceful") ||
    lowerMood.includes("serene")
  ) {
    return {
      mood: "Calm & Peaceful",
      tags: ["Relaxing", "Meditative", "Gentle", "Soothing"],
      color: "Soft Blue",
      energy: "Low",
    }
  } else if (
    lowerMood.includes("energetic") ||
    lowerMood.includes("pump") ||
    lowerMood.includes("workout") ||
    lowerMood.includes("motivated")
  ) {
    return {
      mood: "Energetic & Motivated",
      tags: ["Workout", "Powerful", "Intense", "Dynamic"],
      color: "Vibrant Red",
      energy: "Very High",
    }
  } else if (
    lowerMood.includes("focus") ||
    lowerMood.includes("concentrate") ||
    lowerMood.includes("study") ||
    lowerMood.includes("productive")
  ) {
    return {
      mood: "Focused & Productive",
      tags: ["Concentration", "Ambient", "Minimal", "Flow"],
      color: "Cool Purple",
      energy: "Medium",
    }
  } else {
    return {
      mood: mood.charAt(0).toUpperCase() + mood.slice(1),
      tags: [mood, "Music"],
      color: "Multicolor",
      energy: "Medium",
    }
  }
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
