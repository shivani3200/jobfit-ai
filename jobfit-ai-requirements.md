# JobFit AI Requirements

## Objective

Build a minimal public web app that helps job seekers compare a job description with a resume/profile and get practical, honest improvement suggestions.

The app must be small enough to build in one day and deploy on Vercel.

## Target User

A student, fresher, or early-career developer who wants quick feedback before applying to a job.

## MVP User Flow

1. Visitor opens the public demo link.
2. Visitor either clicks **Use sample data** or pastes:
   - job title
   - job description
   - resume/profile summary
3. Visitor clicks **Analyze Fit**.
4. App shows a structured result:
   - match score
   - short fit summary
   - matching skills
   - missing or weak skills
   - resume improvement suggestions
   - interview preparation questions
5. Visitor can copy the suggestions.

## Functional Requirements

### FR1: Input Form

The app must provide a single-page form with:

- job title input
- job description textarea
- resume/profile textarea
- **Use sample data** button
- **Analyze Fit** button

Validation:

- job description is required
- resume/profile text is required
- job title is optional
- show a friendly validation message if required fields are empty

### FR2: AI Analysis

When the user submits the form, the app must send the text to a server-side API route.

The AI response must include:

```json
{
  "matchScore": 0,
  "summary": "",
  "matchingSkills": [],
  "missingSkills": [],
  "resumeSuggestions": [],
  "interviewQuestions": []
}
```

Rules:

- `matchScore` must be a number from 0 to 100.
- `matchingSkills` should contain 3-6 items.
- `missingSkills` should contain 3-6 items.
- `resumeSuggestions` should contain 3-5 items.
- `interviewQuestions` should contain 3-5 items.
- Suggestions must not invent fake experience.

### FR3: Results UI

After analysis, the app must show:

- score card
- summary card
- matching skills list
- missing skills list
- resume suggestions list
- interview questions list
- copy button for resume suggestions

### FR4: App States

The app must handle:

- empty state before the first analysis
- loading state while analysis is running
- validation errors
- API failure errors
- invalid AI response fallback message

### FR5: Public Demo Usability

The deployed app must be usable by a visitor without signup.

The **Use sample data** button is required so people can test the app without preparing their own resume or job description.

## Non-Functional Requirements

### NFR1: Deployment

The app must deploy to Vercel.

Recommended stack:

- React + Vite
- Tailwind CSS
- Vercel serverless function or minimal backend route

### NFR2: Secrets

AI API keys must not be exposed in frontend code.

Requirements:

- API key must live in Vercel environment variables.
- frontend code must call only the app's own backend/API route.
- `.env.example` must include placeholder variable names only.

### NFR3: Cost Control

The app must limit input size before sending to the AI API.

Suggested limits:

- job description: 6,000 characters
- resume/profile: 6,000 characters

If input is too long, show a message asking the user to shorten it.

### NFR4: Privacy

The MVP must not store submitted resume/profile text.

No database is required for version 1.

### NFR5: Responsive UI

The app must be usable on:

- mobile screens
- laptop/desktop screens

Text must remain readable and controls must not overlap.

## Out of Scope for MVP

Do not build these in version 1:

- login/signup
- resume PDF upload
- saved history
- user dashboard
- payment
- job board scraping
- LinkedIn integration
- multiple resume versions
- advanced analytics

## Acceptance Criteria

The MVP is complete when:

- app opens from a public Vercel URL
- visitor can test it with sample data
- visitor can paste their own job description and profile text
- app returns structured job-fit analysis
- API key is not visible in browser code
- app handles loading and error states
- app works on mobile and desktop
- README includes setup, env vars, live demo link, and screenshots

## Suggested First-Day Scope

Build only:

- one-page UI
- sample data button
- AI analysis API route
- result cards
- copy suggestions button
- Vercel deployment

Anything beyond this should be saved for a later day.
