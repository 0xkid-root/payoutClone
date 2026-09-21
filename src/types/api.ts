export interface PageResponse<T> {
  content: T[];
  page: number; // Current page index (0-based)
  size: number; // Number of items per page
  totalElements: number; // Total number of items across all pages
  totalPages: number; // Total number of pages
}

export interface SortParams {
  id: string; // Column ID to sort by
  desc: boolean; // True for descending, false for ascending
}

export interface TableQueryParams {
  page: number; // 0-based page index
  size: number; // Page size
  search?: string; // Global search string
  sorting?: SortParams[]; // Multi-column sorting array
  filters?: Record<string, unknown>; // Column-specific filters
}
