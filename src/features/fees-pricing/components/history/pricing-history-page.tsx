"use client";

import { usePricingHistory } from "../../hooks/useFees";
import { PageHeader } from "@/components/common/page-header";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { MoveRight } from "lucide-react";

export function PricingHistoryPage() {
 const { data: history, isLoading } = usePricingHistory();

 return (
 <div className="flex flex-col gap-6 pb-8">
 <PageHeader
 title="Pricing History"
 description="Track changes made to merchant fee configurations."
 />
 
 {/* TODO: Integrate with real pricing-history endpoint when backend supports it */}
 <div className="flex flex-col rounded-2xl border border-border shadow-sm border-border bg-card overflow-hidden">
 <Table>
 <TableHeader>
 <TableRow className="bg-card hover:bg-card bg-card/20 dark:hover:bg-card/20 border-border">
 <TableHead>Date</TableHead>
 <TableHead>Merchant</TableHead>
 <TableHead>Fee Type</TableHead>
 <TableHead>Configuration Change</TableHead>
 <TableHead>Changed By</TableHead>
 <TableHead>Effective From</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {isLoading ? (
 <TableRow>
 <TableCell colSpan={6} className="h-24 text-center">
 Loading...
 </TableCell>
 </TableRow>
 ) : history?.length === 0 ? (
 <TableRow>
 <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
 No pricing history found.
 </TableCell>
 </TableRow>
 ) : (
 history?.map((item) => (
 <TableRow key={item.id}>
 <TableCell className="font-medium text-foreground dark:text-white">
 {new Date(item.date).toLocaleDateString("en-GB", {
 day: "numeric",
 month: "short",
 year: "numeric",
 })}
 </TableCell>
 <TableCell className="font-medium">{item.merchantName}</TableCell>
 <TableCell>
 <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground bg-card text-foreground capitalize">
 {item.feeType.toLowerCase().replace('_', ' ')}
 </span>
 </TableCell>
 <TableCell>
 <div className="flex items-center gap-3 text-sm">
 <span className="text-muted-foreground line-through decoration-red-500/50">
 {item.previousConfiguration}
 </span>
 <MoveRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
 <span className="font-medium text-success dark:text-emerald-400">
 {item.newConfiguration}
 </span>
 </div>
 </TableCell>
 <TableCell className="text-muted-foreground">{item.changedBy}</TableCell>
 <TableCell className="text-muted-foreground">
 {new Date(item.effectiveFrom).toLocaleDateString("en-GB", {
 day: "numeric",
 month: "short",
 year: "numeric",
 })}
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
