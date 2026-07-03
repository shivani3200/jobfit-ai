# Day 1 Brief: JobFit AI

Detailed MVP requirements: [`jobfit-ai-requirements.md`](./jobfit-ai-requirements.md)

## Goal

Ship a small AI app that helps a job seeker compare a job description with their profile/resume and get practical improvement suggestions.

## User Story

As a job seeker, I paste a job description and my resume/profile summary. The app tells me how well I match the role, what skills are missing, and how I can improve my resume bullets honestly.

## MVP Scope

Inputs:

- job title
- job description
- resume/profile text

Outputs:

- match score from 0-100
- top matching skills
- missing or weak skills
- 5 resume improvement suggestions
- 5 interview preparation questions

Do not include:

- login
- file upload
- payment
- saved history
- complex dashboard

## Suggested UI

Single page layout:

- left panel: form inputs
- right panel: generated analysis
- top bar: app name and "Analyze" button
- result cards: score, strengths, gaps, suggestions, interview questions

Minimum states:

- empty state before analysis
- loading state while AI responds
- error state if request fails
- copy button for generated suggestions

## Prompt Contract

Ask the model to return structured JSON.

```json
{
  "matchScore": 78,
  "summary": "Short explanation of the fit.",
  "matchingSkills": ["React", "JavaScript", "API integration"],
  "missingSkills": ["TypeScript", "unit testing"],
  "resumeSuggestions": [
    "Rewrite one bullet to show measurable frontend impact."
  ],
  "interviewQuestions": [
    "Explain how you handled API errors in a React app."
  ]
}
```

Rules for the prompt:

- Do not invent experience.
- Keep suggestions truthful.
- Prefer measurable, specific resume bullets.
- Explain gaps without discouraging the user.

## Build Steps

1. Create React/Vite app.
2. Build the form and result layout.
3. Add a backend route for AI API calls.
4. Validate the response shape before rendering.
5. Add loading, error, empty, and copy states.
6. Deploy.
7. Add README with screenshots, live link, and learnings.

## Deployment

Use Vercel for the first version.

Important:

- Store API key in Vercel environment variables.
- Do not expose the key with `VITE_` or any frontend env prefix.
- Keep the AI call in a server-side route or backend function.
- Add `.env.example` with placeholder variable names only.

## Day 1 Post

```text
Day 1/100 of #100DaysOfAI

I am starting a 100-day challenge to build practical AI apps and share what I learn.

My focus:
- React apps
- AI API integration
- clean UI workflows
- deployed demos

First build: JobFit AI
It will compare a job description with a resume/profile and suggest honest improvements.

Today: planning the MVP.
Tomorrow: building the first UI.
```

## Day 2 Post

```text
Day 2/100 of #100DaysOfAI

Started building JobFit AI.

Today I focused on the UI:
- job description input
- profile/resume input
- result cards for score, gaps, and suggestions

Small lesson: AI apps still need strong empty/loading/error states. The model is only one part of the product.
```

## Definition of Done

The MVP is done when:

- user can paste job description and profile text
- app returns structured analysis
- result UI is readable on mobile and desktop
- API key is not exposed in frontend code
- live demo is deployed
- README includes problem, stack, demo link, and screenshots
