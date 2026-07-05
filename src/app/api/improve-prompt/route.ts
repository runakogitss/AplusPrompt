import { NextResponse } from "next/server";
import { z } from "zod";
import { getMission } from "@/data/missions";
import { recordImprovedPrompt } from "@/lib/db";
import { improveFallback } from "@/lib/fallbacks";
import { callGemmaJson } from "@/lib/gemma";
import type { ImprovedPrompt } from "@/lib/types";

const RequestSchema = z.object({
  mission_id: z.string(),
  user_prompt: z.string().min(1),
  score_result: z.unknown().optional()
});

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Prompt cannot be empty." }, { status: 400 });

  const mission = getMission(parsed.data.mission_id);
  if (!mission) return NextResponse.json({ error: "Mission not found." }, { status: 404 });

  const gemma = await callGemmaJson<ImprovedPrompt>("improve", { ...parsed.data, mission });
  const result = gemma ?? improveFallback(parsed.data.mission_id);

  await recordImprovedPrompt(parsed.data.mission_id, result.improved_prompt);

  return NextResponse.json(result, {
    headers: { "X-AI-Source": gemma ? "gemma" : "fallback" }
  });
}