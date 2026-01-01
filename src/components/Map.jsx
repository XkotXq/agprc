"use client";

import {
	useEffect,
	useRef,
	forwardRef,
	useImperativeHandle,
	useState,
} from "react";
import { renderToString } from "react-dom/server";
import { MapPin } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

let mapInstance = null;
const MapClient = forwardRef(function Map({ jobs, markersRef }, ref) {
	const internalMapRef = useRef(null);

	useImperativeHandle(ref, () => ({
		goToJob(id) {
			const marker = markersRef?.current?.[id];
			const map = internalMapRef.current;

			if (!marker || !map) return;

			const cluster = markersRef.current?.cluster;

			const focusMarker = () => {
				try {
					const prevId = markersRef.current._activeId;
					if (prevId && markersRef.current[prevId]) {
						const prevMarker = markersRef.current[prevId];
						if (prevMarker.setZIndexOffset) prevMarker.setZIndexOffset(0);
						const prevIcon = prevMarker._icon;
						if (prevIcon) prevIcon.classList.remove("marker-pulse");
					}
				} catch (e) {}

				markersRef.current._activeId = id;

				map.flyTo(marker.getLatLng(), 14, { duration: 1.2 });

				if (marker.setZIndexOffset) {
					marker.setZIndexOffset(1000);
				}
				marker.openPopup();
			};

			focusMarker();
		},
	}));
	const [isMapReady, setIsMapReady] = useState(false);
	useEffect(() => {
		async function init() {
			const L = (await import("leaflet")).default;
			await import("leaflet/dist/leaflet.css");
			await import("leaflet-defaulticon-compatibility");

			const MarkerCluster = (await import("leaflet.markercluster")).default;
			await import("leaflet.markercluster/dist/MarkerCluster.css");
			await import("leaflet.markercluster/dist/MarkerCluster.Default.css");

			if (!mapInstance) {
				mapInstance = L.map("mapid", { attributionControl: false }).setView(
					[52.2297, 21.0122],
					6
				);

				internalMapRef.current = mapInstance;

				L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
					attribution: "",
				}).addTo(mapInstance);

				mapInstance.whenReady(() => {
					setIsMapReady(true);
				});
			} else {
				internalMapRef.current = mapInstance;
				setIsMapReady(true);
			}

			if (!markersRef.current) {
				markersRef.current = {};
			}
			if (!markersRef.current.cluster) {
				markersRef.current.cluster = L.markerClusterGroup({
					maxClusterRadius: 50,
				});
				mapInstance.addLayer(markersRef.current.cluster);
			}

			const cluster = markersRef.current.cluster;
			if (cluster && cluster.clearLayers) cluster.clearLayers(); // usuń stare pinezki

			const jobPin = L.icon({
				iconUrl: "/locPin.png",
				iconSize: [32, 32],
				iconAnchor: [16, 32],
			});

			jobs.forEach((job) => {
				const popupHTML = renderToString(
					<div className="bg-neutral-950 rounded-xl p-2">
						<h3 className="text-md">{job.title}</h3>
						<div className="flex gap-1 text-neutral-300 items-center">
							<MapPin className="w-3 h-3" />
							<p className="m-0 text-sm">{job.city}</p>
						</div>
					</div>
				);

				const marker = L.marker([job.lat, job.lng], { icon: jobPin });
				marker.bindPopup(popupHTML, { className: "jobPopup" });

				marker.on("click", () => {
					try {
						const prevId = markersRef.current._clickedJobId;
						if (prevId && prevId !== job.id) {
							const prevEl = document.getElementById(`job-${prevId}`);
							if (prevEl) prevEl.classList.remove("job-highlight");
						}

						const el = document.getElementById(`job-${job.id}`);
						if (el) {
							el.classList.add("job-highlight");
							el.scrollIntoView({ behavior: "smooth", block: "center" });
						}

						markersRef.current._clickedJobId = job.id;
					} catch (e) {}
				});
				marker.on("mouseover", () => {
					try {
						const el = document.getElementById(`job-${job.id}`);
						if (el) {
							el.classList.add("job-highlight");
						}

						markersRef.current._clickedJobId = job.id;
					} catch (e) {}
				});
				marker.on("mouseout", () => {
					try {
						const el = document.getElementById(`job-${job.id}`);
						if (el) {
							el.classList.remove("job-highlight");
						}

						markersRef.current._clickedJobId = job.id;
					} catch (e) {}
				});

				marker.on("popupopen", () => {
					const popup = marker.getPopup();
					const popupElement = popup.getElement();
					if (popupElement) {
						popupElement.addEventListener("mouseover", () => {
							try {
								const el = document.getElementById(`job-${job.id}`);
								if (el) {
									el.classList.add("job-highlight");
								}
								markersRef.current._clickedJobId = job.id;
							} catch (e) {}
						});
						popupElement.addEventListener("mouseout", () => {
							try {
								const el = document.getElementById(`job-${job.id}`);
								if (el) {
									el.classList.remove("job-highlight");
								}
								markersRef.current._clickedJobId = job.id;
							} catch (e) {}
						});
					}
				});

				cluster.addLayer(marker);
				markersRef.current[job.id] = marker;
			});
		}

		init();
	}, [jobs, markersRef]);

	return (
		<div className="relative w-full h-[280px] rounded-3xl overflow-hidden md:h-[580px]">
			<div
				id="mapid"
				className="z-0 inset-0 absolute border border-neutral-700 h-[280px] md:h-[580px]"
				style={{
					width: "100%",
					// height: "580px",
				}}
			/>

			{!isMapReady && <Skeleton className="w-full h-full" />}
		</div>
	);
});

export default MapClient;
