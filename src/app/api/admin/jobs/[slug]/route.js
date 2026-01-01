import { pool } from "@/lib/db";

export async function GET(req, { params }) {
    const { slug } = await params;

    try {
        const job = await pool.query('SELECT * FROM jobs WHERE slug = $1', [slug]);
        if (!job || job.rowCount === 0) {
            return new Response(JSON.stringify({ error: "Job not found" }), {
                status: 404,
            });
        }
        return new Response(JSON.stringify(job.rows[0]), { status: 200 });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Database error", details: err.message }),
            {
                status: 500,
            }
        );
    }
}
