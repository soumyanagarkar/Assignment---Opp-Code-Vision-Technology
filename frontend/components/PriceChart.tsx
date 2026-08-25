"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function PriceChart({
  company
}: Props) {
  const data =
    company.priceHistory.map((item) => ({
      ...item,
      date: new Date(
        item.date
      ).toLocaleDateString("en-IN", {
        month: "short"
      })
    }));

  return (
    <section className="card">
      <div className="section-heading">
        <div>
          <h2>Historical Price</h2>
          <p>Mock historical price and volume data</p>
        </div>

        <div className="chart-legend">
          Price
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="date" />

            <YAxis
              domain={["auto", "auto"]}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString(
                  "en-IN"
                )}`,
                "Price"
              ]}
            />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="volume-row">
        {company.priceHistory.map((item) => (
          <div
            key={item.date}
            className="volume-item"
          >
            <span>
              {new Date(
                item.date
              ).toLocaleDateString("en-IN", {
                month: "short"
              })}
            </span>

            <div
              className="volume-bar"
              style={{
                height: `${Math.max(
                  8,
                  Math.min(
                    70,
                    item.volume / 40000
                  )
                )}px`
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}