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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { WhitelistRequestStatus } from "../../types/wallet-whitelist.types";
import { useRouter } from "next/navigation";

export function HistoryTab() {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<WhitelistRequestStatus | "all">("all");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setDebouncedSearch(e.target.value);
    setPage(0);
  };

  const { data, isLoading } = useWhitelistRequests(
    { page, size: 10 },
    { 
      status: statusFilter === "all" ? undefined : statusFilter, 
      search: debouncedSearch 
    }
  );

  const maskAccountNumber = (acc: string) => {
    if (acc.length < 8) return acc;
    return `XXXX XXXX ${acc.slice(-4)}`;
  };

  const getStatusBadge = (status: WhitelistRequestStatus) => {
    if (status === 'Approved') {
      return <span className="inline-flex items-center rounded-full border border-success/30 bg-success/10 px-2.5 py-0.5 text-[11px] font-semibold text-success dark:bg-success/100/10">Approved</span>;
    }
    if (status === 'Rejected') {
      return <span className="inline-flex items-center rounded-full border border-danger/30 bg-danger/10 px-2.5 py-0.5 text-[11px] font-semibold text-danger dark:bg-danger/100/10">Rejected</span>;
    }
    return <span className="inline-flex items-center rounded-full border border-warning/30 bg-warning/10 px-2.5 py-0.5 text-[11px] font-semibold text-warning dark:bg-warning/100/10">Pending</span>;
  };

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="p-4 flex flex-col sm:flex-row items-center gap-4 justify-between border-b border-border">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search merchant, account holder, account number..." 
            className="pl-9 bg-background/50"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={(val: any) => { setStatusFilter(val); setPage(0); }}>
            <SelectTrigger className="w-full sm:w-[150px] bg-background/50">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-transparent">
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Merchant</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Account</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Bank</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Requested On</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Actioned On</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell colSpan={7} className="p-5">
                    <div className="h-5 w-full bg-muted bg-card rounded animate-pulse"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  {debouncedSearch || statusFilter !== 'all' ? "No requests match your filters" : "No history found"}
                </TableCell>
              </TableRow>
            ) : data?.data.map((req) => (
              <TableRow key={req.id} className="border-border/60 hover:bg-background dark:hover:bg-card/30 transition-colors">
                <TableCell className="p-4 px-5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground dark:text-white text-[13px]">{req.merchantName}</span>
                    <span className="text-[12px] text-muted-foreground">{req.merchantId}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4 px-5">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground dark:text-white text-[13px]">{req.accountHolderName}</span>
                    <span className="font-mono text-[12px] text-muted-foreground">{maskAccountNumber(req.accountNumber)}</span>
                  </div>
                </TableCell>
                <TableCell className="p-4 px-5 text-[13px] text-foreground">
                  {req.bankName}
                </TableCell>
                <TableCell className="p-4 px-5 text-[13px] text-muted-foreground">
                  {new Date(req.requestedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </TableCell>
                <TableCell className="p-4 px-5 text-[13px] text-muted-foreground">
                  {req.status === 'Pending' ? '-' : 
                   req.status === 'Approved' ? new Date(req.approvedAt!).toLocaleDateString('en-GB') :
                   new Date(req.rejectedAt!).toLocaleDateString('en-GB')}
                </TableCell>
                <TableCell className="p-4 px-5">
                  {getStatusBadge(req.status)}
                </TableCell>
                <TableCell className="p-4 px-5 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-[13px] font-medium text-muted-foreground hover:text-foreground text-muted-foreground dark:hover:text-foreground"
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
      <div className="p-4 border-t border-border flex items-center justify-between text-sm">
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
