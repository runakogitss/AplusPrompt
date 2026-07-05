import Link from "next/link";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-bold text-white shadow-soft"
          : "focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-ink/15 bg-white px-5 py-3 text-sm font-bold text-ink"
      }
    >
      {children}
    </Link>
  );
}
