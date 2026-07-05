import { NextResponse } from "next/server";
import { certificateRequirements } from "@/data/certificate";

export async function GET() {
  return NextResponse.json({
    user_id: "demo-user",
    track_id: certificateRequirements.track_id,
    missions_completed: certificateRequirements.required_missions,
    prompt_attempts_count: 5,
    improved_prompts_count: 3,
    saved_playbook_count: 1,
    final_assessment_score: 82,
    certificate_unlocked: true,
    certificate_title: certificateRequirements.certificate_title,
    completed_at: new Date().toISOString().slice(0, 10)
  });
}
