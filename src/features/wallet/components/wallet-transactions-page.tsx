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
import { useTransactionsQuery } from "../queries";
import { Search, Filter, Download, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/status-badge";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function WalletTransactionsPage() {
  const { data: transactions, isLoading } = useTransactionsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTx = transactions?.filter((tx) => {
    const matchesSearch = 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tx.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.referenceId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || tx.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Wallet Transactions"
        description="Monitor system-wide wallet transactions and transfer history."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
            <Button variant="outline" className="bg-white shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />

      <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search transaction ID, merchant, ref..." 
                className="pl-9 bg-white dark:bg-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || "all")}>
              <SelectTrigger className="w-full sm:w-[150px] bg-white dark:bg-slate-900">
                <Filter className="mr-2 h-4 w-4 text-slate-400" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="hold">Hold</SelectItem>
                <SelectItem value="refund">Refund</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || typeFilter !== "all") && (
              <Button 
                variant="ghost" 
                onClick={() => { setSearchTerm(""); setTypeFilter("all"); }}
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
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Transaction ID</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Merchant</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Amount</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Balance</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Reference</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i} className="border-slate-100 dark:border-slate-800/50">
                    <TableCell colSpan={8} className="p-5">
                      <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredTx?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-slate-500">
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : filteredTx?.map((tx) => (
                <TableRow key={tx.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <TableCell className="p-4 px-5">
                    <span className="font-semibold text-slate-900 dark:text-white text-[13px]">{tx.id}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className="text-slate-600 dark:text-slate-400 text-[13px] font-medium">{tx.merchantName}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                      tx.type === 'Credit' ? 'border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' :
                      tx.type === 'Debit' ? 'border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10' :
                      'border-indigo-200/50 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10'
                    }`}>
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className={`p-4 px-5 text-right font-semibold tabular-nums text-[13px] ${
                    tx.type === 'Credit' ? 'text-emerald-600' : 
                    tx.type === 'Debit' || tx.type === 'Withdrawal' ? 'text-red-600' : 'text-slate-900 dark:text-white'
                  }`}>
                    {tx.type === 'Credit' ? '+' : tx.type === 'Debit' || tx.type === 'Withdrawal' ? '-' : ''}
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right tabular-nums text-[13px] text-slate-600 dark:text-slate-400">
                    {formatCurrency(tx.balanceAfter)}
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className="font-mono text-[12px] text-slate-500">{tx.referenceId || "—"}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <StatusBadge status={tx.status} />
                  </TableCell>
                  <TableCell className="p-4 px-5 text-[13px] text-slate-500">
                    {new Date(tx.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
          <div className="text-slate-500">
            Showing <span className="font-medium text-slate-900 dark:text-white">{filteredTx?.length || 0}</span> results
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-slate-100 dark:bg-slate-800" disabled>
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
