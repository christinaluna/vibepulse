import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"

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

    // Use AI to analyze the image mood
    const { text } = await generateText({
      model: "openai/gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: imageUrl,
            },
            {
              type: "text",
              text: "Analyze this image and describe the mood, atmosphere, and emotions it conveys. Provide 3-5 descriptive keywords that capture the vibe. Format your response as: MOOD: [mood description] | KEYWORDS: [keyword1, keyword2, keyword3] | ENERGY: [Low/Medium/High/Very High] | COLOR: [dominant color feeling]",
            },
          ],
        },
      ],
    })

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
