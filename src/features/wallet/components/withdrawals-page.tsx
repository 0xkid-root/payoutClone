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
import { useWithdrawalRequestsQuery, useApproveFundRequest, useRejectFundRequest } from "../queries"; // Reusing the same mutations for the mock
import { Search, Filter, Download, CheckCircle2, XCircle, Eye } from "lucide-react";
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

export function WithdrawalsPage() {
  const { data: requests, isLoading } = useWithdrawalRequestsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const approveMutation = useApproveFundRequest(); // Mocking as same for now
  const rejectMutation = useRejectFundRequest(); // Mocking as same for now

  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [dialogAction, setDialogAction] = useState<"approve" | "reject" | null>(null);

  const filteredRequests = requests?.filter((req) => {
    const matchesSearch = 
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      req.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || req.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleAction = (request: any, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setDialogAction(action);
  };

  const confirmAction = () => {
    if (!selectedRequest || !dialogAction) return;

    if (dialogAction === "approve") {
      approveMutation.mutate(selectedRequest.id, {
        onSettled: () => {
          setDialogAction(null);
          setSelectedRequest(null);
        }
      });
    } else {
      rejectMutation.mutate(selectedRequest.id, {
        onSettled: () => {
          setDialogAction(null);
          setSelectedRequest(null);
        }
      });
    }
  };

  // Stats
  const total = requests?.length || 0;
  const pending = requests?.filter(r => r.status === "Pending").length || 0;
  const processing = requests?.filter(r => r.status === "Processing").length || 0;
  const completed = requests?.filter(r => r.status === "Completed").length || 0;

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Withdrawal Requests"
        description="Review and process merchant bank withdrawal requests."
        actions={
          <Button variant="outline" className="bg-white shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200/60 bg-white shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-500">Total Requests</p>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{total}</p>
        </div>
        <div className="p-4 rounded-xl border border-amber-200/60 bg-amber-50/50 shadow-sm dark:bg-amber-900/10 dark:border-amber-900/30">
          <p className="text-sm font-medium text-amber-600 dark:text-amber-500">Pending</p>
          <p className="text-2xl font-bold mt-1 text-amber-700 dark:text-amber-400">{pending}</p>
        </div>
        <div className="p-4 rounded-xl border border-blue-200/60 bg-blue-50/50 shadow-sm dark:bg-blue-900/10 dark:border-blue-900/30">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-500">Processing</p>
          <p className="text-2xl font-bold mt-1 text-blue-700 dark:text-blue-400">{processing}</p>
        </div>
        <div className="p-4 rounded-xl border border-emerald-200/60 bg-emerald-50/50 shadow-sm dark:bg-emerald-900/10 dark:border-emerald-900/30">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-500">Completed</p>
          <p className="text-2xl font-bold mt-1 text-emerald-700 dark:text-emerald-400">{completed}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search request ID, merchant, account..." 
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Request ID</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Merchant</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Amount</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Bank Account</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-slate-100 dark:border-slate-800/50">
                    <TableCell colSpan={7} className="p-5">
                      <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredRequests?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                    No withdrawal requests found.
                  </TableCell>
                </TableRow>
              ) : filteredRequests?.map((req) => (
                <TableRow key={req.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <TableCell className="p-4 px-5">
                    <span className="font-semibold text-slate-900 dark:text-white text-[13px]">{req.id}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className="text-slate-600 dark:text-slate-400 text-[13px] font-medium">{req.merchantName}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right font-semibold tabular-nums text-[13px] text-slate-900 dark:text-white">
                    {formatCurrency(req.amount)}
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] text-slate-700 dark:text-slate-300 font-medium">{req.bankName}</span>
                      <span className="text-[12px] text-slate-500 font-mono">{req.accountNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 px-5 text-[13px] text-slate-500">
                    {new Date(req.requestedDate).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <StatusBadge status={req.status} />
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right">
                    {req.status === "Pending" ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                          onClick={() => handleAction(req, "approve")}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => handleAction(req, "reject")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary hover:bg-primary/10">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!dialogAction} onOpenChange={(open) => !open && setDialogAction(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "approve" ? "Approve Withdrawal?" : "Reject Withdrawal?"}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === "approve" 
                ? "This will process the withdrawal to the merchant's bank account."
                : "This will decline the withdrawal request. Funds will remain in the wallet."}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 my-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Merchant</span>
                <span className="font-semibold text-slate-900 dark:text-white">{selectedRequest.merchantName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Amount</span>
                <span className="font-semibold text-slate-900 dark:text-white text-lg">{formatCurrency(selectedRequest.amount)}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-slate-200 dark:border-slate-800 pt-3">
                <span className="text-slate-500">Bank</span>
                <span className="text-slate-900 dark:text-white">{selectedRequest.bankName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Account</span>
                <span className="font-mono text-slate-900 dark:text-white">{selectedRequest.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">IFSC</span>
                <span className="font-mono text-slate-900 dark:text-white">{selectedRequest.ifsc}</span>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setDialogAction(null)}
              disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              className={dialogAction === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}
              onClick={confirmAction}
              disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              {approveMutation.isPending || rejectMutation.isPending ? "Processing..." : dialogAction === "approve" ? "Yes, Approve" : "Yes, Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
