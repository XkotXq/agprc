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
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navigation() {
	const isMobile = useIsMobile();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navItems = (
		<>
			<NavigationMenuItem className="group/navLink">
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
			</NavigationMenuItem>
			<NavigationMenuItem className="group/navLink">
				<NavigationMenuLink
					href="/oferty-pracy"
					className="h-6 overflow-hidden duration-500">
					<ScrollerAnim>Oferty pracy</ScrollerAnim>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem className="group/navLink">
				<NavigationMenuLink
					href="/o-nas"
					className="h-6 overflow-hidden duration-500">
					<ScrollerAnim>O nas</ScrollerAnim>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem className="group/navLink">
				<NavigationMenuLink
					href="/kontakt"
					className="h-6 overflow-hidden duration-500">
					<ScrollerAnim>Kontakt</ScrollerAnim>
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
			<Link
				href="/o-nas"
				onClick={() => setMobileMenuOpen(false)}
				className="text-lg hover:underline">
				O nas
			</Link>
			<Link
				href="/kontakt"
				onClick={() => setMobileMenuOpen(false)}
				className="text-lg hover:underline">
				Kontakt
			</Link>
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
		</div>
	);

	return (
		<div className="py-4 sticky top-0 bg-neutral-50/60 backdrop-blur-md border-bg-neutral-100 border-b z-1000">
			<Wrapper className="flex justify-between items-center">
				<div className="flex justify-center items-center">
					<a href="/">
						<h1>LOGO</h1>
						{/* <Image src="/globe.svg" height={40} width={40} alt="" /> */}
					</a>
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
