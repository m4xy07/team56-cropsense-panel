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
  raining: {
    label: "Rain Status",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RainStatusChart() {
  const [chartData, setChartData] = React.useState<{ time: string; raining: number }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        const formattedData = data.map((entry: { time: string; raining: string }) => ({
          time: new Date(entry.time + "Z").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          raining: entry.raining === "No" ? 0 : 1, // Map "No" -> 0, otherwise -> 1
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
          <CardTitle>Rain Status Over Time</CardTitle>
          <CardDescription>0 = No Rain, 1 = Raining</CardDescription>
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
              <YAxis
                
                domain={[0, 1]}
                ticks={[0, 1]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="raining"
                  />
                }
              />
              <Line
                dataKey="raining"
                type="monotone"
                stroke={`var(--color-raining)`}
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
