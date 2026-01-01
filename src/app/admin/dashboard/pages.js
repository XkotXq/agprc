import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	if (!session || session.user.role !== "admin") {
		redirect("/admin"); // brak dostępu → login
	}
	const cookieStore = cookies();
	const token = cookieStore.get("__Secure-next-auth.session-token")?.value;
	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
		}/api/admin/jobs`,
		{
			headers: { Authorization: `Bearer ${token}` },
			cache: "no-store",
		}
	);

	const jobs = await res.json();

	return (
		<div>
			<h1>Panel Admina</h1>
			<ul>
				{jobs.map((job) => (
					<li key={job.id}>{job.title}</li>
				))}
			</ul>
		</div>
	);
}
