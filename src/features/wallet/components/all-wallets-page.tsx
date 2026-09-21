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
import { useWalletsQuery } from "../queries";
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function AllWalletsPage() {
  const { data: wallets, isLoading } = useWalletsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredWallets = wallets?.filter((wallet) => {
    const matchesSearch = 
      wallet.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      wallet.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.merchantId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || wallet.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="All Wallets"
        description="Manage and monitor merchant wallets and balances."
        actions={
          <Button variant="outline" className="bg-white shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
        }
      />

      <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search merchant or wallet ID..." 
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
                <SelectItem value="frozen">Frozen</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
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
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Merchant</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Wallet ID</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Available Balance</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Hold Balance</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Total Balance</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">Last Activity</TableHead>
                <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</TableHead>
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
              ) : filteredWallets?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-slate-500">
                    No wallets found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : filteredWallets?.map((wallet) => (
                <TableRow key={wallet.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <TableCell className="p-4 px-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white text-[13px]">{wallet.merchantName}</span>
                      <span className="text-[12px] text-slate-500">{wallet.merchantId}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className="font-mono text-[13px] text-slate-600 dark:text-slate-400">{wallet.id}</span>
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right font-semibold tabular-nums text-emerald-600">
                    {formatCurrency(wallet.availableBalance)}
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right font-medium tabular-nums text-amber-600">
                    {formatCurrency(wallet.holdBalance)}
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right font-bold tabular-nums text-slate-900 dark:text-white">
                    {formatCurrency(wallet.totalBalance)}
                  </TableCell>
                  <TableCell className="p-4 px-5">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                      wallet.status === 'Active' ? 'border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' :
                      wallet.status === 'Frozen' ? 'border-indigo-200/50 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10' :
                      wallet.status === 'Suspended' ? 'border-amber-200/50 bg-amber-50 text-amber-600 dark:bg-amber-500/10' :
                      'border-slate-200/50 bg-slate-50 text-slate-600 dark:bg-slate-500/10'
                    }`}>
                      {wallet.status}
                    </span>
                  </TableCell>
                  <TableCell className="p-4 px-5 text-[13px] text-slate-500">
                    {new Date(wallet.lastActivityAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="p-4 px-5 text-right">
                    <Link href={`/wallet/${wallet.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary hover:bg-primary/10">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
          <div className="text-slate-500">
            Showing <span className="font-medium text-slate-900 dark:text-white">{filteredWallets?.length || 0}</span> results
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
