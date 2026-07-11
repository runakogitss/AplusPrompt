import fs from "node:fs/promises";
import path from "node:path";

import { evaluatePrompt, lessonCards, sampleBrief } from "../server.js";

const root = path.resolve(".");
const requiredFiles = [
  "PRD.md",
  ".env.example",
  "public/index.html",
  "public/styles.css",
  "public/app.js",
  "src/curriculum.js",
  "aplusprompt-assets/mascots/coach_pointing_clipboard.png",
  "public/aplusprompt-assets/mascots/coach_pointing_clipboard.png"
];

for (const file of requiredFiles) {
  await fs.access(path.join(root, file));
}

const html = await fs.readFile(path.join(root, "public/index.html"), "utf8");
for (const text of ["AplusPrompt", "Market Research Coach", "Start Training", "Review Prompt"]) {
  if (!html.includes(text)) throw new Error(`Missing expected UI text: ${text}`);
}

if (lessonCards.length < 6) throw new Error("Expected at least 6 lesson cards.");

const weak = evaluatePrompt("Find competitors for my business.");
if (weak.score >= 5) throw new Error(`Weak prompt scored too high: ${weak.score}`);
if (!weak.missing.length) throw new Error("Weak prompt should produce missing items.");

const strong = evaluatePrompt(
  "I run a premium lunch catering business in Singapore for office managers. Research 5 competitors using recent sources from the last 12 months with links. Compare by price, positioning, menu, channels, strengths, weaknesses, and customer reviews in a table. State assumptions and finish with 3 recommended next actions."
);
if (strong.score < 6) throw new Error(`Strong prompt scored too low: ${strong.score}`);
if (!sampleBrief(strong.improvedPromptOptions[0]).sections.length) throw new Error("Sample brief did not generate sections.");

console.log("AplusPrompt smoke test passed.");
console.log(`Weak prompt score: ${weak.score}/${weak.maxScore}`);
console.log(`Strong prompt score: ${strong.score}/${strong.maxScore}`);
