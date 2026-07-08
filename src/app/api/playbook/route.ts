import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_PROFILE_ID, ensureDemoProfile, recordPlaybookSave } from "@/lib/db";
import { getSupabaseServerClient } from "@/lib/supabase";

const EntrySchema = z.object({
  id: z.string().optional(),
  profile_id: z.string().optional(),
  mission_id: z.string(),
  title: z.string(),
  final_prompt: z.string(),
  score: z.number(),
  tags: z.array(z.string()).default([]),
  when_to_use: z.string().optional(),
  inputs_to_replace: z.array(z.string()).default([]),
  safety_notes: z.array(z.string()).default([]),
  created_at: z.string().optional()
});

export async function GET(request: Request) {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ entries: [] });

  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profile_id") ?? DEMO_PROFILE_ID;
  const { data, error } = await supabase
    .from("playbook_entries")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ entries: [] });

  const { data: attempts } = await supabase
    .from("prompt_attempts")
    .select("mission_id, user_prompt, improved_prompt, created_at")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });

  const latestAttemptByMission = new Map<string, { attempted_prompt: string; ai_best_approach?: string }>();
  for (const attempt of attempts ?? []) {
    if (!latestAttemptByMission.has(attempt.mission_id)) {
      latestAttemptByMission.set(attempt.mission_id, {
        attempted_prompt: attempt.user_prompt,
        ai_best_approach: attempt.improved_prompt
      });
    }
  }

  const entries = data.map((entry) => ({
    ...entry,
    attempted_prompt: latestAttemptByMission.get(entry.mission_id)?.attempted_prompt ?? entry.attempted_prompt,
    ai_best_approach: latestAttemptByMission.get(entry.mission_id)?.ai_best_approach ?? entry.final_prompt
  }));

  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const parsed = EntrySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid playbook entry." }, { status: 400 });

  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ ok: true, entry_id: parsed.data.id ?? `pb_${Date.now()}`, storage: "local-fallback" });

  const entry = {
    id: parsed.data.id ?? `pb_${Date.now()}`,
    profile_id: parsed.data.profile_id ?? DEMO_PROFILE_ID,
    mission_id: parsed.data.mission_id,
    title: parsed.data.title,
    final_prompt: parsed.data.final_prompt,
    score: parsed.data.score,
    tags: parsed.data.tags,
    when_to_use: parsed.data.when_to_use,
    inputs_to_replace: parsed.data.inputs_to_replace,
    safety_notes: parsed.data.safety_notes,
    created_at: parsed.data.created_at ?? new Date().toISOString()
  };

  await ensurePlaybookProfile(entry.profile_id);

  const { error } = await supabase.from("playbook_entries").insert(entry);
  if (error) return NextResponse.json({ ok: false, entry_id: entry.id, storage: "local-fallback", error: error.message });

  await recordPlaybookSave(entry.profile_id);
  return NextResponse.json({ ok: true, entry_id: entry.id, storage: "supabase" });
}

async function ensurePlaybookProfile(profileId: string) {
  if (profileId === DEMO_PROFILE_ID) {
    await ensureDemoProfile();
    return;
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { data } = await supabase.from("profiles").select("id").eq("id", profileId).maybeSingle();
  if (data?.id) {
    await supabase.from("profiles").update({ last_seen_at: new Date().toISOString() }).eq("id", profileId);
    return;
  }

  await supabase.from("profiles").insert({
    id: profileId,
    display_name: "Local Guest",
    is_guest: true,
    last_seen_at: new Date().toISOString()
  });
}
