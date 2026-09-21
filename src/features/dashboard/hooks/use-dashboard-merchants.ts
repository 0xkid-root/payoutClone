import { useQuery } from "@tanstack/react-query";
import { TableQueryParams } from "@/types/api";
import { getDashboardMerchantsMock } from "../dashboard.mock";

export function useDashboardMerchants(params: TableQueryParams) {
  return useQuery({
    queryKey: ["dashboard-merchants", params],
    queryFn: () => getDashboardMerchantsMock(params),
    placeholderData: (previousData) => previousData, // Keeps old data on screen while fetching next page
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });
}
