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

	const jobData = (await res.json()) || [];
	const descriptionObj = JSON.parse(jobData.description);

	const salaryValueParse = (min, max) => {
		if (min === max) {
			return `${min}`;
		}
		return `${min} - ${max}`;
	};
	return (
		<Wrapper className="px-2 lg:px-0">
			<JobViewTracker jobId={jobData.id} />
			<div className="py-5">
				<Link
					href="/oferty-pracy"
					className="flex items-center gap-1 text-neutral-900">
					<ArrowLeft className="size-5" /> Wróć do ofert
				</Link>
			</div>
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-2 flex flex-col gap-3">
					<div className="bg-linear-to-br from-neutral-100 to-neutral-200 p-2 rounded-3xl shadow-md">
						<div className="bg-neutral-100 rounded-2xl p-5 shadow-md relative">
							<div className="w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid z-10 relative">
								<div>
									<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
										{jobData.title}
									</h1>
									<div className="flex gap-1 flex-row text-neutral-900 items-center mt-1">
										<Building2 className="size-4.5" />
										<p>{jobData.company}</p>
									</div>
									<div className="flex items-center gap-1 text-neutral-900 mt-2">
										<MapPin className="size-4.5" />{" "}
										<p>
											{" "}
											{jobData.city}, {jobData.province}
										</p>
									</div>
								</div>
								<div className="">
									<div className="flex items-center gap-2 text-neutral-800 text-xl sm:text-2xl md:text-3xl font-bold text-end justify-end">
										<p>
											{jobData.salary_unit === "month"
												? salaryValueParse(
														jobData.salary_from,
														jobData.salary_to,
													)
												: salaryValueParse(
														jobData.salary_from / 100,
														jobData.salary_to / 100,
													)}{" "}
											{jobData.salary_currency}
										</p>
									</div>
									<div>
										<p className="text-end text-lg sm:text-xl md:text-2xl text-neutral-700">
											{jobData.salary_type}
											{jobData.salary_unit === "month" ? "/mies." : "/h"}
										</p>
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 top-0 pointer-events-none flex items-end justify-end z-0">
								<svg
									className="h-full w-auto max-h-none"
									preserveAspectRatio="xMaxYMax meet"
									xmlns="http://www.w3.org/2000/svg"
									xmlSpace="preserve"
									fillRule="evenodd"
									strokeLinejoin="round"
									strokeMiterlimit="2"
									clipRule="evenodd"
									viewBox="0 0 2067 1477">
									<path
										fill="#E5E5E5"
										fillOpacity="0.4"
										d="M1181.102 295.275 1476.378 0v295.275z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.9"
										d="m1771.653 590.551-295.275-295.275h295.275z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.8"
										d="M1771.653 885.827 1476.378 590.55h295.275zM1771.654 885.827l-295.276 295.276V885.827z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.7"
										d="m2066.929 885.827-295.276 295.275h295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.6"
										d="M2066.93 885.827 1771.653 590.55v295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.7"
										d="M2066.929 295.276 1771.653 590.55h295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.8"
										d="M1771.654 295.275 1476.378 0v295.275z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.5"
										d="M1476.378 885.827 1181.102 590.55h295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.6"
										d="m1181.102 1476.378 295.276-295.276v295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.9"
										d="m1771.654 1181.103-295.276 295.275v-295.275z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.3"
										d="m1771.654 1181.102 295.275 295.276h-295.275zM0 590.551l295.276 295.276H0z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.4"
										d="m590.551 885.827-295.275 295.276V885.827zM295.275 1476.378 0 1181.102h295.275zM0 590.55l295.276-295.275v295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.8"
										d="m885.827 885.827 295.275-295.276v295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.6"
										d="M295.276 1181.102 590.55 885.827v295.275z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.3"
										d="M885.827 1181.103 590.55 1476.378v-295.275z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.3"
										d="m590.551 1181.103-295.275 295.275v-295.275zM885.827 295.276 590.55 590.55h295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.7"
										d="M1476.378 295.276 1181.102 590.55h295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.6"
										d="m885.827 590.551 295.276-295.275H885.827z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.4"
										d="M885.827 0 590.55 295.276h295.276zM295.276 0 590.55 295.276V0z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.5"
										d="M1181.102 590.551 885.827 885.827V590.551zM885.827 1476.378l295.275-295.276v295.276z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.6"
										d="m885.827 885.827 295.276 295.275H885.827z"></path>
								</svg>
							</div>
						</div>
					</div>
					<div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
						<div className="shadow-md rounded-3xl bg-neutral-100 p-3 flex flex-col gap-1">
							<h2 className="inline-flex gap-1 md:gap-2 text-sm md:text-md items-center text-neutral-800">
								<Clock className="size-3.5 md:size-4.5" /> Wymiar pracy
							</h2>
							<p className="text-md sm:text-xl">{jobData.working_time}</p>
						</div>
						<div className="shadow-md rounded-3xl bg-neutral-100 p-3 flex flex-col gap-1">
							<h2 className="inline-flex gap-1 md:gap-2 text-sm md:text-md items-center text-neutral-800">
								<Briefcase className="size-3.5 md:size-4.5" /> Tryb pracy
							</h2>
							<p className="text-md sm:text-xl">{jobData.work_mode}</p>
						</div>
						<div className="shadow-md rounded-3xl bg-neutral-100 p-3 flex flex-col gap-1">
							<h2 className="inline-flex gap-1 md:gap-2 text-sm md:text-md items-center text-neutral-800">
								<FileText className="size-3.5 md:size-4.5" /> Forma zatrudnienia
							</h2>
							<p className="text-md sm:text-xl">{jobData.employment_form}</p>
						</div>
						<div className="shadow-md rounded-3xl bg-neutral-100 p-3 flex flex-col gap-1">
							<h2 className="inline-flex gap-1 md:gap-2 text-sm md:text-md items-center text-neutral-800">
								<Laptop className="size-3.5 md:size-4.5" /> Możli. pracy zdalnej
							</h2>
							<p className="text-md sm:text-xl">
								{jobData.remote ? "Tak" : "Nie"}
							</p>
						</div>
						<div className="shadow-md rounded-3xl bg-neutral-100 p-3 flex flex-col gap-1">
							<h2 className="inline-flex gap-1 md:gap-2 text-sm md:text-md items-center text-neutral-800">
								<Banknote className="size-3.5 md:size-4.5" /> Wynagrodzenie{" "}
								{jobData.salary_type}
							</h2>
							<p className="text-md sm:text-xl">
								{jobData.salary_unit === "month"
									? salaryValueParse(jobData.salary_from, jobData.salary_to)
									: salaryValueParse(
											jobData.salary_from / 100,
											jobData.salary_to / 100,
										)}{" "}
								{jobData.salary_currency}
								{jobData.salary_unit === "month" ? "/mies." : "/h"}
							</p>
						</div>
						<div className="shadow-md rounded-3xl bg-neutral-100 p-3 flex flex-col gap-1">
							<h2 className="inline-flex gap-1 md:gap-2 text-sm md:text-md items-center text-neutral-800">
								<MapPin className="size-3.5 md:size-4.5" /> Lokalizacja
							</h2>
							<p className="text-md sm:text-xl">{jobData.city}</p>
						</div>
						<div className="shadow-md rounded-3xl bg-neutral-100 p-3 flex flex-col gap-1">
							<h2 className="inline-flex gap-1 md:gap-2 text-sm md:text-md items-center text-neutral-800">
								<Book className="size-3.5 md:size-4.5" /> Książeczka sanepido.
							</h2>
							<p className="text-md sm:text-xl">
								{jobData.health_card ? "Tak" : "Nie"}
							</p>
						</div>
						{jobData.accommodation && (
							<div className="shadow-md rounded-3xl bg-neutral-100 p-3 flex flex-col gap-1">
								<h2 className="inline-flex gap-1 md:gap-2 text-sm md:text-md items-center text-neutral-800">
									<House className="size-3.5 md:size-4.5" /> Zakwaterowanie
								</h2>
								<p className="text-md sm:text-xl">{jobData.accommodation}</p>
							</div>
						)}
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
					<div className="rounded-3xl  bg-green-500 shadow-md block md:sticky md:top-[calc(72px+1rem)] md:z-1000 relative overflow-hidden">
						<div className="p-5 relative z-10">
							<h1 className="font-bold text-neutral-900 text-lg">
								Aplikuj teraz
							</h1>
							<p className="text-sm text-neutral-800">
								Zainteresowany tą ofertą? Wyślij swoją aplikację i dołącz do
								zespołu{" "}
								<span className="text-neutral-900 font-medium">
									{jobData.company}
								</span>
								!
							</p>
							<div className="mt-4">
								<Button className="w-full shadow-md" asChild>
									<Link href={jobData.apply_link} target="_blank">
										Aplikuj
									</Link>
								</Button>
							</div>
						</div>
						<div className="absolute inset-y-0 pointer-events-none right-0 top-0 flex items-end justify-end">
							<svg
								className="h-[150%] w-auto max-h-none"
								preserveAspectRatio="xMaxYMax meet"
								xmlns="http://www.w3.org/2000/svg"
								xmlSpace="preserve"
								fillRule="evenodd"
								strokeLinejoin="round"
								strokeMiterlimit="2"
								clipRule="evenodd"
								viewBox="0 0 1908 3178">
								<path
									fill="#7BF1A8"
									fillOpacity="0.5"
									d="M635.897 1906.464h635.283v635.284c-350.858 0-635.283-284.426-635.283-635.284"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.6"
									d="M0 2541.748h635.283v635.284C284.425 3177.032 0 2892.606 0 2541.748"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.75"
									d="M1907.078 1907.078v635.283h-635.284c0-350.858 284.426-635.283 635.284-635.283"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.65"
									d="M634.67 635.897V.614h635.284c0 350.858-284.426 635.283-635.283 635.283z"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.8"
									d="M1271.793 635.284V0h635.284c0 350.858-284.426 635.283-635.283 635.283zM1907.078 2542.361v635.284h-635.284c0-350.858 284.426-635.284 635.284-635.284"></path>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.7"
									transform="matrix(.65594 0 0 .65594 221.483 876.678)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.7"
									transform="matrix(.65594 0 0 .65594 856.154 -393.89)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.5"
									transform="matrix(.65594 0 0 .65594 220.257 -1029.786)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.4"
									transform="matrix(.65594 0 0 .65594 220.87 -393.89)"></circle>
							</svg>
						</div>
					</div>

					<div className="bg-green-500 rounded-3xl p-5 mt-4 overflow-hidden relative shadow-md">
						<div className="z-10 relative">
							<h1 className="font-bold text-neutral-700 text-lg">
								Lokalizacja
							</h1>
							<p className="text-sm text-neutral-800">
								{jobData.city}, woj. {jobData.province}
							</p>
							<div className=" rounded-2xl overflow-hidden mt-2 z-0">
								<JobMap lat={jobData.lat} lng={jobData.lng} />
							</div>
						</div>
						<div className="absolute bg-green-300/50 top-0 left-0 rounded-full h-56 w-56 -translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none" />
					</div>
				</div>
			</div>
		</Wrapper>
	);
}
