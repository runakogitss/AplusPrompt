"use client";

import { useEffect, useState } from "react";
import type { PlaybookEntry } from "@/lib/types";

export function PlaybookClient() {
  const [entries, setEntries] = useState<PlaybookEntry[]>([]);
  const [storage, setStorage] = useState<string>("loading");

  useEffect(() => {
    fetch("/api/playbook")
      .then((response) => response.json())
      .then((data: { entries: PlaybookEntry[] }) => {
        setEntries(data.entries ?? []);
        setStorage(data.entries?.length ? "supabase" : "empty");
      })
      .catch(() => setStorage("error"));
  }, []);

  if (storage === "loading") {
    return <p className="text-ink/70">Loading playbook from Supabase...</p>;
  }

  if (!entries.length) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white p-8 shadow-soft">
        <p className="text-2xl font-black">No saved prompts yet.</p>
        <p className="mt-2 text-ink/70">Complete a mission workout and save your improved prompt here.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <p className="text-sm font-bold text-moss">{entries.length} prompt{entries.length === 1 ? "" : "s"} loaded from Supabase.</p>
      {entries.map((entry) => (
        <article key={entry.id} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-black">{entry.title}</h2>
              <p className="mt-1 text-sm text-ink/60">Score {entry.score}/100</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-mint px-2 py-1 text-xs font-bold text-moss">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 whitespace-pre-wrap rounded-md bg-paper p-4 text-sm leading-6">{entry.final_prompt}</p>
        </article>
      ))}
    </div>
  );
}
