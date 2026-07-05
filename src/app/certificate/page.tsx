import Link from "next/link";
import { certificateRequirements } from "@/data/certificate";

export default function CertificatePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Free foundation track</p>
      <h1 className="mt-3 text-4xl font-black">A+Prompt AI Able Certificate</h1>
      <p className="mt-3 max-w-3xl text-ink/70">{certificateRequirements.description}</p>

      <section className="mt-8 rounded-lg border border-ink/10 bg-white p-8 shadow-soft">
        <div className="rounded-lg border-4 border-moss/20 bg-paper p-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">This certifies that</p>
          <p className="mt-4 text-5xl font-black">Demo Business Owner</p>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink/70">
            completed the A+Prompt foundation track and demonstrated practical ability to structure prompts, provide context, improve outputs through feedback, and use AI safely for basic business tasks.
          </p>
          <p className="mt-6 text-2xl font-black">{certificateRequirements.certificate_title}</p>
          <p className="mt-2 text-sm font-bold text-ink/60">Final assessment score: 82/100</p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {certificateRequirements.skills_demonstrated.map((skill) => (
          <div key={skill} className="rounded-lg border border-ink/10 bg-white p-4 shadow-soft">
            <p className="font-black">{skill}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 rounded-lg bg-ink p-6 text-white">
        <p className="text-xl font-black">{certificateRequirements.upgrade_cta}</p>
        <Link href="/upgrade" className="focus-ring mt-5 inline-flex min-h-11 items-center rounded-md bg-gold px-5 py-3 text-sm font-black text-ink">
          View AI Operator plan
        </Link>
      </div>
    </main>
  );
}
