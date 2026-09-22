"use client";

import { useTableState } from "@/hooks/use-table-state";
import { useDashboardMerchants } from "../hooks/use-dashboard-merchants";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableSearch } from "@/components/ui/data-table/data-table-search";
import { DataTableSkeleton } from "@/components/ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/components/ui/data-table/data-table-empty";
import { ColumnDef } from "@tanstack/react-table";
import { DashboardMerchant } from "../dashboard.mock";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StatusBadge = ({ status }: { status: DashboardMerchant["status"] }) => {
  const styles = {
    ACTIVE: "bg-success/10 text-success border-success/30",
    PENDING: "bg-warning/10 text-warning border-warning/30",
    SUSPENDED: "bg-danger/10 text-danger border-danger/30",
    BLOCKED: "bg-background text-muted-foreground border-border/50",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
};

export const dashboardMerchantColumns: ColumnDef<DashboardMerchant>[] = [
  {
    accessorKey: "merchantName",
    header: "Merchant",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[12px] font-bold text-primary">
          {row.original.merchantName.charAt(0)}
        </div>
        <span className="font-semibold text-foreground dark:text-white whitespace-nowrap">
          {row.original.merchantName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "merchantCode",
    header: "MID",
    cell: ({ row }) => (
      <span className="text-[13px] font-medium text-muted-foreground">
        {row.original.merchantCode}
      </span>
    ),
  },
  {
    accessorKey: "totalPayout",
    header: "Total Payout (₹)",
    cell: ({ row }) => (
      <span className="font-semibold tabular-nums text-foreground dark:text-white">
        ₹{row.original.totalPayout.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "successRate",
    header: "Success Rate",
    cell: ({ row }) => {
      const rate = row.original.successRate;
      return (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted bg-card">
            <div 
              className={`h-full rounded-full ${rate >= 95 ? "bg-success/100" : "bg-warning/100"}`}
              style={{ width: `${rate}%` }}
            />
          </div>
          <span className="text-[13px] font-medium tabular-nums text-muted-foreground">{rate}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "pendingAmount",
    header: "Pending (₹)",
    cell: ({ row }) => (
      <span className="tabular-nums text-warning font-medium">
        ₹{row.original.pendingAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </span>
    ),
  },
  {
    accessorKey: "failedAmount",
    header: "Failed (₹)",
    cell: ({ row }) => (
      <span className="tabular-nums text-danger font-medium">
        ₹{row.original.failedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </span>
    ),
  },
  {
    accessorKey: "totalTxns",
    header: "Total Txns",
    cell: ({ row }) => (
      <span className="tabular-nums text-muted-foreground">
        {row.original.totalTxns.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted dark:hover:bg-card">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem>Block merchant</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function MerchantOverviewTable() {
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
  } = useTableState({ initialPageSize: 5 });

  const { data, isLoading, isError, isPlaceholderData } = useDashboardMerchants(queryParams);

  const currentStatusFilter =
    (columnFilters.find((f) => f.id === "status")?.value as string) || "ALL";

  return (
    <div className="flex h-full flex-col rounded-xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] border-border bg-background">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-[16px] font-semibold text-foreground dark:text-white">Merchants Overview (Top 5)</h3>
        <div className="flex items-center gap-3">
          <DataTableSearch
            placeholder="Search Merchant or MID..."
            value={globalFilter}
            onChange={setGlobalFilter}
          />
          <Select
            value={currentStatusFilter}
            onValueChange={(val) => {
              setColumnFilters([{ id: "status", value: val }]);
            }}
          >
            <SelectTrigger className="w-[140px] h-9 text-[13px] bg-white bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="BLOCKED">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <DataTableSkeleton columnCount={9} rowCount={pagination.pageSize} />
        ) : isError ? (
          <div className="rounded-md border border-danger/30 bg-danger/10 p-6 text-center text-danger">
            <p className="font-medium text-[14px]">Unable to load dashboard data.</p>
            <Button variant="outline" className="mt-3 text-[13px]" onClick={() => window.location.reload()}>Retry</Button>
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
              columns={dashboardMerchantColumns}
              data={data?.content?.slice(0, 5) ?? []}
              pageCount={data?.totalPages ?? 0}
              pagination={pagination}
              onPaginationChange={setPagination}
              sorting={sorting}
              onSortingChange={setSorting}
              hidePagination={true}
            />
            <div className="mt-4 flex justify-center border-t border-border pt-4 border-border">
              <Button variant="ghost" className="text-[13px] font-medium text-primary hover:bg-primary/5 hover:text-primary/90">
                View All Merchants
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
