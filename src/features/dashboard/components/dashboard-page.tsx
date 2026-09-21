"use client";

import { DashboardHeader } from "./dashboard-header";
import { DashboardKpiGrid } from "./dashboard-kpi-grid";
import { PayoutVolumeChart } from "./payout-volume-chart";
import { TopMerchants } from "./top-merchants";
import { PayoutStatusDistribution } from "./payout-status-distribution";
import { MerchantOverviewTable } from "./merchant-overview-table";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* 1. Header Section */}
      <DashboardHeader />

      {/* 2. KPI Cards */}
      <DashboardKpiGrid />

      {/* 3. Middle Section: Charts & Top Merchants */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left Chart */}
        <div className="lg:col-span-2">
          <PayoutVolumeChart />
        </div>
        
        {/* Center List */}
        <div className="lg:col-span-1">
          <TopMerchants />
        </div>
      </div>

      {/* 4. Bottom Section: Data Table & Donut */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Table (2/3 width) */}
        <div className="lg:col-span-2">
          <MerchantOverviewTable />
        </div>
        
        {/* Donut Chart (1/3 width) */}
        <div className="lg:col-span-1">
          <PayoutStatusDistribution />
        </div>
      </div>
    </div>
  );
}
