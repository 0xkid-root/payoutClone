"use client";

import { useState } from "react";
import { useWhitelistRequests } from "../../queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RejectedTab() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDebouncedSearch(e.target.value);
    setPage(0);
  };

  const { data, isLoading } = useWhitelistRequests(
    { page, size: 10 },
    { status: "Rejected", search: debouncedSearch }
  );

  const maskAccountNumber = (acc: string) => {
    if (acc.length < 8) return acc;
    return `XXXX XXXX ${acc.slice(-4)}`;
  };

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-b border-slate-100 dark:border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search merchant, account holder, account number..."
            className="pl-9 bg-slate-50/50 dark:bg-slate-900/50"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-transparent">
            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Merchant</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Account</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Requested On</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Rejected On</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 max-w-[200px]">Reason</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i} className="border-slate-100 dark:border-slate-800/50">
                  <TableCell colSpan={7} className="p-5">
                    <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                  {debouncedSearch ? "No requests match your search" : "No rejected wallet whitelist requests found"}
                </TableCell>
              </TableRow>
            ) : data?.data.map((req) => (
              <TableRow key={req.id} className="border-slate-100/60 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <TableCell className="p-4 px-5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900 dark:text-white text-[13px]">{req.merchantName}</span>
                    <span className="text-[12px] text-slate-500">{req.merchantId}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4 px-5">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-white text-[13px]">{req.bankName}</span>
                    <span className="font-mono text-[12px] text-slate-500">{maskAccountNumber(req.accountNumber)}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4 px-5 text-[13px] text-slate-500">
                  {new Date(req.requestedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell className="p-4 px-5 text-[13px] text-slate-500">
                  {req.rejectedAt ? new Date(req.rejectedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "-"}
                </TableCell>
                <TableCell className="p-4 px-5 max-w-[200px]">
                  <p className="text-[13px] text-slate-600 dark:text-slate-400 truncate" title={req.rejectionReason}>
                    {req.rejectionReason || "-"}
                  </p>
                </TableCell>
                <TableCell className="p-4 px-5">
                  <span className="inline-flex items-center rounded-full border border-red-200/50 bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-600 dark:bg-red-500/10">
                    Rejected
                  </span>
                </TableCell>
                <TableCell className="p-4 px-5 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-[13px] font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    onClick={() => router.push(`/wallet-whitelist/${req.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
        <div className="text-slate-500">
          Showing <span className="font-medium text-slate-900 dark:text-white">
            {data?.data.length ? page * 10 + 1 : 0}
          </span> to <span className="font-medium text-slate-900 dark:text-white">
            {data?.data.length ? page * 10 + data.data.length : 0}
          </span> of <span className="font-medium text-slate-900 dark:text-white">
            {data?.pagination.totalElements || 0}
          </span> results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={page === 0 || isLoading}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-slate-100 dark:bg-slate-800 pointer-events-none">
            {page + 1}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={!data || page >= data.pagination.totalPages - 1 || isLoading}
            onClick={() => setPage(p => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

    </div>
  );
}
