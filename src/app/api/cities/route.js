import { pool } from "@/lib/db";

export async function GET(req) {
  try {
    const result = await pool.query(
      `SELECT DISTINCT city FROM jobs ORDER BY city ASC`
    );

    const cities = result.rows.map((row) => row.city);

    return new Response(JSON.stringify(cities), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Database error", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
