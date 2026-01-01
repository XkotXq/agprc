"use client";
import { useEffect } from "react";

export default function JobViewTracker({ jobId }) {
  useEffect(() => {
    const now = Date.now();
    const lastView = localStorage.getItem(`job-view-${jobId}`);

    if (lastView && now - parseInt(lastView) < 30 * 60 * 1000) return;

    const trackView = async () => {
      try {
        await fetch("/api/job-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId }),
        });
        localStorage.setItem(`job-view-${jobId}`, now.toString());
      } catch (err) {
        console.error("Failed to track job view:", err);
      }
    };

    trackView();
  }, [jobId]);

  return null;
}
