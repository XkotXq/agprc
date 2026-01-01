import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuContent,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import Wrapper from "./Wrapper";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
	return (
		<div className="py-4 sticky top-0 bg-[#1a1a1a]/60 backdrop-blur-md border-[#313131] border-b z-1000">
			<Wrapper className="flex justify-between">
				<div className="flex justify-center items-center">
					<a href="/">
					<h1>LOGO</h1>
					{/* <Image src="/globe.svg" height={40} width={40} alt="" /> */}
					</a>
				</div>
				<NavigationMenu className="gap-6 hidden md:relative">
					<NavigationMenuList>
						<NavigationMenuItem className="group/navLink">
							<NavigationMenuTrigger className="h-6 overflow-hidden duration-500 z-100">
								<div className="flex flex-col h-6">
									<ScrollerAnim>Dla pracodawcy</ScrollerAnim>
								</div>
							</NavigationMenuTrigger>
							<NavigationMenuContent>jakaś tam lista</NavigationMenuContent>
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
					</NavigationMenuList>
					<Button
						size="lg"
						className="flex justify-center items-center group/navLink h-10">
						<div className="flex flex-col h-6  overflow-hidden">
							<ScrollerAnim>
								Współpracuj z nami <ArrowRight />
							</ScrollerAnim>
						</div>
					</Button>
				</NavigationMenu>
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
