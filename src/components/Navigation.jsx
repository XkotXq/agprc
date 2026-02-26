import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import React, { useState } from "react";
import Wrapper from "./Wrapper";
import { Button } from "./ui/button";
import { ArrowRight, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import ScrollToLink from "./ScrollToPlugin";

export default function Navigation() {
	const isMobile = useIsMobile();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const switchLocale = (nextLocale) => {
		if (nextLocale === locale) return;

		const segments = pathname.split("/").filter(Boolean);
		if (segments.length > 0) {
			segments[0] = nextLocale;
		} else {
			segments.push(nextLocale);
		}

		const nextPathname = `/${segments.join("/")}`;
		const queryString = searchParams.toString();
		const hash = window.location.hash || "";
		const nextUrl = `${nextPathname}${queryString ? `?${queryString}` : ""}${hash}`;

		router.push(nextUrl);
		setMobileMenuOpen(false);
	};

	const navItems = (
		<>
			{/* <NavigationMenuItem className="group/navLink">
				<NavigationMenuTrigger className="h-6 overflow-hidden duration-500 z-100">
					<div className="flex flex-col h-6">
						<ScrollerAnim>Dla pracodawcy</ScrollerAnim>
					</div>
				</NavigationMenuTrigger>
				<NavigationMenuContent className="rounded-2xl">
					<ul className="w-54">
						<li>
							<NavigationMenuLink asChild>
								<Link href="/#oferta" className="w-full">
									<div className="hover:bg-green-400 w-full rounded-lg p-1">Oferta</div>
								</Link>
							</NavigationMenuLink>
						</li>
						<li>
							<NavigationMenuLink asChild>
								<Link href="/oferta" className="w-full">
									<div className="hover:bg-green-400 w-full rounded-lg p-1">Co to outsourcing procesowy</div>
								</Link>
							</NavigationMenuLink>
						</li>
						<li>
							<NavigationMenuLink asChild>
								<Link href="/oferta" className="w-full">
									<div className="hover:bg-green-400 w-full rounded-lg p-1">Dlaczego my?</div>
								</Link>
							</NavigationMenuLink>
						</li>
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem> */}
				<NavigationMenuItem className="group/navLink">
				<NavigationMenuLink asChild>
					<ScrollToLink
						href={`/${locale}/#oferta`}
						className="h-6 overflow-hidden duration-500">
						<ScrollerAnim>Oferta</ScrollerAnim>
					</ScrollToLink>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem className="group/navLink">
				<NavigationMenuLink
					href="/oferty-pracy"
					className="h-6 overflow-hidden duration-500">
					<ScrollerAnim>Oferty pracy</ScrollerAnim>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem className="group/navLink">
				<NavigationMenuLink asChild>
					<ScrollToLink
						href={`/${locale}/#o-nas`}
						className="h-6 overflow-hidden duration-500">
						<ScrollerAnim>O nas</ScrollerAnim>
					</ScrollToLink>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem className="group/navLink">
				<NavigationMenuLink asChild>
					<ScrollToLink
						href={`/${locale}/#kontakt`}
						className="h-6 overflow-hidden duration-500">
						<ScrollerAnim>Kontakt</ScrollerAnim>
					</ScrollToLink>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</>
	);

	const mobileNavItems = (
		<div className="flex flex-col gap-4 mt-8 px-4">
			<Link
				href="/oferty-pracy"
				onClick={() => setMobileMenuOpen(false)}
				className="text-lg hover:underline">
				Oferty pracy
			</Link>
			<ScrollToLink
				href={`/${locale}/#o-nas`}
				onClick={() => setMobileMenuOpen(false)}
				className="text-lg hover:underline">
				O nas
			</ScrollToLink>
			<ScrollToLink
				href={`/${locale}/#kontakt`}
				onClick={() => setMobileMenuOpen(false)}
				className="text-lg hover:underline">
				Kontakt
			</ScrollToLink>
			{/* <div className="pt-4 border-t">
				<div className="text-lg mb-2">Dla pracodawcy</div>
				<div className="text-sm text-neutral-400">jakaś tam lista</div>
			</div> */}
			<Button
				size="lg"
				className="w-full mt-4 flex justify-center items-center group/navLink h-10">
				<div className="flex flex-col h-6 overflow-hidden">
					<ScrollerAnim>
						Współpracuj z nami <ArrowRight />
					</ScrollerAnim>
				</div>
			</Button>
			{/* <div className="pt-4 border-t flex gap-2">
				<Button
					variant={locale === "pl" ? "default" : "outline"}
					className="flex-1"
					onClick={() => switchLocale("pl")}>
					PL
				</Button>
				<Button
					variant={locale === "en" ? "default" : "outline"}
					className="flex-1"
					onClick={() => switchLocale("en")}>
					EN
				</Button>
			</div> */}
		</div>
	);

	return (
		<div className="py-4 sticky top-0 bg-neutral-50/60 backdrop-blur-md border-bg-neutral-100 border-b z-1000">
			<Wrapper className="flex justify-between items-center">
				<div className="flex justify-center items-center">
					<Link href="/" className="flex gap-1 items-end justify-center">
						<Image src="/rawJobLogo.svg" height={50} width={50} alt="" />
						{/* <p className="text-4xl">RAW JOB</p> */}
					</Link>
				</div>
				{isMobile ? (
					<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="h-6 w-6" />
								<span className="sr-only">Otwórz menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-[300px] sm:w-[400px] z-1000"
							// overlayClassName="z-100"
						>
							<SheetTitle className="sr-only">Menu nawigacji</SheetTitle>
							<div className="flex items-center justify-center mt-4">
								<h2 className="text-xl font-semibold text-center">Menu</h2>
							</div>
							{mobileNavItems}
						</SheetContent>
					</Sheet>
				) : (
					<NavigationMenu className="gap-3 md:gap-6">
						<NavigationMenuList>{navItems}</NavigationMenuList>
						<Button
							size="lg"
							className="flex justify-center items-center group/navLink h-10 bg-green-600">
							<div className="flex flex-col h-6 overflow-hidden">
								<ScrollerAnim>
									Współpracuj z nami <ArrowRight />
								</ScrollerAnim>
							</div>
						</Button>
						{/* <div className="flex gap-2">
							<Button
								size="sm"
								variant={locale === "pl" ? "default" : "outline"}
								onClick={() => switchLocale("pl")}>
								PL
							</Button>
							<Button
								size="sm"
								variant={locale === "en" ? "default" : "outline"}
								onClick={() => switchLocale("en")}>
								EN
							</Button>
						</div> */}
					</NavigationMenu>
				)}
			</Wrapper>
		</div>
	);
}
const ScrollerAnim = ({ children }) => {
	return (
		<>
			<span className="group-hover/navLink:-translate-y-full group-data-[state=open]/navLink:-translate-y-full transition-transform px-2 duration-500 flex flex-row justify-center items-center">
				{children}
			</span>
			<span className="group-hover/navLink:-translate-y-full group-data-[state=open]/navLink:-translate-y-full transition-transform px-2 duration-500 underline flex flex-row justify-center items-center">
				{children}
			</span>
		</>
	);
};
