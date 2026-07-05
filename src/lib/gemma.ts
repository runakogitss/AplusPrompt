import "server-only";

import { GoogleAuth } from "google-auth-library";

type GemmaTask = "score" | "improve" | "compare" | "customer_save_agent";

export function hasGemmaConfig() {
  return Boolean(
    process.env.GOOGLE_CLOUD_PROJECT &&
      process.env.GOOGLE_CLOUD_LOCATION &&
      (process.env.GOOGLE_GEMMA_MODEL || process.env.GOOGLE_GEMMA_ENDPOINT)
  );
}

export async function checkGemmaAuth(): Promise<boolean> {
  if (!hasGemmaConfig()) return false;
  try {
    await getAccessToken();
    return true;
  } catch {
    return false;
  }
}

export async function callGemmaJson<T>(task: GemmaTask, payload: unknown): Promise<T | null> {
  if (!hasGemmaConfig()) return null;

  try {
    const accessToken = await getAccessToken();
    const endpoint = buildEndpoint();
    const prompt = buildPrompt(task, payload);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 1200,
          temperature: task === "score" || task === "customer_save_agent" ? 0.2 : 0.4,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    const text = extractText(data);
    if (!text) return null;
    return JSON.parse(stripJson(text)) as T;
  } catch {
    return null;
  }
}

function buildEndpoint() {
  if (process.env.GOOGLE_GEMMA_ENDPOINT) return process.env.GOOGLE_GEMMA_ENDPOINT;

  const project = process.env.GOOGLE_CLOUD_PROJECT!;
  const location = process.env.GOOGLE_CLOUD_LOCATION!;
  const model = normalizeModelId(process.env.GOOGLE_GEMMA_MODEL ?? "gemma-2-9b-it");

  return `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:generateContent`;
}

function normalizeModelId(model: string) {
  if (model === "gemma2-9b-it") return "gemma-2-9b-it";
  return model;
}

async function getAccessToken() {
  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  const auth = credentialsJson
    ? new GoogleAuth({
        credentials: parseCredentialsJson(credentialsJson),
        scopes: ["https://www.googleapis.com/auth/cloud-platform"]
      })
    : new GoogleAuth({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ["https://www.googleapis.com/auth/cloud-platform"]
      });

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return typeof token === "string" ? token : token.token ?? "";
}

function parseCredentialsJson(raw: string) {
  const trimmed = raw.trim().replace(/^['"]|['"]$/g, "");
  return JSON.parse(trimmed);
}

function buildPrompt(task: GemmaTask, payload: unknown) {
  const base =
    "You are part of A+Prompt, an AI gym for business owners. Return valid JSON only. Use simple, encouraging business-owner language. Never claim a customer message was sent.";

  const taskInstructions: Record<GemmaTask, string> = {
    score:
      "Score the user's prompt using goal_clarity 15, business_context 20, input_source_clarity 15, output_format 10, constraints 15, verification 10, actionability 15. Return total_score, grade, user_title, category_scores, strengths, weaknesses, coach_explanation, next_reps.",
    improve:
      "Rewrite the weak prompt into a stronger business prompt. Return improved_prompt, changes_made, why_it_is_better.",
    compare:
      "Generate weak_output, improved_output, comparison with specificity/safety/usefulness/business_fit, and main_learning.",
    customer_save_agent:
      "Run the supervised Customer Save Agent workflow. Return issue_type, emotion, severity, summary, policy_match, recommended_action, risk_flags, draft_reply, follow_up_message, approval_required. Always require human approval for high or critical severity."
  };

  return `${base}\n\n${taskInstructions[task]}\n\nInput JSON:\n${JSON.stringify(payload)}`;
}

function extractText(data: any): string | null {
  if (typeof data?.candidates?.[0]?.content?.parts?.[0]?.text === "string") {
    return data.candidates[0].content.parts[0].text;
  }
  if (typeof data?.predictions?.[0] === "string") return data.predictions[0];
  if (typeof data?.predictions?.[0]?.content === "string") return data.predictions[0].content;
  if (typeof data?.predictions?.[0]?.text === "string") return data.predictions[0].text;
  return null;
}

function stripJson(text: string) {
  return text.replace(/^```json/i, "").replace(/^```/i, "").replace(/```$/i, "").trim();
}
