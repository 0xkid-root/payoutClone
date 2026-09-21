import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColorClass?: string;
  trendValue?: string;
  trendLabel?: string;
  trendUp?: boolean;
  alertText?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColorClass = "text-slate-400",
  trendValue,
  trendLabel,
  trendUp,
  alertText,
  actionLabel,
  onActionClick,
}: StatCardProps) {
  return (
    <div className={cn(
      "flex flex-col justify-between rounded-xl border bg-white p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] transition-colors hover:bg-slate-50/30 dark:bg-slate-900",
      alertText ? "border-amber-200/60 dark:border-amber-900/30" : "border-slate-200/60 dark:border-slate-800"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-[14px] font-medium text-slate-500">{title}</span>
          <span className="mt-1.5 text-[28px] font-bold tracking-tight text-slate-900 tabular-nums dark:text-white">
            {value}
          </span>
        </div>
        <div className={cn("flex h-8 w-8 items-center justify-end", iconColorClass)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="mt-4 flex flex-col gap-1.5">
        {(trendValue || alertText) && (
          <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
            {trendValue && (
              <span
                className={cn(
                  "flex items-center font-medium",
                  trendUp !== undefined
                    ? trendUp
                      ? "text-emerald-600"
                      : "text-slate-600"
                    : "text-slate-700 dark:text-slate-300"
                )}
              >
                {trendUp ? "↑ " : ""}{trendValue}
              </span>
            )}
            {alertText && (
              <span className="font-medium text-amber-600">{alertText}</span>
            )}
            {trendLabel && <span className="truncate">{trendLabel}</span>}
          </div>
        )}
        
        {actionLabel && (
          <button
            onClick={onActionClick}
            className="mt-1 flex w-fit items-center text-[13px] font-medium text-primary hover:text-primary/80 hover:underline underline-offset-2 transition-all"
          >
            {actionLabel} <span className="ml-1 text-lg leading-none">→</span>
          </button>
        )}
      </div>
    </div>
  );
}
