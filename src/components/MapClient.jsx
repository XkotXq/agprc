"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function MapClient({ markersRef, mapRef, jobs }) {
  return <Map ref={mapRef} markersRef={markersRef} jobs={jobs} />;
}
