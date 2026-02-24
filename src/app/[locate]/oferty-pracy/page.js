"use client";

import React, { memo, useCallback, useRef, useState, useEffect } from "react";
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
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DotBackground } from "@/components/ui/dotBackground";

const MemoizedJobInfoBox = memo(JobInfoBox);

const JobList = memo(({ jobs, handleGoToJob, markersRef, isFetched }) => {
	return (
		<div className="flex flex-col gap-2 overflow-y-auto max-h-145 jobList pr-2">
			{isFetched ? (
				jobs.length ? (
					jobs.map((job) => (
						<MemoizedJobInfoBox
							key={job.id}
							onClick={handleGoToJob}
							markersRef={markersRef}
							jobData={job}
						/>
					))
				) : (
					<p className="text-center text-neutral-800 text-lg">
						Brak ofert pracy
					</p>
				)
			) : (
				Array.from({ length: 8 }).map((_, index) => (
					<div key={index}>
						<Skeleton className="w-full h-32.5 rounded-3xl" />
					</div>
				))
			)}
		</div>
	);
});

export default function OfferWorksPage() {
	const [filters, setFilters] = useState({
		city: "",
		employmentType: "",
		remote: false,
		keyword: "",
		selectedLocations: [],
		selectedCities: [],
		salary: [null, null],
		featureFirst: false,
		withoutHealthCard: false,
		accommodation: [],
		salaryUnit: "/mies",
		// salaryType: "",
		workingTime: [],
		employmentForm: [],
		workMode: [],
	});
	const keywordRef = useRef("");
	const [isFetched, setIsFetched] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [tempSheetFilters, setTempSheetFilters] = useState({
		employmentForm: [],
		workingTime: [],
		workMode: [],
		accommodation: [],
		remote: false,
		employmentType: "",
		featureFirst: false,
		withoutHealthCard: false,
	});

	const [jobs, setJobs] = useState([]);
	const [cities, setCities] = useState([]);
	const markersRef = useRef({});
	const mapRef = useRef(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const [jobsRes, citiesRes] = await Promise.all([
					fetch("/api/jobs", { cache: "force-cache" }).then(async (res) => {
						if (res.ok) {
							const data = await res.json();
							return data;
						}
						return [];
					}),
					fetch("/api/cities", { cache: "force-cache" }).then(async (res) => {
						if (res.ok) {
							return await res.json();
						}
						return [];
					}),
				]);

				setJobs(jobsRes || []);
				setCities(citiesRes || []);
			} catch (err) {
				console.error(err);
				setJobs([]);
				setCities([]);
			} finally {
				setIsFetched(true);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		const params = new URLSearchParams();

		if (filters.city) params.set("city", filters.city);
		if (filters.employmentType)
			params.set("employmentType", filters.employmentType);
		if (filters.remote) params.set("remote", filters.remote);
		if (filters.keyword) params.set("keyword", filters.keyword);
		if (filters.withoutHealthCard)
			params.set("withoutHealthCard", filters.withoutHealthCard);

		if (filters.selectedLocations.length > 0)
			params.set("province", filters.selectedLocations.join(","));
		if (filters.selectedCities.length > 0)
			params.set("city", filters.selectedCities.join(","));
		if (filters.featureFirst) params.set("feature_first", "true");
		if (filters.salary) {
			const [min, max] = filters.salary;
			if (min != null && min > 0) params.set("salary_min", min);
			if (max != null && max > 0) params.set("salary_max", max);
		}
		if (filters.salaryUnit === "/mies") {
			params.set("salaryUnit", "month");
		} else if (filters.salaryUnit === "/h") {
			params.set("salaryUnit", "hour");
		}
		if (filters.employmentForm.length > 0)
			params.set("employment_form", filters.employmentForm.join(","));
		if (filters.workingTime.length > 0)
			params.set("working_time", filters.workingTime.join(","));
		if (filters.workMode.length > 0)
			params.set("work_mode", filters.workMode.join(","));
		if (filters.accommodation.length > 0)
			params.set("accommodation", filters.accommodation.join(","));

		async function fetchFilteredJobs() {
			try {
				const filteredJobs = await fetch(`/api/jobs?${params.toString()}`).then(
					async (res) => {
						if (res.ok) {
							const data = await res.json();
							return data;
						}
						return [];
					},
				);
				setJobs(filteredJobs);
			} catch (err) {
				console.error(err);
			}
		}

		fetchFilteredJobs();
	}, [filters]);

	const handleGoToJob = useCallback((id) => {
		mapRef?.current?.goToJob(id);
	}, []);

	const handleSheetOpenChange = (open) => {
		setSheetOpen(open);
		if (open) {
			setTempSheetFilters({
				employmentForm: [...filters.employmentForm],
				workingTime: [...filters.workingTime],
				workMode: [...filters.workMode],
				accommodation: [...filters.accommodation],
				remote: filters.remote,
				employmentType: filters.employmentType,
				featureFirst: filters.featureFirst,
				withoutHealthCard: filters.withoutHealthCard,
			});
		} else {
			const hasChanges =
				JSON.stringify(tempSheetFilters) !==
				JSON.stringify({
					employmentForm: [...filters.employmentForm],
					workingTime: [...filters.workingTime],
					workMode: [...filters.workMode],
					accommodation: [...filters.accommodation],
					remote: filters.remote,
					employmentType: filters.employmentType,
					featureFirst: filters.featureFirst,
					withoutHealthCard: filters.withoutHealthCard,
				});

			if (hasChanges) {
				setFilters((prev) => ({
					...prev,
					employmentForm: [...tempSheetFilters.employmentForm],
					workingTime: [...tempSheetFilters.workingTime],
					workMode: [...tempSheetFilters.workMode],
					accommodation: [...tempSheetFilters.accommodation],
					remote: tempSheetFilters.remote,
					employmentType: tempSheetFilters.employmentType,
					featureFirst: tempSheetFilters.featureFirst,
					withoutHealthCard: tempSheetFilters.withoutHealthCard,
				}));
			}
		}
	};

	return (
		<DotBackground>
		<section className="mb-24 px-2 md:px-0">
			<Wrapper>
				<div>
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium my-5">
						Znajdź swoją wymarzoną pracę
					</h1>
				</div>
				<div className="w-full">
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
						<div className="col-span-2 ">
							<div className="flex flex-row gap-2 mb-4">
								<Input
									ref={keywordRef}
									type="text"
									placeholder="Wyszukaj stanowisko, firmę lub inne słowo kluczowe"
								/>
								<Button
									onClick={() =>
										setFilters((prev) => ({
											...prev,
											keyword: keywordRef.current.value,
										}))
									}>
									Wyszukaj
								</Button>
							</div>

							<div className="flex gap-2 mb-3 items-center flex-wrap">
								<MultiSelectInput
									data={cities}
									selected={filters.selectedCities}
									setSelected={(value) =>
										setFilters((prev) => ({ ...prev, selectedCities: value }))
									}
									placeholder="Wybierz miasto"
								/>
								<MultiSelectInput
									selected={filters.selectedLocations}
									setSelected={(value) =>
										setFilters((prev) => ({
											...prev,
											selectedLocations: value,
										}))
									}
									placeholder="Wybierz województwo"
								/>
								<SalaryRangeInput
									value={filters.salary}
									setValue={(value) =>
										setFilters((prev) => ({ ...prev, salary: value }))
									}
								/>
								<Select
									value={filters.salaryUnit || ""}
									onValueChange={(value) =>
										setFilters((prev) => ({ ...prev, salaryUnit: value || "" }))
									}>
									<SelectTrigger>
										<SelectValue placeholder="Jednostka" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="/h">/h</SelectItem>
										<SelectItem value="/mies">/mies</SelectItem>
									</SelectContent>
								</Select>
								<Sheet
									className="z-1000"
									open={sheetOpen}
									onOpenChange={handleSheetOpenChange}>
									<SheetTrigger asChild>
										<Button variant="outline">więcej filtrów</Button>
									</SheetTrigger>
									<SheetContent className="z-1000 overflow-y-auto">
										<SheetHeader>
											<SheetTitle>Więcej filtrów</SheetTitle>
										</SheetHeader>
										<div className="space-y-6 mt-2 pl-6 overflow-y-auto">
											{/* Forma zatrudnienia */}
											<div className="mb-3">
												<h3 className="font-semibold mb-2 text-neutral-900">
													Forma zatrudnienia
												</h3>
												<div className="space-y-2">
													{[
														"Umowa o pracę",
														"Umowa zlecenie",
														"Praca tymczasowa",
														"Praca sezonowa",
														"Staż/praktyki",
													].map((form) => (
														<div key={form} className="flex items-center gap-2">
															<Checkbox
																checked={tempSheetFilters.employmentForm.includes(
																	form,
																)}
																onCheckedChange={(checked) =>
																	setTempSheetFilters((prev) => ({
																		...prev,
																		employmentForm: checked
																			? [...prev.employmentForm, form]
																			: prev.employmentForm.filter(
																					(f) => f !== form,
																				),
																	}))
																}
																id={`employment-${form}`}
															/>
															<label
																htmlFor={`employment-${form}`}
																className="text-sm font-medium cursor-pointer text-neutral-800">
																{form}
															</label>
														</div>
													))}
												</div>
											</div>

											{/* Wymiar pracy */}
											<div className="mb-3">
												<h3 className="text font-semibold mb-2 text-neutral-900">
													Wymiar pracy
												</h3>
												<div className="space-y-2">
													{[
														"Pełny etat",
														"Część etatu",
														"Elastyczny czas pracy",
														"Praca dodatkowa",
													].map((time) => (
														<div key={time} className="flex items-center gap-2">
															<Checkbox
																checked={tempSheetFilters.workingTime.includes(
																	time,
																)}
																onCheckedChange={(checked) =>
																	setTempSheetFilters((prev) => ({
																		...prev,
																		workingTime: checked
																			? [...prev.workingTime, time]
																			: prev.workingTime.filter(
																					(t) => t !== time,
																				),
																	}))
																}
																id={`workingTime-${time}`}
															/>
															<label
																htmlFor={`workingTime-${time}`}
																className="text-sm font-medium cursor-pointer text-neutral-800">
																{time}
															</label>
														</div>
													))}
												</div>
											</div>

											{/* Tryb pracy */}
											<div className="mb-3">
												<h3 className="text font-semibold mb-2 text-neutral-900">
													Tryb pracy
												</h3>
												<div className="space-y-2">
													{[
														"Praca stacjonarna",
														"Praca hybrydowa",
														"Praca zdalna",
													].map((mode) => (
														<div key={mode} className="flex items-center gap-2">
															<Checkbox
																checked={tempSheetFilters.workMode.includes(
																	mode,
																)}
																onCheckedChange={(checked) =>
																	setTempSheetFilters((prev) => ({
																		...prev,
																		workMode: checked
																			? [...prev.workMode, mode]
																			: prev.workMode.filter((m) => m !== mode),
																	}))
																}
																id={`workMode-${mode}`}
															/>
															<label
																htmlFor={`workMode-${mode}`}
																className="text-sm font-medium cursor-pointer text-neutral-800">
																{mode}
															</label>
														</div>
													))}
												</div>
											</div>

											{/* Zakwaterowanie */}
											<div className="mb-3">
												<h3 className="text font-semibold mb-2 text-neutral-900">
													Zakwaterowanie
												</h3>
												<div className="space-y-2">
													{["Zapewnione", "Z dopłatą", "Płatne"].map((acc) => (
														<div key={acc} className="flex items-center gap-2">
															<Checkbox
																checked={tempSheetFilters.accommodation.includes(
																	acc,
																)}
																onCheckedChange={(checked) =>
																	setTempSheetFilters((prev) => ({
																		...prev,
																		accommodation: checked
																			? [...prev.accommodation, acc]
																			: prev.accommodation.filter(
																					(a) => a !== acc,
																				),
																	}))
																}
																id={`accommodation-${acc}`}
															/>
															<label
																htmlFor={`accommodation-${acc}`}
																className="text-sm font-medium cursor-pointer text-neutral-800">
																{acc === "brak informacji"
																	? "Brak informacji"
																	: acc}
															</label>
														</div>
													))}
												</div>
											</div>

											{/* Inne opcje */}
											<div className="border-t pt-4">
												<h3 className="text font-semibold mb-2 text-neutral-900">
													Inne
												</h3>
												<div className="space-y-2">
													<div className="flex items-center gap-2">
														<Checkbox
															checked={tempSheetFilters.remote === "true"}
															onCheckedChange={(checked) =>
																setTempSheetFilters((prev) => ({
																	...prev,
																	remote: checked ? "true" : "",
																}))
															}
															id="remote"
														/>
														<label
															htmlFor="remote"
															className="text-sm font-medium cursor-pointer text-neutral-800">
															Możliwość pracy zdalnej
														</label>
													</div>
													<div className="flex items-center gap-2">
														<Checkbox
															checked={tempSheetFilters.withoutHealthCard}
															onCheckedChange={(checked) =>
																setTempSheetFilters((prev) => ({
																	...prev,
																	withoutHealthCard: checked,
																}))
															}
															id="sanepid"
														/>
														<label
															htmlFor="sanepid"
															className="text-sm font-medium cursor-pointer text-neutral-800">
															Bez książeczki sanepidowskiej
														</label>
													</div>
													<div className="flex items-center gap-2">
														<Checkbox
															checked={tempSheetFilters.featureFirst}
															onCheckedChange={(checked) =>
																setTempSheetFilters((prev) => ({
																	...prev,
																	featureFirst: checked,
																}))
															}
															id="featured-sheet"
														/>
														<label
															htmlFor="featured-sheet"
															className="text-sm font-medium cursor-pointer text-neutral-800">
															Wyróżnione ogłoszenia pierwsze
														</label>
													</div>
												</div>
											</div>
										</div>
									</SheetContent>
								</Sheet>
							</div>
							<div>
								{filters.keyword && (
									<div className="flex gap-2">
										<p className="text-neutral-800">
											Wyniki dla "{filters.keyword}"
										</p>
										<button
											className="text-neutral-500 hover:text-neutral-300 cursor-pointer"
											onClick={() => {
												setFilters((prev) => ({
													...prev,
													keyword: "",
												}));
												keywordRef.current.value = "";
											}}>
											<span>(usuń)</span>
										</button>
									</div>
								)}
								{isFetched ? (
									<h2 className="text-lg text-neutral-800">
										Znaleziono {jobs.length || 0}{" "}
										{polishPlural(jobs.length, ["ofertę", "oferty", "ofert"])}
									</h2>
								) : (
									<h2 className="text-lg text-neutral-800">Pobiernie ofert</h2>
								)}
							</div>
						</div>
						<div>
							<JobList
								jobs={jobs}
								handleGoToJob={handleGoToJob}
								markersRef={markersRef}
								isFetched={isFetched}
							/>
						</div>
						<div className="order-first md:order-0">
							<MapClient mapRef={mapRef} markersRef={markersRef} jobs={jobs} />
						</div>
					</div>
				</div>
			</Wrapper>
		</section>
			</DotBackground>

	);
}
