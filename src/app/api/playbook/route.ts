import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_PROFILE_ID, recordPlaybookSave } from "@/lib/db";
import { getSupabaseServerClient } from "@/lib/supabase";

const EntrySchema = z.object({
  id: z.string().optional(),
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

export async function GET() {
  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ entries: [] });

  const { data, error } = await supabase.from("playbook_entries").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ entries: [] });
  return NextResponse.json({ entries: data });
}

export async function POST(request: Request) {
  const parsed = EntrySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid playbook entry." }, { status: 400 });

  const supabase = getSupabaseServerClient();
  if (!supabase) return NextResponse.json({ ok: true, entry_id: parsed.data.id ?? `pb_${Date.now()}`, storage: "local-fallback" });

  const entry = {
    id: parsed.data.id ?? `pb_${Date.now()}`,
    profile_id: DEMO_PROFILE_ID,
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

  const { error } = await supabase.from("playbook_entries").insert(entry);
  if (error) return NextResponse.json({ ok: true, entry_id: entry.id, storage: "local-fallback" });

  await recordPlaybookSave();
  return NextResponse.json({ ok: true, entry_id: entry.id, storage: "supabase" });
}
