import { PlaybookClient } from "@/components/PlaybookClient";

export default function PlaybookPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Business playbook</p>
      <h1 className="mt-3 text-4xl font-black">Your reusable AI prompts.</h1>
      <p className="mb-8 mt-3 text-ink/70">This is where prompt reps become repeatable workflows for your business.</p>
      <PlaybookClient />
    </main>
  );
}
