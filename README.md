# VibePulse 🎵✨

**Turn your mood into music with AI**

VibePulse is an intelligent music discovery application that uses AI to analyze your current mood and generate personalized Spotify playlists. Whether you're feeling happy, melancholic, focused, or relaxed, VibePulse creates the perfect soundtrack for your emotional state.

## 🚀 Features

### 🎭 Mood-Based Music Discovery
- **Text Input**: Describe your current mood in natural language
- **Image Analysis**: Upload a photo and let AI analyze the emotional context
- **Preset Moods**: Quick selection from curated mood categories
- **Smart Matching**: AI-powered mood-to-music mapping

### 🎶 Spotify Integration
- Real-time playlist generation using Spotify's extensive catalog
- Track recommendations based on mood analysis
- Artist, album, and duration information
- Direct links to Spotify for seamless listening

### 🎨 Beautiful User Experience
- Modern, responsive design with gradient backgrounds
- Intuitive mood selection interface
- Real-time loading states and feedback
- Mobile-friendly interface

### 🧠 AI-Powered Analysis
- Advanced mood detection from text descriptions
- Computer vision for image-based mood analysis
- Intelligent tag generation and categorization
- Energy level and color association

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **UI Components**: Radix UI, Tailwind CSS, Lucide Icons
- **AI Integration**: Vercel AI SDK
- **Music API**: Spotify Web API
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running VibePulse, you'll need:

1. **Node.js** (v18 or later)
2. **pnpm** package manager
3. **Spotify Developer Account** for API access
4. **AI Service API Key** (for image analysis)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/christinaluna/vibepulse.git
   cd vibepulse
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Spotify API Credentials
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   
   # AI Service API Key (for image analysis)
   # Add your preferred AI service API key here
   ```

4. **Get Spotify API Credentials**
   - Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Copy your Client ID and Client Secret
   - Add them to your `.env.local` file

## 🚀 Getting Started

1. **Start the development server**
   ```bash
   pnpm dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Start discovering music!**
   - Enter your current mood in the text field
   - Or upload an image that represents how you feel
   - Or select from preset mood categories
   - Get instant AI-generated playlists

## 🎯 How It Works

### Mood Analysis Process
1. **Input Processing**: VibePulse accepts text descriptions or images
2. **AI Analysis**: Advanced algorithms analyze emotional context
3. **Mood Mapping**: Detected moods are mapped to musical characteristics
4. **Spotify Search**: The app searches Spotify's catalog for matching tracks
5. **Playlist Generation**: A curated playlist is generated and displayed

### Supported Mood Categories
- **Happy & Energetic**: Upbeat tracks to boost your mood
- **Calm & Relaxed**: Peaceful music for relaxation
- **Focused & Productive**: Concentration-enhancing beats  
- **Melancholic & Reflective**: Emotional and introspective songs

## 📱 Usage Examples

### Text-Based Mood Input
```
"I'm feeling nostalgic about my childhood"
"Pumped up for my workout session"
"Need something calming after a stressful day"
"Feeling creative and inspired"
```

### Image-Based Analysis
Upload photos that represent your mood:
- Sunset photos for peaceful vibes
- City lights for energetic feelings
- Nature scenes for calm moods
- Art or creative work for inspiration

## 🔧 API Endpoints

### `/api/analyze-mood`
- **Method**: POST
- **Purpose**: Analyze text-based mood input
- **Request**: `{ mood: string }`
- **Response**: `{ moods: MoodAnalysis[], tracks: Track[] }`

### `/api/analyze-image`
- **Method**: POST
- **Purpose**: Analyze uploaded images for mood detection
- **Request**: FormData with image file
- **Response**: `{ moods: MoodAnalysis[], tracks: Track[] }`

## 🎨 Customization

### Adding New Mood Presets
Modify the `suggestedMoods` array in `/app/page.tsx`:

```typescript
{
  id: 5,
  title: "Your Custom Mood",
  description: "Description of the mood",
  gradient: "from-color-400 to-color-500",
  mood: "keywords for mood matching",
}
```

### Styling
- Update Tailwind classes in components
- Modify gradient backgrounds in the main layout
- Customize UI components in `/components/ui/`

## 🚀 Deployment

VibePulse is optimized for Vercel deployment:

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** with automatic builds

### Build for Production
```bash
pnpm build
pnpm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spotify** for their comprehensive music API
- **Radix UI** for beautiful, accessible components
- **Vercel** for AI SDK and deployment platform
- **Tailwind CSS** for utility-first styling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/christinaluna/vibepulse/issues) page
2. Create a new issue with detailed description
3. Join our community discussions

---

**Made with ❤️ by Christina Luna**

*Turn your emotions into the perfect soundtrack with VibePulse!*