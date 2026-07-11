import crypto from "node:crypto";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { lessonCards } from "./src/curriculum.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");
const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "sessions.json");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const rubric = [
  {
    key: "clarity",
    label: "Clarity of task",
    detect: (text) => /(find|compare|research|identify|analyze|list|summarize|evaluate)/i.test(text),
    missing: "Say the exact research job you want AI to do.",
    lessonId: "MR-001"
  },
  {
    key: "businessContext",
    label: "Business context",
    detect: (text) => /(business|company|brand|shop|agency|restaurant|clinic|saas|service|product|startup|i run|we sell|we offer)/i.test(text),
    missing: "Add your business type, offer, and situation.",
    lessonId: "MR-001"
  },
  {
    key: "market",
    label: "Target customer / market",
    detect: (text) => /(target|customer|buyer|audience|market|location|city|country|region|local|online|b2b|b2c|gen z|parents|owners|managers)/i.test(text),
    missing: "Name the customer group and market or location.",
    lessonId: "MR-002"
  },
  {
    key: "sources",
    label: "Source and recency awareness",
    detect: (text) => /(source|sources|cite|citation|recent|latest|2026|2025|last|current|within|links|evidence)/i.test(text),
    missing: "Ask for recent sources or clearly labeled evidence.",
    lessonId: "MR-003"
  },
  {
    key: "structure",
    label: "Output structure",
    detect: (text) => /(table|bullets|columns|format|sections|rank|scorecard|matrix|compare by|include)/i.test(text),
    missing: "Choose the output format, such as a table or short brief.",
    lessonId: "MR-004"
  },
  {
    key: "constraints",
    label: "Constraints and assumptions",
    detect: (text) => /(assumption|constraints|budget|limit|exclude|only|must|avoid|criteria|if unknown|ask me)/i.test(text),
    missing: "Set constraints and ask AI to state assumptions.",
    lessonId: "MR-005"
  },
  {
    key: "actionability",
    label: "Business usefulness",
    detect: (text) => /(recommend|next steps|action|decision|gap|opportunity|strategy|priority|what should|so i can|use this to)/i.test(text),
    missing: "Tell AI what decision or next action the research should support.",
    lessonId: "MR-006"
  }
];

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".md": "text/markdown; charset=utf-8"
};

async function readDb() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    return JSON.parse(await fs.readFile(dbPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return { sessions: {} };
    throw error;
  }
}

async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

function createSession(id = crypto.randomUUID()) {
  return {
    id,
    currentMission: "market-research-coach",
    xp: 0,
    belt: "White Belt",
    completed: false,
    attempts: [],
    createdAt: new Date().toISOString()
  };
}

function beltForXp(xp) {
  if (xp >= 240) return "Green Belt";
  if (xp >= 110) return "Yellow Belt";
  return "White Belt";
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function json(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function evaluatePrompt(promptText, previousAttempt) {
  const text = promptText.trim();
  const checks = rubric.map((item) => ({ ...item, passed: item.detect(text) }));
  const passed = checks.filter((item) => item.passed);
  const missing = checks.filter((item) => !item.passed);
  const score = passed.length;
  const previousScore = previousAttempt?.feedback?.score || 0;
  const improvement = Math.max(0, score - previousScore);
  const xpReward = 20 + score * 8 + improvement * 18;
  const lessonIds = [...new Set(missing.slice(0, 3).map((item) => item.lessonId).concat(passed.slice(0, 2).map((item) => item.lessonId)))];
  const lessonsUsed = lessonCards.filter((card) => lessonIds.includes(card.id));
  const strengths = passed.length
    ? passed.slice(0, 3).map((item) => `${item.label}: this part is starting to guide the AI toward a useful answer.`)
    : ["You picked a useful business task. That is a solid first rep."];
  const missingItems = missing.map((item) => item.missing);
  const nextFocus = missing.slice(0, 3).map((item) => item.label.toLowerCase());
  const coachMood = score >= 6 ? "celebration" : score >= 4 ? "thumbs" : score >= 2 ? "checklist" : "thinking";

  return {
    id: crypto.randomUUID(),
    score,
    maxScore: rubric.length,
    improvement,
    xpReward,
    coachMood,
    headline: score >= 6 ? "Strong work. This is becoming a business-ready research prompt." : "Good start. Let’s make the AI do sharper business work.",
    whatWentWell: strengths,
    missing: missingItems,
    whyItMatters: missing.length
      ? "When these details are missing, AI tends to answer with generic competitor lists. Better context helps it compare the right businesses, use fresher evidence, and produce advice you can act on."
      : "You gave the AI enough context, structure, and decision focus to produce research that a business owner can actually use.",
    lessonPrinciples: lessonsUsed.map((card) => ({
      id: card.id,
      title: card.title,
      beginner_explanation: card.beginner_explanation,
      source_reference: card.source_reference
    })),
    improvedPromptOptions: buildImprovedPrompts(text),
    retryInstruction: missing.length
      ? `For the next rep, add ${nextFocus.join(", ")}. Keep it simple, but make the business situation specific.`
      : "You are ready to finish the mission or do one more polish pass with tighter comparison criteria.",
    rubric: checks.map((item) => ({
      key: item.key,
      label: item.label,
      passed: item.passed
    }))
  };
}

function buildImprovedPrompts(text) {
  const starter = text.length > 24 ? text : "Find competitors for my business";
  return [
    `I run a [business type] in [location] for [target customer]. Research 5 direct competitors and compare them in a table by offer, pricing, positioning, marketing channels, strengths, weaknesses, and customer reviews. Use recent sources from the last 12 months where possible, include links, state assumptions, and finish with 3 recommended next actions for my business.`,
    `Act as a market research coach. My business is [describe product/service], serving [target customer] in [market]. Help me identify competitors, substitutes, and market gaps. Show your answer as: 1) competitor table, 2) patterns you notice, 3) risks or assumptions, 4) best opportunities, 5) actions I should take this week.`,
    `Improve this prompt for business-ready market research: "${starter}". Make it specific about business context, target customer, geography, evidence recency, comparison criteria, output format, and the decision the research should support.`
  ];
}

function sampleBrief(finalPrompt) {
  return {
    title: "Sample market research brief",
    sections: [
      "Competitor map: 5 direct competitors, 2 substitutes, and the likely positioning gap.",
      "Comparison table: price, offer, audience, proof points, acquisition channels, and customer sentiment.",
      "Evidence notes: sources and dates separated from assumptions.",
      "Action plan: 3 practical moves ranked by speed, cost, and likely impact."
    ],
    basedOn: finalPrompt
  };
}

async function handleApi(req, res, pathname) {
  if (pathname === "/api/health") {
    return json(res, 200, { ok: true, mockAI: process.env.MOCK_AI !== "false" });
  }

  if (pathname === "/api/lessons" && req.method === "GET") {
    return json(res, 200, { lessons: lessonCards });
  }

  const db = await readDb();

  if (pathname === "/api/progress" && req.method === "GET") {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const sessionId = url.searchParams.get("sessionId") || crypto.randomUUID();
    db.sessions[sessionId] ||= createSession(sessionId);
    await writeDb(db);
    return json(res, 200, { session: db.sessions[sessionId] });
  }

  if (pathname === "/api/attempts" && req.method === "POST") {
    const body = await parseBody(req);
    const promptText = String(body.prompt || "").trim();
    if (!promptText) return json(res, 400, { error: "Prompt text is required." });

    const sessionId = body.sessionId || crypto.randomUUID();
    db.sessions[sessionId] ||= createSession(sessionId);
    const session = db.sessions[sessionId];
    const previousAttempt = session.attempts.at(-1);
    const feedback = evaluatePrompt(promptText, previousAttempt);
    const attempt = {
      id: crypto.randomUUID(),
      missionId: "market-research-coach",
      prompt: promptText,
      createdAt: new Date().toISOString(),
      feedback
    };

    session.attempts.push(attempt);
    session.xp += feedback.xpReward;
    session.belt = beltForXp(session.xp);
    await writeDb(db);
    return json(res, 200, { session, attempt, feedback });
  }

  if (pathname === "/api/summary" && req.method === "POST") {
    const body = await parseBody(req);
    const session = db.sessions[body.sessionId];
    if (!session || !session.attempts.length) return json(res, 404, { error: "No attempts found for this session." });
    const finalAttempt = session.attempts.at(-1);
    session.completed = true;
    session.completedAt = new Date().toISOString();
    await writeDb(db);
    return json(res, 200, {
      session,
      summary: {
        finalPrompt: finalAttempt.prompt,
        xpEarned: session.xp,
        belt: session.belt,
        learned: [
          "Add business context before asking for research.",
          "Name the target customer and market.",
          "Ask for sources, recency, and assumptions.",
          "Request a clear output structure and next actions."
        ],
        brief: sampleBrief(finalAttempt.prompt)
      }
    });
  }

  json(res, 404, { error: "API route not found." });
}

async function serveStatic(req, res, pathname) {
  const safePath = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const possibleRoots = [publicDir, __dirname];
  for (const root of possibleRoots) {
    const filePath = path.normalize(path.join(root, safePath));
    if (!filePath.startsWith(root)) continue;
    try {
      const stat = await fs.stat(filePath);
      if (!stat.isFile()) continue;
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
      res.end(await fs.readFile(filePath));
      return;
    } catch {
      // Try the next static root.
    }
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }
    await serveStatic(req, res, url.pathname);
  } catch (error) {
    console.error(error);
    json(res, 500, { error: "Server error", detail: error.message });
  }
});

function startServer() {
  server.listen(port, host, () => {
    console.log(`AplusPrompt running at http://${host}:${port}`);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer();
}

export { evaluatePrompt, lessonCards, sampleBrief, server, startServer };
