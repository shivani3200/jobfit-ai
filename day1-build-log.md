# Day 1 Build Log: JobFit AI

Date: 2026-07-03

## Goal

Build a minimal Vercel-ready app that visitors can open, test with sample data, and understand quickly.

## Decisions

- Built the project directly inside the `day1` directory so all Day 1 files stay together.
- Used React + Vite for a fast one-page app.
- Used a Vercel serverless route at `api/analyze.js`.
- Added a shared analyzer in `server/jobfit.js` so local dev and Vercel use the same logic.
- Added a demo fallback analyzer when `OPENAI_API_KEY` is missing.
- Kept the MVP free of auth, database, PDF upload, and saved history.

## Implemented

- Input form for job title, job description, and resume/profile text.
- Required validation for job description and profile text.
- 6,000 character limit per large text field.
- Sample data button for public demos.
- Result cards for score, summary, matching skills, missing skills, resume suggestions, and interview questions.
- Copy button for resume suggestions.
- Empty, loading, validation, and API error states.
- Responsive layout for mobile and desktop.
- Vercel-compatible API route.
- macOS one-click launcher: `start-jobfit.command`.
- README with setup, deploy, and environment instructions.
- Tweet draft in `twit.md`.

## Verification

- `npm install` completed successfully.
- `npm run build` completed successfully.
- Production output generated in `dist/`.
- Local dev server started successfully at `http://127.0.0.1:5173/`.
- API smoke test passed for `POST /api/analyze` using the demo analyzer.
- Browser check passed: the app loads, sample data populates the form, analysis returns result cards, and the copy button is visible.
- Mobile browser check at 390px width passed: layout stacks cleanly and controls remain inside their containers.

## Notes for Deployment

- The app can be deployed without an API key and still works in demo mode.
- For real AI output, add `OPENAI_API_KEY` and `OPENAI_MODEL` in Vercel.
- API keys must stay server-side only.

## Next Improvements

- Add screenshot to README after first public deployment.
- Add model cost/latency note after testing with a real API key.
- Add a second Day 2 app: Resume Bullet Rewriter.
