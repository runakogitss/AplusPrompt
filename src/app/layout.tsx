import type { Metadata } from "next";
import Link from "next/link";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import "./globals.css";

export const metadata: Metadata = {
  title: "A+Prompt",
  description: "The AI gym for business owners."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-ink/10 bg-paper/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link href="/" className="text-xl font-black tracking-tight">
              A+Prompt
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-ink/70">
              <Link href="/missions">Missions</Link>
              <Link href="/playbook">Playbook</Link>
              <Link href="/agent/customer-save">Customer Save Agent</Link>
              <Link href="/certificate">Certificate</Link>
              <ConnectionStatus />
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
