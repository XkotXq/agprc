import React from "react";
import Wrapper from "@/components/Wrapper";
import {
	ArrowUpRight,
	Clock,
	MapPin,
	MousePointer,
	Wrench,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<section className="min-h-[80vh]">

			</section>
			<section className="bg-neutral-100 py-5">
				<Wrapper>
					<div className="flex justify-between items-end">
						<h1 className="text-black font-medium">Aktualne oferty pracy</h1>
						<Link
							href="/oferty-pracy"
							className="text-black text-lg flex flex-row gap-2 justify-center items-center group/scrollerAnim">
							<ScrollerAnim>
								Zobacz wszystkie oferty <ArrowUpRight />
							</ScrollerAnim>
						</Link>
					</div>
					<div className="flex flex-col gap-3 mt-5">
						<div className="group flex flex-col md:flex-row items-center justify-between p-6 border border-neutral-300 rounded-xl hover:border-brand-gold/50 hover:shadow-lg transition bg-neutral-50 cursor-pointer">
							<div className="flex items-center gap-6 w-full md:w-auto text-neutral-900">
								<div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-600 group-hover:bg-neutral-800 group-hover:text-white transition">
									<Wrench className="size-6" />
								</div>
								<div>
									<h3 className="font-bold text-lg text-brand-dark group-hover:text-brand-gold transition">
										Lorem, ipsum dolor.
									</h3>
									<div className="flex gap-4 text-sm text-neutral-600 mt-1">
										<span className="flex items-center gap-1">
											{" "}
											<MapPin className="size-3" /> Warszawa
										</span>
										<span className="flex items-center gap-1">
											<Clock className="size-3" /> Pełny etat
										</span>
									</div>
								</div>
							</div>
							<div className="mt-4 md:mt-0 w-full md:w-auto flex justify-between md:justify-end items-center gap-6">
								<span className="font-bold text-neutral-800">
									5 500 - 6 500 PLN{" "}
									<span className="text-xs font-normal text-neutral-600">
										brutto
									</span>
								</span>
								<button className="px-6 py-2 rounded-full border border-neutral-200 text-sm font-medium hover:bg-brand-gold text-neutral-700 hover:text-neutral-900 hover:border-brand-gold transition">
									Aplikuj
								</button>
							</div>
						</div>
						<div className="group flex flex-col md:flex-row items-center justify-between p-6 border border-neutral-300 rounded-xl hover:border-brand-gold/50 hover:shadow-lg transition bg-neutral-50 cursor-pointer">
							<div className="flex items-center gap-6 w-full md:w-auto text-neutral-900">
								<div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-600 group-hover:bg-neutral-800 group-hover:text-white transition">
									<MousePointer className="size-6" />
								</div>
								<div>
									<h3 className="font-bold text-lg text-brand-dark group-hover:text-brand-gold transition">
										Lorem, ipsum.
									</h3>
									<div className="flex gap-4 text-sm text-neutral-600 mt-1">
										<span className="flex items-center gap-1">
											<MapPin className="size-3" /> Rawa Mazowiecka
										</span>
										<span className="flex items-center gap-1">
											<Clock className="size-3" /> Pełny etat
										</span>
									</div>
								</div>
							</div>
							<div className="mt-4 md:mt-0 w-full md:w-auto flex justify-between md:justify-end items-center gap-6">
								<span className="font-bold text-neutral-800">
									4 200 - 5 800 PLN{" "}
									<span className="text-xs font-normal text-neutral-600">
										brutto
									</span>
								</span>
								<button className="px-6 py-2 rounded-full border border-neutral-200 text-sm font-medium hover:bg-brand-gold text-neutral-700 hover:text-neutral-900 hover:border-brand-gold transition">
									Aplikuj
								</button>
							</div>
						</div>
					</div>
				</Wrapper>
			</section>
		</div>
	);
}
const ScrollerAnim = ({ children }) => {
	return (
		<div className="flex flex-col h-7 overflow-hidden">
			<span className="group-hover/scrollerAnim:-translate-y-full transition-transform duration-500 flex flex-row justify-center items-center">
				{children}
			</span>
			<span className="group-hover/scrollerAnim:-translate-y-full transition-transform duration-500 underline flex flex-row justify-center items-center">
				{children}
			</span>
		</div>
	);
};
