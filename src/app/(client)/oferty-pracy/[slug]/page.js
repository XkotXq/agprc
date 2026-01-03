import JobMap from "@/components/JobMap";
import JobViewTracker from "@/components/JobViewTracker";
import SlateViewer from "@/components/SlateViewer";
import { Button } from "@/components/ui/button";
import ScrollerAnim from "@/components/ui/scrollerAnim";
import Wrapper from "@/components/Wrapper";
import {
	MapPin,
	Clock,
	Banknote,
	ArrowLeft,
	Building2,
	Locate,
	Laptop,
	FileText,
	Briefcase,
	Book,
	House,
} from "lucide-react";
import Link from "next/link";

export default async function JobInfoPage({ params }) {
	const { slug } = await params;
	console.log(slug);
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/jobs/${slug}`, {
		cache: "no-store",
	});
	if (!res.ok) {
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-80px)] flex-col gap-2">
				<h1 className="text-2xl font-bold">
					Nie znaleziono takiej oferty pracy
				</h1>
				<Link
					className="text-xl overflow-hidden h-7 duration-500 group/link"
					href="/oferty-pracy">
					<ScrollerAnim>Lista ogłoszeń</ScrollerAnim>
				</Link>
			</div>
		);
	}

	const jobData = await res.json();
	const descriptionObj = JSON.parse(jobData.description);

	const salaryValueParse = (min, max) => {
		if (min === max) {
			return `${min}`;
		}
		return `${min} - ${max}`;
	};
	return (
		<Wrapper>
			<JobViewTracker jobId={jobData.id} />
			<div className="py-5">
				<Link
					href="/oferty-pracy"
					className="flex items-center gap-1 text-neutral-400">
					<ArrowLeft className="size-5" /> Wróć do ofert
				</Link>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex-2 flex flex-col gap-3">
					<div className="border border-neutral-700 rounded-3xl p-5">
						<div className="flex justify-between">
							<div>
								<h1 className="text-4xl font-bold mb-2">{jobData.title}</h1>
								<div className="flex gap-1 flex-row text-neutral-300 items-center mt-1">
									<Building2 className="size-4.5" />
									<p>{jobData.company}</p>
								</div>
								<div className="flex items-center gap-1 text-neutral-300 mt-2">
									<MapPin className="size-4.5" />{" "}
									<p>
										{" "}
										{jobData.city}, {jobData.province}
									</p>
								</div>
							</div>
							<div>
								<div className="flex items-center gap-2 text-neutral-100 text-3xl font-bold">
									<p>
										{jobData.salary_unit === "month"
											? salaryValueParse(jobData.salary_from, jobData.salary_to)
											: salaryValueParse(
													jobData.salary_from / 100,
													jobData.salary_to / 100
											  )}{" "}
										{jobData.salary_currency}
										{jobData.salary_unit === "month" ? "mies." : "/h"}{" "}
									</p>
								</div>
								<div>
									<p className="text-end text-2xl text-neutral-300">
										{jobData.salary_type}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
						<div className="border border-neutral-600 rounded-3xl bg-neutral-900 p-3 flex justify-center flex-col gap-1">
							<h2 className="inline-flex gap-2 text-md items-center text-neutral-300">
								<Clock className="size-4.5" /> Wymiar pracy
							</h2>
							<p className="text-xl">{jobData.working_time}</p>
						</div>
						<div className="border border-neutral-600 rounded-3xl bg-neutral-900 p-3 flex justify-center flex-col gap-1">
							<h2 className="inline-flex gap-2 text-md items-center text-neutral-300">
								<Briefcase className="size-4.5" /> Tryb pracy
							</h2>
							<p className="text-xl">{jobData.work_mode}</p>
						</div>
						<div className="border border-neutral-600 rounded-3xl bg-neutral-900 p-3 flex justify-center flex-col gap-1">
							<h2 className="inline-flex gap-2 text-md items-center text-neutral-300">
								<FileText className="size-4.5" /> Forma zatrudnienia
							</h2>
							<p className="text-xl">{jobData.employment_form}</p>
						</div>
						<div className="border border-neutral-600 rounded-3xl bg-neutral-900 p-3 flex justify-center flex-col gap-1">
							<h2 className="inline-flex gap-2 text-md items-center text-neutral-300">
								<Laptop className="size-4.5" /> Możliwość pracy zdalnej
							</h2>
							<p className="text-xl">{jobData.remote ? "Tak" : "Nie"}</p>
						</div>
						<div className="border border-neutral-600 rounded-3xl bg-neutral-900 p-3 flex justify-center flex-col gap-1">
							<h2 className="inline-flex gap-2 text-md items-center text-neutral-300">
								<Banknote className="size-4.5" /> Wynagrodzenie{" "}
								{jobData.salary_type}
							</h2>
							<p className="text-xl">
								{jobData.salary_unit === "month"
									? salaryValueParse(jobData.salary_from, jobData.salary_to)
									: salaryValueParse(
											jobData.salary_from / 100,
											jobData.salary_to / 100
									  )}{" "}
								{jobData.salary_currency}
							</p>
						</div>
						<div className="border border-neutral-600 rounded-3xl bg-neutral-900 p-3 flex justify-center flex-col gap-1">
							<h2 className="inline-flex gap-2 text-md items-center text-neutral-300">
								<MapPin className="size-4.5" /> Lokalizacja
							</h2>
							<p className="text-xl">{jobData.city}</p>
						</div>
						<div className="border border-neutral-600 rounded-3xl bg-neutral-900 p-3 flex justify-center flex-col gap-1">
							<h2 className="inline-flex gap-2 text-md items-center text-neutral-300">
								<Book className="size-4.5" /> Książeczka sanepido.
							</h2>
							<p className="text-xl">{jobData.health_card ? "Tak" : "Nie"}</p>
						</div>
						{
							jobData.accommodation && (
								<div className="border border-neutral-600 rounded-3xl bg-neutral-900 p-3 flex justify-center flex-col gap-1">
							<h2 className="inline-flex gap-2 text-md items-center text-neutral-300">
								<House className="size-4.5" /> Zakwaterowanie
							</h2>
							<p className="text-xl">{jobData.accommodation}</p>
						</div>
							)
						}
					</div>

					<div className="my-4">
						{jobData?.description && (
							<div className="mb-4">
								<h1 className="text-2xl font-semibold mb-2">Opis</h1>
								<SlateViewer
									value={
										descriptionObj || [
											{ type: "paragraph", children: [{ text: "" }] },
										]
									}
								/>
							</div>
						)}
					</div>
				</div>
				<div className="flex-1 relative">
					<div className="border border-neutral-700 rounded-3xl p-5 bg-neutral-950 sticky top-[calc(72px+1rem)] z-1000">
						<h1 className="font-bold text-neutral-100 text-lg">
							Aplikuj teraz
						</h1>
						<p className="text-sm text-neutral-400">
							Zainteresowany tą ofertą? Wyślij swoją aplikację i dołącz do
							zespołu{" "}
							<span className="text-neutral-300">{jobData.company}</span>!
						</p>
						<div className="mt-4">
							<Button className="w-full" asChild>
								<Link href={jobData.apply_link} target="_blank">
									Aplikuj
								</Link>
							</Button>
						</div>
					</div>

					<div className="border border-neutral-700 rounded-3xl p-5 mt-4">
						<h1 className="font-bold text-neutral-100 text-lg">Lokalizacja</h1>
						<p className="text-sm text-neutral-400">
							{jobData.city}, woj. {jobData.province}
						</p>
						<div className=" rounded-2xl overflow-hidden mt-2 z-0">
							<JobMap lat={jobData.lat} lng={jobData.lng} />
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}
