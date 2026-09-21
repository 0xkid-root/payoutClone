import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TableQueryParams } from "@/types/api";
import { getBeneficiariesMock } from "../beneficiary.mock";

export function useBeneficiaries(params: TableQueryParams) {
  return useQuery({
    queryKey: ["beneficiaries", "list", params],
    queryFn: () => getBeneficiariesMock(params),
    placeholderData: keepPreviousData,
  });
}
