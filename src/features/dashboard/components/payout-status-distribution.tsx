"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Successful", value: 9385, percent: 74.8, color: "#10b981" },
  { name: "Processing", value: 1356, percent: 10.8, color: "#f97316" },
  { name: "Pending", value: 1024, percent: 8.2, color: "#f59e0b" },
  { name: "Failed", value: 782, percent: 6.2, color: "#ef4444" },
];

export function PayoutStatusDistribution() {
  const total = 12547;

  return (
    <div className="flex h-full min-h-[350px] w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-2">
        <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Payout Status Distribution</h3>
      </div>
      
      <div className="relative flex-1">
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {total.toLocaleString()}
          </span>
          <span className="text-[12px] font-medium text-slate-500">Total Payouts</span>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              stroke="none"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
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
              formatter={(value: any) => [`${Number(value).toLocaleString()} payouts`, undefined]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-[13px]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold tabular-nums text-slate-900 dark:text-white">{item.value.toLocaleString()}</span>
              <span className="w-10 text-right font-medium tabular-nums text-slate-500">({item.percent}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
