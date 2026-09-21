import { TableQueryParams, PageResponse } from "@/types/api";

export interface DashboardMerchant {
  id: string;
  merchantName: string;
  merchantCode: string;
  totalPayout: number;
  successRate: number;
  pendingAmount: number;
  failedAmount: number;
  totalTxns: number;
  status: "ACTIVE" | "PENDING" | "SUSPENDED" | "BLOCKED";
}

// Generate 50 dummy merchants for the dashboard overview table
const MOCK_DASHBOARD_MERCHANTS: DashboardMerchant[] = Array.from({ length: 50 }).map((_, i) => {
  const statuses: DashboardMerchant["status"][] = ["ACTIVE", "PENDING", "SUSPENDED", "BLOCKED"];
  const totalTxns = Math.floor(Math.random() * 50000) + 100;
  const successRate = 85 + (Math.random() * 15); // 85% to 100%
  const totalPayout = Math.floor(Math.random() * 50000000) + 100000;
  const failedAmount = totalPayout * ((100 - successRate) / 100);
  const pendingAmount = totalPayout * 0.05 * Math.random();

  return {
    id: `m_${1000 + i}`,
    merchantName: `Business Enterprise ${i + 1}`,
    merchantCode: `MID${20000 + i}`,
    totalPayout,
    successRate: parseFloat(successRate.toFixed(2)),
    pendingAmount,
    failedAmount,
    totalTxns,
    status: statuses[i % 4],
  };
});

/**
 * Simulates a paginated, sortable, filterable Spring Boot backend endpoint.
 * Delay simulates network latency.
 */
export async function getDashboardMerchantsMock(params: TableQueryParams): Promise<PageResponse<DashboardMerchant>> {
  // Simulate network delay of 400ms
  await new Promise((resolve) => setTimeout(resolve, 400));

  let filtered = [...MOCK_DASHBOARD_MERCHANTS];

  // 1. Apply Search
  if (params.search) {
    const s = params.search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.merchantName.toLowerCase().includes(s) ||
        m.merchantCode.toLowerCase().includes(s)
    );
  }

  // 2. Apply Filters (e.g., status)
  if (params.filters) {
    if (params.filters.status && params.filters.status !== "ALL") {
      const statusFilter = params.filters.status;
      filtered = filtered.filter((m) => m.status === statusFilter);
    }
  }

  // 3. Apply Sorting
  if (params.sorting && params.sorting.length > 0) {
    const { id, desc } = params.sorting[0];
    filtered.sort((a, b) => {
      const valA = a[id as keyof DashboardMerchant];
      const valB = b[id as keyof DashboardMerchant];
      if (valA < valB) return desc ? 1 : -1;
      if (valA > valB) return desc ? -1 : 1;
      return 0;
    });
  } else {
    // Default sort by total payout desc
    filtered.sort((a, b) => b.totalPayout - a.totalPayout);
  }

  // 4. Apply Pagination
  const totalElements = filtered.length;
  const totalPages = Math.ceil(totalElements / params.size);
  const start = params.page * params.size;
  const end = start + params.size;
  const content = filtered.slice(start, end);

  return {
    content,
    page: params.page,
    size: params.size,
    totalElements,
    totalPages,
  };
}
