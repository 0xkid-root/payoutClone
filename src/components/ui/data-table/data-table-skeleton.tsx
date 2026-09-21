"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableSkeletonProps {
  columnCount: number;
  rowCount?: number;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 10,
}: DataTableSkeletonProps) {
  return (
    <div className="space-y-4 w-full">
      <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
            <TableRow>
              {Array.from({ length: columnCount }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-5 w-24 bg-slate-200 dark:bg-slate-800" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-5 w-full bg-slate-100 dark:bg-slate-800/50 max-w-[200px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between px-2">
        <div className="hidden sm:block">
          <Skeleton className="h-5 w-32 bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="flex items-center space-x-6">
          <Skeleton className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <Skeleton className="h-5 w-24 bg-slate-200 dark:bg-slate-800" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <Skeleton className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
