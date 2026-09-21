"use client";

import { useVansQuery } from "../hooks/use-vans";
import { VanAccount, VanStatus } from "../types/van.types";
import { getVanColumns } from "./van-columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useTableState } from "@/hooks/use-table-state";

interface VanTableProps {
  onViewDetails: (van: VanAccount) => void;
}

export function VanTable({ onViewDetails }: VanTableProps) {
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

  const currentStatus = (columnFilters.find((f) => f.id === "status")?.value as VanStatus | "All") || "All";
  const currentProvider = (columnFilters.find((f) => f.id === "provider")?.value as string | "All") || "All";

  const { data, isLoading } = useVansQuery({
    page: queryParams.page,
    size: queryParams.size,
    search: globalFilter,
    status: currentStatus,
    provider: currentProvider,
  });

  const columns = getVanColumns(onViewDetails);

  const setFilter = (id: string, value: string | null) => {
    setColumnFilters((prev) => {
      const existing = prev.filter((f) => f.id !== id);
      if (!value || value === "All") return existing;
      return [...existing, { id, value }];
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white bg-background rounded-xl border border-border/60 border-border shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] p-6 h-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search VAN, merchant, merchant ID..." 
            className="pl-9 bg-slate-50/50 dark:bg-slate-950/50"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <Select value={currentStatus} onValueChange={(val) => setFilter("status", val)}>
            <SelectTrigger className="w-[140px] bg-slate-50/50 dark:bg-slate-950/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currentProvider} onValueChange={(val) => setFilter("provider", val)}>
            <SelectTrigger className="w-[160px] bg-slate-50/50 dark:bg-slate-950/50">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Providers</SelectItem>
              <SelectItem value="PayNexus Bank">PayNexus Bank</SelectItem>
              <SelectItem value="Global Bank">Global Bank</SelectItem>
              <SelectItem value="SecureTrust Bank">SecureTrust Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative min-h-[400px] flex-1">
        <DataTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
          pageCount={data?.pagination.totalPages || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </div>
    </div>
  );
}
