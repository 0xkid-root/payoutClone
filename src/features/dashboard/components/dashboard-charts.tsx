"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1 Sep", volume: 4000, failed: 240 },
  { name: "5 Sep", volume: 3000, failed: 139 },
  { name: "10 Sep", volume: 2000, failed: 980 },
  { name: "15 Sep", volume: 2780, failed: 390 },
  { name: "20 Sep", volume: 1890, failed: 480 },
  { name: "25 Sep", volume: 2390, failed: 380 },
  { name: "30 Sep", volume: 3490, failed: 430 },
];

export function DashboardCharts() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
            tickFormatter={(value) => `₹${value / 1000}k`}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: "6px", 
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px -2px rgb(0 0 0 / 0.05)",
              fontSize: "12px",
              fontWeight: 500,
              color: "#334155"
            }}
            itemStyle={{ color: "#0f172a", fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="volume"
            stroke="#6366f1"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorVolume)"
            activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff", fill: "#6366f1" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
