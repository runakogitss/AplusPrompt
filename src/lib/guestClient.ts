"use client";

import type { GuestSession } from "@/lib/types";

const GUEST_SESSION_KEY = "aprompt_guest_session";

export async function getGuestSession(): Promise<GuestSession | null> {
  const saved = readSavedGuestSession();
  if (saved) return saved;

  try {
    const response = await fetch("/api/guest-session", { method: "POST" });
    if (!response.ok) return null;

    const session = (await response.json()) as GuestSession;
    window.localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(session));
    return session;
  } catch {
    return null;
  }
}

export async function getGuestProfileId() {
  const session = await getGuestSession();
  return session?.profile_id ?? null;
}

function readSavedGuestSession() {
  try {
    const raw = window.localStorage.getItem(GUEST_SESSION_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as GuestSession;
    return parsed.profile_id ? parsed : null;
  } catch {
    return null;
  }
}
