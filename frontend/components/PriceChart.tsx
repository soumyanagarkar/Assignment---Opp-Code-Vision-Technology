use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { HistoryPoint } from "@/types/company";

export default function PriceChart({ data }: { data: HistoryPoint[] }) {
  const chartData = data.map((item) => ({
    ...item,
    label: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    })
  }));

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={310}>
        <AreaChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopOpacity={0.25} />
              <stop offset="100%" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={28} />
          <YAxis
            domain={["dataMin - 20", "dataMax + 20"]}
            tickLine={false}
            axisLine={false}
            width={55}
          />
          <Tooltip
            formatter={(value: number | string) => [`₹${Number(value).toLocaleString("en-IN")}`, "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="currentColor"
            fill="url(#priceFill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
