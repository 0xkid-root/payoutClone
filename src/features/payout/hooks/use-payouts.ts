import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PayoutRecord,
  PayoutQueryParams,
  PaginatedPayoutResponse,
  SinglePayoutFormValues,
  DirectPayoutFormValues,
} from "../types/payout.types";
import { MOCK_PAYOUTS } from "../mock/payout.mock";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let localPayoutsData = [...MOCK_PAYOUTS];

export function usePayoutsQuery(params: PayoutQueryParams) {
  return useQuery({
    queryKey: ["payouts", params],
    queryFn: async (): Promise<PaginatedPayoutResponse> => {
      await delay(600);

      let filteredData = [...localPayoutsData];

      if (params.search) {
        const query = params.search.toLowerCase();
        filteredData = filteredData.filter(
          (p) =>
            p.id.toLowerCase().includes(query) ||
            p.merchantName.toLowerCase().includes(query) ||
            p.merchantId.toLowerCase().includes(query) ||
            p.beneficiaryName.toLowerCase().includes(query)
        );
      }

      if (params.status && params.status !== "All") {
        filteredData = filteredData.filter((p) => p.status === params.status);
      }

      if (params.method && params.method !== "All") {
        filteredData = filteredData.filter((p) => p.method === params.method);
      }

      if (params.sortBy) {
        const sortField = params.sortBy as keyof PayoutRecord;
        const dir = params.sortDir === "asc" ? 1 : -1;

        filteredData.sort((a, b) => {
          const valA = a[sortField];
          const valB = b[sortField];

          if (valA === undefined && valB === undefined) return 0;
          if (valA === undefined) return 1 * dir;
          if (valB === undefined) return -1 * dir;

          if (typeof valA === "string" && typeof valB === "string") {
            return valA.localeCompare(valB) * dir;
          }
          if (valA < valB) return -1 * dir;
          if (valA > valB) return 1 * dir;
          return 0;
        });
      }

      const { page, size } = params;
      const start = page * size;
      const paginatedData = filteredData.slice(start, start + size);

      return {
        data: paginatedData,
        pagination: {
          page,
          size,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
        },
      };
    },
  });
}

export function usePayoutQuery(id: string) {
  return useQuery({
    queryKey: ["payout", id],
    queryFn: async (): Promise<PayoutRecord> => {
      await delay(400);
      const payout = localPayoutsData.find((p) => p.id === id);
      if (!payout) throw new Error("Payout not found");
      return payout;
    },
    enabled: !!id,
  });
}

export function useCreateSinglePayoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: SinglePayoutFormValues) => {
      await delay(800);
      const newPayout: PayoutRecord = {
        id: `PYO-${Math.floor(100000 + Math.random() * 900000)}`,
        merchantId: values.merchantId,
        merchantName: "Mock Merchant Name", // Simulated lookup
        businessName: "Mock Business",
        beneficiaryId: values.beneficiaryId,
        beneficiaryName: "Mock Beneficiary",
        amount: values.amount,
        fee: 25,
        netAmount: values.amount - 25,
        method: values.method,
        status: "Requested",
        requestedAt: new Date().toISOString(),
      };
      localPayoutsData = [newPayout, ...localPayoutsData];
      return newPayout;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payouts"] });
    },
  });
}

export function useCreateDirectPayoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: DirectPayoutFormValues) => {
      await delay(1000);
      const newPayout: PayoutRecord = {
        id: `PYO-${Math.floor(100000 + Math.random() * 900000)}`,
        merchantId: values.merchantId,
        merchantName: "Mock Merchant Name",
        businessName: "Mock Business",
        beneficiaryName: values.accountHolderName,
        accountNumber: values.accountNumber,
        ifsc: values.ifsc,
        amount: values.amount,
        fee: 30,
        netAmount: values.amount - 30,
        method: values.method,
        status: "Processing",
        requestedAt: new Date().toISOString(),
      };
      localPayoutsData = [newPayout, ...localPayoutsData];
      return newPayout;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payouts"] });
    },
  });
}

export function useRetryPayoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await delay(800);
      const index = localPayoutsData.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Payout not found");
      
      const payout = localPayoutsData[index];
      const newCount = (payout.retryCount || 0) + 1;
      
      localPayoutsData[index] = {
        ...payout,
        status: "Processing",
        retryCount: newCount,
        lastAttempt: new Date().toISOString(),
      };
      
      return localPayoutsData[index];
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["payouts"] });
      queryClient.invalidateQueries({ queryKey: ["payout", id] });
    },
  });
}

export function useApprovePayoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await delay(800);
      const index = localPayoutsData.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Payout not found");
      
      localPayoutsData[index] = {
        ...localPayoutsData[index],
        status: "Processing",
      };
      
      return localPayoutsData[index];
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["payouts"] });
      queryClient.invalidateQueries({ queryKey: ["payout", id] });
    },
  });
}
