"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { certificateRequirements } from "@/data/certificate";
import type { CertificateProgress } from "@/lib/types";

export function CertificateClient() {
  const [progress, setProgress] = useState<CertificateProgress | null>(null);

  useEffect(() => {
    fetch("/api/certificate/progress")
      .then((response) => response.json())
      .then(setProgress)
      .catch(() => setProgress(null));
  }, []);

  if (!progress) {
    return <p className="text-ink/70">Loading certificate progress...</p>;
  }

  const req = certificateRequirements.requirements;

  return (
    <>
      <section className="mt-8 rounded-lg border border-ink/10 bg-white p-8 shadow-soft">
        {progress.certificate_unlocked ? (
          <div className="rounded-lg border-4 border-moss/20 bg-paper p-8 text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">This certifies that</p>
            <p className="mt-4 text-5xl font-black">Demo Business Owner</p>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink/70">
              completed the A+Prompt foundation track and demonstrated practical ability to structure prompts, provide context, improve outputs through feedback, and use AI safely for basic business tasks.
            </p>
            <p className="mt-6 text-2xl font-black">{progress.certificate_title}</p>
            <p className="mt-2 text-sm font-bold text-ink/60">
              Final assessment score: {progress.final_assessment_score ?? 0}/100
            </p>
            {progress.completed_at ? <p className="mt-1 text-sm text-ink/50">Completed {progress.completed_at}</p> : null}
          </div>
        ) : (
          <div>
            <p className="text-2xl font-black">Keep training to unlock your certificate.</p>
            <p className="mt-2 text-ink/70">Progress is saved to {progress.storage === "supabase" ? "Supabase" : "local fallback"}.</p>
            <ul className="mt-6 space-y-3 text-sm font-semibold text-ink/75">
              <ProgressItem label="Prompt attempts" current={progress.prompt_attempts_count} target={req.min_prompt_attempts} />
              <ProgressItem label="Improved prompts" current={progress.improved_prompts_count} target={req.min_improved_prompts} />
              <ProgressItem label="Saved playbook prompts" current={progress.saved_playbook_count} target={req.min_saved_playbook_prompts} />
              <ProgressItem label="Final assessment score" current={progress.final_assessment_score ?? 0} target={req.min_final_assessment_score} />
            </ul>
          </div>
        )}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {certificateRequirements.skills_demonstrated.map((skill) => (
          <div key={skill} className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
            <p className="font-black">{skill}</p>
          </div>
        ))}
      </section>

      {progress.certificate_unlocked ? (
        <div className="mt-8 rounded-lg bg-ink p-6 text-white">
          <p className="text-xl font-black">{certificateRequirements.upgrade_cta}</p>
          <Link href="/upgrade" className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md bg-gold px-5 py-3 text-sm font-black text-ink">
            View AI Operator plan
          </Link>
        </div>
      ) : (
        <div className="mt-8 rounded-lg bg-mint p-6">
          <p className="text-xl font-black">Complete more prompt workouts to earn your AI Able Certificate.</p>
          <Link href="/missions" className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md bg-ink px-5 py-3 text-sm font-black text-white">
            Back to missions
          </Link>
        </div>
      )}
    </>
  );
}

function ProgressItem({ label, current, target }: { label: string; current: number; target: number }) {
  const done = current >= target;
  return (
    <li className={`rounded-md px-4 py-3 ${done ? "bg-mint text-moss" : "bg-paper text-ink/70"}`}>
      {label}: {current}/{target} {done ? "✓" : ""}
    </li>
  );
}
