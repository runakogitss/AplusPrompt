import { notFound } from "next/navigation";
import { MissionWorkout } from "@/components/MissionWorkout";
import { getMission } from "@/data/missions";

export default function MissionDetailPage({ params }: { params: { id: string } }) {
  const mission = getMission(params.id);
  if (!mission) notFound();

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-clay">Mission workout</p>
        <h1 className="mt-3 text-4xl font-black">{mission.title}</h1>
        <p className="mt-3 text-ink/70">{mission.subtitle}</p>
      </div>
      <MissionWorkout mission={mission} />
    </main>
  );
}
