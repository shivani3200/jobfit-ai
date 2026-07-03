import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { handleAnalyzePayload } from "./server/jobfit.js";

async function readJson(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function jobFitApiPlugin() {
  return {
    name: "jobfit-api-dev-server",
    configureServer(server) {
      server.middlewares.use("/api/analyze", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "Use POST /api/analyze." }));
          return;
        }

        try {
          const payload = await readJson(req);
          const result = await handleAnalyzePayload(payload);
          res.statusCode = result.ok ? 200 : 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result));
        } catch (error) {
          server.config.logger.error(error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: false, error: "Unable to analyze this profile right now." }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), jobFitApiPlugin()]
});
