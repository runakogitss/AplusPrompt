import { ButtonLink } from "@/components/ButtonLink";

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-8 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">The AI gym for business owners</p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-ink md:text-7xl">What business problem are we training today?</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/72">
            A+Prompt helps non-technical owners practice real AI work: write a prompt, get scored, receive form correction, compare better outputs, and save the workflow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/missions">Start your first prompt workout</ButtonLink>
            <ButtonLink href="/agent/customer-save" variant="secondary">
              Try Customer Save Agent
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
          <div className="rounded-md bg-mint p-4">
            <p className="text-sm font-bold text-moss">Demo loop</p>
            <ol className="mt-3 space-y-3 text-sm font-semibold text-ink/80">
              <li>1. Choose a business mission.</li>
              <li>2. Write a weak prompt.</li>
              <li>3. Get rubric-based coaching.</li>
              <li>4. Compare weak vs improved output.</li>
              <li>5. Save the final prompt to your playbook.</li>
              <li>6. Unlock a supervised customer workflow.</li>
            </ol>
          </div>
          <div className="mt-4 rounded-md border border-ink/10 p-4">
            <p className="text-xs font-black uppercase text-clay">Not a course. Not a prompt library.</p>
            <p className="mt-2 text-2xl font-black">Practice-first AI upskilling.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
