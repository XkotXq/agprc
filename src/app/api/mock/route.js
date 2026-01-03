import { faker } from "@faker-js/faker";
import { pool } from "@/lib/db";
import slugify from "slugify";

export async function GET(req, res) {
	const wojewodztwa = [
		"dolnośląskie",
		"kujawsko-pomorskie",
		"lubelskie",
		"lubuskie",
		"łódzkie",
		"małopolskie",
		"mazowieckie",
		"opolskie",
		"podkarpackie",
		"podlaskie",
		"pomorskie",
		"śląskie",
		"świętokrzyskie",
		"warmińsko-mazurskie",
		"wielkopolskie",
		"zachodniopomorskie",
	];

	function randomLat() {
		return parseFloat((Math.random() * (54.9 - 49.0) + 49.0).toFixed(6));
	}

	function randomLng() {
		return parseFloat((Math.random() * (24.2 - 14.1) + 14.1).toFixed(6));
	}

	const jobs = Array.from({ length: 50 }).map((_, id) => {
		const salaryFrom = faker.number.int({ min: 3000, max: 8000 });
		const salaryTo = faker.number.int({ min: salaryFrom, max: 15000 });
		const title = faker.person.jobTitle()
		const slug = slugify(title, {
			lower: true, strict: true, locale: "pl"
		})
		const slugWithID = slug+"-"+id+1
		return {
			id: id + 1,
			title,
			slug: slugWithID,
			company: faker.company.name(),
			description: faker.lorem.paragraph(),
			requirements: [faker.hacker.noun(), faker.hacker.verb()],
			responsibilities: [faker.hacker.verb(), faker.hacker.noun()],
			city: faker.location.city(),
			province: faker.helpers.arrayElement(wojewodztwa),
			lat: randomLat(),
			lng: randomLng(),
			employment_type: faker.helpers.arrayElement([
				"pełny etat",
				"część etatu",
				"kontrakt",
			]),
			experience_level: faker.helpers.arrayElement(["junior", "mid", "senior"]),
			remote: faker.datatype.boolean(),
			salary_from: salaryFrom,
			salary_to: salaryTo,
			salary_currency: "zł",
			benefits: [],
			date_posted: faker.date.recent({ days: 30 }),
			date_expires: faker.date.soon({ days: 60 }),
			apply_link: faker.internet.url(),
			image: faker.image.url(),
			work_mode: faker.helpers.arrayElement(["remote", "onsite", "hybrid"]),
			is_featured: faker.datatype.boolean(),
		};
	});
	return Response.json(jobs);

	//  const client = await pool.connect();
	try {
    await client.query(`TRUNCATE TABLE jobs`)
		for (const job of jobs) {
			await client.query(
				`INSERT INTO jobs 
        (title, company, description, requirements, responsibilities, city, province, lat, lng, employment_type, experience_level, remote, salary_from, salary_to, salary_currency, benefits, date_posted, date_expires, apply_link, image, work_mode, is_featured, slug)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22, $23)`,
				[
					job.title,
					job.company,
					job.description,
					job.requirements,
					job.responsibilities,
					job.city,
					job.province,
					job.lat,
					job.lng,
					job.employment_type,
					job.experience_level,
					job.remote,
					job.salary_from,
					job.salary_to,
					job.salary_currency,
					job.benefits,
					job.date_posted,
					job.date_expires,
					job.apply_link,
					job.image,
					job.work_mode,
					job.is_featured,
					job.slug
				]
			);
		}
	} finally {
		client.release();
	}

	return Response.json(jobs);
}
