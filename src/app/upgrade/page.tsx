const features = [
  "Advanced business missions",
  "Full prompt playbook",
  "Business memory",
  "Industry context packs",
  "Customer Save Agent templates",
  "Team and cohort certificates"
];

export default function UpgradePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Mock subscription</p>
      <h1 className="mt-3 text-4xl font-black">Become an AI Operator.</h1>
      <p className="mt-3 max-w-3xl text-ink/70">
        The hackathon MVP shows the product ladder without real payment processing. Paid tracks unlock deeper business missions, memory, and supervised agents.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <section className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
          <p className="text-sm font-black uppercase text-clay">Free</p>
          <h2 className="mt-2 text-3xl font-black">AI Able</h2>
          <p className="mt-2 text-ink/70">Foundation track, certificate, basic scoring, and limited playbook saves.</p>
        </section>
        <section className="rounded-lg border-2 border-moss bg-white p-6 shadow-soft">
          <p className="text-sm font-black uppercase text-clay">Pro teaser</p>
          <h2 className="mt-2 text-3xl font-black">AI Operator</h2>
          <p className="mt-2 text-ink/70">$9-$19/month planning range for business owners.</p>
          <ul className="mt-5 space-y-3 text-sm font-semibold text-ink/75">
            {features.map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
          <button className="focus-ring mt-6 min-h-11 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white">Mock upgrade</button>
        </section>
      </div>
    </main>
  );
}
