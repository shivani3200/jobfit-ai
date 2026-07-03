# One App a Day Playbook

## Core Strategy

One app per day is possible if each app is a **micro-app**:

- one clear use case
- one input flow
- one useful output
- deployed by the end of the day
- no login unless the day is specifically about auth
- no database unless the app needs saved history
- no more than 2-3 screens

The goal is not to build 100 production startups. The goal is to build 100 public proof points: taste, consistency, technical range, communication, and deployment discipline.

## Daily Definition of Done

An app counts for the challenge when it has:

- a working local version
- a public demo link or GitHub Pages/static preview
- a GitHub repo or folder
- a short README
- one post sharing what was built and learned

Optional polish:

- screenshot
- short screen recording
- error state
- mobile polish

## Daily Build Loop

Use this schedule when possible:

- **30 min:** choose idea and define the smallest useful version
- **90-150 min:** build the core app
- **30 min:** fix UI, loading, empty, and error states
- **20 min:** deploy
- **20 min:** write README
- **20 min:** post on Twitter/X

Hard rule: if the app is not working after 3-4 hours, cut scope instead of extending the day.

## Reusable App Template

Create one starter and reuse it every day:

- React + Vite
- Tailwind CSS
- reusable layout component
- reusable input/result card components
- reusable loading/error/empty states
- `.env.example`
- README template
- Vercel-ready config

For AI apps, keep API keys server-side. Do not expose AI keys in frontend `VITE_` variables.

## Content Formula

Every day, share three things:

1. **What I built**
2. **What I learned**
3. **What I will improve**

Post template:

```text
Day X/100 of #100DaysOfAI

Built: <app name>
It helps <user> do <job>.

Learned:
- <specific technical/product lesson>

Challenge:
- <one real issue>

Demo: <link>
Code: <link>
```

## Weekly Rhythm

Use themes so the challenge feels coherent:

- Monday: job/career AI tool
- Tuesday: productivity AI tool
- Wednesday: learning/education AI tool
- Thursday: developer utility
- Friday: creative/media AI tool
- Saturday: clone/remix of a known app with AI
- Sunday: polish, recap, or very small utility

## First 30 Daily App Ideas

### Week 1: Job and Career Tools

1. **JobFit AI** - compare resume/profile with job description.
2. **Interview Question Generator** - create role-specific interview questions.
3. **Resume Bullet Rewriter** - improve bullets without inventing experience.
4. **Cover Letter Draft Assistant** - generate a short tailored cover letter.
5. **LinkedIn About Optimizer** - improve a LinkedIn summary.
6. **Job Description Simplifier** - explain a JD in plain English.
7. **Weekly Recap Page** - publish all week 1 demos in one page.

### Week 2: Prompt and Learning Tools

8. **Prompt Comparator** - compare two prompts and outputs side by side.
9. **Prompt Debugger** - suggest why a prompt gives poor output.
10. **Flashcard Generator** - turn notes into flashcards.
11. **Quiz Me App** - generate quiz questions from pasted content.
12. **Explain Like I Am New** - explain technical topics in beginner-friendly language.
13. **Code Concept Explainer** - paste code and get line-by-line explanation.
14. **Week 2 Recap Page** - lessons from prompt engineering.

### Week 3: Developer Utilities

15. **Bug Report Cleaner** - convert messy bug reports into structured issues.
16. **API Test Case Generator** - generate test cases from endpoint details.
17. **JSON Formatter + Explainer** - format JSON and explain fields.
18. **Regex Helper** - generate and test simple regex patterns.
19. **SQL Explainer** - explain a SQL query in plain language.
20. **README Generator** - create a README from project details.
21. **Week 3 Recap Page** - developer productivity lessons.

### Week 4: UI and Product Tools

22. **Empty State Copy Generator** - generate UI empty states.
23. **Form Validation Message Generator** - better error messages for forms.
24. **Landing Page Copy Assistant** - headline, subcopy, and CTA ideas.
25. **Color Palette Suggester** - suggest palettes from product mood.
26. **UX Review Bot** - paste a feature description and get UX concerns.
27. **Feature Prioritizer** - sort ideas by effort and impact.
28. **Week 4 Recap Page** - product and UI lessons.

### Days 29-30: Portfolio Assets

29. **AI Portfolio Reviewer** - review a portfolio page and suggest improvements.
30. **100 Days Index Site v1** - list all demos, repos, and learnings.

## App Categories for Days 31-100

Repeat the format with increasing depth:

- AI + PDF tools
- AI + images
- AI + voice
- AI + Firebase
- AI + authentication
- AI + database history
- AI + dashboards
- AI + charts
- AI + browser APIs
- AI + real estate workflows
- AI + movie/recommendation workflows
- AI + personal knowledge base
- AI + testing and debugging
- AI + interview preparation
- AI + portfolio/career growth

## What to Share Besides the App

Good learning topics:

- how I scoped the app small enough to ship
- how I wrote the prompt
- how I handled invalid AI output
- how I designed loading states
- how I deployed it
- what broke during deployment
- what I would improve with one more day
- what this taught me about product thinking

## Quality Bar

Do not overbuild. But do keep a minimum quality bar:

- readable mobile layout
- clear input labels
- visible loading state
- friendly error message
- copyable result
- no exposed secret keys
- README explains the app in 30 seconds

## Best Public Narrative

Use this as the consistent story:

> I am building one small AI app every day for 100 days. Each app focuses on one practical workflow, and I share the technical and product lessons I learn while shipping it.

This is stronger than saying:

> I am learning AI.

The visible proof is the shipped app, not the claim.
