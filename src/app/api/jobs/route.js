import { pool } from "@/lib/db";

export async function GET(req, res) {
	const { searchParams } = new URL(req.url);
	const city = searchParams.get("city");
	const province = searchParams.get("province");
	const employmentType = searchParams.get("employmentType");
	const remote = searchParams.get("remote");
	const keyword = searchParams.get("keyword");
	const salary_min = searchParams.get("salary_min");
	const salary_max = searchParams.get("salary_max");
	const selectedProvinces = province ? province.split(",") : [];
	const selectedCities = city ? city.split(",") : [];
	const salaryMin = salary_min ? Number(salary_min) : null;
	const salaryMax = salary_max ? Number(salary_max) : null;
	const featureFirst = searchParams.get("feature_first") === "true";
	let baseQuery =
		"SELECT id, title, company, description, city, province, lat, lng, employment_form, working_time, remote, salary_from, salary_to, salary_currency, date_posted, date_expires, apply_link, image, work_mode, is_featured, slug, salary_type, salary_unit, health_card, accommodation FROM jobs WHERE is_active = true";

	const params = [];
	let paramIndex = 1;

	if (selectedCities?.length > 0) {
		const placeholders = selectedCities
			.map(() => `$${paramIndex++}`)
			.join(", ");
		baseQuery += ` AND city IN (${placeholders})`;
		params.push(...selectedCities);
	}

	if (selectedProvinces?.length > 0) {
		const placeholders = selectedProvinces
			.map(() => `$${paramIndex++}`)
			.join(", ");
		baseQuery += ` AND province IN (${placeholders})`;
		params.push(...selectedProvinces);
	}

	if (employmentType) {
		baseQuery += ` AND employment_type = $${paramIndex++}`;
		params.push(employmentType);
	}

	if (remote) {
		baseQuery += ` AND remote = $${paramIndex++}`;
		params.push(remote === "true");
	}

	if (keyword) {
		baseQuery += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
		params.push(`%${keyword}%`);
	}
	if (salaryMin !== null) {
		baseQuery += ` AND salary_from >= $${paramIndex++}`;
		params.push(salaryMin);
	}

	if (salaryMax !== null && salaryMax < 15000) {
		baseQuery += ` AND salary_to <= $${paramIndex++}`;
		params.push(salaryMax);
	}
	if (featureFirst) {
		baseQuery += `
    ORDER BY
      CASE
        WHEN is_featured = true AND is_active = true THEN 0
        ELSE 1
      END,
      date_posted DESC
  `;
	} else {
		baseQuery += " ORDER BY date_posted DESC";
	}

	try {
		const { rows } = await pool.query(baseQuery, params);
		return Response.json(rows);
	} catch (err) {
		return Response.json({ error: "Database error", errValue: err });
	}
}
