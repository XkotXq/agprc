import { CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function CheckLine({ children, className }) {
	return (
		<div>
			<span className="inline-flex gap-2 items-center">
				<div className={clsx(" p-1 rounded-xl text-neutral-800", className)}>
					<CheckIcon className="w-3 h-3 " />
				</div>
				<p>{children}</p>
			</span>
		</div>
	);
}
