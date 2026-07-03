const skillRules = [
  ["JavaScript", ["javascript", "js", "es6"]],
  ["React", ["react", "react.js", "reactjs"]],
  ["Redux", ["redux", "redux toolkit"]],
  ["TypeScript", ["typescript", "ts"]],
  ["Node.js", ["node", "node.js", "express"]],
  ["REST APIs", ["rest", "api", "apis", "integration"]],
  ["Firebase", ["firebase", "firestore"]],
  ["SQL", ["sql", "mysql", "postgres", "postgresql"]],
  ["Tailwind CSS", ["tailwind", "tailwind css"]],
  ["Responsive UI", ["responsive", "mobile", "accessibility"]],
  ["Testing", ["test", "testing", "jest", "playwright", "vitest"]],
  ["Git/GitHub", ["git", "github"]],
  ["OpenAI/Gemini", ["openai", "gemini", "llm", "ai"]]
];

function findSkills(text) {
  const normalized = String(text || "").toLowerCase();

  return skillRules
    .filter(([, tokens]) => tokens.some((token) => normalized.includes(token)))
    .map(([label]) => label);
}

function uniqueList(items, fallback, max = 6) {
  return [...new Set([...items, ...fallback])].filter(Boolean).slice(0, max);
}

export function generateClientDemoAnalysis({ jobTitle, jobDescription, profileText }) {
  const jobSkills = findSkills(jobDescription);
  const profileSkills = findSkills(profileText);
  const matchingSkills = profileSkills.filter((skill) => jobSkills.includes(skill));
  const missingSkills = jobSkills.filter((skill) => !profileSkills.includes(skill));
  const matchRatio = jobSkills.length ? matchingSkills.length / jobSkills.length : 0.45;
  const matchScore = Math.max(0, Math.min(100, Math.round(42 + matchRatio * 42 + profileSkills.length * 2)));
  const roleName = jobTitle || "this role";

  return {
    matchScore,
    summary: `This profile has a ${matchScore >= 70 ? "strong" : matchScore >= 50 ? "partial" : "developing"} fit for ${roleName}. The next step is to make the most relevant skills, project decisions, and measurable impact easier to see.`,
    matchingSkills: uniqueList(matchingSkills, profileSkills.slice(0, 4), 6),
    missingSkills: uniqueList(missingSkills, ["Testing", "TypeScript", "Deployment details"], 6),
    resumeSuggestions: [
      "Rewrite project bullets to show the feature built, the tools used, and the user impact.",
      "Move the most role-relevant skills closer to the top of the resume.",
      "Add exact job-description keywords only when they match real experience.",
      "Include one bullet about API integration, state management, or error handling.",
      "Use measurable outcomes where available, such as improved completion time or reduced support requests."
    ],
    interviewQuestions: [
      "Which project best proves your fit for this role, and why?",
      "How did you handle API loading, error, and empty states in a React app?",
      "What tradeoff did you make while building one of your projects?",
      "How would you improve your strongest project with one more week?",
      "How do you verify that a frontend bug is actually fixed?"
    ],
    source: "static-demo"
  };
}
