import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const res = await fetch(
    `https://raw.githubusercontent.com/Souradip22/my-profile-data/main/timeline.json`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }

  const json = await res.json();

  return NextResponse.json(json);
}
