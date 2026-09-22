import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { MerchantStatus } from "@/features/merchant/types/merchant.types";

const statusVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        ACTIVE: "bg-success/100/15 text-emerald-700 dark:text-emerald-400",
        INACTIVE: "bg-background0/15 text-foreground text-muted-foreground",
        PENDING: "bg-warning/100/15 text-amber-700 dark:text-amber-400",
        SUSPENDED: "bg-danger/100/15 text-danger dark:text-red-400",
        BLOCKED: "bg-background0/15 text-foreground text-muted-foreground",
        REJECTED: "bg-danger/100/15 text-danger dark:text-red-400",
        VERIFIED: "bg-info/100/15 text-blue-700 dark:text-blue-400",
        SUCCESS: "bg-success/100/15 text-emerald-700 dark:text-emerald-400",
        FAILED: "bg-danger/100/15 text-danger dark:text-red-400",
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
