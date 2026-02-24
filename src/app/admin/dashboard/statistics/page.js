"use client";

import { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { Bar, BarChart } from "recharts"
 
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/statistics");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        if (json && typeof json === 'object') {
          setData(json);
          console.log(json);
        } else {
          console.error("Nieprawidłowa struktura danych:", json);
        }
      } catch (err) {
        console.error("Błąd pobierania danych Ackee", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Wrapper>
      {loading && <p>Ładowanie…</p>}

      {!loading && !data && <p>Brak danych do wyświetlenia</p>}

      {!loading && data && (
        <>
          <h1>{data.title || "Statystyki"}</h1>

          <div>
            <p>👀 Na żywo: {data.facts?.activeVisitors || 0}</p>
            <p>Dzisiaj: {data.facts?.viewsToday || 0}</p>
            <p>Miesiąc: {data.facts?.viewsMonth || 0}</p>
            <p>Rok: {data.facts?.viewsYear || 0}</p>
          </div>
          <div>
            {data.statistics?.durations && data.statistics.durations.length > 0 && (
              <AreaChart responsive data={data.statistics.durations} className="w-full min-h-[400px] text-neutral-200">
                <XAxis dataKey="value" className="text-neutral-200" />
                <YAxis width="count" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            )}
            {data.statistics?.durations && data.statistics.durations.length > 0 && (
              <ChartContainer>
                <BarChart data={data.statistics.durations}>
                  <Bar dataKey="value"/>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
}
