import { NextResponse } from "next/server";
import { z } from "zod";
import { getMission } from "@/data/missions";
import { rubric } from "@/data/rubric";
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
  return NextResponse.json(gemma ?? scoreFallback(parsed.data.user_prompt, parsed.data.mission_id));
}
