import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { MerchantStatus } from "@/features/merchant/types/merchant.types";

const statusVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        ACTIVE: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
        INACTIVE: "bg-slate-500/15 text-slate-700 dark:text-slate-400",
        PENDING: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
        SUSPENDED: "bg-red-500/15 text-red-700 dark:text-red-400",
        BLOCKED: "bg-slate-500/15 text-slate-700 dark:text-slate-400",
        REJECTED: "bg-red-500/15 text-red-700 dark:text-red-400",
        VERIFIED: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
        SUCCESS: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
        FAILED: "bg-red-500/15 text-red-700 dark:text-red-400",
      },
    },
    defaultVariants: {
      status: "PENDING",
    },
  }
);

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: string;
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  return (
    <div
      className={cn(statusVariants({ status: status as any }), className)}
      {...props}
    >
      {status}
    </div>
  );
}
