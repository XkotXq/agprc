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
		if (min === max) {
			return `${min}`;
		}
		return `${min} - ${max}`;
	};
	return (
		<div
			className={clsx(
				" rounded-3xl p-3  job-item bg-neutral-950 hover:bg-neutral-900 cursor-pointer relative",
				jobData?.is_featured && "border-neutral-600 border",
				!jobData?.is_featured && "border"
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
			<h3 className="text-lg sm:text-xl md:text-2xl">{jobData.title}</h3>
			<p className="text-sm text-neutral-400">{jobData.company}</p>
			<div className="flex flex-row justify-between">
				<div className="flex flex-col gap-1">
					<div className="flex flex-col sm:flex-row sm:gap-3 gap-1">
						<div className="flex flex-row items-center gap-1 text-neutral-300">
							<MapPin className="size-4" />
							<p>
								{Array.isArray(jobData.cities)
									? jobData.cities.join(", ")
									: jobData.city}
								, {jobData.province}
							</p>
						</div>
						{jobData?.working_time && (
							<div className="flex flex-row items-center gap-1 text-neutral-300">
								<Clock className="size-4" />
								<p>{jobData.working_time}</p>
							</div>
						)}
					</div>
					<div className="flex flex-row gap-1 items-center text-neutral-300">
						<Banknote className="size-5" />
						<p>
							{jobData.salary_unit === "month"
								? salaryValueParse(jobData.salary_from, jobData.salary_to)
								: salaryValueParse(
										jobData.salary_from / 100,
										jobData.salary_to / 100
								  )}
								  {" "}
							<span>
								{jobData.salary_currency}
								{jobData.salary_unit === "month" ? "" : "/h"}{" "}
								{jobData.salary_type}
							</span>
						</p>
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
			{jobData?.is_featured && (
				<SparklesCore
					background="transparent"
					minSize={0.4}
					maxSize={1}
					particleDensity={50}
					className="w-full h-full absolute top-0 rounded-3xl overflow-hidden left-0 "
					particleColor="#FFFFFF"
				/>
			)}
		</div>
	);
}
