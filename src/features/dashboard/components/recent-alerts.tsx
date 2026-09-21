import { AlertCircle, Clock, UserPlus } from "lucide-react";

export function RecentAlerts() {
  const alerts = [
    {
      title: "High failure rate for merchant TechNova Services",
      time: "10 mins ago",
      icon: AlertCircle,
      iconColor: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-500/10",
    },
    {
      title: "Large pending amount for Global Supplies Co.",
      time: "45 mins ago",
      icon: Clock,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-500/10",
    },
    {
      title: "New merchant Bright Solutions has been onboarded",
      time: "2 hours ago",
      icon: UserPlus,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      title: "Settlement delayed for Apex Industries",
      time: "5 hours ago",
      icon: Clock,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-500/10",
    },
  ];

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100/50 p-6 dark:border-slate-800/50">
        <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Recent Alerts</h3>
        <button className="text-[13px] font-medium text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="flex flex-1 flex-col divide-y divide-slate-100 dark:divide-slate-800/50">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div key={i} className="flex items-start gap-3.5 p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${alert.bgColor}`}>
                <Icon className={`h-4 w-4 ${alert.iconColor}`} />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <span className="text-[13.5px] font-medium leading-snug text-slate-900 dark:text-white">
                  {alert.title}
                </span>
                <span className="mt-1 text-[12px] font-medium text-slate-500">
                  {alert.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
