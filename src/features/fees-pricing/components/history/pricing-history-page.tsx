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
      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
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
                <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                  No pricing history found.
                </TableCell>
              </TableRow>
            ) : (
              history?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-medium">{item.merchantName}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300 capitalize">
                      {item.feeType.toLowerCase().replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-slate-500 line-through decoration-red-500/50">
                        {item.previousConfiguration}
                      </span>
                      <MoveRight className="h-3 w-3 text-slate-400 flex-shrink-0" />
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {item.newConfiguration}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500">{item.changedBy}</TableCell>
                  <TableCell className="text-slate-500">
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
