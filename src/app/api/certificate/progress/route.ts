import { NextResponse } from "next/server";
import { getCertificateProgress } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const progress = await getCertificateProgress(searchParams.get("profile_id"));
  return NextResponse.json(progress);
}
