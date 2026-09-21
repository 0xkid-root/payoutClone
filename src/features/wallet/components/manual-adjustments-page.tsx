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
import { useManualAdjustmentsQuery, useCreateManualAdjustment, useWalletsQuery } from "../queries";
import { AlertCircle, FileText, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/status-badge";
import { Textarea } from "@/components/ui/textarea";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function ManualAdjustmentsPage() {
  const { data: adjustments, isLoading: isAdjustmentsLoading } = useManualAdjustmentsQuery();
  const { data: wallets, isLoading: isWalletsLoading } = useWalletsQuery();
  const createMutation = useCreateManualAdjustment();

  // Form State
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [type, setType] = useState<"Credit" | "Debit">("Credit");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  const selectedWallet = wallets?.find(w => w.id === selectedWalletId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWalletId || !amount || !reason) return;

    createMutation.mutate(
      {
        walletId: selectedWalletId,
        merchantName: selectedWallet?.merchantName || "",
        type,
        amount: parseFloat(amount),
        reason,
        remarks,
      },
      {
        onSuccess: () => {
          setSelectedWalletId("");
          setType("Credit");
          setAmount("");
          setReason("");
          setRemarks("");
        }
      }
    );
  };

  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title="Manual Wallet Adjustment"
        description="Submit manual wallet adjustments for maker-checker review."
      />

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold tracking-tight">Adjustment Details</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Merchant Wallet <span className="text-red-500">*</span></label>
                  <Select value={selectedWalletId} onValueChange={(val) => setSelectedWalletId(val || "")}>
                    <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900/50 h-11 rounded-xl">
                      <SelectValue placeholder="Select a merchant wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {wallets?.map(w => (
                        <SelectItem key={w.id} value={w.id}>{w.merchantName} ({w.id})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedWallet && (
                    <p className="text-xs font-medium text-slate-500 mt-1">
                      Available Balance: <span className="text-slate-900 dark:text-white font-bold">{formatCurrency(selectedWallet.availableBalance)}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Reason for Adjustment <span className="text-red-500">*</span></label>
                  <Select value={reason} onValueChange={(val) => setReason(val || "")}>
                    <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-900/50 h-11 rounded-xl">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Refund for failed payout fee">Refund for failed payout fee</SelectItem>
                      <SelectItem value="Setup fee deduction">Setup fee deduction</SelectItem>
                      <SelectItem value="Promotional credit">Promotional credit</SelectItem>
                      <SelectItem value="Correction of previous entry">Correction of previous entry</SelectItem>
                      <SelectItem value="Chargeback deduction">Chargeback deduction</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Adjustment Type <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-all duration-200 ${type === "Credit" ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10 shadow-sm" : "border-slate-100 dark:border-slate-800 hover:border-emerald-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                    onClick={() => setType("Credit")}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${type === "Credit" ? "border-emerald-500" : "border-slate-300"}`}>
                      {type === "Credit" && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                    </div>
                    <div>
                      <p className={`font-bold ${type === "Credit" ? "text-emerald-700 dark:text-emerald-400" : "text-slate-700 dark:text-slate-300"}`}>Credit</p>
                      <p className="text-xs text-slate-500 font-medium">Add funds to wallet</p>
                    </div>
                  </div>
                  <div 
                    className={`border-2 rounded-xl p-4 cursor-pointer flex items-center gap-4 transition-all duration-200 ${type === "Debit" ? "border-red-500 bg-red-50/50 dark:bg-red-900/10 shadow-sm" : "border-slate-100 dark:border-slate-800 hover:border-red-200 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                    onClick={() => setType("Debit")}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${type === "Debit" ? "border-red-500" : "border-slate-300"}`}>
                      {type === "Debit" && <div className="w-2.5 h-2.5 rounded-full bg-red-500" />}
                    </div>
                    <div>
                      <p className={`font-bold ${type === "Debit" ? "text-red-700 dark:text-red-400" : "text-slate-700 dark:text-slate-300"}`}>Debit</p>
                      <p className="text-xs text-slate-500 font-medium">Deduct from wallet</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Amount <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 text-lg font-semibold">₹</span>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 bg-slate-50 dark:bg-slate-900/50 text-xl font-bold h-14 rounded-xl border-slate-200/60 dark:border-slate-800"
                    min="1"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Remarks / Reference Ticket</label>
                <Textarea 
                  placeholder="Provide any additional context or ticket references..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900/50 resize-none rounded-xl border-slate-200/60 dark:border-slate-800"
                  rows={3}
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500 max-w-[250px] leading-relaxed">
                  Requires <span className="font-semibold text-slate-700 dark:text-slate-300">checker approval</span> before reflecting in ledger.
                </div>
                <Button 
                  type="submit" 
                  className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-sm transition-all"
                  disabled={!selectedWalletId || !amount || !reason || createMutation.isPending}
                >
                  {createMutation.isPending ? "Submitting..." : "Submit for Approval"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Workflow Side */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 shadow-sm dark:border-slate-800 dark:bg-slate-900/30 p-6 sm:p-8 sticky top-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Maker-Checker Flow
              </h3>
            </div>
            
            <div className="flex flex-col gap-6 relative before:absolute before:inset-y-4 before:left-[15px] before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              <div className="flex gap-5 relative z-10">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 border-4 border-slate-50 dark:border-[#0f172a] dark:bg-indigo-900/50 dark:text-indigo-400">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div className="pt-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Adjustment Created</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Maker (you) submits the adjustment details with a reason and amount.</p>
                </div>
              </div>
              <div className="flex gap-5 relative z-10">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center flex-shrink-0 border-4 border-slate-50 dark:border-[#0f172a] dark:bg-slate-800 dark:text-slate-400">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div className="pt-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pending Review</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">A secondary administrator (checker) reviews and verifies the request.</p>
                </div>
              </div>
              <div className="flex gap-5 relative z-10">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center flex-shrink-0 border-4 border-slate-50 dark:border-[#0f172a] dark:bg-slate-800 dark:text-slate-400">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div className="pt-1.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ledger Updated</h4>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">Once approved, funds are automatically credited or debited.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-400" />
            Recent Adjustments
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                  <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">ID / Date</TableHead>
                  <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Merchant Details</TableHead>
                  <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Reason</TableHead>
                  <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Amount</TableHead>
                  <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isAdjustmentsLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <TableRow key={i} className="border-slate-100 dark:border-slate-800/50">
                      <TableCell colSpan={5} className="p-6">
                        <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : adjustments?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                      No adjustment history found.
                    </TableCell>
                  </TableRow>
                ) : adjustments?.map((adj) => (
                  <TableRow key={adj.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <TableCell className="p-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-white text-[14px]">{adj.id}</span>
                        <span className="text-[13px] text-slate-500 mt-0.5">{new Date(adj.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-[14px]">{adj.merchantName}</span>
                        <span className="text-[13px] text-slate-500 font-mono mt-0.5">{adj.walletId}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 px-6">
                      <div className="flex flex-col max-w-[250px]">
                        <span className="text-[14px] font-medium text-slate-700 dark:text-slate-300 truncate" title={adj.reason}>{adj.reason}</span>
                        <span className="text-[13px] text-slate-500 mt-0.5 truncate">by {adj.createdBy}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 px-6 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`font-bold tabular-nums text-[15px] ${
                          adj.type === "Credit" ? "text-emerald-600 dark:text-emerald-500" : "text-red-600 dark:text-red-500"
                        }`}>
                          {adj.type === "Credit" ? "+" : "-"}{formatCurrency(adj.amount)}
                        </span>
                        <span className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          adj.type === "Credit" ? "border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" : "border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10"
                        }`}>
                          {adj.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 px-6">
                      <StatusBadge status={adj.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
