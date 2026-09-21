import { Badge } from "@/components/ui/badge";
import { PayoutStatus } from "../types/payout.types";
import { cn } from "@/lib/utils";

interface PayoutStatusBadgeProps {
  status: PayoutStatus;
  className?: string;
}

export function PayoutStatusBadge({ status, className }: PayoutStatusBadgeProps) {
  const getStatusStyles = (status: PayoutStatus) => {
    switch (status) {
      case "Success":
        return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25";
      case "Failed":
      case "Cancelled":
        return "bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/25";
      case "Processing":
      case "Approved":
        return "bg-blue-500/15 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25";
      case "Requested":
      case "Retry Queued":
        return "bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25";
      default:
        return "bg-slate-500/15 text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md px-2 py-0.5 font-medium border-0 transition-colors",
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </Badge>
  );
}
