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
    return <p className="text-ink/70">Loading your previous prompts...</p>;
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
      <p className="text-sm font-bold text-moss">Prompt loaded!</p>
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
          {entry.when_to_use ? (
            <p className="mt-4 text-sm leading-6 text-ink/70">
              <span className="font-black text-ink">When to use:</span> {entry.when_to_use}
            </p>
          ) : null}
          {entry.inputs_to_replace?.length ? (
            <div className="mt-4">
              <p className="text-xs font-black uppercase text-clay">Inputs to replace</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {entry.inputs_to_replace.map((input) => (
                  <span key={input} className="rounded-md border border-ink/10 px-2 py-1 text-xs font-bold text-ink/65">
                    {input}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {entry.safety_notes?.length ? (
            <div className="mt-4 rounded-md bg-mint p-3">
              <p className="text-xs font-black uppercase text-clay">Safety notes</p>
              <ul className="mt-2 space-y-1 text-sm text-ink/70">
                {entry.safety_notes.map((note) => (
                  <li key={note}>- {note}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
