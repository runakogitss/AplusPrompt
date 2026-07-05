import { CertificateClient } from "@/components/CertificateClient";
import { certificateRequirements } from "@/data/certificate";

export default function CertificatePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Free foundation track</p>
      <h1 className="mt-3 text-4xl font-black">A+Prompt AI Able Certificate</h1>
      <p className="mt-3 max-w-3xl text-ink/70">{certificateRequirements.description}</p>
      <CertificateClient />
    </main>
  );
}
