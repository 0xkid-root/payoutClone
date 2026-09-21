"use client";

import { Button } from "@/components/ui/button";
import { SearchX, FileX } from "lucide-react";

interface DataTableEmptyProps {
  isSearchState?: boolean;
  onClearFilters?: () => void;
  message?: string;
}

export function DataTableEmpty({
  isSearchState = false,
  onClearFilters,
  message,
}: DataTableEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center h-64 border border-slate-200 dark:border-slate-800 rounded-md bg-white dark:bg-slate-900 border-dashed">
      {isSearchState ? (
        <>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <SearchX className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            No results found
          </h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            {message || "We couldn't find any results matching your search or filters."}
          </p>
          {onClearFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="mt-6"
            >
              Clear all filters
            </Button>
          )}
        </>
      ) : (
        <>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <FileX className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            No data available
          </h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            {message || "There are currently no records to display in this table."}
          </p>
        </>
      )}
    </div>
  );
}
