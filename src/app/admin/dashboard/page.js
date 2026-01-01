import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DataTableDemo from "./table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";

export default async function AdminDashboardPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/admin");
	}

	const cookieStore = await cookies();
	const token = await getToken({
		req: { cookies: cookieStore },
		secret: process.env.NEXTAUTH_SECRET,
	});

	let jobsData = [];

	const result = await pool.query("SELECT id, title, company, description, city, province, lat, lng, employment_form, working_time, remote, salary_from, salary_to, salary_currency, date_posted, date_expires, apply_link, image, work_mode, is_featured, slug, is_active FROM jobs ORDER BY id DESC");

	jobsData = result.rows;
	return (
		<div>
			<div className="w-full flex items-center gap-2">
				<SidebarTrigger className="m-2" />
				<h1 className="text-xl font-bold">Witaj w panelu admina</h1>
			</div>

			<div className="p-6">
				{/* <p>Witaj, {session.user.email}</p> */}
				<h2 className="text-2xl">Lista ogłoszeń</h2>

				<div>
					<DataTableDemo initialData={jobsData} />
				</div>
			</div>
		</div>
	);
}
