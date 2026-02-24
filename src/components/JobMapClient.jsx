"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import MapResizeFix from "./MapResizeFix"; // komponent do invalidateSize

// Twój własny icon
const customIcon = L.icon({
	iconUrl: "/locPin.png",
	iconSize: [32, 32],
	iconAnchor: [16, 32],
});


export default function JobMap({ lat = 48.8566, lng = 2.3522 }) {
	return (
		<div className="w-full aspect-square min-h-[200px] z-0">
			<MapContainer
				center={[lat, lng]}
				zoom={12}
				scrollWheelZoom={true}
				dragging={true}
				zoomControl={false}
        		attributionControl={false}
				className="w-full h-full">
				<MapResizeFix />
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<Marker position={[lat, lng]} icon={customIcon}></Marker>
			</MapContainer>
		</div>
	);
}
