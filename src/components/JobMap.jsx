"use client";

import dynamic from "next/dynamic";

const JobMap = dynamic(() => import("./JobMapClient"), {
  ssr: false,
});

export default JobMap;
