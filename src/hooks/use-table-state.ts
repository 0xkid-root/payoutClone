import { useState, useMemo, useCallback } from "react";
import { PaginationState, SortingState, ColumnFiltersState } from "@tanstack/react-table";
import { TableQueryParams, SortParams } from "@/types/api";

interface UseTableStateProps {
  initialPageSize?: number;
}

export function useTableState({ initialPageSize = 20 }: UseTableStateProps = {}) {
  // TanStack Table Local State
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>(""); // Used for debounced search

  // Reset pagination when search or filters change
  const handleGlobalFilterChange = useCallback((value: string) => {
    setGlobalFilter(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  const handleColumnFiltersChange = useCallback((updaterOrValue: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
    setColumnFilters(updaterOrValue);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  // Derived query parameters mapping local state to backend-style payload
  const queryParams: TableQueryParams = useMemo(() => {
    // Map TanStack sorting to API sorting
    const apiSorting: SortParams[] | undefined =
      sorting.length > 0
        ? sorting.map((s) => ({
            id: s.id,
            desc: s.desc,
          }))
        : undefined;

    // Map column filters to a record
    const apiFilters: Record<string, unknown> | undefined =
      columnFilters.length > 0
        ? columnFilters.reduce((acc, filter) => {
            acc[filter.id] = filter.value;
            return acc;
          }, {} as Record<string, unknown>)
        : undefined;

    return {
      page: pagination.pageIndex,
      size: pagination.pageSize,
      search: globalFilter || undefined,
      sorting: apiSorting,
      filters: apiFilters,
    };
  }, [pagination, sorting, globalFilter, columnFilters]);

  return {
    // TanStack standard state & updaters
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters: handleColumnFiltersChange,
    globalFilter,
    setGlobalFilter: handleGlobalFilterChange,
    // The derived payload to pass to the Query/API
    queryParams,
  };
}
