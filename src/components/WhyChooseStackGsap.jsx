"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	AcademicCapIcon,
	BoltIcon,
	LightBulbIcon,
	RocketLaunchIcon,
	UserMinusIcon,
	WalletIcon,
} from "@heroicons/react/24/outline";
import Wrapper from "@/components/Wrapper";
import { DotBackground } from "@/components/ui/dotBackground";

gsap.registerPlugin(ScrollTrigger);

const cards = [
	{
		icon: BoltIcon,
		title: "Szybka reakcja",
		description: "Szybko reagujemy i dostosowujemy się do Państwa potrzeb",
	},
	{
		icon: WalletIcon,
		title: "Redukcja kosztów",
		description:
			"Znacząca redukcja kosztów zatrudnienia dzięki naszemu modelowi współpracy.",
	},
	{
		icon: UserMinusIcon,
		title: "Brak kosztów rekrutacji",
		description: "Brak kosztów związanych z rekrutacja pracowników.",
	},
	{
		icon: AcademicCapIcon,
		title: "Ciągły rozwój",
		description:
			"Stawiamy na ciągły rozwój umiejętności w dynamicznym środowisku.",
	},
	{
		icon: LightBulbIcon,
		title: "Realne rozwiązania",
		description:
			"Zapewniamy wpływ na rozwiązywanie realnych problemów klientów i rynku.",
	},
	{
		icon: RocketLaunchIcon,
		title: "Wsparcie Twojej wizji",
		description:
			"Wsparcie w realizacji Twoich wizji i pomysłów, które przynoszą korzyści firmie.",
	},
];

export default function WhyChooseStackGsap() {
	const sectionRef = useRef(null);
	const stackRef = useRef(null);
	const cardRefs = useRef([]);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const stack = stackRef.current;
			const cardEls = cardRefs.current.filter(Boolean);
			if (!stack || cardEls.length < 2) return;

			const setupAnimation = () => {
				const cardHeight = cardEls[0].offsetHeight;
				const gap = 20;
				const overlap = cardHeight * 0.5;
				const stackHeight = cardHeight + overlap * (cardEls.length - 1);
				const travel = cardHeight + gap;

				gsap.set(stack, { height: stackHeight });
				gsap.set(cardEls, {
					y: (i) => i * travel,
					zIndex: (i) => cardEls.length - i,
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top+=72",
						end: () => `+=${travel * (cardEls.length - 1)}`,
						pin: true,
						scrub: true,
						invalidateOnRefresh: true,
					},
				});

				for (let i = 1; i < cardEls.length; i++) {
					tl.to(cardEls[i], { y: i * overlap, ease: "none", duration: 1 }, i - 1);
				}
			};

			ScrollTrigger.matchMedia({
				"(min-width: 768px)": setupAnimation,
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<DotBackground className="bg-green-200" classNameMask="bg-green-50">
			<section ref={sectionRef} className="py-8 relative overflow-hidden">
				<Wrapper>
					<h1 className="text-3xl font-bold text-center py-5">
						Dlaczego Raw Job jest najlepszym wyborem?
					</h1>
					<div ref={stackRef} className="relative">
						<div className="grid grid-cols-1 gap-5 md:gap-0">
							{cards.map((card, index) => (
								<div
									key={card.title}
									ref={(el) => {
										cardRefs.current[index] = el;
									}}
									className="md:absolute md:inset-x-0 md:top-0">
									<WhyChooseCard
										icon={card.icon}
										title={card.title}
										description={card.description}
									/>
								</div>
							))}
						</div>
					</div>
				</Wrapper>
			</section>
		</DotBackground>
	);
}

function WhyChooseCard({ icon: Icon, title, description }) {
	return (
		<DotBackground
			className="bg-green-500 w-full rounded-2xl flex overflow-hidden flex-1 shadow-md min-h-[132px]"
			classNameMask="bg-none ">
			<div className="p-2 bg-linear-to-r from-green-400 to-green-400/20 flex flex-row gap-3 flex-1 z-10">
				<div className="flex justify-center items-center p-2 rounded-xl bg-linear-to-br from-neutral-50/20 to-neutral-50/40 aspect-square">
					<Icon className="h-8 w-8" />
				</div>
				<div>
					<h2 className="text-xl font-bold ">{title}</h2>
					<p>{description}</p>
				</div>
			</div>
		</DotBackground>
	);
}
