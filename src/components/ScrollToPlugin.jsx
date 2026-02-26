"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { usePathname, useRouter } from "next/navigation";

gsap.registerPlugin(ScrollToPlugin);

export default function ScrollToLink({
	children,
	className = "",
	href = "#",
	duration = 1,
	offsetY = 73,
	ease = "power2.inOut",
	onClick,
}) {
	const router = useRouter();
	const pathname = usePathname();

	const normalizePath = (path) => {
		if (!path) return "";
		return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
	};

	const handleClick = (e) => {
		if (!href) return;
		onClick?.(e);

		if (!href.includes("#")) return;

		const [targetPathRaw, targetHashRaw] = href.split("#");
		const targetHash = targetHashRaw ? `#${targetHashRaw}` : "";
		if (!targetHash) return;

		const currentPath = normalizePath(pathname);
		const targetPath = normalizePath(targetPathRaw || pathname);
		const isSamePageTarget =
			href.startsWith("#") || targetPath === currentPath;

		e.preventDefault();

		if (isSamePageTarget) {
			gsap.to(window, {
				duration,
				ease,
				scrollTo: {
					y: targetHash,
					offsetY,
					autoKill: true,
				},
			});
			return;
		}

		router.push(`${targetPathRaw}${targetHash}`);
	};

	return (
		<a href={href} onClick={handleClick} className={className}>
			{children}
		</a>
	);
}
