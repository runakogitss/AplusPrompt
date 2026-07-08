"use client";

import { useState } from "react";
import { customerSavePolicy } from "@/data/policy";
import { getGuestProfileId } from "@/lib/guestClient";
import type { CustomerSaveAgentOutput } from "@/lib/types";

const seededComplaint =
  "I ordered a cake for my daughter's birthday and it arrived 2 hours late. The party was already over. I'm very disappointed.";

export function CustomerSaveAgent() {
  const [businessType, setBusinessType] = useState(customerSavePolicy.business_type);
  const [tone, setTone] = useState(customerSavePolicy.tone);
  const [complaint, setComplaint] = useState(seededComplaint);
  const [policy, setPolicy] = useState(JSON.stringify(customerSavePolicy, null, 2));
  const [result, setResult] = useState<CustomerSaveAgentOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiSource, setAiSource] = useState<string | null>(null);

  async function runAgent() {
    setLoading(true);
    const profileId = await getGuestProfileId();
    const response = await fetch("/api/customer-save-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ business_type: businessType, complaint, policy, tone, profile_id: profileId })
    });
    setAiSource(response.headers.get("X-AI-Source"));
    setResult(await response.json());
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        <p className="text-sm font-bold text-moss">This agent drafts a safe response. You approve before sending.</p>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-bold">
            Business type
            <input value={businessType} onChange={(event) => setBusinessType(event.target.value)} className="focus-ring rounded-md border border-ink/15 bg-paper p-3 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Desired tone
            <input value={tone} onChange={(event) => setTone(event.target.value)} className="focus-ring rounded-md border border-ink/15 bg-paper p-3 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Customer complaint
            <textarea value={complaint} onChange={(event) => setComplaint(event.target.value)} className="focus-ring min-h-28 rounded-md border border-ink/15 bg-paper p-3 font-normal" />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Business policy
            <textarea value={policy} onChange={(event) => setPolicy(event.target.value)} className="focus-ring min-h-44 rounded-md border border-ink/15 bg-paper p-3 font-normal" />
          </label>
        </div>
        <button onClick={runAgent} disabled={loading} className="focus-ring mt-5 min-h-11 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white disabled:opacity-60">
          {loading ? "Running supervised workflow..." : "Run Customer Save Agent"}
        </button>
        {aiSource ? (
          <p className="mt-3 text-xs font-bold text-ink/50">
            Workflow powered by {aiSource === "gemma" ? "Google Cloud Gemma" : "local fallback policy engine"}
          </p>
        ) : null}
      </section>

      <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
        {!result ? (
          <div className="rounded-md bg-mint p-5">
            <p className="text-2xl font-black">Workflow preview</p>
            <ol className="mt-4 space-y-3 text-sm font-semibold text-ink/75">
              <li>1. Classify complaint.</li>
              <li>2. Detect emotion and severity.</li>
              <li>3. Check policy.</li>
              <li>4. Recommend action.</li>
              <li>5. Draft reply and follow-up.</li>
              <li>6. Wait for human approval.</li>
            </ol>
          </div>
        ) : (
          <div>
            <div className="rounded-md border border-gold bg-gold/20 p-4">
              <p className="text-sm font-black uppercase text-clay">Approval required</p>
              <p className="mt-1 text-sm font-semibold">Review carefully before sending. A+Prompt does not send messages automatically.</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Fact label="Issue" value={result.issue_type} />
              <Fact label="Emotion" value={result.emotion} />
              <Fact label="Severity" value={result.severity} />
              <Fact label="Approval" value={result.approval_required ? "Required" : "Review recommended"} />
            </div>
            <Panel title="Recommended action">{result.recommended_action}</Panel>
            <Panel title="Draft reply">{result.draft_reply}</Panel>
            <Panel title="Follow-up">{result.follow_up_message}</Panel>
            <Panel title="Risk flags">{result.risk_flags.join(" | ")}</Panel>
          </div>
        )}
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-paper p-3">
      <p className="text-xs font-black uppercase text-clay">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-md border border-ink/10 p-4">
      <p className="text-xs font-black uppercase text-clay">{title}</p>
      <p className="mt-2 text-sm leading-6 text-ink/75">{children}</p>
    </div>
  );
}
