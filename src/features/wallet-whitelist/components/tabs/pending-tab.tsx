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
import { Search, Eye, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export function PendingTab() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  // Simple debounce implementation
  // In a real app, use useDebounce hook
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Setting directly for mockup, normally would delay
    setDebouncedSearch(e.target.value);
    setPage(0); // Reset page on search
  };

  const { data, isLoading } = useWhitelistRequests(
    { page, size: 10 },
    { status: "Pending", search: debouncedSearch }
  );

  const maskAccountNumber = (acc: string) => {
    if (acc.length < 8) return acc;
    return `XXXX XXXX ${acc.slice(-4)}`;
  };

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-b border-slate-100 border-border">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search merchant, account holder, account number..." 
            className="pl-9 bg-slate-50/50 bg-background/50"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-transparent">
            <TableRow className="hover:bg-transparent border-slate-100 border-border">
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Merchant</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Account Holder</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Bank</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Account Number</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">IFSC</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-center">Document</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Requested On</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i} className="border-slate-100 border-border/50">
                  <TableCell colSpan={9} className="p-5">
                    <div className="h-5 w-full bg-muted bg-card rounded animate-pulse"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                  {debouncedSearch ? "No requests match your search" : "No pending wallet whitelist requests found"}
                </TableCell>
              </TableRow>
            ) : data?.data.map((req) => (
              <TableRow key={req.id} className="border-slate-100/60 border-border/60 hover:bg-slate-50/50 dark:hover:bg-card/30 transition-colors">
                <TableCell className="p-4 px-5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground dark:text-white text-[13px]">{req.merchantName}</span>
                    <span className="text-[12px] text-muted-foreground">{req.merchantId}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4 px-5 font-medium text-foreground dark:text-white text-[13px]">
                  {req.accountHolderName}
                </TableCell>
                <TableCell className="p-4 px-5 text-[13px] text-slate-700 dark:text-slate-300">
                  {req.bankName}
                </TableCell>
                <TableCell className="p-4 px-5">
                  <span className="font-mono text-[13px] font-medium text-slate-600 text-muted-foreground">
                    {maskAccountNumber(req.accountNumber)}
                  </span>
                </TableCell>
                <TableCell className="p-4 px-5">
                  <span className="font-mono text-[13px] text-slate-600 text-muted-foreground">
                    {req.ifsc}
                  </span>
                </TableCell>
                <TableCell className="p-4 px-5 text-center">
                  <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary hover:bg-primary/10">
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </TableCell>
                <TableCell className="p-4 px-5 text-[13px] text-muted-foreground">
                  {new Date(req.requestedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell className="p-4 px-5">
                  <span className="inline-flex items-center rounded-full border border-amber-200/50 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:bg-amber-500/10">
                    Pending
                  </span>
                </TableCell>
                <TableCell className="p-4 px-5 text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 border-border border-border text-[13px] font-medium"
                    onClick={() => router.push(`/wallet-whitelist/${req.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-100 border-border flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          Showing <span className="font-medium text-foreground dark:text-white">
            {data?.data.length ? page * 10 + 1 : 0}
          </span> to <span className="font-medium text-foreground dark:text-white">
            {data?.data.length ? page * 10 + data.data.length : 0}
          </span> of <span className="font-medium text-foreground dark:text-white">
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
          <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-muted bg-card pointer-events-none">
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
