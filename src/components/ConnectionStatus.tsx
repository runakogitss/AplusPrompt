"use client";

import { useEffect, useState } from "react";

type Health = {
  supabase: { configured: boolean; connected: boolean };
  google: { configured: boolean; connected: boolean; model: string | null };
};

export function ConnectionStatus() {
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  if (!health) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
      <StatusPill label="Supabase" ok={health.supabase.connected} detail={health.supabase.configured ? "live" : "missing env"} />
      <StatusPill
        label="Google AI"
        ok={health.google.connected}
        detail={health.google.connected ? health.google.model ?? "connected" : health.google.configured ? "auth failed" : "missing env"}
      />
    </div>
  );
}

function StatusPill({ label, ok, detail }: { label: string; ok: boolean; detail: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${ok ? "bg-mint text-moss" : "bg-clay/10 text-clay"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-moss" : "bg-clay"}`} />
      {label}: {detail}
    </span>
  );
}
