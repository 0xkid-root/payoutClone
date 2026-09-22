"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreHorizontal, Eye, Ban, CheckCircle, Trash2 } from "lucide-react";
import { useFees } from "../../hooks/useFees";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/common/status-badge";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
 DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function PercentageFeesPage() {
 const { data: fees, isLoading } = useFees("PERCENTAGE");
 const [search, setSearch] = useState("");

 const filteredFees = fees?.filter(
 (fee) =>
 fee.merchantName?.toLowerCase().includes(search.toLowerCase()) ||
 fee.id.toLowerCase().includes(search.toLowerCase())
 );

 return (
 <div className="flex flex-col gap-6 pb-8">
 <PageHeader
 title="Percentage Fees"
 description="Manage percentage-based transaction fees for merchants."
 actions={
 <Link href="/fees-pricing/percentage/create">
 <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
 <Plus className="mr-2 h-4 w-4" />
 Create Percentage Fee
 </Button>
 </Link>
 }
 />

 <div className="flex flex-col rounded-2xl border border-border shadow-sm border-border bg-card overflow-hidden">
 <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between border-border">
 <div className="relative w-full sm:max-w-xs">
 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
 <Input
 placeholder="Search Merchant / Fee ID..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="h-10 w-full rounded-xl pl-9 bg-card border-border bg-card/50 border-border"
 />
 </div>
 </div>

 <Table>
 <TableHeader>
 <TableRow className="bg-card hover:bg-card bg-card/20 dark:hover:bg-card/20 border-border">
 <TableHead>Fee ID</TableHead>
 <TableHead>Merchant</TableHead>
 <TableHead className="text-right">Percentage</TableHead>
 <TableHead className="text-right">Minimum Fee</TableHead>
 <TableHead className="text-right">Maximum Fee</TableHead>
 <TableHead>Effective From</TableHead>
 <TableHead>Effective To</TableHead>
 <TableHead>Status</TableHead>
 <TableHead className="text-right">Actions</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {isLoading ? (
 <TableRow>
 <TableCell colSpan={9} className="h-24 text-center">
 Loading...
 </TableCell>
 </TableRow>
 ) : filteredFees?.length === 0 ? (
 <TableRow>
 <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
 No percentage fees found.
 </TableCell>
 </TableRow>
 ) : (
 filteredFees?.map((item) => (
 <TableRow key={item.id}>
 <TableCell className="font-medium text-foreground dark:text-white">
 {item.id}
 </TableCell>
 <TableCell className="font-medium">{item.merchantName}</TableCell>
 <TableCell className="text-right font-medium">
 {item.percentage?.toFixed(2)}%
 </TableCell>
 <TableCell className="text-right text-muted-foreground">
 {item.minFee !== undefined ? `₹${item.minFee}` : "-"}
 </TableCell>
 <TableCell className="text-right text-muted-foreground">
 {item.maxFee !== undefined ? `₹${item.maxFee}` : "-"}
 </TableCell>
 <TableCell className="text-muted-foreground">
 {new Date(item.effectiveFrom).toLocaleDateString("en-GB", {
 day: "numeric",
 month: "short",
 year: "numeric",
 })}
 </TableCell>
 <TableCell className="text-muted-foreground">
 {item.effectiveTo
 ? new Date(item.effectiveTo).toLocaleDateString("en-GB", {
 day: "numeric",
 month: "short",
 year: "numeric",
 })
 : "-"}
 </TableCell>
 <TableCell>
 <StatusBadge status={item.status} />
 </TableCell>
 <TableCell className="text-right">
 <DropdownMenu>
 <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
 <MoreHorizontal className="h-4 w-4" />
 </DropdownMenuTrigger>
 <DropdownMenuContent align="end" className="w-40">
 <DropdownMenuItem>
 <Link href={`/fees-pricing/percentage/${item.id}`} className="flex items-center w-full cursor-pointer">
 <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
 View / Edit
 </Link>
 </DropdownMenuItem>
 <DropdownMenuSeparator />
 <DropdownMenuItem className="cursor-pointer">
 {item.status === "ACTIVE" ? (
 <>
 <Ban className="mr-2 h-4 w-4 text-muted-foreground" />
 Deactivate
 </>
 ) : (
 <>
 <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
 Activate
 </>
 )}
 </DropdownMenuItem>
 <DropdownMenuSeparator />
 <DropdownMenuItem className="cursor-pointer text-danger focus:bg-danger/10 focus:text-danger dark:focus:bg-red-900/10 dark:focus:text-danger">
 <Trash2 className="mr-2 h-4 w-4" />
 Delete
 </DropdownMenuItem>
 </DropdownMenuContent>
 </DropdownMenu>
 </TableCell>
 </TableRow>
 ))
 )}
 </TableBody>
 </Table>
 </div>
 </div>
 );
}
