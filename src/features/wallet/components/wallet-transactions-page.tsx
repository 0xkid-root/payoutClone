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
 <Button variant="outline" className=" shadow-sm bg-card border-border">
 <SlidersHorizontal className="mr-2 h-4 w-4" />
 Advanced Filters
 </Button>
 <Button variant="outline" className=" shadow-sm bg-card border-border">
 <Download className="mr-2 h-4 w-4" />
 Export
 </Button>
 </div>
 }
 />

 <div className="rounded-xl border border-border/60 shadow-sm border-border bg-card overflow-hidden flex flex-col">
 {/* Toolbar */}
 <div className="p-4 border-b border-border bg-card/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
 <div className="flex items-center gap-3 w-full sm:w-auto">
 <div className="relative w-full sm:w-80">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
 <Input 
 placeholder="Search transaction ID, merchant, ref..." 
 className="pl-9 bg-card"
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 />
 </div>
 </div>
 <div className="flex items-center gap-3 w-full sm:w-auto">
 <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || "all")}>
 <SelectTrigger className="w-full sm:w-[150px] bg-card">
 <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
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
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transaction ID</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Merchant</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Amount</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Balance</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {isLoading ? (
 Array(5).fill(0).map((_, i) => (
 <TableRow key={i} className="border-border/50">
 <TableCell colSpan={8} className="p-5">
 <div className="h-5 w-full bg-muted bg-card rounded animate-pulse"></div>
 </TableCell>
 </TableRow>
 ))
 ) : filteredTx?.length === 0 ? (
 <TableRow>
 <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
 No transactions found.
 </TableCell>
 </TableRow>
 ) : filteredTx?.map((tx) => (
 <TableRow key={tx.id} className="border-border/50 hover:bg-card dark:hover:bg-card/30 transition-colors">
 <TableCell className="p-4 px-5">
 <span className="font-semibold text-foreground dark:text-white text-[13px]">{tx.id}</span>
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className="text-muted-foreground text-[13px] font-medium">{tx.merchantName}</span>
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
 tx.type === 'Credit' ? 'border-success/30 bg-success/10 text-success dark:bg-success/100/10' :
 tx.type === 'Debit' ? 'border-danger/30 bg-danger/10 text-danger dark:bg-danger/100/10' :
 'border-primary/20/50 bg-primary/10 text-primary dark:bg-primary/10'
 }`}>
 {tx.type}
 </span>
 </TableCell>
 <TableCell className={`p-4 px-5 text-right font-semibold tabular-nums text-[13px] ${
 tx.type === 'Credit' ? 'text-success' : 
 tx.type === 'Debit' || tx.type === 'Withdrawal' ? 'text-danger' : 'text-foreground dark:text-white'
 }`}>
 {tx.type === 'Credit' ? '+' : tx.type === 'Debit' || tx.type === 'Withdrawal' ? '-' : ''}
 {formatCurrency(tx.amount)}
 </TableCell>
 <TableCell className="p-4 px-5 text-right tabular-nums text-[13px] text-muted-foreground">
 {formatCurrency(tx.balanceAfter)}
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className="font-mono text-[12px] text-muted-foreground">{tx.referenceId || "—"}</span>
 </TableCell>
 <TableCell className="p-4 px-5">
 <StatusBadge status={tx.status} />
 </TableCell>
 <TableCell className="p-4 px-5 text-[13px] text-muted-foreground">
 {new Date(tx.createdAt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
 </TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 </div>

 {/* Pagination */}
 <div className="p-4 border-t border-border flex items-center justify-between text-sm">
 <div className="text-muted-foreground">
 Showing <span className="font-medium text-foreground dark:text-white">{filteredTx?.length || 0}</span> results
 </div>
 <div className="flex items-center gap-2">
 <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
 <ChevronLeft className="h-4 w-4" />
 </Button>
 <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-muted bg-card" disabled>
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
