"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PayoutStatus, PayoutMethod } from "../types/payout.types";
import { DataTableSearch } from "@/components/ui/data-table/data-table-search";

interface PayoutFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: PayoutStatus | "All";
  onStatusChange: (status: string) => void;
  methodFilter: PayoutMethod | "All";
  onMethodChange: (method: string) => void;
}

export function PayoutFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  methodFilter,
  onMethodChange,
}: PayoutFiltersProps) {
  const hasActiveFilters = statusFilter !== "All" || methodFilter !== "All" || searchQuery !== "";

  const handleClearFilters = () => {
    onSearchChange("");
    onStatusChange("All");
    onMethodChange("All");
  };

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 w-full max-w-lg">
        <DataTableSearch
          placeholder="Search payout, merchant, beneficiary..."
          value={searchQuery}
          onChange={onSearchChange}
          className="max-w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <Select value={statusFilter} onValueChange={(val) => onStatusChange(val || "All")}>
          <SelectTrigger className="w-[140px] h-9 text-[13px] bg-white dark:bg-slate-900">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Requested">Requested</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Success">Success</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
            <SelectItem value="Retry Queued">Retry Queued</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={methodFilter} onValueChange={(val) => onMethodChange(val || "All")}>
          <SelectTrigger className="w-[140px] h-9 text-[13px] bg-white dark:bg-slate-900">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Methods</SelectItem>
            <SelectItem value="IMPS">IMPS</SelectItem>
            <SelectItem value="NEFT">NEFT</SelectItem>
            <SelectItem value="RTGS">RTGS</SelectItem>
            <SelectItem value="UPI">UPI</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 h-9 px-2 text-[13px]"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
