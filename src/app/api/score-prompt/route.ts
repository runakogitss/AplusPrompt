import { NextResponse } from "next/server";
import { z } from "zod";
import { getMission } from "@/data/missions";
import { rubric } from "@/data/rubric";
import { recordPromptAttempt } from "@/lib/db";
import { scoreFallback } from "@/lib/fallbacks";
import { callGemmaJson } from "@/lib/gemma";
import type { PromptScore } from "@/lib/types";

const RequestSchema = z.object({
  mission_id: z.string(),
  user_prompt: z.string().min(1)
});

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Prompt cannot be empty." }, { status: 400 });

  const mission = getMission(parsed.data.mission_id);
  if (!mission) return NextResponse.json({ error: "Mission not found." }, { status: 404 });

  const gemma = await callGemmaJson<PromptScore>("score", { ...parsed.data, mission, rubric });
  const result = calibrateScore(parsed.data.user_prompt, gemma ?? scoreFallback(parsed.data.user_prompt, parsed.data.mission_id));

  await recordPromptAttempt(parsed.data.mission_id, parsed.data.user_prompt, result.total_score);

  return NextResponse.json(result, {
    headers: { "X-AI-Source": gemma ? "gemma" : "fallback" }
  });
}

function calibrateScore(userPrompt: string, score: PromptScore): PromptScore {
  const prompt = userPrompt.toLowerCase();
  const wordCount = prompt.trim().split(/\s+/).filter(Boolean).length;
  const signals = [
    /bakery|coffee|business|customer|bandung|target|audience/.test(prompt),
    /policy|refund|voucher|approval|budget|under|avoid|do not|constraint|tone/.test(prompt),
    /message|competitor|policy|source|data|customer|complaint|review/.test(prompt),
    /table|list|json|draft|under \d+|format|step/.test(prompt),
    /uncertain|assumption|verify|risk|flag|manual|approval/.test(prompt),
    /recommend|action|next|offer|cta|plan|reply|draft/.test(prompt)
  ].filter(Boolean).length;
  const cap = wordCount < 6 ? 28 : signals <= 1 ? 42 : signals <= 2 ? 58 : 100;

  if (score.total_score <= cap) return score;

  return {
    ...score,
    total_score: cap,
    category_scores: scaleCategoryScores(score.category_scores, cap),
    grade: cap >= 80 ? "A" : cap >= 70 ? "B" : cap >= 60 ? "C" : "Needs Training",
    user_title: cap >= 80 ? "AI Operator" : cap >= 70 ? "Context Builder" : cap >= 60 ? "Prompt Trainee" : "AI Novice",
    coach_explanation:
      "This prompt is missing enough context for AI to produce safe, business-ready work. Add the business situation, source details, constraints, and how the answer should be checked.",
    weaknesses: Array.from(
      new Set([
        ...score.weaknesses,
        "Missing enough business context, source details, constraints, or verification instructions"
      ])
    )
  };
}

function scaleCategoryScores(categoryScores: PromptScore["category_scores"], targetTotal: number): PromptScore["category_scores"] {
  const currentTotal = Object.values(categoryScores).reduce((sum, value) => sum + value, 0);
  if (currentTotal <= targetTotal || currentTotal === 0) return categoryScores;

  const scale = targetTotal / currentTotal;
  const scaled = Object.fromEntries(
    Object.entries(categoryScores).map(([key, value]) => [key, Math.floor(value * scale)])
  ) as PromptScore["category_scores"];

  let remainder = targetTotal - Object.values(scaled).reduce((sum, value) => sum + value, 0);
  for (const key of Object.keys(scaled) as Array<keyof PromptScore["category_scores"]>) {
    if (remainder <= 0) break;
    if (categoryScores[key] > scaled[key]) {
      scaled[key] += 1;
      remainder -= 1;
    }
  }

  return scaled;
}
