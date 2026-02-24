"use client";
import Navigation from "@/components/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "@/components/Footer";
import * as ackeeTracker from "ackee-tracker";

export default function Layout({ children }) {
	const [queryClient] = useState(() => new QueryClient());

	// useEffect(() => {
	// 	const instance = ackeeTracker.create("/ackee", {
	// 		detailed: false,
	// 		ignoreLocalhost: false,
	// 		ignoreOwnVisits: false,
	// 	});
	// 	instance.record("c661d174-7a51-4563-bb2d-6979ddf23670");
	// }, []);

	return (
		<div className="bg-neutral-50">
			<QueryClientProvider client={queryClient}>
				<Navigation />
				{children}
				<Footer />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</div>
	);
}
