import { NextResponse } from "next/server";
import { DEMO_PROFILE_ID } from "@/lib/db";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { GuestSession } from "@/lib/types";

export async function POST() {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({
      profile_id: DEMO_PROFILE_ID,
      session_id: null,
      guest_name: "Guest Player",
      storage: "local-fallback"
    } satisfies GuestSession);
  }

  const guestName = `Guest ${new Date().toISOString().slice(0, 10)}`;
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .insert({
      display_name: guestName,
      is_guest: true,
      last_seen_at: new Date().toISOString()
    })
    .select("id, display_name")
    .maybeSingle();

  if (profileError || !profile?.id) {
    return NextResponse.json({ error: "Could not create guest profile." }, { status: 500 });
  }

  const { data: session } = await supabase
    .from("guest_sessions")
    .insert({
      profile_id: profile.id,
      guest_name: profile.display_name ?? guestName,
      device_label: "browser guest"
    })
    .select("id")
    .maybeSingle();

  await supabase.from("login_events").insert({
    profile_id: profile.id,
    event_type: "guest_start"
  });

  return NextResponse.json({
    profile_id: profile.id,
    session_id: session?.id ?? null,
    guest_name: profile.display_name ?? guestName,
    storage: "supabase"
  } satisfies GuestSession);
}
