# Shivani's 100 Days of AI Build Plan

## Positioning

Public angle: **frontend/full-stack developer building practical AI apps with React, APIs, and clean UI workflows.**

The strongest story from the profile is not "I use AI tools." It is: "I build useful user-facing workflows, connect AI APIs, deploy working apps, and explain what I learned clearly."

Keep every post focused on one of these proof points:

- Build practical AI apps with React, JavaScript, Firebase/Node, and APIs.
- Explain prompt engineering through working product examples.
- Turn messy user workflows into clean UI.
- Share honest build logs: bugs, tradeoffs, deployment, cost, latency, and UX lessons.

## Recommended First Build

For the one-app-per-day version of this challenge, use
[`one-app-a-day-playbook.md`](./one-app-a-day-playbook.md) as the daily operating system.

### Project 1: JobFit AI

Build a small app that takes a job description and a resume/profile summary, then returns:

- match score
- missing keywords
- top 5 improvements
- tailored resume bullets
- interview prep questions

Why this is the best first project:

- It connects directly to Shivani's current job-search context.
- It uses existing strengths: React, API integration, prompt engineering, clean UI.
- It can be shipped in 2-3 days.
- It creates multiple posts: prompt design, structured output, UI, deployment, safety.

Suggested stack:

- Frontend: React + Vite + Tailwind
- AI: OpenAI or Gemini through a server route, never directly from the browser
- Storage: Firebase only if saving history is needed
- Deploy: Vercel for the app; GitHub repo with a clear README

MVP screens:

- Input form: job description + profile/resume text
- Results page: score, strengths, gaps, rewritten bullets
- History panel: optional, only after the MVP works

## 15 Build Ideas

Ranked by fit for Shivani's profile and public learning value.

1. **JobFit AI** - JD/resume analyzer with tailored bullet suggestions.
2. **AI Interview Coach** - generates role-specific questions and checks answers.
3. **PromptLab** - compare prompts, outputs, latency, and cost side by side.
4. **NetflixGPT v2** - movie recommender with mood, language, genre, and reasoned picks.
5. **Real Estate Listing Assistant** - create better listing titles, descriptions, and filters.
6. **AI Bug Report Summarizer** - paste bug reports, get severity, reproduction steps, and likely component.
7. **PDF Workflow Tool** - extract images/text from PDFs and summarize pages.
8. **AI Portfolio Reviewer** - reviews GitHub/portfolio pages and suggests improvements.
9. **SQL Explainer** - natural language to SQL plus explanation and sample table preview.
10. **UI Copy Assistant** - generate labels, empty states, validation messages, and onboarding text.
11. **Learning Flashcard Generator** - paste notes/articles and generate flashcards and quiz mode.
12. **API Test Case Generator** - paste endpoint details and generate Postman-style test cases.
13. **AI Dashboard Explainer** - upload metrics and get trends, anomalies, and plain-English summary.
14. **Voice Notes to Tasks** - record thoughts and convert them into structured todos.
15. **Personal Knowledge Chat** - ask questions over personal notes, project docs, or resume material.

## 100-Day Structure

### Days 1-10: Foundation and Fast Wins

Goal: create public momentum and ship 2 tiny apps.

- Day 1: publish the challenge announcement and pick Project 1.
- Day 2: design the MVP UI and prompt contract.
- Day 3: build the first working flow.
- Day 4: deploy the MVP.
- Day 5: write the README and demo post.
- Day 6: add one useful feature, like export or history.
- Day 7: share a mini case study.
- Day 8-10: build one smaller utility app.

### Days 11-30: Mini AI Product Sprint

Goal: ship 4-5 focused apps.

Good themes:

- resume/job tools
- prompt engineering tools
- AI + React UI patterns
- API integrations
- PDF/text utilities

Output target:

- 5 deployed demos
- 5 GitHub repos
- 10-15 technical posts

### Days 31-50: Data, RAG, and Multimodal

Goal: go beyond simple chatbots.

Build examples:

- chat with uploaded PDF
- semantic search over notes/images
- AI assistant with tool calls
- structured JSON output with validation
- prompt evaluation dashboard

### Days 51-75: Full-Stack AI Apps

Goal: demonstrate employable full-stack depth.

Add:

- auth
- database
- saved history
- rate limits
- loading/error states
- responsive UI
- deployment documentation

### Days 76-100: Portfolio, Case Studies, and Polish

Goal: convert the challenge into career proof.

Ship:

- personal AI portfolio page
- 3 detailed case studies
- one flagship app with production polish
- "100 things I learned building AI apps" post
- pinned Twitter/X thread with all demos

## Daily Posting Formula

Use this simple structure:

```text
Day X/100 of #100DaysOfAI

Today I built/learned: <one specific thing>

What worked:
- <short point>

What was tricky:
- <short point>

Next:
- <what you will improve tomorrow>

Demo/GitHub: <link>
```

## Post Types to Rotate

1. **Build log** - what changed in the app today.
2. **Tiny tutorial** - one concept explained with code.
3. **Bug/lesson** - one mistake and how it was fixed.
4. **Prompt breakdown** - before/after prompt and output.
5. **UI improvement** - screenshot of old vs new UI.
6. **Deployment note** - how it was deployed and what broke.
7. **Reflection** - what the project taught about product thinking.

## Week 1 Content Plan

### Day 1

Post: challenge announcement.

Build task: create GitHub repo and choose JobFit AI.

Tweet idea:

```text
Day 1/100 of #100DaysOfAI

I am starting a 100-day challenge to build practical AI apps and share what I learn.

My focus: React + APIs + clean UI + real deployed demos.

First project: JobFit AI, a tool that analyzes a job description against a resume/profile and suggests improvements.
```

### Day 2

Post: show wireframe or UI plan.

Build task: create React/Vite app and form layout.

### Day 3

Post: explain the prompt contract.

Build task: call AI API from a backend route and return structured JSON.

### Day 4

Post: first working demo video.

Build task: display score, gaps, and rewrite suggestions.

### Day 5

Post: deployment lesson.

Build task: deploy to Vercel and add README.

### Day 6

Post: before/after UI improvement.

Build task: add loading, errors, empty states, and copy button.

### Day 7

Post: mini case study.

Build task: write what you built, stack, screenshots, and learnings.

## Deployment Checklist

For every project:

- Add `.env.example`.
- Keep API keys on the server side.
- Add a clear README with problem, features, stack, screenshots, and live link.
- Add loading, error, and empty states before sharing publicly.
- Deploy a working demo before writing a long thread.
- Pin the best demo posts and keep a running index thread.

Recommended deployment path:

- Static React/Vite apps: Vercel or GitHub Pages.
- Apps with AI API keys: Vercel with serverless functions or another backend host.
- Apps with auth/history: Firebase or Supabase plus Vercel frontend.

## Good Technical Topics to Share

- Why API keys should not be exposed in frontend code.
- How to ask an LLM for structured JSON.
- How to validate AI output before rendering it.
- How loading states improve AI app UX.
- How to reduce hallucinations with better context.
- How to compare OpenAI vs Gemini for the same task.
- How to write a README that helps recruiters understand the project.
- How to turn a chatbot into a useful workflow.
- How to deploy a React AI app.
- How to handle AI API errors gracefully.

## Public Portfolio Strategy

Every serious project should have:

- live demo
- GitHub repo
- short demo video or GIF
- README
- screenshots
- one thread explaining the build
- one LinkedIn post written in a more professional style

By the end of 100 days, the portfolio should show:

- 8-12 deployed apps
- 3 polished flagship projects
- evidence of React, API integration, auth/database, and deployment
- clear communication skill through posts and case studies

## Sources Checked

- OpenAI API docs: tools, Responses API, Agents SDK, streaming, evals, and deployment topics are current areas to learn: https://developers.openai.com/api/docs/guides/tools
- Vercel AI SDK docs: useful for React/Next/Vue/Svelte/Node AI apps, tool calls, agents, UI hooks, and multiple model providers: https://ai-sdk.dev/docs/introduction
- Vercel Vite docs: Vite apps can be deployed from project root, and Git integration can generate preview URLs: https://vercel.com/docs/frameworks/frontend/vite
- GitHub Pages docs: useful for simple public project/resume sites: https://docs.github.com/en/pages/quickstart
