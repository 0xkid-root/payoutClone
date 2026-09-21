import { Users, CheckCircle2, XCircle } from "lucide-react";
import { StatCard } from "@/components/common/stat-card";

export function BeneficiariesKpiGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Beneficiaries"
        value="12,547"
        icon={Users}
        iconColorClass="text-primary"
      />
      <StatCard
        title="Active Beneficiaries"
        value="11,820"
        icon={CheckCircle2}
        iconColorClass="text-emerald-500"
      />
      <StatCard
        title="Inactive Beneficiaries"
        value="727"
        icon={XCircle}
        iconColorClass="text-slate-500"
      />
    </div>
  );
}
