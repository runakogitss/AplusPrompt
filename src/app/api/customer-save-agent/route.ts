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
  tone: z.string().min(1),
  profile_id: z.string().optional()
});

export async function POST(request: Request) {
  const parsed = RequestSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Business type, complaint, policy, and tone are required." }, { status: 400 });

  const gemma = await callGemmaJson<CustomerSaveAgentOutput>("customer_save_agent", parsed.data);
  const result = isValidAgentOutput(gemma) ? gemma : customerSaveAgentFallback();

  await recordCustomerSaveRun(parsed.data, result as unknown as Record<string, unknown>, parsed.data.profile_id);

  return NextResponse.json(result, {
    headers: { "X-AI-Source": result === gemma ? "gemma" : "fallback" }
  });
}

function isValidAgentOutput(output: CustomerSaveAgentOutput | null): output is CustomerSaveAgentOutput {
  return Boolean(
    output?.issue_type &&
      output.emotion &&
      output.severity &&
      output.summary &&
      output.recommended_action &&
      output.draft_reply &&
      output.follow_up_message &&
      Array.isArray(output.risk_flags) &&
      output.policy_match?.allowed_actions &&
      output.policy_match?.requires_approval &&
      output.policy_match?.forbidden
  );
}
