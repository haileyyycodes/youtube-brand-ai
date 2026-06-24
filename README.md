# youtube branding ai

A small starter repo for ingesting YouTube comments via the YouTube Data API.

## Setup

1. Create or obtain a YouTube Data API key.
2. Set it in your shell:
   ```bash
   export YOUTUBE_API_KEY="YOUR_API_KEY"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the Next.js dashboard locally:
```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the dashboard.

Fetch comments for a single video:
```bash
npm run fetch -- video VIDEO_ID
```

Fetch recent comments for a channel's uploads:
```bash
npm run fetch -- channel CHANNEL_ID
```

## Files

- `src/youtube-api.js` — YouTube Data API wrapper for video/channel comment ingestion.
- `src/main.js` — example CLI entrypoint.
- `pages/index.js` — Next.js dashboard page.
- `pages/_app.js` — Next.js app wrapper.
- `styles/globals.css` — global styles for Next.js.
- `styles/Home.module.css` — dashboard component styles.

## Dashboard UI

Launch the Next.js app with `npm run dev` and open http://localhost:3000.
