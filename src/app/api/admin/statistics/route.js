import { NextResponse } from "next/server";

export async function GET() {
  const DOMAIN_ID = process.env.ACKEE_DOMAIN_ID;
  const TOKEN = process.env.ACKEE_TOKEN;

  const response = await fetch("http://localhost:3002/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
      "Time-Zone": "Europe/Warsaw",
    },
    body: JSON.stringify({
      query: `
        query getDomainStats($id: ID!) {
          domain(id: $id) {
            id
            title
            facts {
              activeVisitors
              viewsToday
              viewsMonth
              viewsYear
            }
            statistics {
              views(interval: DAILY, type: TOTAL) {
                id
                count
              }
              pages(sorting: TOP, range: LAST_7_DAYS) {
                id
                value
                count
              }
              durations(interval: DAILY) {
                id
                value
                count
              }
            }
          }
        }
      `,
      variables: { id: DOMAIN_ID },
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: response.status }
    );
  }

  const json = await response.json();

  if (!json.data || !json.data.domain) {
    return NextResponse.json(
      { error: "Invalid response structure" },
      { status: 500 }
    );
  }

  return NextResponse.json(json.data.domain);
}
