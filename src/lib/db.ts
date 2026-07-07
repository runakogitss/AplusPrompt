import "server-only";

import { certificateRequirements } from "@/data/certificate";
import { getMission, missions } from "@/data/missions";
import { rubric } from "@/data/rubric";
import type { CertificateProgress, Mission, PromptRubric, PromptScore, SubscriptionPlan } from "@/lib/types";
import { getSupabaseServerClient } from "@/lib/supabase";

export const DEMO_PROFILE_ID = "00000000-0000-4000-8000-000000000001";

export type { CertificateProgress };

const defaultProgress = (): CertificateProgress => ({
  user_id: "demo-user",
  track_id: certificateRequirements.track_id,
  missions_completed: [],
  prompt_attempts_count: 0,
  improved_prompts_count: 0,
  saved_playbook_count: 0,
  final_assessment_score: null,
  certificate_unlocked: false,
  certificate_title: certificateRequirements.certificate_title,
  completed_at: null,
  storage: "local-fallback"
});

const fallbackPlans: SubscriptionPlan[] = [
  {
    plan_id: "free",
    name: "AI Able",
    price_display: "Free",
    features: ["Foundation track", "AI Able Certificate", "Basic prompt scoring", "5 saved playbook prompts"],
    is_mock: true
  },
  {
    plan_id: "pro",
    name: "AI Operator",
    price_display: "$9-$19/month",
    features: ["Unlimited missions", "Full prompt playbook", "Business memory", "Industry context packs", "Customer Save Agent"],
    is_mock: true
  },
  {
    plan_id: "team",
    name: "AI Operator Team",
    price_display: "$49-$199/month",
    features: ["Multiple users", "Team progress dashboard", "Shared playbooks", "Cohort certificates"],
    is_mock: true
  }
];

function mapMissionRow(row: any): Mission {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    difficulty: row.difficulty,
    skill_focus: row.skill_focus ?? [],
    scenario: row.scenario ?? {},
    bad_prompt_example: row.bad_prompt_example,
    improved_prompt_example: row.improved_prompt_example,
    success_criteria: row.success_criteria ?? [],
    locked: row.is_locked ?? false
  };
}

function fallbackRubric(): PromptRubric {
  return {
    total_points: rubric.total_points,
    categories: rubric.categories.map((category) => ({ ...category })),
    grades: rubric.grades.map((grade) => ({ ...grade }))
  };
}

export async function getMissionsFromDb(): Promise<Mission[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return missions;

  const { data, error } = await supabase.from("missions").select("*").order("created_at", { ascending: true });
  if (error || !data?.length) return missions;
  return data.map(mapMissionRow);
}

export async function getMissionFromDb(id: string): Promise<Mission | undefined> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return getMission(id);

  const { data, error } = await supabase.from("missions").select("*").eq("id", id).maybeSingle();
  if (error || !data) return getMission(id);
  return mapMissionRow(data);
}

export async function getRubricFromDb(): Promise<PromptRubric> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallbackRubric();

  const { data, error } = await supabase.from("rubric_categories").select("*").order("weight", { ascending: false });
  if (error || !data?.length) return fallbackRubric();

  return {
    total_points: 100,
    categories: data.map((row) => ({
      id: row.id,
      name: row.name,
      weight: row.weight,
      question: row.question
    })),
    grades: rubric.grades.map((grade) => ({ ...grade }))
  } as PromptRubric;
}

export async function getSubscriptionPlansFromDb(): Promise<SubscriptionPlan[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return fallbackPlans;

  const { data, error } = await supabase.from("subscription_plans").select("*");
  if (error || !data?.length) return fallbackPlans;

  const order = ["free", "pro", "team"];
  return data
    .map((row) => ({
      plan_id: row.plan_id,
      name: row.name,
      price_display: row.price_display,
      features: row.features ?? [],
      is_mock: row.is_mock ?? true
    }))
    .sort((a, b) => order.indexOf(a.plan_id) - order.indexOf(b.plan_id));
}

export async function ensureDemoProfile() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  await supabase.from("profiles").upsert({
    id: DEMO_PROFILE_ID,
    display_name: "Demo Business Owner",
    business_type: "Bakery"
  });

  return supabase;
}

export async function getCertificateProgress(): Promise<CertificateProgress> {
  const supabase = await ensureDemoProfile();
  if (!supabase) return defaultProgress();

  const { data } = await supabase
    .from("certificate_progress")
    .select("*")
    .eq("profile_id", DEMO_PROFILE_ID)
    .eq("track_id", certificateRequirements.track_id)
    .maybeSingle();

  if (!data) {
    return {
      ...defaultProgress(),
      storage: "supabase"
    };
  }

  return {
    user_id: "demo-user",
    track_id: data.track_id,
    missions_completed: data.missions_completed ?? [],
    prompt_attempts_count: data.prompt_attempts_count ?? 0,
    improved_prompts_count: data.improved_prompts_count ?? 0,
    saved_playbook_count: data.saved_playbook_count ?? 0,
    final_assessment_score: data.final_assessment_score,
    certificate_unlocked: data.certificate_unlocked ?? false,
    certificate_title: data.certificate_title,
    completed_at: data.completed_at,
    storage: "supabase"
  };
}

function isCertificateUnlocked(progress: Omit<CertificateProgress, "storage" | "user_id">) {
  const req = certificateRequirements.requirements;
  return (
    progress.prompt_attempts_count >= req.min_prompt_attempts &&
    progress.improved_prompts_count >= req.min_improved_prompts &&
    progress.saved_playbook_count >= req.min_saved_playbook_prompts &&
    (progress.final_assessment_score ?? 0) >= req.min_final_assessment_score
  );
}

export async function recordPromptAttempt(missionId: string, userPrompt: string, score: PromptScore) {
  const supabase = await ensureDemoProfile();
  if (!supabase) return;

  const progress = await getCertificateProgress();
  const nextAttempts = progress.prompt_attempts_count + 1;
  const nextScore = Math.max(progress.final_assessment_score ?? 0, score.total_score);
  const nextProgress = {
    ...progress,
    prompt_attempts_count: nextAttempts,
    final_assessment_score: nextScore,
    missions_completed: progress.missions_completed.includes(missionId)
      ? progress.missions_completed
      : [...progress.missions_completed, missionId]
  };

  const { data: attempt } = await supabase.from("prompt_attempts").insert({
    profile_id: DEMO_PROFILE_ID,
    mission_id: missionId,
    user_prompt: userPrompt
  }).select("id").maybeSingle();

  if (attempt?.id) {
    await supabase.from("prompt_scores").insert({
      attempt_id: attempt.id,
      mission_id: missionId,
      total_score: score.total_score,
      grade: score.grade,
      user_title: score.user_title,
      category_scores: score.category_scores,
      strengths: score.strengths,
      weaknesses: score.weaknesses,
      coach_explanation: score.coach_explanation,
      next_reps: score.next_reps
    });
  }

  await upsertCertificateProgress(nextProgress);
}

export async function recordImprovedPrompt(missionId: string, improvedPrompt: string) {
  const supabase = await ensureDemoProfile();
  if (!supabase) return;

  const progress = await getCertificateProgress();
  const nextProgress = {
    ...progress,
    improved_prompts_count: progress.improved_prompts_count + 1
  };

  const { data: latestAttempt } = await supabase
    .from("prompt_attempts")
    .select("id")
    .eq("profile_id", DEMO_PROFILE_ID)
    .eq("mission_id", missionId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestAttempt?.id) {
    await supabase.from("prompt_attempts").update({ improved_prompt: improvedPrompt }).eq("id", latestAttempt.id);
  }

  await upsertCertificateProgress(nextProgress);
}

export async function recordPlaybookSave() {
  const supabase = await ensureDemoProfile();
  if (!supabase) return;

  const progress = await getCertificateProgress();
  await upsertCertificateProgress({
    ...progress,
    saved_playbook_count: progress.saved_playbook_count + 1
  });
}

export async function recordCustomerSaveRun(input: Record<string, string>, output: Record<string, unknown>) {
  const supabase = await ensureDemoProfile();
  if (!supabase) return;

  await supabase.from("customer_save_runs").insert({
    profile_id: DEMO_PROFILE_ID,
    business_type: input.business_type,
    complaint: input.complaint,
    policy: input.policy,
    tone: input.tone,
    output,
    approval_required: Boolean(output.approval_required ?? true)
  });
}

async function upsertCertificateProgress(progress: CertificateProgress) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const unlocked = isCertificateUnlocked(progress);
  const row = {
    profile_id: DEMO_PROFILE_ID,
    track_id: certificateRequirements.track_id,
    missions_completed: progress.missions_completed,
    prompt_attempts_count: progress.prompt_attempts_count,
    improved_prompts_count: progress.improved_prompts_count,
    saved_playbook_count: progress.saved_playbook_count,
    final_assessment_score: progress.final_assessment_score,
    certificate_unlocked: unlocked,
    certificate_title: certificateRequirements.certificate_title,
    completed_at: unlocked ? new Date().toISOString().slice(0, 10) : null,
    updated_at: new Date().toISOString()
  };

  const { data: existing } = await supabase
    .from("certificate_progress")
    .select("id")
    .eq("profile_id", DEMO_PROFILE_ID)
    .eq("track_id", certificateRequirements.track_id)
    .maybeSingle();

  if (existing?.id) {
    await supabase.from("certificate_progress").update(row).eq("id", existing.id);
    return;
  }

  await supabase.from("certificate_progress").insert(row);
}
