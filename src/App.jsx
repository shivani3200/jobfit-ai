import {
  AlertTriangle,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clipboard,
  Copy,
  FileText,
  LoaderCircle,
  Sparkles,
  WandSparkles
} from "lucide-react";
import { useMemo, useState } from "react";
import { generateClientDemoAnalysis } from "./demoAnalysis.js";

const MAX_CHARS = 6000;

const emptyForm = {
  jobTitle: "",
  jobDescription: "",
  profileText: ""
};

const sampleForm = {
  jobTitle: "Frontend Developer Intern",
  jobDescription:
    "We are looking for a Frontend Developer Intern with strong JavaScript, React, HTML, CSS, REST API integration, Git, responsive UI skills, and basic testing knowledge. Experience with Tailwind CSS, Firebase, and clean component design is a plus.",
  profileText:
    "B.Tech CSE graduate with experience building React apps using JavaScript, Redux Toolkit, Tailwind CSS, Firebase, REST APIs, and responsive UI. Built NetflixGPT with authentication, movie browsing, trailer playback, TMDB integration, and OpenAI recommendations. Built Ghar Dekho real estate app with rental/sale listings, filters, responsive UI, and image carousel. Internship experience includes improving multi-step user journeys, dashboard logic, and UI interactions."
};

const initialAnalysis = null;

function countStatus(value) {
  const remaining = MAX_CHARS - value.length;

  if (remaining < 0) {
    return { text: `${Math.abs(remaining)} over limit`, danger: true };
  }

  return { text: `${remaining} left`, danger: remaining < 600 };
}

function App() {
  const [form, setForm] = useState(emptyForm);
  const [analysis, setAnalysis] = useState(initialAnalysis);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      form.jobDescription.trim() &&
      form.profileText.trim() &&
      form.jobDescription.length <= MAX_CHARS &&
      form.profileText.length <= MAX_CHARS &&
      status !== "loading"
    );
  }, [form, status]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function useSampleData() {
    setForm(sampleForm);
    setError("");
    setCopied(false);
  }

  function reset() {
    setForm(emptyForm);
    setAnalysis(null);
    setStatus("idle");
    setError("");
    setCopied(false);
  }

  async function analyze(event) {
    event.preventDefault();
    setCopied(false);

    if (!form.jobDescription.trim() || !form.profileText.trim()) {
      setError("Add a job description and resume/profile text before analyzing.");
      return;
    }

    if (form.jobDescription.length > MAX_CHARS || form.profileText.length > MAX_CHARS) {
      setError("Shorten the job description or profile text to stay under the MVP limit.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "The analysis failed.");
      }

      if (!data.analysis?.summary || !Array.isArray(data.analysis.resumeSuggestions)) {
        throw new Error("The response was not in the expected format.");
      }

      setAnalysis(data.analysis);
      setStatus("success");
    } catch (requestError) {
      const fallback = generateClientDemoAnalysis(form);
      setAnalysis(fallback);
      setStatus("success");
      setError("");
    }
  }

  async function copySuggestions() {
    if (!analysis?.resumeSuggestions?.length) {
      return;
    }

    const text = analysis.resumeSuggestions.map((item, index) => `${index + 1}. ${item}`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const jobCount = countStatus(form.jobDescription);
  const profileCount = countStatus(form.profileText);

  return (
    <main className="app-shell">
      <section className="workspace" aria-labelledby="app-title">
        <header className="topbar">
          <div className="brand-lockup">
            <span className="brand-mark" aria-hidden="true">
              <BriefcaseBusiness size={22} />
            </span>
            <div>
              <h1 id="app-title">JobFit AI</h1>
            </div>
          </div>
          <button className="ghost-button" type="button" onClick={reset}>
            Reset
          </button>
        </header>

        <div className="tool-grid">
          <form className="input-pane" onSubmit={analyze}>
            <div className="pane-heading">
              <div>
                <p className="section-kicker">Input</p>
                <h2>Job and profile</h2>
              </div>
              <button className="sample-button" type="button" onClick={useSampleData}>
                <WandSparkles size={17} />
                Use sample data
              </button>
            </div>

            <label className="field">
              <span>Job title</span>
              <input
                value={form.jobTitle}
                onChange={(event) => updateField("jobTitle", event.target.value)}
                placeholder="Frontend Developer Intern"
              />
            </label>

            <label className="field">
              <span>Job description</span>
              <textarea
                value={form.jobDescription}
                onChange={(event) => updateField("jobDescription", event.target.value)}
                placeholder="Paste the job description here"
                rows={8}
              />
              <small className={jobCount.danger ? "limit danger" : "limit"}>{jobCount.text}</small>
            </label>

            <label className="field">
              <span>Resume/profile text</span>
              <textarea
                value={form.profileText}
                onChange={(event) => updateField("profileText", event.target.value)}
                placeholder="Paste resume summary, skills, and project bullets here"
                rows={8}
              />
              <small className={profileCount.danger ? "limit danger" : "limit"}>{profileCount.text}</small>
            </label>

            {error ? (
              <div className="inline-error" role="alert">
                <AlertTriangle size={18} />
                <span>{error}</span>
              </div>
            ) : null}

            <button className="primary-button" type="submit" disabled={!canSubmit}>
              {status === "loading" ? <LoaderCircle className="spin" size={19} /> : <Sparkles size={18} />}
              Analyze Fit
            </button>
          </form>

          <section className="result-pane" aria-live="polite">
            {!analysis && status !== "loading" ? <EmptyState /> : null}
            {status === "loading" ? <LoadingState /> : null}
            {analysis && status !== "loading" ? (
              <Results analysis={analysis} copied={copied} onCopy={copySuggestions} />
            ) : null}
          </section>
        </div>
      </section>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">
        <FileText size={30} />
      </div>
      <h2>Ready for a quick fit check</h2>
      <p>Paste a job description and profile, or start with sample data.</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="loading-state">
      <LoaderCircle className="spin" size={34} />
      <h2>Analyzing fit</h2>
      <p>Checking skills, gaps, suggestions, and interview prep.</p>
    </div>
  );
}

function Results({ analysis, copied, onCopy }) {
  const scoreClass =
    analysis.matchScore >= 75 ? "score strong" : analysis.matchScore >= 55 ? "score medium" : "score low";

  return (
    <div className="results">
      <div className="score-row">
        <div className={scoreClass}>
          <span>{analysis.matchScore}</span>
          <small>/100</small>
        </div>
        <div className="summary-block">
          <div className="result-meta">
            <BadgeCheck size={17} />
            <span>{analysis.source === "ai" ? "AI analysis" : "Demo analysis"}</span>
          </div>
          <h2>Fit summary</h2>
          <p>{analysis.summary}</p>
        </div>
      </div>

      <div className="result-list-grid">
        <ListCard
          title="Matching skills"
          icon={<CheckCircle2 size={18} />}
          items={analysis.matchingSkills}
          tone="green"
        />
        <ListCard
          title="Missing or weak skills"
          icon={<AlertTriangle size={18} />}
          items={analysis.missingSkills}
          tone="amber"
        />
      </div>

      <ListCard title="Resume suggestions" icon={<Clipboard size={18} />} items={analysis.resumeSuggestions}>
        <button className="copy-button" type="button" onClick={onCopy}>
          <Copy size={16} />
          {copied ? "Copied" : "Copy"}
        </button>
      </ListCard>

      <ListCard title="Interview questions" icon={<BriefcaseBusiness size={18} />} items={analysis.interviewQuestions} />
    </div>
  );
}

function ListCard({ title, icon, items, children, tone = "neutral" }) {
  return (
    <article className={`list-card ${tone}`}>
      <div className="card-title-row">
        <h3>
          {icon}
          {title}
        </h3>
        {children}
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default App;
