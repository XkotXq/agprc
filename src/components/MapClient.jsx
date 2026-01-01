"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function MapClient({ markersRef, mapRef, jobs }) {
  // Przekazujemy `mapRef` jako ref do komponentu Map (forwardRef)
  return <Map ref={mapRef} markersRef={markersRef} jobs={jobs} />;
}
