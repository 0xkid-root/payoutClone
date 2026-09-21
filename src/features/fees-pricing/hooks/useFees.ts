import { useQuery } from "@tanstack/react-query";
import { feesApi } from "../mock/fees-data";

export function useFees(type?: "PERCENTAGE" | "FLAT" | "SLAB_BASED") {
  return useQuery({
    queryKey: ["fees", type],
    queryFn: () => (type ? feesApi.getByType(type) : feesApi.getAll()),
  });
}

export function useFee(id: string) {
  return useQuery({
    queryKey: ["fees", id],
    queryFn: () => feesApi.getById(id),
    enabled: !!id,
  });
}

export function usePricingHistory() {
  return useQuery({
    queryKey: ["pricing-history"],
    queryFn: () => feesApi.getHistory(),
  });
}
