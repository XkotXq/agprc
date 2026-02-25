"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function ScrollToLink({
	children,
	className = "",
	href = "#",
	duration = 1,
	offsetY = 73,
	ease = "power2.inOut",
}) {
	const handleClick = (e) => {
		if (!href || !href.startsWith("#")) return;

		e.preventDefault();
		gsap.to(window, {
			duration,
			ease,
			scrollTo: {
				y: href,
				offsetY,
				autoKill: true,
			},
		});
	};

	return (
		<a href={href} onClick={handleClick} className={className}>
			{children}
		</a>
	);
}
