import { pool } from "@/lib/db";

export async function POST(req) {
  const { jobId } = await req.json();
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "";

  if (!jobId) {
    return new Response(JSON.stringify({ error: "jobId is required" }), { status: 400 });
  }

  try {
    const { rows } = await pool.query(
      `SELECT COUNT(*) 
       FROM job_views
       WHERE job_id = $1
         AND ip_address = $2
         AND viewed_at > NOW() - INTERVAL '30 minutes'`,
      [jobId, ip]
    );

    if (parseInt(rows[0].count) === 0) {
      await pool.query(
        `INSERT INTO job_views (job_id, ip_address, user_agent)
         VALUES ($1, $2, $3)`,
        [jobId, ip, userAgent]
      );
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}
