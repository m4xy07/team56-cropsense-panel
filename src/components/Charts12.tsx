"use client";

import * as React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const API_URL = "http://157.245.196.80:3000/data";

const chartConfig = {
    npk_uptake_phosphorus: {
    label: "Phosphorus Uptake",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PhosphorusChart() {
  const [chartData, setChartData] = React.useState<{ time: string; npk_uptake_phosphorus: number }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        const formattedData = data.map((entry: { time: string; npk_uptake_phosphorus: number }) => ({
          time: new Date(entry.time + "Z").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          npk_uptake_phosphorus: entry.npk_uptake_phosphorus,
        }));

        setChartData(formattedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Phosphorus Uptake Over Time</CardTitle>
          <CardDescription>Real-time Phosphorus Uptake readings</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: -30, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="npk_uptake_phosphorus"
                  />
                }
              />
              <Line
                dataKey="npk_uptake_phosphorus"
                type="monotone"
                stroke={`var(--color-npk_uptake_phosphorus)`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
