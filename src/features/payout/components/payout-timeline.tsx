import { Check, Clock, X, AlertTriangle, RefreshCw, XCircle } from "lucide-react";
import { PayoutRecord, PayoutStatus } from "../types/payout.types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface PayoutTimelineProps {
  payout: PayoutRecord;
}

export function PayoutTimeline({ payout }: PayoutTimelineProps) {
  const steps = [];

  // Step 1: Requested
  steps.push({
    title: "Requested",
    time: payout.requestedAt ? format(new Date(payout.requestedAt), "dd MMM yyyy, HH:mm:ss") : undefined,
    isCompleted: true,
    isCurrent: payout.status === "Requested",
    isError: false,
    icon: Check,
  });

  // Flow branching based on current status
  if (payout.status === "Cancelled") {
    steps.push({
      title: "Cancelled",
      time: payout.processedAt ? format(new Date(payout.processedAt), "dd MMM yyyy, HH:mm:ss") : undefined,
      isCompleted: true,
      isCurrent: true,
      isError: true,
      icon: XCircle,
    });
  } else {
    // Step 2: Processing
    const hasProcessed = !!payout.processedAt || payout.status === "Success" || payout.status === "Failed" || payout.status === "Retry Queued";
    steps.push({
      title: "Processing",
      isCompleted: hasProcessed,
      isCurrent: payout.status === "Processing" || payout.status === "Approved",
      isError: false,
      icon: hasProcessed ? Check : Clock,
    });

    // Step 3: Terminal States (Success, Failed, Retry Queued)
    if (payout.status === "Success") {
      steps.push({
        title: "Completed",
        time: payout.processedAt ? format(new Date(payout.processedAt), "dd MMM yyyy, HH:mm:ss") : undefined,
        isCompleted: true,
        isCurrent: true,
        isError: false,
        icon: Check,
      });
    } else if (payout.status === "Failed") {
      steps.push({
        title: "Failed",
        time: payout.processedAt ? format(new Date(payout.processedAt), "dd MMM yyyy, HH:mm:ss") : undefined,
        isCompleted: true,
        isCurrent: true,
        isError: true,
        icon: X,
      });
    } else if (payout.status === "Retry Queued") {
      steps.push({
        title: "Failed (Retrying)",
        time: payout.lastAttempt ? format(new Date(payout.lastAttempt), "dd MMM yyyy, HH:mm:ss") : undefined,
        isCompleted: true,
        isCurrent: false,
        isError: true,
        icon: AlertTriangle,
      });
      steps.push({
        title: "Retry Queued",
        time: payout.nextRetry ? `Next try: ${format(new Date(payout.nextRetry), "HH:mm")}` : undefined,
        isCompleted: false,
        isCurrent: true,
        isError: false,
        icon: RefreshCw,
      });
    }
  }

  return (
    <div className="flex flex-col space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const Icon = step.icon;

        return (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-white shadow-sm ring-4 ring-white dark:ring-slate-950",
                  step.isCompleted && !step.isError && "border-emerald-500 bg-emerald-500",
                  step.isCompleted && step.isError && "border-red-500 bg-red-500",
                  !step.isCompleted && step.isCurrent && "border-blue-500 bg-blue-500",
                  !step.isCompleted && !step.isCurrent && "border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    !step.isCompleted && !step.isCurrent && "text-slate-400"
                  )}
                />
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "h-full w-[2px] min-h-[32px] my-2",
                    step.isCompleted ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
                  )}
                />
              )}
            </div>
            <div className="flex flex-col pt-1 pb-6">
              <p
                className={cn(
                  "text-sm font-semibold",
                  step.isCurrent ? "text-slate-900 dark:text-slate-50" : "text-slate-600 dark:text-slate-400"
                )}
              >
                {step.title}
              </p>
              {step.time && (
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  {step.time}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
