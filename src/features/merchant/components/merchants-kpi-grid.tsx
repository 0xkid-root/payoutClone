import { Store, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/common/stat-card";

export function MerchantsKpiGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Merchants"
        value="2,845"
        icon={Store}
        iconColorClass="text-primary"
      />
      <StatCard
        title="Active Merchants"
        value="2,512"
        icon={CheckCircle2}
        iconColorClass="text-success"
      />
      <StatCard
        title="Pending KYC"
        value="184"
        icon={Clock}
        iconColorClass="text-warning"
      />
      <StatCard
        title="Suspended Merchants"
        value="149"
        icon={AlertTriangle}
        iconColorClass="text-danger"
      />
    </div>
  );
}
