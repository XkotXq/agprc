import { NextResponse } from "next/server";

export async function GET() {
  const WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
  const API_KEY = process.env.UMAMI_API_KEY;
  const UMAMI_URL = process.env.UMAMI_URL;

  const res = await fetch(
    `${UMAMI_URL}/api/website/analytics?websiteId=${WEBSITE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Umami error" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}