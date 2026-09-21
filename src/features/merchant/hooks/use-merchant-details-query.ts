import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getMerchantDetailsMock } from "../merchant.mock";

export function useMerchantDetailsQuery(id: string) {
  return useQuery({
    // If queryKeys.merchants.detail is not defined, we inline it, but assuming it exists
    queryKey: ["merchants", "detail", id],
    queryFn: () => getMerchantDetailsMock(id),
    enabled: !!id,
  });
}
