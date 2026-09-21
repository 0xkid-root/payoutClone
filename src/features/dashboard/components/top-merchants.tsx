export function TopMerchants() {
  const topMerchants = [
    { name: "Acme Technologies", mid: "MRC0001", volume: "₹2,45,78,650.00", rate: 98.62 },
    { name: "Global Supplies", mid: "MRC0842", volume: "₹1,84,20,400.00", rate: 96.4 },
    { name: "TechNova Services", mid: "MRC0192", volume: "₹98,45,200.00", rate: 94.2 },
    { name: "Bright Solutions", mid: "MRC0551", volume: "₹65,20,100.00", rate: 99.1 },
    { name: "Apex Industries", mid: "MRC0992", volume: "₹42,10,050.00", rate: 92.8 },
  ];

  return (
    <div className="flex h-full min-h-[350px] w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Top Merchants</h3>
        <button className="text-[13px] font-medium text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4">
        {topMerchants.map((m, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[13px] font-bold text-primary">
              {m.name.charAt(0)}
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="truncate text-[14px] font-semibold text-slate-900 dark:text-white">{m.name}</span>
                <span className="text-[13px] font-semibold tabular-nums text-slate-900 dark:text-white">{m.volume}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[12px] text-slate-500">MID: {m.mid}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div 
                      className={`h-full rounded-full ${m.rate >= 95 ? "bg-emerald-500" : "bg-amber-500"}`}
                      style={{ width: `${m.rate}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-medium tabular-nums text-slate-500">{m.rate}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
