"use client";

import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

// Define the structure of the props
interface ChartPegawaiProps {
  chartData?: {
    labels: string[];
    data: number[];
  };
  isLoading?: boolean;
}

const chartConfig = {
  value: {
    label: "Kinerja",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartPegawai({ chartData, isLoading }: ChartPegawaiProps) {
  // Transform the incoming data into the format the chart expects
  const transformedData = useMemo(() => {
    if (!chartData?.labels || !chartData?.data) return [];
    return chartData.labels.map((label, index) => ({
      month: label,
      value: chartData.data[index] || 0,
    }));
  }, [chartData]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-8 w-1/2" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={transformedData} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#106D63" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#106D63" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="value"
              type="linear"
              fill="url(#colorValue)"
              stroke="#106D63"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Data Kinerja 2025 <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Menampilkan data evaluasi kinerja per bulan.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
