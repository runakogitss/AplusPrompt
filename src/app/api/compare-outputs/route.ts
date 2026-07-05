import { NextResponse } from "next/server";
import { z } from "zod";
import { getMission } from "@/data/missions";
import { comparisonFallback } from "@/lib/fallbacks";
import { callGemmaJson } from "@/lib/gemma";
import type { OutputComparison } from "@/lib/types";

const RequestSchema = z.object({
  mission_id: z.string(),
  original_prompt: z.string().min(1),
  improved_prompt: z.string().min(1)
});

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Original and improved prompts are required." }, { status: 400 });

  const mission = getMission(parsed.data.mission_id);
  if (!mission) return NextResponse.json({ error: "Mission not found." }, { status: 404 });

  const gemma = await callGemmaJson<OutputComparison>("compare", { ...parsed.data, mission });
  const result = gemma ?? comparisonFallback(parsed.data.mission_id);
  return NextResponse.json(result, {
    headers: { "X-AI-Source": gemma ? "gemma" : "fallback" }
  });
}
