import { Wallet, CheckCircle2, Clock, AlertCircle, XCircle, Store } from "lucide-react";
import { StatCard } from "@/components/common/stat-card";

export function DashboardKpiGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Row 1 */}
      <StatCard
        title="Total Payout Volume"
        value="₹8,45,78,650.00"
        icon={Wallet}
        iconColorClass="text-primary"
        trendValue="18.7% vs last 7 days"
        trendUp={true}
      />
      <StatCard
        title="Successful Payouts"
        value="₹7,12,45,650.00"
        icon={CheckCircle2}
        iconColorClass="text-emerald-500"
        trendValue="21.3% vs last 7 days"
        trendUp={true}
      />
      <StatCard
        title="Pending Payouts"
        value="₹98,45,200.00"
        icon={Clock}
        iconColorClass="text-amber-500"
        trendValue="6.2% vs last 7 days"
        trendUp={true}
      />

      {/* Row 2 */}
      <StatCard
        title="Processing Payouts"
        value="₹23,16,450.00"
        icon={AlertCircle}
        iconColorClass="text-amber-500"
        trendValue="3.6% vs last 7 days"
        trendUp={true}
      />
      <StatCard
        title="Failed Payouts"
        value="₹11,71,350.00"
        icon={XCircle}
        iconColorClass="text-red-500"
        trendValue="9.8% vs last 7 days"
        trendUp={false}
      />
      <StatCard
        title="Total Merchants"
        value="28"
        icon={Store}
        iconColorClass="text-slate-500"
        actionLabel="Active Merchants 26"
      />
    </div>
  );
}
