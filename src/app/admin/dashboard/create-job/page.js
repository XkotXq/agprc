"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import TipTap from "@/components/tipTapArea";
import Wrapper from "@/components/Wrapper";
import SelectLocationMap from "@/components/SelectLocationMap";
import SlateEditor from "@/components/SlateEditor";
import { SidebarTrigger } from "@/components/ui/sidebar";

const nowLocalDatetime = () => {
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
return now.toISOString().slice(0, 16);
};
export default function CreateJobPage() {
	const [formData, setFormData] = useState({
		title: "",
		company: "",
		description: "",
		city: "",
		working_time: "", // wymiar pracy np. pół etatu
		employment_form: "", // forma zatrudnienia np. umowa o pracę
		work_mode: "", // tryb pracy np. stacjonarna
		remote: false,
		salary_from: "",
		salary_to: "",
		salary_currency: "PLN",
		date_posted: nowLocalDatetime(),
		date_expires: "",
		apply_link: "",
		image: "",
		is_featured: false,
	});
	const [location, setLocation] = useState(null);
	const [description, setDescription] = useState("");
	const [newCity, setNewCity] = useState("");
	const mapRef = useRef(null);
	const descriptionRef = useRef(null);
	useEffect(() => {
		console.log(description);
	}, [description]);

	// const addCity = () => {
	// 	if (newCity.trim() && !formData.cities.includes(newCity.trim())) {
	// 		setFormData((prev) => ({
	// 			...prev,
	// 			cities: [...prev.cities, newCity.trim()],
	// 		}));
	// 		setNewCity("");
	// 	}
	// };

	// const removeCity = (cityToRemove) => {
	// 	setFormData((prev) => ({
	// 		...prev,
	// 		cities: prev.cities.filter((city) => city !== cityToRemove),
	// 	}));
	// };

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSelectChange = (name, value) => {
		console.log(name, value);
		setFormData((prev) => {
			const newData = { ...prev, [name]: value };
			return newData;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.title || !formData.company) {
			alert("Proszę wypełnić tytuł i firmę.");
			return;
		}
		if (!location || !location.lat || !location.lng) {
			alert("Proszę wybrać lokalizację na mapie.");
			return;
		}
		try {
			const jobItem = {
				title: formData.title,
				company: formData.company,
				description: JSON.stringify(description),
				city: location?.locality || "",
				province: location?.state || "brak",
				lat: location?.lat || 0,
				lng: location?.lng || 0,
				working_time: formData.working_time,
				employment_form: formData.employment_form,
				work_mode: formData.work_mode,
				remote: formData.remote,
				salary_from: formData.salary_from,
				salary_to: formData.salary_to,
				salary_currency: formData.salary_currency,
				date_expires: formData.date_expires,
				date_posted: formData.date_posted,
				apply_link: formData.apply_link,
				is_featured: formData.is_featured,
			};

			const response = await fetch("/api/admin/jobs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(jobItem),
			});
			if (response.ok) {
				alert("Ogłoszenie zostało utworzone!");
				// Reset formularza
				setFormData({
					title: "",
					company: "",
					description: "",
					city: "",
					working_time: "",
					employment_form: "",
					work_mode: "",
					remote: false,
					salary_from: "",
					salary_to: "",
					salary_currency: "PLN",
					date_posted: new Date().toISOString(),
					date_expires: "",
					apply_link: "",
					image: "",
					is_featured: false,
				});
				setDescription("");
				setLocation(null);
				mapRef.current?.resetMarker();
				descriptionRef.current?.resetDescription();
			} else {
				alert("Błąd przy tworzeniu ogłoszenia");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Błąd przy wysyłaniu danych");
		}
	};

	const createJob = () => {
		const jobItem = {
			title: formData.title,
			company: formData.company,
			description: description,
			requirements: [],
			responsibilities: [],
			city: location.locality,
			province: location.state || "brak",
			lat: location?.lat || 0,
			lng: location?.lng || 0,
			working_time: formData.working_time,
			employment_form: formData.employment_form,
			work_mode: formData.work_mode,
			remote: formData.remote,
			salary_from: formData.salary_from,
			salary_to: formData.salary_to,
			salary_currency: formData.salary_currency,
			date_posted: formData.date_posted,
			apply_link: formData.apply_link,
			is_featured: formData.is_featured,
		};
		console.log(jobItem);
	};

	return (
		<>
			<SidebarTrigger className="m-2" />
			<Wrapper>
				<div className="px-3 md:px-0 box-border">
					<h1 className="text-3xl font-bold my-6">
						Utwórz nowe ogłoszenie pracy
					</h1>
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Podstawowe informacje */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-1">
									Stanowisko
								</label>
								<Input
									type="text"
									name="title"
									value={formData.title}
									onChange={handleInputChange}
									placeholder="stanowisko (tytuł ogłoszenia)"
									required
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Firma</label>
								<Input
									type="text"
									name="company"
									value={formData.company}
									onChange={handleInputChange}
									placeholder="nazwa firmy"
									required
								/>
							</div>
						</div>

						{/* Opis - pole większe */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Opis ogłoszenia
							</label>
							<SlateEditor
								ref={descriptionRef}
								setDescription={setDescription}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex flex-col gap-4">
								<div>
									<p className="text-sm color-neutral-400 mb-2">
										Wynagrodzenie
									</p>
									<div className="flex gap-2 items-center">
										<Input
											type="number"
											name="salary_from"
											value={formData.salary_from}
											onChange={handleInputChange}
											placeholder="od"
											required
										/>
										<p className="text-neutral-300">ZŁ</p>
										<p className="text-neutral-400">-</p>
										<Input
											type="number"
											name="salary_to"
											value={formData.salary_to}
											onChange={handleInputChange}
											placeholder="do"
											required
										/>
										<p className="text-neutral-300">ZŁ</p>
									</div>
								</div>
								<div className="flex flex-col">
									<p className="text-sm color-neutral-400 mb-2">
										Forma zatrudnienia
									</p>
									<Select
										value={formData.employment_form || ""}
										onValueChange={(value) =>
											handleSelectChange("employment_form", value)
										}>
										<SelectTrigger className="w-full z-0">
											<SelectValue placeholder="wybierz formę zatrudnienia" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem key="Umowa o pracę" value="Umowa o pracę">
												Umowa o pracę
											</SelectItem>
											<SelectItem key="Umowa zlecenie" value="Umowa zlecenie">
												Umowa zlecenie
											</SelectItem>
											<SelectItem
												key="Praca tymczasowa"
												value="Praca tymczasowa">
												Praca tymczasowa
											</SelectItem>
											<SelectItem key="Praca sezonowa" value="Praca sezonowa">
												Praca sezonowa
											</SelectItem>
											<SelectItem key="Staż/praktyki" value="Staż/praktyki">
												Staż/praktyki
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<p className="text-sm color-neutral-400 mb-2">Wymiar pracy</p>
									<Select
										value={formData.working_time || ""}
										onValueChange={(value) =>
											handleSelectChange("working_time", value)
										}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="wybierz wymiar pracy" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem key="Pełny etat" value="Pełny etat">
												Pełny etat
											</SelectItem>
											<SelectItem key="Część etatu" value="Część etatu">
												Część etatu
											</SelectItem>
											<SelectItem
												key="Elastyczny czas pracy"
												value="Elastyczny czas pracy">
												Elastyczny czas pracy
											</SelectItem>
											<SelectItem key="Praca dodatkowa" value="Praca dodatkowa">
												Praca dodatkowa
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<p className="text-sm color-neutral-400 mb-2">Tryb pracy</p>
									<Select
										className="w-full"
										value={formData.work_mode || ""}
										onValueChange={(value) =>
											handleSelectChange("work_mode", value)
										}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="wybierz tryb pracy" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem
												key="praca stacjonrna"
												value="praca stacjonrna">
												Praca stacjonarna
											</SelectItem>
											<SelectItem key="praca hybrydowa" value="praca hybrydowa">
												Praca hybrydowa
											</SelectItem>
											<SelectItem key="praca zdalna" value="praca zdalna">
												Praca zdalna
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<p className="text-sm color-neutral-400 mb-2">
										Link do aplikacji
									</p>
									<Input
										type="url"
										name="apply_link"
										value={formData.apply_link}
										onChange={handleInputChange}
										placeholder="https://przyklad.pl/aplikacja"
										required
									/>
								</div>
								<div className="flex items-center gap-6">
									<div className="flex items-center gap-2">
										<Checkbox
											id="remote"
											name="remote"
											checked={formData.remote}
											onCheckedChange={(checked) =>
												setFormData((prev) => ({ ...prev, remote: checked }))
											}
										/>
										<label
											htmlFor="remote"
											className="text-sm font-medium cursor-pointer">
											Możliwość pracy zdalnej
										</label>
									</div>
									<div className="flex items-center gap-2">
										<Checkbox
											id="featured"
											name="is_featured"
											checked={formData.is_featured}
											onCheckedChange={(checked) =>
												setFormData((prev) => ({
													...prev,
													is_featured: checked,
												}))
											}
										/>
										<label
											htmlFor="featured"
											className="text-sm font-medium cursor-pointer">
											Ogłoszenie wyróżnione
										</label>
									</div>
								</div>
							</div>
							<div>
								<div>
									<SelectLocationMap
										ref={mapRef}
										value={location}
										onChange={setLocation}
									/>
								</div>
								<div className="grid grid-cols-2 gap-2 mt-2">
									<div>
										<label className="block text-sm font-medium mb-1">
											Miasto
										</label>
										<div className="flex gap-2 mb-2">
											<Input
												type="text"
												value={location?.locality ? location.locality : ""}
												onChange={(e) =>
													setLocation((prev) => ({
														...prev,
														locality: e.target.value,
													}))
												}
												onKeyPress={(e) => e.key === "Enter" && addCity()}
												placeholder="miasto"
												required
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium mb-1">
											Województwo
										</label>
										<Select
											className="z-50"
											value={location?.state || ""}
											onValueChange={(value) =>
												setLocation((prev) => ({ ...prev, state: value }))
											}
											required>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Wybierz województwo" />
											</SelectTrigger>
											<SelectContent className="z-50">
												<SelectItem key="dolnośląskie" value="dolnośląskie">
													dolnośląskie
												</SelectItem>
												<SelectItem
													key="kujawsko-pomorskie"
													value="kujawsko-pomorskie">
													kujawsko-pomorskie
												</SelectItem>
												<SelectItem key="lubelskie" value="lubelskie">
													lubelskie
												</SelectItem>
												<SelectItem key="lubuskie" value="lubuskie">
													lubuskie
												</SelectItem>
												<SelectItem key="łódzkie" value="łódzkie">
													łódzkie
												</SelectItem>
												<SelectItem key="małopolskie" value="małopolskie">
													małopolskie
												</SelectItem>
												<SelectItem key="mazowieckie" value="mazowieckie">
													mazowieckie
												</SelectItem>
												<SelectItem key="opolskie" value="opolskie">
													opolskie
												</SelectItem>
												<SelectItem key="podkarpackie" value="podkarpackie">
													podkarpackie
												</SelectItem>
												<SelectItem key="podlaskie" value="podlaskie">
													podlaskie
												</SelectItem>
												<SelectItem key="pomorskie" value="pomorskie">
													pomorskie
												</SelectItem>
												<SelectItem key="śląskie" value="śląskie">
													śląskie
												</SelectItem>
												<SelectItem key="świętokrzyskie" value="świętokrzyskie">
													świętokrzyskie
												</SelectItem>
												<SelectItem
													key="warmińsko-mazurskie"
													value="warmińsko-mazurskie">
													warmińsko-mazurskie
												</SelectItem>
												<SelectItem key="wielkopolskie" value="wielkopolskie">
													wielkopolskie
												</SelectItem>
												<SelectItem
													key="zachodniopomorskie"
													value="zachodniopomorskie">
													zachodniopomorskie
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						</div>
						{/* <div>
						<label className="block text-sm font-medium mb-1">
							Tryb pracy *
						</label>
						<Select
							value={formData.work_mode}
							onValueChange={(value) => handleSelectChange("work_mode", value)}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="onsite">Na miejscu</SelectItem>
								<SelectItem value="hybrid">Hybrydowy</SelectItem>
								<SelectItem value="remote">Zdalnie</SelectItem>
							</SelectContent>
						</Select>
					</div> */}

						{/* Daty */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium mb-1">
									Data publikacji
								</label>
								<Input
									type="datetime-local"
									name="date_posted"
									value={formData.date_posted}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											date_posted: e.target.value,
										}))
									}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">
									Data wygaśnięcia
								</label>
								<Input
									type="datetime-local"
									name="date_expires"
									value={formData.date_expires}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											date_expires: e.target.value,
										}))
									}
								/>
							</div>
						</div>

						{/* Przyciski */}
						<div className="flex gap-4 mb-12">
							<Button type="submit" className="flex-1">
								Utwórz ogłoszenie
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => window.history.back()}>
								Anuluj
							</Button>
						</div>
					</form>
				</div>
			</Wrapper>
		</>
	);
}
