import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { TableQueryParams } from "@/types/api";
import { getMerchantsMock } from "../merchant.mock";

export function useMerchantsQuery(params: TableQueryParams) {
  return useQuery({
    queryKey: queryKeys.merchants.list(params),
    queryFn: () => getMerchantsMock(params),
    // Use placeholder data to prevent full layout flashes during pagination
    placeholderData: (previousData) => previousData,
  });
}
