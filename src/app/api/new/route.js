import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://one-api.ir/spotify/?token=160224:642de2d715860&action=track&id=4VMRsbfZzd3SfQtaJ1Wpwi"
  );
  const data = await res.json();

  return NextResponse.json({ data });
}
