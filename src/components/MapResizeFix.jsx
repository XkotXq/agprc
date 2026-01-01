"use client";

import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapResizeFix() {
  const map = useMap();

  useEffect(() => {
    const resize = () => {
      map.invalidateSize();
    };

    requestAnimationFrame(resize);
    setTimeout(resize, 0);

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [map]);

  return null;
}
