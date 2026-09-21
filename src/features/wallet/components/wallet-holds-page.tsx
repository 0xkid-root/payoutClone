"use client";

import { PageHeader } from "@/components/common/page-header";
import { useState } from "react";
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
import { useWalletHoldsQuery, useReleaseHold } from "../queries";
import { Search, Filter, Download, Unlock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function WalletHoldsPage() {
  const { data: holds, isLoading } = useWalletHoldsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const releaseMutation = useReleaseHold();
  const [selectedHold, setSelectedHold] = useState<any>(null);

  const filteredHolds = holds?.filter((hold) => {
    const matchesSearch = 
      hold.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      hold.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hold.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || hold.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const confirmRelease = () => {
    if (!selectedHold) return;
    releaseMutation.mutate(selectedHold.id, {
      onSettled: () => setSelectedHold(null)
    });
  };

  // Stats
  const totalHolds = holds?.length || 0;
  const activeHolds = holds?.filter(h => h.status === "Active").length || 0;
  const releasedHolds = holds?.filter(h => h.status === "Released").length || 0;
  const activeHoldAmount = holds?.filter(h => h.status === "Active").reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Wallet Holds"
        description="Manage temporary funds held for risk management or compliance."
        actions={
          <Button variant="outline" className="bg-white shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-500">Total Holds</p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{totalHolds}</p>
        </div>
        <div className="p-4 rounded-xl border border-amber-200/60 bg-amber-50/50 shadow-sm dark:bg-amber-900/10 dark:border-amber-900/30">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-500">Active Holds</p>
          <p className="text-2xl font-bold mt-1 text-amber-700 dark:text-amber-400">{activeHolds}</p>
        </div>
        <div className="p-4 rounded-xl border border-emerald-200/60 bg-emerald-50/50 shadow-sm dark:bg-emerald-900/10 dark:border-emerald-900/30">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-500">Released Holds</p>
          <p className="text-2xl font-bold mt-1 text-emerald-700 dark:text-emerald-400">{releasedHolds}</p>
        </div>
        <div className="p-4 rounded-xl border border-red-200/60 bg-red-50/50 shadow-sm dark:bg-red-900/10 dark:border-red-900/30">
          <p className="text-sm font-medium text-red-600 dark:text-red-500">Total Held Amount</p>
          <p className="text-2xl font-bold mt-1 text-red-700 dark:text-red-400">{formatCurrency(activeHoldAmount)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search hold ID, merchant, reason..." 
                className="pl-9 bg-white dark:bg-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
              <SelectTrigger className="w-full sm:w-[150px] bg-white dark:bg-slate-900">
                <Filter className="mr-2 h-4 w-4 text-slate-400" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="released">Released</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || statusFilter !== "all") && (
              <Button 
                variant="ghost" 
                onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
                className="text-slate-500"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Hold ID</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Merchant</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Amount</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Reason</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Created Date</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Release Date</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-slate-100 dark:border-slate-800/50">
                    <TableCell colSpan={8} className="p-5">
                      <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredHolds?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-slate-500">
                    No holds found.
                  </TableCell>
                </TableRow>
              ) : filteredHolds?.map((hold) => (
                <TableRow key={hold.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <TableCell className="p-4 px-5">
                    <span className="font-semibold text-slate-900 dark:text-white text-[13px]">{hold.id}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className="text-slate-600 dark:text-slate-400 text-[13px] font-medium">{hold.merchantName}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right font-semibold tabular-nums text-[13px] text-red-600">
                    {formatCurrency(hold.amount)}
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className="text-[13px] text-slate-600 dark:text-slate-400">{hold.reason}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5 text-[13px] text-slate-500">
                    {new Date(hold.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="p-4 px-5 text-[13px] text-slate-500">
                    {hold.releaseDate ? new Date(hold.releaseDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "—"}
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <StatusBadge status={hold.status} />
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right">
                    {hold.status === "Active" ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => setSelectedHold(hold)}
                      >
                        <Unlock className="h-4 w-4 mr-2" />
                        Release Hold
                      </Button>
                    ) : (
                      <span className="text-[12px] text-slate-400">Released</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!selectedHold} onOpenChange={(open) => !open && setSelectedHold(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Release Wallet Hold?</DialogTitle>
            <DialogDescription>
              Releasing this hold will make the funds available to the merchant immediately.
            </DialogDescription>
          </DialogHeader>
          
          {selectedHold && (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 my-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Merchant</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedHold.merchantName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Hold Amount</span>
                <span className="font-semibold text-emerald-600 text-lg">{formatCurrency(selectedHold.amount)}</span>
              </div>
              <div className="flex flex-col gap-1 text-sm border-t border-slate-200 dark:border-slate-800 pt-3">
                <span className="text-slate-500">Original Reason</span>
                <span className="text-slate-900 dark:text-white">{selectedHold.reason}</span>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setSelectedHold(null)}
              disabled={releaseMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={confirmRelease}
              disabled={releaseMutation.isPending}
            >
              {releaseMutation.isPending ? "Processing..." : "Confirm Release"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
