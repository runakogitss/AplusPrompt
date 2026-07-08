"use client";

import type { PlaybookEntry } from "@/lib/types";

const LOCAL_PLAYBOOK_KEY = "aprompt_local_playbook";

export function getLocalPlaybookEntries() {
  try {
    const raw = window.localStorage.getItem(LOCAL_PLAYBOOK_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PlaybookEntry[];
  } catch {
    return [];
  }
}

export function saveLocalPlaybookEntry(entry: PlaybookEntry) {
  const entries = getLocalPlaybookEntries();
  const nextEntries = [entry, ...entries.filter((item) => item.id !== entry.id)];
  window.localStorage.setItem(LOCAL_PLAYBOOK_KEY, JSON.stringify(nextEntries));
}
