"use client";

import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { PayoutRecord } from "../types/payout.types";
import { PayoutStatusBadge } from "./payout-status-badge";
import { format } from "date-fns";
import { formatINR } from "@/lib/utils";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, RefreshCw } from "lucide-react";
import { useRetryPayoutMutation } from "../hooks/use-payouts";
import { toast } from "sonner";
import { DataTableSkeleton } from "@/components/ui/data-table/data-table-skeleton";
import { DataTableEmpty } from "@/components/ui/data-table/data-table-empty";

interface PayoutTableProps {
  data: PayoutRecord[];
  isLoading: boolean;
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState | ((old: PaginationState) => PaginationState)) => void;
  sorting: any;
  onSortingChange: any;
}

export function PayoutTable({
  data,
  isLoading,
  pageCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
}: PayoutTableProps) {
  const router = useRouter();
  const retryMutation = useRetryPayoutMutation();

  const handleRetry = (id: string) => {
    retryMutation.mutate(id, {
      onSuccess: () => {
        toast.success(`Payout ${id} queued for retry`);
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to retry payout");
      }
    });
  };

  const columns = useMemo<ColumnDef<PayoutRecord>[]>(() => [
    {
      accessorKey: "id",
      header: "Payout ID",
      cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: "merchantName",
      header: "Merchant",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.merchantName}</span>
          <span className="text-xs text-slate-500">{row.original.merchantId}</span>
        </div>
      ),
    },
    {
      accessorKey: "beneficiaryName",
      header: "Beneficiary",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.beneficiaryName}</span>
          <span className="text-xs text-slate-500">{row.original.beneficiaryId || "Direct"}</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {formatINR(row.original.amount)}
        </div>
      ),
    },
    {
      accessorKey: "fee",
      header: () => <div className="text-right">Fee</div>,
      cell: ({ row }) => (
        <div className="text-right text-slate-500">
          {formatINR(row.original.fee)}
        </div>
      ),
    },
    {
      accessorKey: "netAmount",
      header: () => <div className="text-right">Net Amount</div>,
      cell: ({ row }) => (
        <div className="text-right font-semibold text-emerald-600 dark:text-emerald-400">
          {formatINR(row.original.netAmount)}
        </div>
      ),
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => <span className="text-sm">{row.original.method}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <PayoutStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "requestedAt",
      header: "Requested On",
      cell: ({ row }) => (
        <span className="text-sm text-slate-500">
          {format(new Date(row.original.requestedAt), "dd MMM yyyy")}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payout = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-300 h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/payout-management/${payout.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {(payout.status === "Failed" || payout.status === "Retry Queued") && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleRetry(payout.id)}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Now
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], [router, retryMutation]);

  return (
    <div className="relative min-h-[400px] flex-1">
      {isLoading ? (
        <div className="absolute inset-0">
          <DataTableSkeleton columnCount={8} rowCount={pagination.pageSize} />
        </div>
      ) : data?.length === 0 ? (
        <div className="absolute inset-0">
          <DataTableEmpty
            isSearchState={true}
            onClearFilters={() => {
              // Filters handled by parent
            }}
          />
        </div>
      ) : (
        <div className="transition-opacity duration-200 opacity-100">
          <DataTable
            columns={columns}
            data={data}
            pagination={pagination}
            pageCount={pageCount}
            onPaginationChange={onPaginationChange}
            sorting={sorting}
            onSortingChange={onSortingChange}
          />
        </div>
      )}
    </div>
  );
}
