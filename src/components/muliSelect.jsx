"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const wojewodztwa = [
	"dolnośląskie",
	"kujawsko-pomorskie",
	"lubelskie",
	"lubuskie",
	"łódzkie",
	"małopolskie",
	"mazowieckie",
	"opolskie",
	"podkarpackie",
	"podlaskie",
	"pomorskie",
	"śląskie",
	"świętokrzyskie",
	"warmińsko-mazurskie",
	"wielkopolskie",
	"zachodniopomorskie",
];

export default function MultiSelectInput({
	data = wojewodztwa,
	selected,
	setSelected,
	className,
	placeholder,
}) {
	const [search, setSearch] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [highlightIndex, setHighlightIndex] = useState(-1);

	const wrapperRef = useRef(null);
	const inputRef = useRef(null);

	// Upewnij się, że selected jest zawsze tablicą
	const selectedArray = Array.isArray(selected) ? selected : [];

	const filtered = data.filter((item) =>
		item.toLowerCase().includes(search.toLowerCase())
	);

	const toggleItem = (item) => {
		if (selectedArray.includes(item)) {
			// Usuń element z tablicy
			const newArray = selectedArray.filter((i) => i !== item);
			setSelected(newArray);
		} else {
			// Dodaj element do tablicy
			const newArray = [...selectedArray, item];
			setSelected(newArray);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlightIndex((prev) =>
				prev < filtered.length - 1 ? prev + 1 : prev
			);
		}

		if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlightIndex((prev) => (prev > 0 ? prev - 1 : -1));
		}

		if (e.key === "Enter") {
			e.preventDefault();
			if (highlightIndex >= 0 && filtered[highlightIndex]) {
				toggleItem(filtered[highlightIndex]);
			}
		}
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setIsFocused(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (!isFocused) return;

		const handleEsc = (e) => {
			if (e.key === "Escape") {
				setIsFocused(false);
				inputRef.current?.blur();
			}
		};

		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [isFocused]);

	return (
		<div ref={wrapperRef} className="flex flex-col gap-2 relative">
			<div className="relative">
				<input
					ref={inputRef}
					className={cn(
						"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-neutral-900 border-input h-9 w-full min-w-0 rounded-xl border bg-neutral-900 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
						"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
						className
					)}
					placeholder={placeholder}
					value={search}
					onFocus={() => setIsFocused(true)}
					onChange={(e) => {
						setSearch(e.target.value);
						setHighlightIndex(0);
					}}
					onKeyDown={handleKeyDown}
				/>
				{selectedArray.length > 0 && (
					<div className="absolute top-1/2 -translate-1/2 right-1 rounded-full bg-neutral-200 text-black aspect-square h-[60%] flex justify-center items-center text-sm group">
						<p className="group-hover:hidden">{selectedArray.length}</p>
						<X className="size-3 group-hover:block hidden" onClick={() => {setSelected([])}}/>
					</div>
				)}
			</div>

			{isFocused && (
				<div className="border rounded-xl max-h-[240px] overflow-y-auto bg-neutral-900 absolute top-[calc(100%+8px)] shadow-2xl left-0 right-0 z-50 divide-y scrollCust jobList overflow-hidden">
					{filtered.length === 0 && (
						<div className="p-2 text-neutral-400">Brak wyników</div>
					)}

					{filtered.map((item, index) => {
						const checked = selectedArray.includes(item);

						return (
							<div
								key={item}
								className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-neutral-800 ${
									highlightIndex === index ? "bg-neutral-800" : ""
								}`}
								onMouseEnter={() => setHighlightIndex(index)}
								onClick={() => toggleItem(item)}>
								<input
									type="checkbox"
									checked={checked}
									readOnly
									className="pointer-events-none sr-only peer"
								/>
								<span
									className={`w-5 h-5 rounded-xl border border-neutral-600 shrink-0 flex items-center justify-center  peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neutral-200
      ${checked ? "bg-neutral-600" : "bg-transparent"}`}>
									{checked && <X className="w-3 h-3 text-neutral-300" />}
								</span>
								<span>{item}</span>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
