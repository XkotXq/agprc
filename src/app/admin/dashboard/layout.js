"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { AppSidebar } from "@/components/AdminSidebar";

export default function RootLayout({ children }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<SidebarProvider>
				<AppSidebar />
				<main className="w-full">{children}</main>
			</SidebarProvider>
		</QueryClientProvider>
	);
}
