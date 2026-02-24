import React from "react";
import Wrapper from "@/components/Wrapper";
import { ArrowUpRight, Clock, MapPin, MousePointer } from "lucide-react";
import {
	AcademicCapIcon,
	ArrowDownIcon,
	BoltIcon,
	BriefcaseIcon,
	BuildingOffice2Icon,
	BuildingOfficeIcon,
	CheckIcon,
	DocumentCheckIcon,
	ForwardIcon,
	LightBulbIcon,
	RocketLaunchIcon,
	ScaleIcon,
	SunIcon,
	TruckIcon,
	UserIcon,
	UserMinusIcon,
	WalletIcon,
	WrenchIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import CheckLine from "@/components/CheckLine";
import { Highlight } from "@/components/ui/hero-highlight";
import { DotBackground } from "@/components/ui/dotBackground";
import HorizontalOffersGsap from "@/components/horizontalOffersGsap";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function Home() {
	return (
		<div>
			<DotBackground>
				<section className="min-h-[80vh] flex flex-col relative overflow-hidden max-w-[100vw] pt-13 pb-18">
					<div className="absolute bg-green-200/50 top-0 right-0 rounded-full h-[30vw] w-[30vw] translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none flex items-center justify-center" />
					<div className="mx-auto rounded-full p-1 px-2 bg-linear-to-br from-green-400/30 to-green-500/40 inline-flex gap-1 items-center">
						<UserIcon className="h-3.5 w-3.5" />
						<p className="text-sm">Pracownicy z Polski, Ukrainy i Mołdawii</p>
					</div>
					<div className="mb-18 mt-6 flex flex-col justify-center">
						<h1 className="text-6xl text-center font-bold mt-2 mb-3 max-w-3xl mx-auto leading-tight">
							Twoja droga do <Highlight>sukcesu</Highlight> zaczyna się tutaj.
						</h1>
						<p className="text-center max-w-4xl mx-auto my-5 text-xl">
							<strong>Raw Job</strong> to agencja pracy, która łączy pracodawców
							z wykwalifikowanymi pracownikami. Niezależnie od tego, po której
							stronie jesteś - mamy rozwiazanie dla <strong>Ciebie</strong>.
						</p>
					</div>
					<Wrapper className="w-full mb-5">
						<div className="flex flex-row h-full flex-1 gap-5 px-5">
							<div className="flex-1 rounded-3xl p-4 relative overflow-hidden bg-linear-to-br from-green-400 to-green-500">
								<div className="absolute bg-green-300/50 top-0 right-0 rounded-full h-56 w-56 translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none flex items-center justify-center" />
								<div className="relative z-10">
									<span className="inline-flex items-center gap-3 text-neutral-800 text-3xl font-bold">
										<div className="p-2 rounded-xl bg-green-500">
											<BuildingOffice2Icon className="h-6 w-6" />
										</div>
										<h1>Szukasz pracowników?</h1>
									</span>
									<p className="text-neutral-700 px-1 mt-2">
										Chcesz usprawnić proces i obniżyć koszty zatrudnienia?
										<br />
										Potrzebujesz niezawodnych pracowników?
										<br /> Zapewniamy <strong>kompleksowy outsourcing</strong> i
										rekrutacje dostosowana do Twoich potrzeb.
									</p>
									<div className="my-4 ml-2 text-neutral-800">
										<CheckLine className="bg-green-300/80">
											Pelna legalizacja pobytu i pracy
										</CheckLine>
										<CheckLine className="bg-green-300/80">
											Obsluga prawna i dokumentacja
										</CheckLine>
										<CheckLine className="bg-green-300/80">
											Dwujezyczny koordynator
										</CheckLine>
									</div>
									<div className="flex gap-3 font-medium justify-between">
										<div className="rounded-xl bg-green-400 p-3 shadow-md">
											Skontaktuj się z nami
										</div>
										<div className="rounded-xl p-3 shadow-md bg-green-200 flex items-center justify-center gap-2">
											Poznaj ofertę <ArrowDownIcon className="h-6 w-6" />{" "}
										</div>
									</div>
								</div>
							</div>
							<div className="flex-1 bg-linear-to-br from-neutral-100 to-neutral-200 rounded-3xl p-4 relative overflow-hidden">
								<div className="absolute bg-neutral-200 top-0 right-0 rounded-full h-56 w-56 translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none" />
								<div className="relative z-10 flex flex-col justify-between h-full">
									<div>
										<span className="inline-flex items-center gap-3 text-neutral-800 text-3xl font-bold">
											<div className="p-2 rounded-xl bg-neutral-300/50">
												<BriefcaseIcon className="h-6 w-6" />
											</div>
											<h1>Szukasz pracy?</h1>
										</span>
										<p className="text-neutral-700 px-1 mt-2">
											Szukasz stabilnego zatrudnienia w Polsce?
											<br /> Pomagamy pracownikom z <strong>
												Polski
											</strong>, <strong>Ukrainy</strong> i{" "}
											<strong>Mołdawi</strong> znaleźć odpowiednia prace i
											zapewniamy wsparcie na kazdym etapie.
										</p>
										<div className="my-4 ml-2 text-neutral-800">
											<CheckLine className="bg-neutral-300">
												Pomoc w legalizacji pobytu i pracy
											</CheckLine>
											<CheckLine className="bg-neutral-300">
												Szkolenia BHP i uprawnienia
											</CheckLine>
											<CheckLine className="bg-neutral-300">
												Wsparcie po zatrudnieniu
											</CheckLine>
										</div>
									</div>

									<div className="flex gap-3">
										<div className="rounded-xl bg-neutral-100 p-3 shadow-md font-medium">
											Przejdź do ofert pracy
										</div>
									</div>
								</div>
							</div>
						</div>
					</Wrapper>
				</section>
			</DotBackground>
			{/* <section className="bg-neutral-100 py-5">
				<Link
					href="/oferty-pracy"
					className="text-black text-lg flex flex-row gap-2 justify-center items-center group/scrollerAnim">
					<ScrollerAnim>
						Zobacz wszystkie oferty <ArrowUpRight />
					</ScrollerAnim>
				</Link>
			</section> */}
			<section
				className="pb-18 py-8 bg-neutral-50 overflow-hidden relative"
				id="oferta">
				<Wrapper className="z-10">
					<h2 className="text-6xl text-center font-bold text-green-500 ">
						Oferta
					</h2>
					<h1 className="text-center text-4xl font-bold mt-5">
						Szukasz pracowników?
					</h1>
					<p className="mt-3 text-center">
						Oferujemy pełen zakres usług związanych z rekrutacją, legalizacją i
						zatrudnieniem.
					</p>

					<div className="mt-10 w-full overflow-visible">
						<div className="grid  gap-5 flex-wrap grid-cols-[repeat(auto-fit,minmax(300px,400px))]">
							<OfferCard
								icon={MousePointer}
								title="Outsourcing procesowy"
								description="Współpraca na zasadach outsourcingu procesowego. Przejmujemy odpowiedzialność za cały proces rekrutacji i zatrudnienia."
								decoration={1}
							/>
							<OfferCard
								icon={DocumentCheckIcon}
								title="Legalizacja pobytu i pracy"
								description="Pełny proces legalizacji pobytu i pracy cudzoziemcow z Ukrainy i Mołdawii. Od oświadczeń po karty pobytu."
							/>
							<OfferCard
								icon={ScaleIcon}
								title="Obsluga prawna"
								description="Kompleksowa obsluga prawna zatrudnienia cudzoziemcow - oświadczenia, zezwolenia, wizy, karty pobytu. Przygotowujemy dokumenty i składamy wnioski."
								decoration={1}
							/>
							<OfferCard
								icon={CheckIcon}
								title="Wysoki poziom zatrudnienia"
								description="Utrzymanie wysokiego poziomu zatrudnienia dzięki stałemu monitorowaniu potrzeb kadrowych i szybkiej reakcji na zmiany."
								decoration={2}
							/>
							<OfferCard
								icon={UserIcon}
								title="Wsparcie po zatrudnieniu"
								description="Nie konczymy na rekrutacji. Zapewniamy wsparcie po zatrudnieniu, pomagając w adaptacji pracownikow na nowym stanowisku."
							/>
							<OfferCard
								icon={WrenchIcon}
								title="Szkolenia BHP i uprawnienia"
								description="Szkolenia BHP stanowiskowe, uprawnienia na wozki unoszące, UDT oraz wysokiego składowania i wiele innych."
								decoration={2}
							/>
						</div>
					</div>
				</Wrapper>
				<div className="absolute bg-green-200/50 top-1/2 left-0 -translate-x-1/2  rounded-full h-[30vw] w-[30vw] -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center" />
			</section>
			{/* <DotBackground className="bg-green-200" classNameMask="bg-green-50">
				<section className="py-8 relative ">
					<Wrapper>
						<h1 className="text-3xl font-bold text-center py-5">
							Dlaczego Raw Job jest najlepszym wyborem?
						</h1>
						<div className="grid grid-cols-2 gap-5 grid-rows-3 flex-2">
							<WhyChooseCard
								icon={BoltIcon}
								title="Szybka reakcja"
								description="Szybko reagujemy i dostosowujemy się do Państwa potrzeb"
							/>
							<WhyChooseCard
								icon={WalletIcon}
								title="Redukcja kosztów"
								description="Znacząca redukcja kosztów zatrudnienia dzięki naszemu modelowi współpracy."
							/>
							<WhyChooseCard
								icon={UserMinusIcon}
								title="Brak kosztów rekrutacji"
								description="Brak kosztów związanych z rekrutacja pracowników."
							/>
							<WhyChooseCard
								icon={AcademicCapIcon}
								title="Ciągły rozwój"
								description="Stawiamy na ciągły rozwój umiejętności w dynamicznym środowisku."
							/>
							<WhyChooseCard
								icon={LightBulbIcon}
								title="Realne rozwiązania"
								description="Zapewniamy wpływ na rozwiązywanie realnych problemów klientów i rynku."
							/>
							<WhyChooseCard
								icon={RocketLaunchIcon}
								title="Wsparcie Twojej wizji"
								description="Wsparcie w realizacji Twoich wizji i pomysłów, które przynoszą korzyści firmie."
							/>
						</div>
					</Wrapper>
				</section>
			</DotBackground> */}
			{/* <section className="bg-green-500 py-12">
				<Wrapper>
					<h1 className=" text-4xl font-bold">Zapraszamy do współpacy</h1>
					<p>
						Skontaktuj się z nami i dowiedz się, jak możemy pomóc Twojej firmie
						w znalezieniu najlepszych pracowników.
					</p>
				</Wrapper>
			</section> */}

			<section className="py-12">
				<Wrapper className="flex gap-5">
					<div className="rounded-3xl p-2 relative flex-1 shadow-sm bg-linear-to-br from-neutral-100 to-neutral-200">
						<div className="flex flex-col bg-neutral-100 w-full h-full p-6 rounded-2xl shadow-sm relative overflow-hidden">
							<div className="relative z-10">
								<h1 className="text-3xl font-bold">
									Czym jest outsourcing procesowy?
								</h1>
								<p className="pt-3">
									Outsourcing procesowy to strategia zarządzania, w której
									Państwa firma zleca wykonanie określonych procesów biznesowych
									zewnętrzenemu dostawcy usług. Celem tego podejścia jest
									zwiększenie efektywności, skupienie się na kluczowych
									kompetencjach firmy oraz optymalizacja kosztów.
								</p>
							</div>
							<div className="absolute bottom-0 right-0 inset-y-0 pointer-events-none flex items-end">
								<svg
									className="h-4/5 translate-x-[10%] translate-y-[5%] w-auto max-h-none"
									preserveAspectRatio="xMaxYMax meet"
									xmlns="http://www.w3.org/2000/svg"
									xmlSpace="preserve"
									fillRule="evenodd"
									strokeLinejoin="round"
									strokeMiterlimit="2"
									clipRule="evenodd"
									viewBox="0 0 1908 1907">
									<path
										fill="#E5E5E5"
										fillOpacity="0.75"
										d="M635.284 1906.465H0v-635.284c350.858 0 635.283 284.426 635.283 635.284"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.5"
										d="M635.283 1271.18V635.898h635.284v.001c0 350.858-284.426 635.283-635.283 635.283z"></path>
									<path
										fill="#E5E5E5"
										fillOpacity="0.9"
										d="M1272.406 1906.465V1271.18h635.284c0 350.858-284.426 635.284-635.283 635.284z"></path>
									<circle
										cx="1116.502"
										cy="3023.155"
										r="484.719"
										fill="#E5E5E5"
										fillOpacity="0.7"
										transform="matrix(.65594 0 0 .65594 856.767 -1665.07)"></circle>
									<circle
										cx="1116.502"
										cy="3023.155"
										r="484.719"
										fill="#E5E5E5"
										fillOpacity="0.65"
										transform="matrix(.65594 0 0 .65594 220.87 -394.503)"></circle>
								</svg>
							</div>
						</div>
					</div>
					<div className="flex flex-col bg-linear-to-br from-green-400 to-green-500 rounded-3xl p-8 relative overflow-hidden flex-1">
						<div className="flex-1 z-10">
							<h1 className="text-3xl font-bold">Dla kogo?</h1>
							<p className="pt-3">
								To rozwiązanie świetnie sprawdzi się w wielu branżach, począwszy
								od branż produkcyjnych, w których się specjalizujemy, a kończąc
								na branży logistycznej, hotelarskiej czy przemyśle sezonowym.
							</p>
						</div>
						<div className="gap-3 z-10 flex-2 flex mt-5">
							<div className="flex flex-col gap-2 items-center p-2 rounded-2xl flex-1">
								<div className="p-2 rounded-2xl bg-linear-to-br from-green-200 to-green-200/90 flex items-center justify-center w-min">
									<TruckIcon className="h-8 w-8" />
								</div>
								<p className="font-medium">Produkcja</p>
							</div>
							<div className="flex flex-col gap-2 items-center p-2 rounded-2xl flex-1">
								<div className="p-2 rounded-2xl bg-linear-to-br from-green-200 to-green-200/90 flex items-center justify-center w-min">
									<TruckIcon className="h-8 w-8" />
								</div>
								<p className="font-medium">Logistyka</p>
							</div>
							<div className="flex flex-col gap-2 items-center p-2 rounded-2xl flex-1">
								<div className="p-2 rounded-2xl bg-linear-to-br from-green-200 to-green-200/90 flex items-center justify-center w-min">
									<BuildingOfficeIcon className="h-8 w-8" />
								</div>
								<p className="font-medium">Hotelarstwo</p>
							</div>
							<div className="flex flex-col gap-2 items-center p-2 rounded-2xl flex-1">
								<div className="p-2 rounded-2xl bg-linear-to-br from-green-200 to-green-200/90 flex items-center justify-center w-min">
									<SunIcon className="h-8 w-8" />
								</div>
								<p className="w-min font-medium">Przemysł sezonowy</p>
							</div>
						</div>
						<div className="absolute bg-green-300/50 top-0 left-0 rounded-full h-56 w-56 -translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none flex items-center justify-center" />
						<div className="absolute inset-y-0 -right-10 pointer-events-none flex items-end justify-end">
							<svg
								className="h-[120%] w-auto max-h-none translate-y-[10%]"
								preserveAspectRatio="xMaxYMax meet"
								xmlns="http://www.w3.org/2000/svg"
								xmlSpace="preserve"
								fillRule="evenodd"
								strokeLinejoin="round"
								strokeMiterlimit="2"
								clipRule="evenodd"
								viewBox="0 0 1908 3178">
								<path
									fill="#7BF1A8"
									fillOpacity="0.5"
									d="M635.897 1906.464h635.283v635.284c-350.858 0-635.283-284.426-635.283-635.284"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.6"
									d="M0 2541.748h635.283v635.284C284.425 3177.032 0 2892.606 0 2541.748"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.75"
									d="M1907.078 1907.078v635.283h-635.284c0-350.858 284.426-635.283 635.284-635.283"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.65"
									d="M634.67 635.897V.614h635.284c0 350.858-284.426 635.283-635.283 635.283z"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.8"
									d="M1271.793 635.284V0h635.284c0 350.858-284.426 635.283-635.283 635.283zM1907.078 2542.361v635.284h-635.284c0-350.858 284.426-635.284 635.284-635.284"></path>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.7"
									transform="matrix(.65594 0 0 .65594 221.483 876.678)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.7"
									transform="matrix(.65594 0 0 .65594 856.154 -393.89)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.5"
									transform="matrix(.65594 0 0 .65594 220.257 -1029.786)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.4"
									transform="matrix(.65594 0 0 .65594 220.87 -393.89)"></circle>
							</svg>
						</div>
					</div>
				</Wrapper>
			</section>

			<section className="py-18">
				<Wrapper>
					<h1 className="text-6xl font-bold text-center text-green-400">
						O nas
					</h1>
					<h2 className="text-4xl font-bold text-center">
						Twoj partner w rekrutacji i zatrudnieniu
					</h2>
					<div className="flex">
						<div className="flex-1">
							<p>
								Jesteśmy firmą, która zajmuje się rekrutacją i zatrudnieniem
								pracownikow z Polski oraz cudzoziemcow dla firm o roznym profilu
								działalności. Dbamy o dostarczanie naszym klientom kandydatow
								zgodnie z ich potrzebami i wymaganiami. Naszym klientom
								zapewniamy wsparcie, jakim jest dwujęzyczny koordynator w celu
								zapewnienia prawidłowej komunikacji z pracownikami.
							</p>
						</div>
						<div className="flex-1"></div>
					</div>
				</Wrapper>
			</section>
			<section className="py-18">
				<Wrapper>
					<h1>Kontakt</h1>
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

const WhyChooseCard = ({ icon: Icon, title, description }) => {
	return (
		// <div className="bg-linear-to-tl from-green-400 to-green-500 p-2 rounded-3xl flex shadow-md">
		<DotBackground
			className="bg-green-500 w-full rounded-2xl flex overflow-hidden flex-1 shadow-md"
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
		//</div>
	);
};

const OfferCard = ({ icon: Icon, title, description, decoration }) => {
	return (
		<article className="w-full shrink-0 flex rounded-2xl p-2 shadow-sm bg-linear-to-br from-neutral-100 to-neutral-200">
			<div className="bg-neutral-100 flex-1 p-4 rounded-xl shadow-sm relative overflow-hidden isolate">
				<div className="relative z-10">
					<div className="flex gap-2 items-center">
						<div className="p-2 bg-neutral-200 rounded-xl min-w-fit">
							<Icon className="h-4.5 w-4.5" />
						</div>
						<h2 className="text-xl font-semibold">{title}</h2>
					</div>
					<p className="m-2">{description}</p>
				</div>
				<div className="absolute inset-y-0 right-0 top-0 pointer-events-none flex items-end justify-end z-0">
					{decoration == 1 ? (
						<svg
							className="h-full w-auto max-h-none"
							preserveAspectRatio="xMaxYMax meet"
							xmlns="http://www.w3.org/2000/svg"
							xmlSpace="preserve"
							fillRule="evenodd"
							strokeLinejoin="round"
							strokeMiterlimit="2"
							clipRule="evenodd"
							viewBox="0 0 1772 2953">
							<path
								fill="#E5E5E5"
								fillOpacity="0.4"
								d="M590.55 2362.205 0 1771.654h590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.6"
								d="M1181.102 2952.756 590.55 2362.205h590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.7"
								d="M1181.102 2362.205 590.55 1771.654h590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.8"
								d="m590.552 1771.654 590.55-590.551h-590.55zM1181.102 1181.102 590.552 590.55v590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.4"
								d="M1771.654 1181.102 1181.103 590.55v590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.6"
								d="m1181.102 0 590.551 590.552V0z"></path>
							<path
								fill="#E5E5E5"
								d="m1181.103 1771.654 590.55 590.55h-590.55z"></path>
						</svg>
					) : decoration == 2 ? (
						<svg
							className="h-full w-auto max-h-none"
							preserveAspectRatio="xMaxYMax meet"
							xmlns="http://www.w3.org/2000/svg"
							xmlSpace="preserve"
							fillRule="evenodd"
							strokeLinejoin="round"
							strokeMiterlimit="2"
							clipRule="evenodd"
							viewBox="0 0 1772 2953">
							<path
								fill="#E5E5E5"
								fillOpacity="0.4"
								d="M590.55 1771.654 0 1181.103h590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.8"
								d="M1181.102 2952.756 590.55 2362.205h590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.3"
								d="m1181.102 1771.654-590.55 590.551v-590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.6"
								d="M1181.102 1181.102 590.552 590.55v590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.7"
								d="m1181.102 1181.103 590.551 590.55v-590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.6"
								d="m1771.653 0-590.551 590.551h590.551z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.4"
								d="M1181.102 0 590.55 590.551h590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.5"
								d="m1181.103 1181.102 590.55 590.551h-590.55zM1181.103 2362.205l590.55 590.55h-590.55z"></path>
						</svg>
					) : (
						<svg
							className="h-full w-auto max-h-none"
							preserveAspectRatio="xMaxYMax meet"
							xmlns="http://www.w3.org/2000/svg"
							xmlSpace="preserve"
							fillRule="evenodd"
							strokeLinejoin="round"
							strokeMiterlimit="2"
							clipRule="evenodd"
							viewBox="0 0 1772 2953">
							<path
								fill="#E5E5E5"
								fillOpacity="0.4"
								d="M590.551 0 .001 590.553V0z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.8"
								d="M1181.102 1181.102 590.55 590.552h590.55zM1181.102 1771.654l-590.55 590.551v-590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.6"
								d="m1181.102 1771.654 590.551 590.551v-590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.4"
								d="m1771.653 1181.102-590.551 590.551h590.551z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.6"
								d="m1771.653 590.551-590.551 590.551h590.551z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.4"
								d="M1181.102 0 590.55 590.551h590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.5"
								d="m0 1771.653 590.551-590.551v590.551z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.6"
								d="m0 2952.755 590.551-590.55v590.55z"></path>
							<path
								fill="#E5E5E5"
								fillOpacity="0.3"
								d="m1181.103 2362.205 590.55 590.55h-590.55z"></path>
						</svg>
					)}
				</div>
			</div>
		</article>
	);
};
