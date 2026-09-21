"use client";

import { PayoutTable } from "./payout-table";
import { PayoutFilters } from "./payout-filters";
import { usePayoutsQuery } from "../hooks/use-payouts";
import { useTableState } from "@/hooks/use-table-state";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { PayoutStatus, PayoutMethod } from "../types/payout.types";

export function SinglePayoutsPage() {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    queryParams,
  } = useTableState({ initialPageSize: 10 });

  const statusFilter = (columnFilters.find((f) => f.id === "status")?.value as PayoutStatus | "All") || "All";
  const methodFilter = (columnFilters.find((f) => f.id === "method")?.value as PayoutMethod | "All") || "All";

  const { data, isLoading, refetch, isFetching } = usePayoutsQuery({
    ...queryParams,
    status: statusFilter,
    method: methodFilter,
  });

  const handleStatusChange = (val: string) => {
    setColumnFilters((prev) => {
      const existing = prev.filter((f) => f.id !== "status");
      if (val === "All") return existing;
      return [...existing, { id: "status", value: val }];
    });
  };

  const handleMethodChange = (val: string) => {
    setColumnFilters((prev) => {
      const existing = prev.filter((f) => f.id !== "method");
      if (val === "All") return existing;
      return [...existing, { id: "method", value: val }];
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Single Payouts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor and review all individual merchant payout transactions.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] p-6">
        <PayoutFilters
          searchQuery={globalFilter}
          onSearchChange={setGlobalFilter}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
          methodFilter={methodFilter}
          onMethodChange={handleMethodChange}
        />
        <div>
          <PayoutTable
            data={data?.data || []}
            isLoading={isLoading}
            pageCount={data?.pagination.totalPages || -1}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
          />
        </div>
      </div>
    </div>
  );
}
