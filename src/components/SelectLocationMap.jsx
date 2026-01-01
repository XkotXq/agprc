"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const SelectLocationMap = forwardRef(function SelectLocationMap({ value, onChange }, ref) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
const containerRef = useRef(null);
  useImperativeHandle(ref, () => ({
    resetMarker: () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    },
  }));

  useEffect(() => {
    if (mapRef.current) return;

    let isMounted = true;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!isMounted || !containerRef.current) return;

      const map = L.map(containerRef.current).setView(
        value ? [value.lat, value.lng] : [52.2297, 21.0122],
        6
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const jobPin = L.icon({
        iconUrl: "/locPin.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;

        if (!markerRef.current) {
          markerRef.current = L.marker([lat, lng], { icon: jobPin }).addTo(map);
        } else {
          markerRef.current.setLatLng([lat, lng]);
        }

        const { address, name } = await reverseGeocode(lat, lng);
        const locality =
          address?.city ||
          address?.village ||
          address?.town ||
          name ||
          "";

        const state = address?.state?.split(" ")[1];

        onChange({ lat, lng, locality, state });
      });

      mapRef.current = map;
    })();

    return () => {
      isMounted = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-neutral-700 z-0"
      style={{ width: "100%", height: "400px" }}
    />
  );
});

export default SelectLocationMap;
export async function reverseGeocode(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    {
      headers: {
        "User-Agent": "agencja-pracy-app/1.0 (contact@example.com)",
      },
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data;
}

export async function searchAddress(query) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  );
  return res.json();
}
