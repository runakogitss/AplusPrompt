import { MissionCard } from "@/components/MissionCard";
import { getMissionsFromDb } from "@/lib/db";

export default async function MissionsPage() {
  const missions = await getMissionsFromDb();

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Prompt workouts</p>
        <h1 className="mt-3 text-4xl font-black">Choose the business problem to train.</h1>
        <p className="mt-3 text-ink/70">Each mission gives you a real scenario, scores your prompt form, and turns the best version into reusable work.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </main>
  );
}
