"use client";

import { useMemo, useState } from "react";
import type { ImprovedPrompt, Mission, OutputComparison, PlaybookEntry, PromptScore } from "@/lib/types";

type Status = "idle" | "scoring" | "done" | "error";

export function MissionWorkout({ mission }: { mission: Mission }) {
  const [prompt, setPrompt] = useState(mission.bad_prompt_example);
  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState<PromptScore | null>(null);
  const [improved, setImproved] = useState<ImprovedPrompt | null>(null);
  const [comparison, setComparison] = useState<OutputComparison | null>(null);
  const [saved, setSaved] = useState(false);

  const scenarioText = useMemo(() => JSON.stringify(mission.scenario, null, 2), [mission.scenario]);

  async function runWorkout() {
    if (!prompt.trim()) return;
    setStatus("scoring");
    setSaved(false);
    try {
      const scoreResult = await postJson<PromptScore>("/api/score-prompt", { mission_id: mission.id, user_prompt: prompt });
      const improvedResult = await postJson<ImprovedPrompt>("/api/improve-prompt", {
        mission_id: mission.id,
        user_prompt: prompt,
        score_result: scoreResult
      });
      const comparisonResult = await postJson<OutputComparison>("/api/compare-outputs", {
        mission_id: mission.id,
        original_prompt: prompt,
        improved_prompt: improvedResult.improved_prompt
      });
      setScore(scoreResult);
      setImproved(improvedResult);
      setComparison(comparisonResult);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  async function savePrompt() {
    if (!improved || !score) return;
    const entry: PlaybookEntry = {
      id: `pb_${Date.now()}`,
      mission_id: mission.id,
      title: `${mission.title} prompt`,
      final_prompt: improved.improved_prompt,
      score: Math.max(score.total_score, 82),
      tags: mission.skill_focus.slice(0, 3).map((tag) => tag.toLowerCase().replaceAll(" ", "-")),
      created_at: new Date().toISOString()
    };

    await fetch("/api/playbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry)
    });

    const existing = JSON.parse(localStorage.getItem("aprompt_playbook") ?? "[]") as PlaybookEntry[];
    localStorage.setItem("aprompt_playbook", JSON.stringify([entry, ...existing]));
    setSaved(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <p className="text-xs font-black uppercase text-clay">Scenario</p>
        <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-md bg-mint p-4 text-sm leading-6 text-ink/80">{scenarioText}</pre>
        <div className="mt-5">
          <p className="text-xs font-black uppercase text-clay">Success form</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            {mission.success_criteria.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <label htmlFor="prompt" className="text-xs font-black uppercase text-clay">
          Your prompt attempt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="focus-ring mt-3 min-h-40 w-full resize-y rounded-md border border-ink/15 bg-paper p-4 text-sm leading-6"
          placeholder="Write the prompt you would normally give to ChatGPT."
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={runWorkout} disabled={status === "scoring"} className="focus-ring min-h-11 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white disabled:opacity-60">
            {status === "scoring" ? "Scoring your rep..." : "Score my prompt"}
          </button>
          <button onClick={() => setPrompt(mission.improved_prompt_example)} className="focus-ring min-h-11 rounded-md border border-ink/15 px-5 py-3 text-sm font-bold">
            Need hint?
          </button>
        </div>
        {status === "error" ? <p className="mt-4 text-sm font-bold text-clay">Something went wrong. Try again.</p> : null}

        {score ? (
          <div className="mt-6 rounded-md border border-ink/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-ink/60">Prompt score</p>
                <p className="text-4xl font-black">{score.total_score}/100</p>
              </div>
              <span className="rounded-full bg-gold px-4 py-2 text-sm font-black">{score.grade} - {score.user_title}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-ink/75">{score.coach_explanation}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {Object.entries(score.category_scores).map(([key, value]) => (
                <div key={key} className="rounded-md bg-paper p-3 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="font-bold">{key.replaceAll("_", " ")}</span>
                    <span>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {improved ? (
        <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft lg:col-span-2">
          <p className="text-xs font-black uppercase text-clay">Improved prompt</p>
          <p className="mt-3 rounded-md bg-mint p-4 text-sm leading-7">{improved.improved_prompt}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {improved.changes_made.map((change) => (
              <span key={change} className="rounded-md border border-ink/10 px-3 py-1 text-xs font-bold text-ink/70">
                {change}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {comparison ? (
        <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-clay">Before / after</p>
              <h2 className="mt-1 text-2xl font-black">The better output should be obvious.</h2>
            </div>
            <button onClick={savePrompt} className="focus-ring min-h-11 rounded-md bg-moss px-5 py-3 text-sm font-bold text-white">
              {saved ? "Saved to playbook" : "Save final prompt"}
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-clay/25 bg-clay/5 p-4">
              <p className="font-black">Weak output</p>
              <p className="mt-2 text-sm leading-6 text-ink/75">{comparison.weak_output}</p>
            </div>
            <div className="rounded-md border border-moss/25 bg-mint p-4">
              <p className="font-black">Improved output</p>
              <p className="mt-2 text-sm leading-6 text-ink/75">{comparison.improved_output}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {Object.entries(comparison.comparison).map(([key, value]) => (
              <div key={key} className="rounded-md bg-paper p-3">
                <p className="text-xs font-black uppercase text-clay">{key}</p>
                <p className="mt-2 text-sm leading-5 text-ink/70">{value}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error("Request failed");
  return response.json() as Promise<T>;
}
