"use client";

import { useTableState } from "@/hooks/use-table-state";
import { useMerchantsQuery } from "../hooks/use-merchants-query";
import { merchantColumns } from "./merchant-columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableSearch } from "@/components/ui/data-table/data-table-search";
import { DataTableSkeleton } from "@/components/ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/components/ui/data-table/data-table-empty";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MerchantsTable() {
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

  const { data, isLoading, isError, isPlaceholderData } = useMerchantsQuery(queryParams);

  const currentStatusFilter =
    (columnFilters.find((f) => f.id === "status")?.value as string) || "ALL";

  const currentKycFilter =
    (columnFilters.find((f) => f.id === "kycStatus")?.value as string) || "ALL";

  const setFilter = (id: string, value: string | null) => {
    setColumnFilters((prev) => {
      const existing = prev.filter((f) => f.id !== id);
      if (!value || value === "ALL") return existing;
      return [...existing, { id, value }];
    });
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 w-full max-w-lg">
          <DataTableSearch
            placeholder="Search merchant, MID, email..."
            value={globalFilter}
            onChange={setGlobalFilter}
            className="max-w-full"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={currentKycFilter}
            onValueChange={(val) => setFilter("kycStatus", val)}
          >
            <SelectTrigger className="w-[140px] h-9 text-[13px] bg-white dark:bg-slate-900">
              <SelectValue placeholder="KYC Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All KYC</SelectItem>
              <SelectItem value="APPROVED">Verified</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={currentStatusFilter}
            onValueChange={(val) => setFilter("status", val)}
          >
            <SelectTrigger className="w-[140px] h-9 text-[13px] bg-white dark:bg-slate-900">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative min-h-[400px] flex-1">
        {isLoading ? (
          <div className="absolute inset-0">
            <DataTableSkeleton columnCount={8} rowCount={pagination.pageSize} />
          </div>
        ) : isError ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-md border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-900/50 dark:bg-red-900/10 dark:text-red-400">
            <div>
              <p className="font-medium">Failed to load merchants.</p>
              <p className="text-sm mt-1 opacity-80">Please try refreshing the page.</p>
            </div>
          </div>
        ) : data?.content.length === 0 ? (
          <div className="absolute inset-0">
            <DataTableEmpty
              isSearchState={Boolean(globalFilter || currentStatusFilter !== "ALL" || currentKycFilter !== "ALL")}
              onClearFilters={() => {
                setGlobalFilter("");
                setColumnFilters([]);
              }}
            />
          </div>
        ) : (
          <div className={`transition-opacity duration-200 ${isPlaceholderData ? "opacity-50" : "opacity-100"}`}>
            <DataTable
              columns={merchantColumns}
              data={data?.content ?? []}
              pageCount={data?.totalPages ?? 0}
              pagination={pagination}
              onPaginationChange={setPagination}
              sorting={sorting}
              onSortingChange={setSorting}
            />
          </div>
        )}
      </div>
    </div>
  );
}
