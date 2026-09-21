"use client";

import { useTableState } from "@/hooks/use-table-state";
import { useBeneficiaries } from "../hooks/use-beneficiaries";
import { beneficiaryColumns } from "./beneficiary-columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableSearch } from "@/components/ui/data-table/data-table-search";
import { DataTableSkeleton } from "@/components/ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/components/ui/data-table/data-table-empty";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BeneficiariesTable() {
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

  const { data, isLoading, isError, isPlaceholderData, refetch } = useBeneficiaries(queryParams);

  const currentStatusFilter =
    (columnFilters.find((f) => f.id === "status")?.value as string) || "ALL";

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 w-full max-w-lg">
          <DataTableSearch
            placeholder="Search beneficiary, merchant, MID..."
            value={globalFilter}
            onChange={setGlobalFilter}
            className="max-w-full"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={currentStatusFilter}
            onValueChange={(val) => {
              setColumnFilters([{ id: "status", value: val }]);
            }}
          >
            <SelectTrigger className="w-[140px] h-9 text-[13px] bg-white dark:bg-slate-900">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>

        </div>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <DataTableSkeleton columnCount={8} rowCount={pagination.pageSize} />
        ) : isError ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-6 text-center text-red-600">
            <p className="font-medium text-[14px]">Unable to load beneficiaries.</p>
            <Button variant="outline" className="mt-3 text-[13px]" onClick={() => refetch()}>Retry</Button>
          </div>
        ) : data?.content.length === 0 ? (
          <DataTableEmpty
            isSearchState={Boolean(globalFilter || currentStatusFilter !== "ALL")}
            onClearFilters={() => {
              setGlobalFilter("");
              setColumnFilters([]);
            }}
          />
        ) : (
          <div className={`transition-opacity duration-200 ${isPlaceholderData ? "opacity-50" : "opacity-100"}`}>
            <DataTable
              columns={beneficiaryColumns}
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
