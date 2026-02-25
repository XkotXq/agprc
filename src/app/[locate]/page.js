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
import { getTranslations } from "next-intl/server";
import ScrollToLink from "@/components/ScrollToPlugin";

export default async function Home({ params }) {
	const { locate } = await params;
	const t = await getTranslations("LocateHomePage");
	return (
		<div>
			<DotBackground>
				<section className="min-h-[80vh] flex flex-col relative overflow-hidden max-w-[100vw] pt-13 pb-18">
					<div className="absolute bg-green-200/50 top-0 right-0 rounded-full h-[30vw] w-[30vw] translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none flex items-center justify-center" />
					<div className="mx-auto rounded-full p-1 px-2 bg-linear-to-br from-green-400/30 to-green-500/40 inline-flex gap-1 items-center">
						<UserIcon className="h-3.5 w-3.5" />
						<p className="text-sm">{t("hero.badge")}</p>
					</div>
					<div className="mb-18 mt-6 flex flex-col justify-center">
						<h1 className="text-6xl text-center font-bold mt-2 mb-3 max-w-3xl mx-auto leading-tight">
							{t("hero.titlePrefix")}{" "}
							<Highlight>{t("hero.titleHighlight")}</Highlight>{" "}
							{t("hero.titleSuffix")}
						</h1>
						<p className="text-center max-w-4xl mx-auto my-5 text-xl">
							{t.rich("hero.description", {
								brand: (chunks) => <strong>{chunks}</strong>,
								you: (chunks) => <strong>{chunks}</strong>,
							})}
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
										<h1>{t("employers.title")}</h1>
									</span>
									<p className="text-neutral-700 px-1 mt-2">
										{t("employers.descriptionLine1")}
										<br />
										{t("employers.descriptionLine2")}
										<br />{" "}
										{t.rich("employers.descriptionLine3", {
											strong: (chunks) => <strong>{chunks}</strong>,
										})}
									</p>
									<div className="my-4 ml-2 text-neutral-800">
										<CheckLine className="bg-green-300/80">
											{t("employers.bullets.legalization")}
										</CheckLine>
										<CheckLine className="bg-green-300/80">
											{t("employers.bullets.legalService")}
										</CheckLine>
										<CheckLine className="bg-green-300/80">
											{t("employers.bullets.coordinator")}
										</CheckLine>
									</div>
									<div className="flex gap-3 font-medium justify-between">
										<div className="rounded-xl bg-green-400 p-3 shadow-md">
											{t("employers.ctaContact")}
										</div>
										<ScrollToLink
											href="#oferta"
											className="rounded-xl p-3 shadow-md bg-green-200 flex items-center justify-center gap-2">
											{t("employers.ctaOffer")}{" "}
											<ArrowDownIcon className="h-6 w-6" />
										</ScrollToLink>
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
											<h1>{t("jobSeekers.title")}</h1>
										</span>
										<p className="text-neutral-700 px-1 mt-2">
											{t("jobSeekers.descriptionLine1")}
											<br />{" "}
											{t.rich("jobSeekers.descriptionLine2", {
												poland: (chunks) => <strong>{chunks}</strong>,
												ukraine: (chunks) => <strong>{chunks}</strong>,
												moldova: (chunks) => <strong>{chunks}</strong>,
											})}
										</p>
										<div className="my-4 ml-2 text-neutral-800">
											<CheckLine className="bg-neutral-300">
												{t("jobSeekers.bullets.legalization")}
											</CheckLine>
											<CheckLine className="bg-neutral-300">
												{t("jobSeekers.bullets.training")}
											</CheckLine>
											<CheckLine className="bg-neutral-300">
												{t("jobSeekers.bullets.support")}
											</CheckLine>
										</div>
									</div>

									<div className="flex gap-3">
										<Link href="/oferty-pracy">
											<div className="rounded-xl bg-neutral-100 p-3 shadow-md font-medium">
												{t("jobSeekers.cta")}
											</div>
										</Link>
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
						{t("offer.heading")}
					</h2>
					<h1 className="text-center text-4xl font-bold mt-5">
						{t("offer.title")}
					</h1>
					<p className="mt-3 text-center">{t("offer.description")}</p>

					<div className="mt-10 w-full overflow-visible">
						<div className="grid  gap-5 flex-wrap grid-cols-[repeat(auto-fit,minmax(300px,400px))]">
							<OfferCard
								icon={MousePointer}
								title={t("offer.cards.outsourcing.title")}
								description={t("offer.cards.outsourcing.description")}
								decoration={1}
							/>
							<OfferCard
								icon={DocumentCheckIcon}
								title={t("offer.cards.legalization.title")}
								description={t("offer.cards.legalization.description")}
							/>
							<OfferCard
								icon={ScaleIcon}
								title={t("offer.cards.legalService.title")}
								description={t("offer.cards.legalService.description")}
								decoration={1}
							/>
							<OfferCard
								icon={CheckIcon}
								title={t("offer.cards.highEmployment.title")}
								description={t("offer.cards.highEmployment.description")}
								decoration={2}
							/>
							<OfferCard
								icon={UserIcon}
								title={t("offer.cards.postSupport.title")}
								description={t("offer.cards.postSupport.description")}
							/>
							<OfferCard
								icon={WrenchIcon}
								title={t("offer.cards.training.title")}
								description={t("offer.cards.training.description")}
								decoration={2}
							/>
						</div>
					</div>
				</Wrapper>
				<div className="absolute bg-green-200/50 top-1/2 left-0 -translate-x-1/2  rounded-full h-[30vw] w-[30vw] -translate-y-1/2 z-0 pointer-events-none flex items-center justify-center" />
			</section>
			<DotBackground>
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
			</DotBackground>
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
									{t("outsourcingInfo.title")}
								</h1>
								<p className="pt-3">{t("outsourcingInfo.description")}</p>
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
							<h1 className="text-3xl font-bold">{t("forWho.title")}</h1>
							<p className="pt-3">{t("forWho.description")}</p>
						</div>
						<div className="gap-3 z-10 flex-2 flex mt-5">
							<div className="flex flex-col gap-2 items-center p-2 rounded-2xl flex-1">
								<div className="p-2 rounded-2xl bg-linear-to-br from-green-200 to-green-200/90 flex items-center justify-center w-min">
									<TruckIcon className="h-8 w-8" />
								</div>
								<p className="font-medium">{t("forWho.sectors.production")}</p>
							</div>
							<div className="flex flex-col gap-2 items-center p-2 rounded-2xl flex-1">
								<div className="p-2 rounded-2xl bg-linear-to-br from-green-200 to-green-200/90 flex items-center justify-center w-min">
									<TruckIcon className="h-8 w-8" />
								</div>
								<p className="font-medium">{t("forWho.sectors.logistics")}</p>
							</div>
							<div className="flex flex-col gap-2 items-center p-2 rounded-2xl flex-1">
								<div className="p-2 rounded-2xl bg-linear-to-br from-green-200 to-green-200/90 flex items-center justify-center w-min">
									<BuildingOfficeIcon className="h-8 w-8" />
								</div>
								<p className="font-medium">{t("forWho.sectors.hospitality")}</p>
							</div>
							<div className="flex flex-col gap-2 items-center p-2 rounded-2xl flex-1">
								<div className="p-2 rounded-2xl bg-linear-to-br from-green-200 to-green-200/90 flex items-center justify-center w-min">
									<SunIcon className="h-8 w-8" />
								</div>
								<p className="w-min font-medium">
									{t("forWho.sectors.seasonal")}
								</p>
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
			{/* <section>
				<ul className="font-medium ml-5 mt-3">
					<li>
						<CheckLine className="bg-green-300/80">Redukcja kosztów</CheckLine>
						<p>
							Firmy mogą obniżyć swoje wydatki na zarządzanie pracownikami,
							rekrutację, szkolenia oraz inne koszty związane z zatrudnieniem,
							takie jak składki na ubezpieczenie społeczne.
						</p>
					</li>
					<li>
						<CheckLine className="bg-green-300/80">
							Skupienie na kluczowych kompetencjach
						</CheckLine>
						<p>
							Outsourcing pozwala firmie skoncentrować się na swojej głównej
							działalności, przekazując zadania pomocnicze firmom zewnętrznym,
							które mają w nich specjalizację.
						</p>
					</li>
					<li>
						<CheckLine className="bg-green-300/80">
							Dostęp do ekspertów i technologii
						</CheckLine>
						<p>
							Agencje pracy tymczasowej często dysponują zaawansowaną wiedzą i
							technologią, co pozwala na realizację zadań na wyższym poziomie
							efektywności i jakości.
						</p>
					</li>
					<li>
						<CheckLine className="bg-green-300/80">Elastyczność</CheckLine>
						<p></p>
					</li>
					<li>
						<CheckLine className="bg-green-300/80">Szybsze wdrożenie</CheckLine>
					</li>
				</ul>
			</section> */}

			<section className="py-18">
				<Wrapper>
					<h1 className="text-6xl text-center font-bold text-green-500 my-5">
						{t("about.heading")}
					</h1>
					<div className="flex">
						<div className="flex-2 p-2">
							<h2 className="text-4xl font-bold mb-2">{t("about.title")}</h2>

							<p className="text-lg max-w-[70%]">
								Jesteśmy firmą, która zajmuje się rekrutacją i zatrudnieniem
								pracowników z Polski oraz cudzoziemców dla firm o różnym profilu
								działalności. Dbamy o dostarczanie naszym klientom kandydatów
								zgodnie z ich potrzebami i wymaganiami. Naszym klientom
								zapewniamy wsparcie, jakim jest dwujęzyczny koordynator w celu
								zapewnienia prawidłowej komunikacji z pracownikami.
							</p>
							<div>
								<ul className="font-medium ml-5 mt-3">
									<li>
										<CheckLine className="bg-green-300/80">
											Rekrutacja pracowników z Polski i zagranicy
										</CheckLine>
									</li>
									<li>
										<CheckLine className="bg-green-300/80">
											Dla każdego kliena dwujęzyczny koordynator
										</CheckLine>
									</li>
									<li>
										<CheckLine className="bg-green-300/80">
											Indywidualne podejście do każdej firmy
										</CheckLine>
									</li>
									<li>
										<CheckLine className="bg-green-300/80">
											Pełna obsługa prawna zatrudnienia
										</CheckLine>
									</li>
								</ul>
							</div>
						</div>
						<div>
							<img src="/rawJobLogo.svg" width={350} alt="raw job logo" />
						</div>
					</div>
				</Wrapper>
			</section>
			<section className="my-18">
				<Wrapper>
					<DotBackground
						className="bg-linear-to-br from-green-400 to-green-500 p-10 rounded-3xl relative overflow-hidden shadow-md"
						classNameMask="bg-green-500/50">
						<div className="z-10 relative">
							<h1 className="text-5xl text-center font-medium">
								Zapraszamy do współpracy!
							</h1>
							<div className="flex justify-between my-10">
								<div>
									<p className="text-3xl">Szukasz pracowników?</p>
									<p className="text-3xl">
										Chcesz usprawnić proces <br /> i koszty zatudnienia?
									</p>
								</div>
								<div className="text-3xl flex flex-col gap-1">
									<p>+48 534 409 481</p>
									<p>+380 932 870 621 (Viber)</p>
									<p>j.redlicki@rawjob.pl</p>
								</div>
							</div>
						</div>
						<div className="absolute bg-green-200/50 top-0 left-0 rounded-full h-[30vw] w-[30vw] -translate-x-1/3 -translate-y-1/3 z-0 pointer-events-none flex items-center justify-center" />
						<div className="absolute inset-y-0 -right-10 top-0 pointer-events-none flex items-end justify-end">
							<svg
								className="h-[120%] w-auto max-h-none translate-y-[5%]"
								preserveAspectRatio="xMaxYMax meet"
								xmlns="http://www.w3.org/2000/svg"
								xmlSpace="preserve"
								fillRule="evenodd"
								strokeLinejoin="round"
								strokeMiterlimit="2"
								clipRule="evenodd"
								viewBox="0 0 1115 835">
								<path
									fill="#7BF1A8"
									fillOpacity="0.6"
									d="M833.544 556.513V834.27H555.785c0-153.401 124.357-277.758 277.758-277.758"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.5"
									d="M278.028 555.783h277.758v277.759c-153.402 0-277.758-124.357-277.758-277.758"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.4"
									d="M555.783 277.757V-.002h277.759c0 153.402-124.357 277.759-277.758 277.759"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.8"
									d="M278.025 277.757V-.002h277.759c0 153.402-124.357 277.759-277.759 277.759"></path>
								<path
									fill="#7BF1A8"
									fillOpacity="0.9"
									d="M1114.538 555.786H836.78V278.027c153.402 0 277.758 124.357 277.758 277.758"></path>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.65"
									transform="translate(96.569 -450.242)scale(.28679)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.75"
									transform="translate(-181.19 -450.51)scale(.28679)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.8"
									transform="translate(652.353 -171.489)scale(.28679)"></circle>
								<circle
									cx="1116.502"
									cy="3023.155"
									r="484.719"
									fill="#7BF1A8"
									fillOpacity="0.3"
									transform="translate(-181.19 -172.484)scale(.28679)"></circle>
							</svg>
						</div>
					</DotBackground>
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
		<div className="w-full flex overflow-hidden flex-1">
			<div className="p-2 bg-linear-to-r flex flex-row gap-3 flex-1 z-10">
				<div className="flex justify-center items-center p-2 rounded-xl bg-linear-to-br from-green-50/40 to-neutral-50/40 aspect-square shadow-md">
					<Icon className="h-8 w-8" />
				</div>
				<div>
					<h2 className="text-xl font-bold ">{title}</h2>
					<p>{description}</p>
				</div>
			</div>
		</div>
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
