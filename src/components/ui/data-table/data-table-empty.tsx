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
 <div className="flex flex-col items-center justify-center py-12 text-center h-64 border border-border rounded-md bg-card border-dashed">
 {isSearchState ? (
 <>
 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted bg-card mb-4">
 <SearchX className="h-6 w-6 text-muted-foreground" />
 </div>
 <h3 className="text-lg font-semibold text-foreground dark:text-white">
 No results found
 </h3>
 <p className="mt-1 text-sm text-muted-foreground max-w-sm">
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
 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted bg-card mb-4">
 <FileX className="h-6 w-6 text-muted-foreground" />
 </div>
 <h3 className="text-lg font-semibold text-foreground dark:text-white">
 No data available
 </h3>
 <p className="mt-1 text-sm text-muted-foreground max-w-sm">
 {message || "There are currently no records to display in this table."}
 </p>
 </>
 )}
 </div>
 );
}
