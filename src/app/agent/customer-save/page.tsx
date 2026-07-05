import { CustomerSaveAgent } from "@/components/CustomerSaveAgent";

export default function CustomerSaveAgentPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Supervised mini-agent</p>
        <h1 className="mt-3 text-4xl font-black">Customer Save Agent</h1>
        <p className="mt-3 text-ink/70">
          Turn angry customer messages into policy-safe replies and follow-ups. The agent recommends and drafts. The human approves.
        </p>
      </div>
      <CustomerSaveAgent />
    </main>
  );
}
