"use client";

import { MerchantsHeader } from "./merchants-header";
import { MerchantsKpiGrid } from "./merchants-kpi-grid";
import { MerchantsTable } from "./merchants-table";

export function MerchantPage() {
  return (
    <div className="flex flex-col gap-8">
      <MerchantsHeader />
      <MerchantsKpiGrid />
      <MerchantsTable />
    </div>
  );
}
