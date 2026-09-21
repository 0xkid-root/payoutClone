"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Info, ChevronDown } from "lucide-react";

const data = [
  { name: "01 May", total: 22000, successful: 15000, pending: 5000, processing: 8000, failed: 2000 },
  { name: "02 May", total: 28000, successful: 19000, pending: 7000, processing: 10000, failed: 2000 },
  { name: "03 May", total: 25000, successful: 16000, pending: 6000, processing: 8500, failed: 1800 },
  { name: "04 May", total: 19000, successful: 12000, pending: 4500, processing: 7000, failed: 1500 },
  { name: "05 May", total: 18000, successful: 10000, pending: 4000, processing: 6500, failed: 1800 },
  { name: "06 May", total: 22000, successful: 13500, pending: 5000, processing: 8000, failed: 2000 },
  { name: "07 May", total: 35000, successful: 25000, pending: 8000, processing: 15000, failed: 2000 },
];

export function PayoutVolumeChart() {
  return (
    <div className="flex h-full min-h-[350px] w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Payout Volume Overview (Last 7 Days)</h3>
          <Info className="h-4 w-4 text-slate-400" />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            Amount (₹)
            <ChevronDown className="h-3 w-3" />
          </button>
          <div className="flex items-center rounded-md border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-900">
            <button className="flex items-center gap-1 rounded px-2.5 py-1 text-[13px] font-semibold text-slate-900 dark:text-white">
              7D
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => value === 0 ? "0" : `${value / 1000}L`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: "8px", 
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px -4px rgb(0 0 0 / 0.1)",
                fontSize: "13px",
                fontWeight: 500,
                color: "#334155"
              }}
              itemStyle={{ fontWeight: 600 }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", fontWeight: 500, paddingTop: "20px" }}
            />
            <Area
              type="linear"
              dataKey="total"
              name="Total"
              stroke="#2563eb"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTotal)"
              dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="linear"
              dataKey="successful"
              name="Successful"
              stroke="#10b981"
              strokeWidth={2}
              fill="none"
              dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="linear"
              dataKey="pending"
              name="Pending"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="none"
              dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="linear"
              dataKey="processing"
              name="Processing"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="none"
              dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="linear"
              dataKey="failed"
              name="Failed"
              stroke="#ef4444"
              strokeWidth={2}
              fill="none"
              dot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
