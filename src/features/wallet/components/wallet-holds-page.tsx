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
          <Button variant="outline" className="bg-white shadow-sm bg-background border-border">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border/60 bg-white shadow-sm bg-background border-border">
          <p className="text-sm font-medium text-muted-foreground">Total Holds</p>
          <p className="text-2xl font-bold mt-1 text-foreground dark:text-white">{totalHolds}</p>
        </div>
        <div className="p-4 rounded-xl border border-warning/30/60 bg-warning/10/50 shadow-sm dark:bg-amber-900/10 dark:border-amber-900/30">
          <p className="text-sm font-medium text-warning dark:text-warning">Active Holds</p>
          <p className="text-2xl font-bold mt-1 text-amber-700 dark:text-amber-400">{activeHolds}</p>
        </div>
        <div className="p-4 rounded-xl border border-success/30/60 bg-success/10/50 shadow-sm dark:bg-emerald-900/10 dark:border-emerald-900/30">
          <p className="text-sm font-medium text-success dark:text-success">Released Holds</p>
          <p className="text-2xl font-bold mt-1 text-emerald-700 dark:text-emerald-400">{releasedHolds}</p>
        </div>
        <div className="p-4 rounded-xl border border-danger/30/60 bg-danger/10/50 shadow-sm dark:bg-red-900/10 dark:border-red-900/30">
          <p className="text-sm font-medium text-danger dark:text-danger">Total Held Amount</p>
          <p className="text-2xl font-bold mt-1 text-danger dark:text-red-400">{formatCurrency(activeHoldAmount)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-white shadow-sm border-border bg-background overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-border bg-background/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search hold ID, merchant, reason..." 
                className="pl-9 bg-white bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
              <SelectTrigger className="w-full sm:w-[150px] bg-white bg-background">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
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
                className="text-muted-foreground"
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
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hold ID</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Merchant</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Amount</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reason</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Created Date</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Release Date</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-border/50">
                    <TableCell colSpan={8} className="p-5">
                      <div className="h-5 w-full bg-muted bg-card rounded animate-pulse"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredHolds?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                    No holds found.
                  </TableCell>
                </TableRow>
              ) : filteredHolds?.map((hold) => (
                <TableRow key={hold.id} className="border-border/50 hover:bg-background dark:hover:bg-card/30 transition-colors">
                  <TableCell className="p-4 px-5">
                    <span className="font-semibold text-foreground dark:text-white text-[13px]">{hold.id}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className="text-muted-foreground text-[13px] font-medium">{hold.merchantName}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right font-semibold tabular-nums text-[13px] text-danger">
                    {formatCurrency(hold.amount)}
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className="text-[13px] text-muted-foreground">{hold.reason}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5 text-[13px] text-muted-foreground">
                    {new Date(hold.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="p-4 px-5 text-[13px] text-muted-foreground">
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
                      <span className="text-[12px] text-muted-foreground">Released</span>
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
            <div className="bg-background/50 rounded-lg p-4 my-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Merchant</span>
                <span className="font-semibold text-foreground dark:text-white">{selectedHold.merchantName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Hold Amount</span>
                <span className="font-semibold text-success text-lg">{formatCurrency(selectedHold.amount)}</span>
              </div>
              <div className="flex flex-col gap-1 text-sm border-t border-border pt-3">
                <span className="text-muted-foreground">Original Reason</span>
                <span className="text-foreground dark:text-white">{selectedHold.reason}</span>
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
