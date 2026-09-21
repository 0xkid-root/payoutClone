"use client";

import { BeneficiariesHeader } from "./beneficiaries-header";
import { BeneficiariesKpiGrid } from "./beneficiaries-kpi-grid";
import { BeneficiariesTable } from "./beneficiaries-table";

export function BeneficiariesPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* 1. Header Section */}
      <BeneficiariesHeader />

      {/* 2. KPI Cards */}
      <BeneficiariesKpiGrid />

      {/* 3. Main Data Table */}
      <BeneficiariesTable />
    </div>
  );
}
