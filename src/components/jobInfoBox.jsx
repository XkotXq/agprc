import { MapPin, Clock, Banknote } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import clsx from "clsx";
import { SparklesCore } from "./ui/sparkles";

export default function JobInfoBox({ onClick, markersRef, jobData }) {
	const handleClick = async () => {
		const lastClick = localStorage.getItem(`job-click-${jobData.id}`);
		const now = Date.now();
		if (lastClick && now - parseInt(lastClick) < 30 * 60 * 1000) {
			window.location.href = "/oferty-pracy/" + jobData.slug;
			return;
		}
		try {
			await fetch("/api/job-click", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: jobData.id }),
			});
			localStorage.setItem(`job-click-${jobData.id}`, now.toString());
			window.location.href = "/oferty-pracy/" + jobData.slug;
		} catch (err) {
			console.error(err);
		}
	};

	const salaryValueParse = (min, max) => {
		if (!min && max) {
			return `do ${max}`;
		} else if (!max && min) {
			return `od ${min}`;
		}

		if (min === max) {
			return `${min}`;
		}
		return `${min} - ${max}`;
	};
	return (
		<div
			className={clsx(
				" rounded-3xl p-2  job-item bg-linear-to-br from-neutral-100 to-neutral-200 hover:bg-neutral-200/20 cursor-pointer relative shadow-md",
			)}
			id={`job-${jobData.id}`}
			onClick={() => onClick(jobData.id)}
			onMouseEnter={() => {
				const marker = markersRef.current[jobData.id];
				if (marker) {
					marker.setZIndexOffset(1000);
					marker.openPopup();
				}
			}}
			onMouseLeave={() => {
				const marker = markersRef.current[jobData.id];
				if (marker) {
					marker.setZIndexOffset(0);
					marker.closePopup();
				}
			}}>
			<div className="bg-neutral-100 shadow-md p-2 rounded-2xl overflow-hidden relative">
				<div className="z-10 relative">
					<h2 className="text-lg sm:text-xl md:text-2xl">{jobData.title}</h2>
					<p className="text-sm text-neutral-900">{jobData.company}</p>
					<div className="flex flex-row justify-between">
						<div className="flex flex-col gap-1">
							<div className="flex flex-col sm:flex-row sm:gap-3 gap-1">
								<div className="flex flex-row items-center gap-1 text-neutral-950">
									<MapPin className="size-4" />
									<p>
										{Array.isArray(jobData.cities)
											? jobData.cities.join(", ")
											: jobData.city}
										, {jobData.province}
									</p>
								</div>
								{jobData?.working_time && (
									<div className="flex flex-row items-center gap-1 text-neutral-950">
										<Clock className="size-4" />
										<p>{jobData.working_time}</p>
									</div>
								)}
							</div>
							<div className="flex flex-row gap-1 items-center text-neutral-950">
								<Banknote className="size-5" />
								{!jobData.salary_from && !jobData.salary_to ? (
									<p>brak informacji</p>
								) : (
									<p>
										{salaryValueParse(
											jobData.salary_from / 100,
											jobData.salary_to / 100,
										)}{" "}
										<span>
											{jobData.salary_currency}
											{jobData.salary_unit === "month" ? "" : "/h"}{" "}
											{jobData.salary_type}
										</span>
									</p>
								)}
							</div>
						</div>
						<div className="flex items-end gap-2 pointer">
							<Button
								onClick={(e) => {
									e.stopPropagation();
									handleClick();
								}}
								className="cursor-pointer z-50">
								Aplikuj
							</Button>
						</div>
					</div>
				</div>
				{jobData?.is_featured && (
					<div className="absolute inset-y-0 right-0 top-0 pointer-events-none flex items-end justify-end ">
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
				)}
			</div>
		</div>
	);
}
