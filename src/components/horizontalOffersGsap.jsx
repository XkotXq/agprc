"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Wrapper from "@/components/Wrapper";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalOffersGsap() {
	const sectionRef = useRef(null);
	const viewportRef = useRef(null);
	const trackRef = useRef(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const viewport = viewportRef.current;
			const track = trackRef.current;
			if (!viewport || !track) return;

			const getDistance = () => {
				const lastItem = track.lastElementChild;
				if (!lastItem) return 0;

				const currentX = gsap.getProperty(track, "x");
				gsap.set(track, { x: 0 });
				const viewportRect = viewport.getBoundingClientRect();
				const viewportRight = viewportRect.right;
				const viewportWidth = viewportRect.width;
				const lastItemRight = lastItem.getBoundingClientRect().right;
				const distance = Math.max(0, lastItemRight - viewportRight);
				console.log((window.innerWidth - viewportWidth)/2);
				const gapRight = Math.max(
					0,
					(window.innerWidth - viewportWidth)/2,
				);
				gsap.set(track, { x: currentX });
				return distance+gapRight;
			};

			gsap.to(track, {
				x: () => -getDistance(),
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: () => `+=${getDistance()}`,
					pin: true,
					scrub: true,
					invalidateOnRefresh: true,
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="pb-18 py-8 bg-neutral-50 overflow-hidden">
			<Wrapper>
				<h1 className="text-center text-4xl font-bold mt-10">
					Szukasz pracowników? - Oferta
				</h1>
				<p className="mt-3 text-center">
					Oferujemy pełen zakres usług związanych z rekrutacją, legalizacją i
					zatrudnieniem.
				</p>

				<div ref={viewportRef} className="mt-10 w-full overflow-visible">
					<div ref={trackRef} className="flex w-max gap-5">
						<article className="w-105 shrink-0 flex rounded-2xl  p-2 shadow-sm bg-linear-to-br from-neutral-100 to-neutral-200">
							<div className="bg-neutral-100 flex-1 p-4 rounded-2xl shadow-sm">

							<h2 className="text-xl font-semibold">Outsourcing procesowy</h2>
							<p>
								Współpraca na zasadach outsourcingu procesowego. Przejmujemy
								odpowiedzialność za cały proces rekrutacji i zatrudnienia.
							</p>
							</div>
						</article>
						<article className="w-105 shrink-0 rounded-2xl bg-linear-to-br from-neutral-100 to-neutral-200 p-6 shadow-sm">
							<h2 className="text-xl font-semibold">
								Legalizacja pobytu i pracy
							</h2>
							<p>
								Pełny proces legalizacji pobytu i pracy cudzoziemcow z Ukrainy i
								Mołdawii. Od oświadczeń po karty pobytu.
							</p>
						</article>
						<article className="w-105 shrink-0 rounded-2xl bg-linear-to-br from-neutral-100 to-neutral-200 p-6 shadow-sm">
							<h2 className="text-xl font-semibold">Obsluga prawna</h2>
							<p>
								Kompleksowa obsluga prawna zatrudnienia cudzoziemcow -
								oświadczenia, zezwolenia, wizy, karty pobytu. Przygotowujemy
								dokumenty i składamy wnioski.
							</p>
						</article>
						<article className="w-105 shrink-0 rounded-2xl bg-neutral-100 p-6 shadow-sm">
							<h2 className="text-xl font-semibold">
								Wysoki poziom zatrudnienia
							</h2>
							<p>
								Utrzymanie wysokiego poziomu zatrudnienia dzięki stałemu
								monitorowaniu potrzeb kadrowych i szybkiej reakcji na zmiany.
							</p>
						</article>
						<article className="w-105 shrink-0 rounded-2xl bg-linear-to-br from-neutral-100 to-neutral-200 p-6 shadow-sm">
							<h2 className="text-xl font-semibold">
								Wsparcie po zatrudnieniu
							</h2>
							<p>
								Nie konczymy na rekrutacji. Zapewniamy wsparcie po zatrudnieniu,
								pomagając w adaptacji pracownikow na nowym stanowisku.
							</p>
						</article>
						<article className="w-105 shrink-0 rounded-2xl bg-neutral-100 p-6 shadow-sm">
							<h2 className="text-xl font-semibold">
								Szkolenia BHP i uprawnienia
							</h2>
							<p>
								Szkolenia BHP stanowiskowe, uprawnienia na wozki unoszące, UDT
								oraz wysokiego składowania i wiele innych.
							</p>
						</article>
					</div>
				</div>
			</Wrapper>
		</section>
	);
}
