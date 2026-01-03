"use client";

import React, { useRef, useState, useEffect } from "react";
import MapClient from "@/components/MapClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Wrapper from "@/components/Wrapper";
import polishPlural from "@/functions/plural";
import JobInfoBox from "@/components/jobInfoBox";
import MultiSelectInput from "@/components/muliSelect";
import SalaryRangeInput from "@/components/salaryRangeInput";
import { Skeleton } from "@/components/ui/skeleton";

export default function OfferWorksPage() {
	const [filters, setFilters] = useState({
		city: "",
		employmentType: "",
		remote: "",
		keyword: "",
	});
	const [selectedLocations, setSelectedLocations] = useState([]);
	const [selectedCities, setSelectedCities] = useState([]);
	const [salary, setSalary] = useState([null, null]);
	const [featureFirst, setFeatureFirst] = useState(false);
	const [isFetched, setIsFetched] = useState(false);

	const [jobs, setJobs] = useState([]);
	const [cities, setCities] = useState([]);

	const markersRef = useRef({});
	const mapRef = useRef(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const [jobsRes, citiesRes] = await Promise.all([
					fetch("/api/jobs").then((res) => res.json()),
					fetch("/api/cities").then((res) => res.json()),
				]);
				setJobs(jobsRes);
				setCities(citiesRes);
				setIsFetched(true);
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		const params = new URLSearchParams({ ...filters });
		if (selectedLocations.length > 0)
			params.set("province", selectedLocations.join(","));
		if (selectedCities.length > 0) params.set("city", selectedCities.join(","));
		if (featureFirst) params.set("feature_first", "true");
		if (salary) {
			const [min, max] = salary;
			if (min != null && min > 0) params.set("salary_min", min);
			if (max != null && max > 0) params.set("salary_max", max);
		}

		async function fetchFilteredJobs() {
			try {
				const filteredJobs = await fetch(`/api/jobs?${params.toString()}`).then(
					(res) => res.json()
				);
				setJobs(filteredJobs);
			} catch (err) {
				console.error(err);
			}
		}

		fetchFilteredJobs();
	}, [filters, selectedLocations, selectedCities, salary, featureFirst]);

	const handleGoToJob = (id) => mapRef?.current?.goToJob(id);

	return (
		<section className="mb-24 px-4 md:px-0">
			<Wrapper>
				<div>
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium my-5">
						Znajdź swoją wymarzoną pracę
					</h1>
				</div>
				<div className="w-full">
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
						<div className="col-span-2 ">
							<div className="flex flex-row gap-3 mb-4">
								<Input
									type="text"
									placeholder="Wyszukaj stanowisko, firmę lub inne słowo kluczowe"
								/>
								<Button>Wyszukaj</Button>
							</div>

							<div className="flex gap-2 mb-3 items-center flex-wrap">
								<MultiSelectInput
									data={cities}
									selected={selectedCities}
									setSelected={setSelectedCities}
									placeholder="Wybierz miasto"
								/>
								<MultiSelectInput
									selected={selectedLocations}
									setSelected={setSelectedLocations}
									placeholder="Wybierz województwo"
								/>
								<SalaryRangeInput value={salary} setValue={setSalary} />
								<div className="flex items-center gap-2">
									<Checkbox
										checked={featureFirst}
										onCheckedChange={setFeatureFirst}
										id="featured"
									/>
									<label
										htmlFor="featured"
										className="text-sm font-medium cursor-pointer text-neutral-200">
										Wyróżnione pierwsze
									</label>
								</div>
								<Button variant="outline">
									więcej filtrów
								</Button>
							</div>

							<h2 className="text-lg text-neutral-400">
								Znaleziono {jobs.length}{" "}
								{polishPlural(jobs.length, ["ofertę", "oferty", "ofert"])}
							</h2>
						</div>
						<div>
							<div className="flex flex-col gap-2 overflow-y-auto max-h-[580px] jobList pr-2">
								{isFetched
									? jobs.map((job) => (
											<JobInfoBox
												key={job.id}
												onClick={handleGoToJob}
												markersRef={markersRef}
												jobData={job}
											/>
									  ))
									: Array.from({ length: 8 }).map((_, index) => (
											<div key={index}>
												<Skeleton className="w-full h-[130px] rounded-3xl" />
											</div>
									  ))}
							</div>
						</div>
						<div className="order-first md:order-0">
							<MapClient mapRef={mapRef} markersRef={markersRef} jobs={jobs} />
						</div>
					</div>
				</div>
			</Wrapper>
		</section>
	);
}
