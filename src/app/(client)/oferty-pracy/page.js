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
import { X } from "lucide-react";

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
    salaryType: "",
    workingTime: [],
    employmentForm: [],
    workMode: [],
  });
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
	withoutHealthCard: false
  });

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
    const params = new URLSearchParams({
      city: filters.city,
      employmentType: filters.employmentType,
      remote: filters.remote,
      keyword: filters.keyword,
	  withoutHealthCard: filters.withoutHealthCard
    });
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
          (res) => res.json()
        );
        setJobs(filteredJobs);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFilteredJobs();
  }, [filters]);

  const handleGoToJob = (id) => mapRef?.current?.goToJob(id);

  // Gdy Sheet się otwiera, kopiuj aktualne filtry do tymczasowych
  const handleSheetOpenChange = (open) => {
    setSheetOpen(open);
    if (open) {
      // Otwieranie - kopiuj aktualne filtry do tymczasowych
      setTempSheetFilters({
        employmentForm: [...filters.employmentForm],
        workingTime: [...filters.workingTime],
        workMode: [...filters.workMode],
        accommodation: [...filters.accommodation],
        remote: filters.remote,
        employmentType: filters.employmentType,
        featureFirst: filters.featureFirst,
		withoutHealthCard: filters.withoutHealthCard
      });
    } else {
      // Zamykanie - zastosuj tymczasowe filtry do głównych filtrów
      setFilters((prev) => ({
        ...prev,
        employmentForm: [...tempSheetFilters.employmentForm],
        workingTime: [...tempSheetFilters.workingTime],
        workMode: [...tempSheetFilters.workMode],
        accommodation: [...tempSheetFilters.accommodation],
        remote: tempSheetFilters.remote,
        employmentType: tempSheetFilters.employmentType,
        featureFirst: tempSheetFilters.featureFirst,
		withoutHealthCard: tempSheetFilters.withoutHealthCard
      }));
    }
  };

  return (
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
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Jednostka" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="/h">/h</SelectItem>
                    <SelectItem value="/mies">/mies</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.salaryType || ""}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, salaryType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Typ wynagrodzenia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brutto">brutto</SelectItem>
                    <SelectItem value="netto">netto</SelectItem>
                  </SelectContent>
                </Select>
                <Sheet className="z-1000" open={sheetOpen} onOpenChange={handleSheetOpenChange}>
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
                        <h3 className="font-semibold mb-2 text-neutral-200">
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
                                checked={tempSheetFilters.employmentForm.includes(form)}
                                onCheckedChange={(checked) =>
                                  setTempSheetFilters((prev) => ({
                                    ...prev,
                                    employmentForm: checked
                                      ? [...prev.employmentForm, form]
                                      : prev.employmentForm.filter((f) => f !== form),
                                  }))
                                }
                                id={`employment-${form}`}
                              />
                              <label
                                htmlFor={`employment-${form}`}
                                className="text-sm font-medium cursor-pointer text-neutral-400"
                              >
                                {form}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Wymiar pracy */}
                      <div className="mb-3">
                        <h3 className="text font-semibold mb-2 text-neutral-200">
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
                                checked={tempSheetFilters.workingTime.includes(time)}
                                onCheckedChange={(checked) =>
                                  setTempSheetFilters((prev) => ({
                                    ...prev,
                                    workingTime: checked
                                      ? [...prev.workingTime, time]
                                      : prev.workingTime.filter((t) => t !== time),
                                  }))
                                }
                                id={`workingTime-${time}`}
                              />
                              <label
                                htmlFor={`workingTime-${time}`}
                                className="text-sm font-medium cursor-pointer text-neutral-400"
                              >
                                {time}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tryb pracy */}
                      <div className="mb-3">
                        <h3 className="text font-semibold mb-2 text-neutral-200">
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
                                checked={tempSheetFilters.workMode.includes(mode)}
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
                                className="text-sm font-medium cursor-pointer text-neutral-400"
                              >
                                {mode}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Zakwaterowanie */}
                      <div className="mb-3">
                        <h3 className="text font-semibold mb-2 text-neutral-200">
                          Zakwaterowanie
                        </h3>
                        <div className="space-y-2">
                          {[
                            "Zapewnione",
                            "Z dopłatą",
                            "Płatne"
                          ].map((acc) => (
                            <div key={acc} className="flex items-center gap-2">
                              <Checkbox
                                checked={tempSheetFilters.accommodation.includes(acc)}
                                onCheckedChange={(checked) =>
                                  setTempSheetFilters((prev) => ({
                                    ...prev,
                                    accommodation: checked
                                      ? [...prev.accommodation, acc]
                                      : prev.accommodation.filter((a) => a !== acc),
                                  }))
                                }
                                id={`accommodation-${acc}`}
                              />
                              <label
                                htmlFor={`accommodation-${acc}`}
                                className="text-sm font-medium cursor-pointer text-neutral-400"
                              >
                                {acc === "brak informacji" ? "Brak informacji" : acc}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Inne opcje */}
                      <div className="border-t pt-4">
                        <h3 className="text font-semibold mb-2 text-neutral-200">
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
                              className="text-sm font-medium cursor-pointer text-neutral-400"
                            >
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
                              className="text-sm font-medium cursor-pointer text-neutral-400"
                            >
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
                              className="text-sm font-medium cursor-pointer text-neutral-400"
                            >
                              Wyróżnione ogłoszenia pierwsze
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <h2 className="text-lg text-neutral-400">
                Znaleziono {jobs.length}{" "}
                {polishPlural(jobs.length, ["ofertę", "oferty", "ofert"])}
              </h2>
            </div>
            <div>
              <div className="flex flex-col gap-2 overflow-y-auto max-h-145 jobList pr-2">
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
                        <Skeleton className="w-full h-32.5 rounded-3xl" />
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
