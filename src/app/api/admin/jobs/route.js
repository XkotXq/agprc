import { pool } from "@/lib/db";
import slugify from "slugify";
import { getPgBoss } from "@/lib/pgBoss";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
	const session = await getServerSession(authOptions);
	console.log(session, "test sesja");

	if (!session || session.user.role !== "admin") {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
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
		"SELECT id, title, company, description, city, province, lat, lng, employment_form, working_time, remote, salary_from, salary_to, salary_currency, date_posted, date_expires, apply_link, image, work_mode, is_featured, slug, is_active FROM jobs WHERE 1=1";

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

	// const { rows } = await pool.query("SELECT * FROM jobs");
	// return Response.json(rows);
}

export async function POST(req) {
	const client = await pool.connect();
	const boss = await getPgBoss();

	try {
		const body = await req.json();
		const {
			title,
			company,
			description,
			city,
			province,
			lat,
			lng,
			working_time,
			employment_form,
			work_mode,
			remote,
			salary_from,
			salary_to,
			salary_type,
			salary_unit,
			salary_currency,
			date_posted,
			apply_link,
			is_featured,
			date_expires,
			health_card,
			accommodation,
		} = body;

		const now = Date.now();
		const date_post = new Date(date_posted);

		// base slug
		const slugBase = slugify(title, {
			lower: true,
			strict: true,
			locale: "pl",
		});

		// const date_expires = new Date(
		// 	Date.now() + 30 * 24 * 60 * 60 * 1000
		// ).toISOString();

		await client.query("BEGIN");

		// 1️⃣ INSERT
		const insertQuery = `
            INSERT INTO jobs (
                title, company, description, city, requirements, responsibilities, province, lat, lng,
                employment_form, working_time, work_mode, remote, salary_from, salary_to, salary_currency,
                date_posted, date_expires, apply_link, is_featured, benefits, image, slug, is_active, salary_type, salary_unit, health_card, accommodation
            ) VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
                $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28
            )
            RETURNING id
        `;
		const adIsActive = date_post.getTime() <= now;
		console.log(adIsActive, "pokaż jak to idzie");
		const values = [
			title,
			company,
			description,
			city,
			[],
			[],
			province,
			lat,
			lng,
			employment_form,
			working_time,
			work_mode,
			remote,
			salary_unit === "month" ? salary_from : salary_from*100,
			salary_unit === "month" ? salary_to : salary_to*100,
			salary_currency,
			date_posted || new Date(),
			date_expires || null,
			apply_link,
			is_featured,
			[],
			"#",
			slugBase,
			adIsActive,
			salary_type,
			salary_unit,
			!!health_card,
			accommodation || null,
		];

		const { rows } = await client.query(insertQuery, values);
		const jobId = rows[0].id;

		const slugWithID = `${slugBase}-${jobId}`;

		await client.query(`UPDATE jobs SET slug = $1 WHERE id = $2`, [
			slugWithID,
			jobId,
		]);

		await client.query("COMMIT");

		if (date_expires && jobId)
			await boss.send(
				"deactivate-jobAd",
				{ jobId },
				{ startAfter: new Date(date_expires) }
			);

		if (!adIsActive)
			await boss.send("activate-jobAd", { jobId }, { startAfter: date_post });

		return Response.json({
			success: true,
			id: jobId,
			slug: slugWithID,
		});
	} catch (err) {
		await client.query("ROLLBACK");
		console.error(err);

		return Response.json({
			error: "Database error",
			errValue: err.message,
		});
	} finally {
		client.release();
	}
}
