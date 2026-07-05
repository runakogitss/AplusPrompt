import { NextResponse } from "next/server";
import { z } from "zod";
import { recordCustomerSaveRun } from "@/lib/db";
import { customerSaveAgentFallback } from "@/lib/fallbacks";
import { callGemmaJson } from "@/lib/gemma";
import type { CustomerSaveAgentOutput } from "@/lib/types";

const RequestSchema = z.object({
  business_type: z.string().min(1),
  complaint: z.string().min(1),
  policy: z.string().min(1),
  tone: z.string().min(1)
});

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Business type, complaint, policy, and tone are required." }, { status: 400 });

  const gemma = await callGemmaJson<CustomerSaveAgentOutput>("customer_save_agent", parsed.data);
  const result = gemma ?? customerSaveAgentFallback();

  await recordCustomerSaveRun(parsed.data, result as unknown as Record<string, unknown>);

  return NextResponse.json(result, {
    headers: { "X-AI-Source": gemma ? "gemma" : "fallback" }
  });
}
