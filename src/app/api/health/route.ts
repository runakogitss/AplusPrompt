import { NextResponse } from "next/server";
import { checkGemmaAuth, hasGemmaConfig } from "@/lib/gemma";
import { getSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase";

export async function GET() {
  const supabaseConfigured = hasSupabaseConfig();
  const gemmaConfigured = hasGemmaConfig();

  let supabaseConnected = false;
  if (supabaseConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.from("missions").select("id").limit(1);
      supabaseConnected = !error;
    }
  }

  const gemmaConnected = gemmaConfigured ? await checkGemmaAuth() : false;

  return NextResponse.json({
    supabase: {
      configured: supabaseConfigured,
      connected: supabaseConnected
    },
    google: {
      configured: gemmaConfigured,
      connected: gemmaConnected,
      model: process.env.GOOGLE_GEMMA_MODEL ?? null
    }
  });
}
