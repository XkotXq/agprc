import { pool } from "@/lib/db";

export async function GET(req, { params }) {
	const { slug } = await params;

	try {
		const job = await pool.query(
			"SELECT id, title, company, description, city, province, lat, lng, employment_form, working_time, remote, salary_from, salary_to, salary_currency, date_posted, date_expires, apply_link, image, work_mode, is_featured, slug, benefits FROM jobs WHERE is_active = true AND slug = $1",
			[slug]
		);
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
