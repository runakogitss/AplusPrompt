import Link from "next/link";
import type { Mission } from "@/lib/types";

export function MissionCard({ mission }: { mission: Mission }) {
  return (
    <Link href={`/missions/${mission.id}`} className="focus-ring block rounded-lg border border-ink/10 bg-white p-5 shadow-soft transition hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase text-moss">{mission.difficulty}</span>
        <span className="text-xs font-bold text-clay">12 min rep</span>
      </div>
      <h2 className="text-2xl font-black">{mission.title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/70">{mission.subtitle}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {mission.skill_focus.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-md border border-ink/10 px-2 py-1 text-xs font-semibold text-ink/70">
            {skill}
          </span>
        ))}
      </div>
    </Link>
  );
}
