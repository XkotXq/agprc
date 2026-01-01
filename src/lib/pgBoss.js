import { PgBoss } from "pg-boss";

export async function getPgBoss() {
	if (!global.pgBoss) {
		const boss = new PgBoss({
			connectionString: process.env.DATABASE_URL,
		});

		await boss.start();

		global.pgBoss = boss;
	}

	return global.pgBoss;
}
