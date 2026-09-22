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
import { useLedgerQuery } from "../queries";
import { Search, Filter, Download, ChevronLeft, ChevronRight, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/status-badge";

const formatCurrency = (amount: number | null | undefined) => {
 if (amount === null || amount === undefined) return "—";
 return new Intl.NumberFormat("en-IN", {
 style: "currency",
 currency: "INR",
 }).format(amount);
};

export function WalletLedgerPage() {
 const { data: ledger, isLoading } = useLedgerQuery();
 const [searchTerm, setSearchTerm] = useState("");
 const [typeFilter, setTypeFilter] = useState("all");

 const filteredLedger = ledger?.filter((entry) => {
 const matchesSearch = 
 entry.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
 entry.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
 entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
 
 const matchesType = typeFilter === "all" || entry.type.toLowerCase() === typeFilter.toLowerCase();
 
 return matchesSearch && matchesType;
 });

 return (
 <div className="flex flex-col gap-6 pb-8">
 <PageHeader
 title="Global Ledger"
 description="Immutable read-only view of all financial wallet operations."
 actions={
 <Button variant="outline" className=" shadow-sm bg-card border-border">
 <Download className="mr-2 h-4 w-4" />
 Export Ledger
 </Button>
 }
 />

 {/* Security Notice */}
 <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-4 dark:bg-primary/10 dark:border-primary/20">
 <div className="p-2 bg-primary/20 text-primary rounded-lg bg-primary/20 dark:text-primary">
 <Calculator className="h-5 w-5" />
 </div>
 <div>
 <h4 className="text-sm font-semibold text-indigo-900 dark:text-primary">Financial Integrity Lock</h4>
 <p className="text-sm text-primary mt-1 dark:text-primary">
 The ledger is an immutable record. If a correction is required, you must create a new manual adjustment to reflect the change. Old records cannot be edited or deleted.
 </p>
 </div>
 </div>

 <div className="rounded-xl border border-border/60 shadow-sm border-border bg-card overflow-hidden flex flex-col">
 {/* Toolbar */}
 <div className="p-4 border-b border-border bg-card/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
 <div className="flex items-center gap-3 w-full sm:w-auto">
 <div className="relative w-full sm:w-80">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
 <Input 
 placeholder="Search ledger ID, transaction, ref..." 
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
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ledger ID</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transaction ID</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Credit</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Debit</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Running Balance</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {isLoading ? (
 Array(5).fill(0).map((_, i) => (
 <TableRow key={i} className="border-border/50">
 <TableCell colSpan={9} className="p-5">
 <div className="h-5 w-full bg-muted bg-card rounded animate-pulse"></div>
 </TableCell>
 </TableRow>
 ))
 ) : filteredLedger?.length === 0 ? (
 <TableRow>
 <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
 No ledger entries found.
 </TableCell>
 </TableRow>
 ) : filteredLedger?.map((entry) => (
 <TableRow key={entry.id} className="border-border/50 hover:bg-card dark:hover:bg-card/30 transition-colors">
 <TableCell className="p-4 px-5 text-[13px] text-muted-foreground">
 {new Date(entry.date).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className="font-semibold text-foreground dark:text-white text-[13px]">{entry.id}</span>
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className="font-mono text-[12px] text-primary">{entry.transactionId}</span>
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className="text-[13px] font-medium text-foreground">{entry.type}</span>
 </TableCell>
 <TableCell className="p-4 px-5 text-right font-semibold tabular-nums text-[13px] text-success">
 {formatCurrency(entry.credit)}
 </TableCell>
 <TableCell className="p-4 px-5 text-right font-semibold tabular-nums text-[13px] text-danger">
 {formatCurrency(entry.debit)}
 </TableCell>
 <TableCell className="p-4 px-5 text-right tabular-nums font-semibold text-[13px] text-foreground dark:text-white">
 {formatCurrency(entry.runningBalance)}
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className="font-mono text-[12px] text-muted-foreground">{entry.reference || "—"}</span>
 </TableCell>
 <TableCell className="p-4 px-5">
 <StatusBadge status={entry.status} />
 </TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 </div>

 {/* Pagination */}
 <div className="p-4 border-t border-border flex items-center justify-between text-sm">
 <div className="text-muted-foreground">
 Showing <span className="font-medium text-foreground dark:text-white">{filteredLedger?.length || 0}</span> results
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
