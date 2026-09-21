import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ShieldAlert,
  CreditCard,
  Landmark,
  CheckCircle2,
} from "lucide-react";

export default function NotificationsPage() {
  const alerts = [
    {
      icon: ShieldAlert,
      title: "High-value payout held for review",
      desc: "Payout PO-10045 (₹10,50,000) for M-1002 requires manual approval.",
      time: "10 mins ago",
      color: "text-amber-500",
      bg: "bg-amber-100 dark:bg-amber-500/10",
    },
    {
      icon: CreditCard,
      title: "Wallet balance critically low",
      desc: "Merchant M-1005 available balance is below ₹5,000.",
      time: "1 hour ago",
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-500/10",
    },
    {
      icon: Landmark,
      title: "Settlement cycle completed",
      desc: "Batch STL-2001 has been processed successfully.",
      time: "3 hours ago",
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-500/10",
    },
    {
      icon: Bell,
      title: "New API Key generated",
      desc: "Admin User (admin@paynexus.com) generated a new production key.",
      time: "Yesterday",
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-500/10",
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-20 max-w-[1200px] mx-auto w-full p-4 md:p-6">
      <PageHeader
        title="Notifications & Alerts"
        description="System-wide operational alerts and notifications."
        actions={
          <Button
            variant="outline"
            className="h-9 px-4 rounded-xl border-border/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] hover:bg-slate-50 border-border bg-background dark:hover:bg-card"
          >
            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
            Mark all as read
          </Button>
        }
      />

      <div className="flex flex-col rounded-xl border border-border/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] border-border bg-background overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 border-border bg-slate-50/50 bg-background/50">
          <h3 className="text-[15px] font-semibold text-foreground dark:text-white">
            Recent Alerts
          </h3>
        </div>
        <div className="flex flex-col">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 sm:p-6 transition-colors hover:bg-slate-50/80 dark:hover:bg-card/30 ${i !== alerts.length - 1 ? "border-b border-slate-100 border-border" : ""}`}
            >
              <div
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${alert.bg} ${alert.color}`}
              >
                <alert.icon className="h-[18px] w-[18px]" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
                  <span className="text-[14px] font-semibold text-foreground dark:text-white">
                    {alert.title}
                  </span>
                  <span className="text-[12px] font-medium text-muted-foreground whitespace-nowrap">
                    {alert.time}
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-slate-600 text-muted-foreground leading-relaxed">
                  {alert.desc}
                </p>
                <div className="mt-3.5 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-[12px] font-medium rounded-lg border-border/60 shadow-none border-border"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
