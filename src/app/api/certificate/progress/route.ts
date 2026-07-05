import { NextResponse } from "next/server";
import { getCertificateProgress } from "@/lib/db";

export async function GET() {
  const progress = await getCertificateProgress();
  return NextResponse.json(progress);
}
