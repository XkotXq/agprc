import { pool } from "@/lib/db";

export async function PATCH(req, { params }) {
    const { slug } = await params;

    try {
        // Najpierw pobierz aktualną wartość is_active
        const currentJob = await pool.query('SELECT is_active FROM jobs WHERE slug = $1', [slug]);
        if (currentJob.rowCount === 0) {
            return new Response(JSON.stringify({ error: "Job not found" }), {
                status: 404,
            });
        }

        const currentIsActive = currentJob.rows[0].is_active;
        const newIsActive = !currentIsActive;

        // Zaktualizuj is_active na przeciwną wartość
        const result = await pool.query('UPDATE jobs SET is_active = $1 WHERE slug = $2 RETURNING *', [newIsActive, slug]);

        return new Response(JSON.stringify({
            msg: "Job activity toggled successfully",
            job: result.rows[0]
        }), { status: 200 });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Database error", details: err.message }),
            {
                status: 500,
            }
        );
    }
}