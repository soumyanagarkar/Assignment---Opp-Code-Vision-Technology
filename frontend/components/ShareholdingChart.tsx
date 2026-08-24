use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { Shareholding } from "@/types/company";

export default function ShareholdingChart({ data }: { data: Shareholding[] }) {
  const colors = ["#1d4ed8", "#7c3aed", "#059669", "#d97706"];

  return (
    <div className="shareholding-chart">
      <div className="donut">
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88}>
              {data.map((item, index) => (
                <Cell key={item.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number | string) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <strong>100%</strong>
          <span>Holding</span>
        </div>
      </div>
      <div className="legend-list">
        {data.map((item, index) => (
          <div className="legend-item" key={item.name}>
            <span className="legend-dot" style={{ background: colors[index % colors.length] }} />
            <span>{item.name}</span>
            <strong>{item.value.toFixed(2)}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
