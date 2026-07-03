const MAX_TEXT_LENGTH = 6000;

const SKILLS = [
  { label: "JavaScript", tokens: ["javascript", "js", "es6"] },
  { label: "React", tokens: ["react", "react.js", "reactjs"] },
  { label: "Redux", tokens: ["redux", "redux toolkit"] },
  { label: "TypeScript", tokens: ["typescript", "ts"] },
  { label: "Node.js", tokens: ["node", "node.js", "express"] },
  { label: "REST APIs", tokens: ["rest", "api", "apis", "integration"] },
  { label: "Firebase", tokens: ["firebase", "firestore"] },
  { label: "MongoDB", tokens: ["mongodb", "mongo"] },
  { label: "SQL", tokens: ["sql", "mysql", "postgres", "postgresql"] },
  { label: "Tailwind CSS", tokens: ["tailwind", "tailwind css"] },
  { label: "HTML/CSS", tokens: ["html", "css", "html5", "css3"] },
  { label: "Responsive UI", tokens: ["responsive", "mobile", "accessibility"] },
  { label: "Testing", tokens: ["test", "testing", "jest", "playwright", "vitest"] },
  { label: "Git/GitHub", tokens: ["git", "github"] },
  { label: "Figma", tokens: ["figma"] },
  { label: "OpenAI/Gemini", tokens: ["openai", "gemini", "llm", "ai"] },
  { label: "Java", tokens: ["java"] },
  { label: "Python/Flask", tokens: ["python", "flask"] }
];

function containsToken(text, token) {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9+#.])${escaped}([^a-z0-9+#.]|$)`, "i").test(text);
}

function findSkills(text) {
  const normalized = String(text || "").toLowerCase();
  return SKILLS.filter((skill) => skill.tokens.some((token) => containsToken(normalized, token))).map(
    (skill) => skill.label
  );
}

function clampScore(value) {
  const score = Number(value);

  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function cleanList(value, fallback, min = 3, max = 6) {
  const source = Array.isArray(value) ? value : [];
  const cleaned = source
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .slice(0, max);

  const combined = [...cleaned, ...fallback].filter(Boolean);
  return [...new Set(combined)].slice(0, Math.max(min, Math.min(max, combined.length)));
}

function validatePayload(payload) {
  const jobTitle = String(payload.jobTitle || "").trim();
  const jobDescription = String(payload.jobDescription || "").trim();
  const profileText = String(payload.profileText || "").trim();

  if (!jobDescription) {
    return { ok: false, error: "Paste a job description first." };
  }

  if (!profileText) {
    return { ok: false, error: "Paste a resume or profile summary first." };
  }

  if (jobDescription.length > MAX_TEXT_LENGTH || profileText.length > MAX_TEXT_LENGTH) {
    return { ok: false, error: "Please keep each text field under 6,000 characters for this MVP." };
  }

  return {
    ok: true,
    payload: {
      jobTitle,
      jobDescription,
      profileText
    }
  };
}

function normalizeAnalysis(raw, source = "ai") {
  const fallback = generateFallbackAnalysis({
    jobTitle: "",
    jobDescription: "",
    profileText: ""
  });

  return {
    matchScore: clampScore(raw.matchScore),
    summary: String(raw.summary || fallback.summary).trim(),
    matchingSkills: cleanList(raw.matchingSkills, fallback.matchingSkills, 3, 6),
    missingSkills: cleanList(raw.missingSkills, fallback.missingSkills, 3, 6),
    resumeSuggestions: cleanList(raw.resumeSuggestions, fallback.resumeSuggestions, 3, 5),
    interviewQuestions: cleanList(raw.interviewQuestions, fallback.interviewQuestions, 3, 5),
    source
  };
}

function extractJson(text) {
  const trimmed = String(text || "").trim();
  const withoutFence = trimmed.replace(/^```json\s*/i, "").replace(/```$/i, "");
  const start = withoutFence.indexOf("{");
  const end = withoutFence.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI response did not include JSON.");
  }

  return JSON.parse(withoutFence.slice(start, end + 1));
}

function extractResponseText(data) {
  if (typeof data.output_text === "string") {
    return data.output_text;
  }

  const parts = [];

  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }

  return parts.join("\n");
}

function makePrompt({ jobTitle, jobDescription, profileText }) {
  return `
You are JobFit AI, a practical resume reviewer for early-career software roles.

Return only valid JSON using this exact shape:
{
  "matchScore": number,
  "summary": string,
  "matchingSkills": string[],
  "missingSkills": string[],
  "resumeSuggestions": string[],
  "interviewQuestions": string[]
}

Rules:
- Do not invent fake experience, employers, metrics, tools, or degrees.
- Keep suggestions honest and specific.
- Prefer measurable resume improvements when the source text supports them.
- If a skill is missing, say it as a gap or learning target, not as a claim.
- Use 3-6 matching skills, 3-6 missing or weak skills, 3-5 resume suggestions, and 3-5 interview questions.

Job title:
${jobTitle || "Not provided"}

Job description:
${jobDescription}

Resume/profile:
${profileText}
`.trim();
}

async function analyzeWithOpenAI(payload) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      input: makePrompt(payload)
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`OpenAI request failed: ${message}`);
  }

  const data = await response.json();
  const parsed = extractJson(extractResponseText(data));
  return normalizeAnalysis(parsed, "ai");
}

export function generateFallbackAnalysis({ jobTitle, jobDescription, profileText }) {
  const jobSkills = findSkills(jobDescription);
  const profileSkills = findSkills(profileText);
  const matchingSkills = profileSkills.filter((skill) => jobSkills.includes(skill));
  const missingSkills = jobSkills.filter((skill) => !profileSkills.includes(skill));
  const matchRatio = jobSkills.length ? matchingSkills.length / jobSkills.length : 0.45;
  const baseScore = jobSkills.length ? 38 : 48;
  const profileDepth = Math.min(profileSkills.length * 3, 18);
  const matchScore = clampScore(baseScore + matchRatio * 44 + profileDepth);

  const topMatches = matchingSkills.length
    ? matchingSkills
    : profileSkills.slice(0, 4).concat(["Project experience"]).slice(0, 4);
  const topMissing = missingSkills.length
    ? missingSkills
    : ["Role-specific keywords", "Testing examples", "Deployment experience"];

  const roleName = jobTitle || "this role";

  return {
    matchScore,
    summary: `This profile has a ${matchScore >= 70 ? "strong" : matchScore >= 50 ? "partial" : "developing"} fit for ${roleName}. The strongest signal is hands-on project work, while the resume can improve by making role-specific skills and impact more visible.`,
    matchingSkills: cleanList(topMatches, ["JavaScript", "React", "API integration", "Responsive UI"], 3, 6),
    missingSkills: cleanList(topMissing, ["Testing", "TypeScript", "Deployment details"], 3, 6),
    resumeSuggestions: [
      "Rewrite project bullets to start with an action verb, followed by the feature built and the user impact.",
      "Add exact tools from the job description only where they are already supported by your real experience.",
      "Include one bullet that explains API integration, error handling, or state management in a shipped project.",
      "Make measurable outcomes more visible, such as reduced drop-offs, faster completion, or number of users supported.",
      "Move the most relevant skills for this role closer to the top of the resume."
    ],
    interviewQuestions: [
      "Which project best proves your fit for this role, and what technical decisions did you make?",
      "How have you handled API loading, error, and empty states in a React app?",
      "What would you improve in your strongest project if you had one more week?",
      "How do you decide whether to use local state, Redux, Firebase, or a backend API?",
      "Tell me about a bug you fixed and how you verified the fix."
    ],
    source: "demo"
  };
}

export async function handleAnalyzePayload(input) {
  const validation = validatePayload(input || {});

  if (!validation.ok) {
    return validation;
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      ok: true,
      analysis: generateFallbackAnalysis(validation.payload)
    };
  }

  try {
    return {
      ok: true,
      analysis: await analyzeWithOpenAI(validation.payload)
    };
  } catch (error) {
    console.error(error);
    return {
      ok: true,
      analysis: {
        ...generateFallbackAnalysis(validation.payload),
        source: "demo"
      }
    };
  }
}
