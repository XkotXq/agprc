"use client";
import Navigation from "@/components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<Navigation />
				{children}
				<Footer/>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</div>
	);
}
