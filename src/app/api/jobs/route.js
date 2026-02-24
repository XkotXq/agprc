import { pool } from "@/lib/db";

export async function GET(req, res) {
	const { searchParams } = new URL(req.url);
	const city = searchParams.get("city");
	const province = searchParams.get("province");
	const employmentType = searchParams.get("employmentType");
	const remote = searchParams.get("remote");
	const withoutHealthCard = searchParams.get("withoutHealthCard");
	const keyword = searchParams.get("keyword");
	const salaryUnit = searchParams.get("salaryUnit");
	const salary_min = searchParams.get("salary_min");
	const salary_max = searchParams.get("salary_max");
	const selectedProvinces = province ? province.split(",") : [];
	const selectedCities = city ? city.split(",") : [];
	const salaryMin = salary_min ?  salaryUnit === "month" ? Number((salary_min/168)*100) : Number(salary_min*100) : null;
	const salaryMax = salary_max ?  salaryUnit === "month" ? Number((salary_max/168)*100) : Number(salary_max*100) : null;
	const featureFirst = searchParams.get("feature_first") === "true";
	const employmentForm = searchParams.get("employment_form");
	const workingTime = searchParams.get("working_time");
	const workMode = searchParams.get("work_mode");
	const accommodation = searchParams.get("accommodation");
	const selectedEmploymentForms = employmentForm ? employmentForm.split(",") : [];
	const selectedWorkingTimes = workingTime ? workingTime.split(",") : [];
	const selectedWorkModes = workMode ? workMode.split(",") : [];
	const selectedAccommodations = accommodation ? accommodation.split(",") : [];

	const area = searchParams.get("area");
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");


	let baseQuery =
		"SELECT id, title, company, city, province, lat, lng, employment_form, working_time, remote, salary_from, salary_to, salary_currency, date_posted, date_expires, apply_link, image, work_mode, is_featured, slug, salary_type, salary_unit, health_card, accommodation FROM jobs WHERE is_active = true";

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

	if (remote === "true") {
		baseQuery += ` AND remote = $${paramIndex++}`;
		params.push(true);
	}
	if (withoutHealthCard === "true") {
		baseQuery += ` AND health_card = $${paramIndex++}`;
		params.push(false);
	}

	if (keyword) {
		baseQuery += ` AND (title ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
		params.push(`%${keyword}%`);
	}
	if (salaryMin !== null) {
		baseQuery += ` AND salary_from_canonical >= $${paramIndex++}`;
		params.push(salaryMin);
	}

	if (salaryMax !== null && salaryMax < 15000) {
		baseQuery += ` AND salary_to_canonical <= $${paramIndex++}`;
		params.push(salaryMax);
	}

	if (selectedEmploymentForms?.length > 0) {
		const placeholders = selectedEmploymentForms
			.map(() => `$${paramIndex++}`)
			.join(", ");
		baseQuery += ` AND employment_form IN (${placeholders})`;
		params.push(...selectedEmploymentForms);
	}

	if (selectedWorkingTimes?.length > 0) {
		const placeholders = selectedWorkingTimes
			.map(() => `$${paramIndex++}`)
			.join(", ");
		baseQuery += ` AND working_time IN (${placeholders})`;
		params.push(...selectedWorkingTimes);
	}

	if (selectedWorkModes?.length > 0) {
		const placeholders = selectedWorkModes
			.map(() => `$${paramIndex++}`)
			.join(", ");
		baseQuery += ` AND work_mode IN (${placeholders})`;
		params.push(...selectedWorkModes);
	}

	if (selectedAccommodations?.length > 0) {
		const placeholders = selectedAccommodations
			.map(() => `$${paramIndex++}`)
			.join(", ");
		baseQuery += ` AND accommodation IN (${placeholders})`;
		params.push(...selectedAccommodations);
	}

	if (lat && lng && area) {
		const areaInKm = Number(area);

		baseQuery += ` AND ST_DWithin(
			geography(ST_MakePoint(lng, lat)),
			geography(ST_MakePoint($${paramIndex++}, $${paramIndex++})),
			$${paramIndex++} * 1000
		)`;

		params.push(lng, lat, areaInKm);
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
		return Response.json(rows, { status: 200, headers: { "Content-Type": "application/json" } });
	} catch (err) {
		return Response.json({ error: "Internal Server Error"}, { status: 500, headers: { "Content-Type": "application/json" } });
	}
}
