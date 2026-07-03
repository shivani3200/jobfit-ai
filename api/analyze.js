import { handleAnalyzePayload } from "../server/jobfit.js";

function getBody(req) {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body);
  }

  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Use POST /api/analyze." });
    return;
  }

  try {
    const payload = getBody(req);
    const result = await handleAnalyzePayload(payload);
    res.status(result.ok ? 200 : 400).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Unable to analyze this profile right now." });
  }
}
