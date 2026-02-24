import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";

function SalaryRangeInput({ value, setValue }) {
	const [tempMin, setTempMin] = useState(value[0]?.toString() || "");
	const [tempMax, setTempMax] = useState(value[1]?.toString() || "");
	const focusedRef = useRef({ min: false, max: false });

	useEffect(() => {
		setTempMin(value[0]?.toString() || "");
		setTempMax(value[1]?.toString() || "");
	}, [value]);

	const handleMinChange = (e) => {
		const val = e.target.value.replace(/[^0-9]/g, "");
		setTempMin(val);
	};

	const handleMaxChange = (e) => {
		const val = e.target.value.replace(/[^0-9]/g, "");
		setTempMax(val);
	};

	const handleMinFocus = () => {
		focusedRef.current.min = true;
	};

	const handleMinBlur = () => {
		focusedRef.current.min = false;
		if (!focusedRef.current.min && !focusedRef.current.max) {
			updateValue();
		}
	};

	const handleMaxFocus = () => {
		focusedRef.current.max = true;
	};

	const handleMaxBlur = () => {
		focusedRef.current.max = false;
		if (!focusedRef.current.min && !focusedRef.current.max) {
			updateValue();
		}
	};

	const updateValue = () => {
		let finalMin = tempMin === "" ? null : parseInt(tempMin) || 0;
		let finalMax = tempMax === "" ? null : parseInt(tempMax) || 0;
		if (finalMin !== null && finalMax !== null && finalMin > finalMax) {
			[finalMin, finalMax] = [finalMax, finalMin];
		}
		if (value[0] != finalMin || value[1] != finalMax)
			setValue([finalMin, finalMax]);
	};

	return (
		<div className="w-64 flex gap-1 justify-center items-center">
			<div className="relative">
				<Input
					type="text"
					placeholder="od"
					value={tempMin}
					onChange={handleMinChange}
					onFocus={handleMinFocus}
					onBlur={handleMinBlur}
				/>
				{tempMin ? (
					<button
						className="absolute right-0 top-1/2 -translate-1/2"
						onClick={() => {
							setTempMin("");
							let finalMax = tempMax === "" ? null : parseInt(tempMax) || 0;
							setValue([null, finalMax]);
						}}>
						<X className="size-4 cursor-pointer" />
					</button>
				) : null}
			</div>
			<p className="text-neutral-700">ZŁ</p>
			<p className="text-neutral-500">-</p>
			<div className="relative">
				<Input
					type="text"
					placeholder="do"
					value={tempMax}
					onChange={handleMaxChange}
					onFocus={handleMaxFocus}
					onBlur={handleMaxBlur}
				/>
				{tempMax ? (
					<button
						className="absolute right-0 top-1/2 -translate-1/2"
						onClick={() => {
							setTempMax("");
							let finalMin = tempMin === "" ? null : parseInt(tempMin) || 0;
							setValue([finalMin, null]);
						}}>
						<X className="size-4 cursor-pointer" />
					</button>
				) : null}
			</div>
			<p className="text-neutral-700">ZŁ</p>
		</div>
	);
}
export default SalaryRangeInput;
