export type VanStatus = "Active" | "Inactive" | "Suspended" | "Pending";

export interface VanAccount {
  id: string;
  vanNumber: string;
  merchantId: string;
  merchantName: string;
  businessName: string;
  provider: string;
  accountType: string;
  status: VanStatus;
  assignedAt: string;
  lastActivityAt: string;
  currency: string;
  ifsc?: string;
}

export interface VanQueryParams {
  page: number;
  size: number;
  search?: string;
  status?: VanStatus | "All";
  provider?: string | "All";
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

export interface PaginatedVanResponse {
  data: VanAccount[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
