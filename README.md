# Ring Designer 💍✨

An AI-powered engagement ring designer that creates personalized ring designs based on your love story.

## Features

- **Ring Configuration**: Complete 4Cs (Carat, Color, Clarity, Cut), stone types, metals, and styles
- **Story Analysis**: AI-powered extraction of symbolic meaning from love stories
- **Image Generation**: High-quality ring visualizations using DALL-E 3
- **Design Explanation**: Detailed breakdown of how your story influenced the ring design

## Deployment on Render.com

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ring-me-maybe.git
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
   - Add environment variable:
     - `VITE_OPENAI_API_KEY`: Your OpenAI API key

### Method 2: Blueprint Deployment

1. Push code including the `render.yaml` file
2. In Render dashboard: "New" → "Blueprint"
3. Select your repository
4. Add environment variables in the dashboard

## Environment Variables

Set this in Render's Environment Variables section:
- `VITE_OPENAI_API_KEY`: Your OpenAI API key from https://platform.openai.com/api-keys

## Local Development

```bash
npm install
cp .env.example .env  # Add your OpenAI API key
npm run dev
```

Built with ❤️ for creating perfect engagement rings