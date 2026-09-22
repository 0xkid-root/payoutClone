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
 return "bg-success/100/15 text-success dark:text-emerald-400 hover:bg-success/100/25";
 case "Failed":
 case "Cancelled":
 return "bg-danger/100/15 text-danger dark:text-red-400 hover:bg-danger/100/25";
 case "Processing":
 case "Approved":
 return "bg-info/100/15 text-info dark:text-blue-400 hover:bg-info/100/25";
 case "Requested":
 case "Retry Queued":
 return "bg-warning/100/15 text-warning dark:text-amber-400 hover:bg-warning/100/25";
 default:
 return "bg-background0/15 text-muted-foreground";
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
