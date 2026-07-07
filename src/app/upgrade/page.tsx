import { getSubscriptionPlansFromDb } from "@/lib/db";

export default async function UpgradePage() {
  const plans = await getSubscriptionPlansFromDb();
  const freePlan = plans.find((plan) => plan.plan_id === "free") ?? plans[0];
  const proPlan = plans.find((plan) => plan.plan_id === "pro") ?? plans[1] ?? plans[0];

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
          <h2 className="mt-2 text-3xl font-black">{freePlan.name}</h2>
          <p className="mt-2 text-ink/70">{freePlan.price_display}</p>
          <ul className="mt-5 space-y-3 text-sm font-semibold text-ink/75">
            {freePlan.features.map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border-2 border-moss bg-white p-6 shadow-soft">
          <p className="text-sm font-black uppercase text-clay">Pro teaser</p>
          <h2 className="mt-2 text-3xl font-black">{proPlan.name}</h2>
          <p className="mt-2 text-ink/70">{proPlan.price_display} planning range for business owners.</p>
          <ul className="mt-5 space-y-3 text-sm font-semibold text-ink/75">
            {proPlan.features.map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
          <button className="focus-ring mt-6 min-h-11 rounded-md bg-ink px-5 py-3 text-sm font-bold text-white">Mock upgrade</button>
        </section>
      </div>
    </main>
  );
}
