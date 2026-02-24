import { cn } from "@/lib/utils";
import React from "react";

export function DotBackground({ children, className="bg-neutral-50", classNameMask = "bg-neutral-50" }) {
	return (
		<div className={cn("relative w-full", className)}>
			<div
				className={cn(
					"absolute inset-0",
					"bg-size-[20px_20px]",
					"bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]",
				)}
			/>
			<div className={cn("pointer-events-none absolute inset-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black", classNameMask)}></div>
			{children}
		</div>
	);
}
