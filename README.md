# JobFit AI

Day 1 app for the 100 Days of AI challenge.

JobFit AI compares a job description with a resume/profile summary and returns:

- match score
- fit summary
- matching skills
- missing or weak skills
- resume improvement suggestions
- interview preparation questions

The app works in demo mode without an API key, so visitors can test it immediately with sample data. If `OPENAI_API_KEY` is configured, the backend route uses OpenAI for analysis.

## Live Demo

https://shivani3200.github.io/jobfit-ai/

## One-Click Local View

On macOS, double-click:

```text
start-jobfit.command
```

It installs dependencies if needed, starts the Vite dev server, and opens the app at:

```text
http://localhost:5173
```

## Manual Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment Variables

Create `.env` from `.env.example` if you want real AI analysis:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.5
```

Without `OPENAI_API_KEY`, the app uses a deterministic demo analyzer.

## Vercel Deployment

Deploy the Day 1 folder to Vercel.

Recommended settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Serverless API route: `api/analyze.js`

Add these Vercel environment variables for real AI analysis:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Do not expose API keys through frontend `VITE_` variables.

## GitHub Pages Deployment

GitHub Pages serves the static version of the app:

```bash
npm run build:pages
```

The static version uses the browser-side demo analyzer when no backend API route exists.

## MVP Scope

Included:

- one-page React app
- sample data button
- server-side analysis route
- demo fallback analyzer
- loading, validation, error, and empty states
- copy suggestions button
- responsive layout

Not included:

- login
- database
- PDF upload
- saved history
- job scraping
- payments

## Project Files

- `jobfit-ai-requirements.md` - MVP requirements
- `day1-jobfit-ai-brief.md` - Day 1 build brief
- `day1-build-log.md` - Day 1 implementation log
- `twit.md` - ready-to-post Twitter/X draft
- `api/analyze.js` - Vercel API route
- `server/jobfit.js` - shared analyzer logic
- `src/` - React app
