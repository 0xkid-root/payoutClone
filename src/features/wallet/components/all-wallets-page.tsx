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
 <Button variant="outline" className=" shadow-sm bg-card border-border">
 <Download className="mr-2 h-4 w-4" />
 Export List
 </Button>
 }
 />

 <div className="rounded-xl border border-border/60 shadow-sm border-border bg-card overflow-hidden flex flex-col">
 {/* Toolbar */}
 <div className="p-4 border-b border-border bg-card/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
 <div className="flex items-center gap-3 w-full sm:w-auto">
 <div className="relative w-full sm:w-80">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
 <Input 
 placeholder="Search merchant or wallet ID..." 
 className="pl-9 bg-card"
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 />
 </div>
 </div>
 <div className="flex items-center gap-3 w-full sm:w-auto">
 <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
 <SelectTrigger className="w-full sm:w-[150px] bg-card">
 <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
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
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Merchant</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Wallet ID</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Available Balance</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Hold Balance</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Total Balance</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Activity</TableHead>
 <TableHead className="h-11 px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</TableHead>
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
 ) : filteredWallets?.length === 0 ? (
 <TableRow>
 <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
 No wallets found matching your criteria.
 </TableCell>
 </TableRow>
 ) : filteredWallets?.map((wallet) => (
 <TableRow key={wallet.id} className="border-border/50 hover:bg-card dark:hover:bg-card/30 transition-colors">
 <TableCell className="p-4 px-5">
 <div className="flex flex-col">
 <span className="font-semibold text-foreground dark:text-white text-[13px]">{wallet.merchantName}</span>
 <span className="text-[12px] text-muted-foreground">{wallet.merchantId}</span>
 </div>
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className="font-mono text-[13px] text-muted-foreground">{wallet.id}</span>
 </TableCell>
 <TableCell className="p-4 px-5 text-right font-semibold tabular-nums text-success">
 {formatCurrency(wallet.availableBalance)}
 </TableCell>
 <TableCell className="p-4 px-5 text-right font-medium tabular-nums text-warning">
 {formatCurrency(wallet.holdBalance)}
 </TableCell>
 <TableCell className="p-4 px-5 text-right font-bold tabular-nums text-foreground dark:text-white">
 {formatCurrency(wallet.totalBalance)}
 </TableCell>
 <TableCell className="p-4 px-5">
 <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
 wallet.status === 'Active' ? 'border-success/30 bg-success/10 text-success dark:bg-success/100/10' :
 wallet.status === 'Frozen' ? 'border-primary/20/50 bg-primary/10 text-primary dark:bg-primary/10' :
 wallet.status === 'Suspended' ? 'border-warning/30 bg-warning/10 text-warning dark:bg-warning/100/10' :
 'border-border/50 bg-card text-muted-foreground bg-background0/10'
 }`}>
 {wallet.status}
 </span>
 </TableCell>
 <TableCell className="p-4 px-5 text-[13px] text-muted-foreground">
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
 <div className="p-4 border-t border-border flex items-center justify-between text-sm">
 <div className="text-muted-foreground">
 Showing <span className="font-medium text-foreground dark:text-white">{filteredWallets?.length || 0}</span> results
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
