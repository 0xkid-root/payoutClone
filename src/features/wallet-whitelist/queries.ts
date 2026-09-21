import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  PaginatedWhitelistResponse, 
  WhitelistFilters, 
  WhitelistPaginationParams, 
  WhitelistRequest 
} from "./types/wallet-whitelist.types";
import { mockWhitelistRequests } from "./data/mock-data";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Keep a local mutable copy of the mock data to reflect updates during the session
let localMockData = [...mockWhitelistRequests];

export function useWhitelistRequests(
  params: WhitelistPaginationParams,
  filters?: WhitelistFilters
) {
  return useQuery({
    queryKey: ["whitelist-requests", params, filters],
    queryFn: async (): Promise<PaginatedWhitelistResponse> => {
      await delay(800); // Simulate API latency

      let filteredData = [...localMockData];

      // Apply status filter
      if (filters?.status) {
        filteredData = filteredData.filter((req) => req.status === filters.status);
      }

      // Apply search filter
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        filteredData = filteredData.filter(
          (req) =>
            req.merchantName.toLowerCase().includes(query) ||
            req.accountHolderName.toLowerCase().includes(query) ||
            req.accountNumber.includes(query) ||
            req.merchantId.toLowerCase().includes(query)
        );
      }

      // Sort by requestedAt descending
      filteredData.sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());

      // Pagination
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

export function useWhitelistRequest(id: string) {
  return useQuery({
    queryKey: ["whitelist-request", id],
    queryFn: async (): Promise<WhitelistRequest> => {
      await delay(400); // Simulate API latency
      const request = localMockData.find((req) => req.id === id);
      if (!request) throw new Error("Request not found");
      return request;
    },
    enabled: !!id,
  });
}

export function useApproveWhitelistRequest() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      await delay(1000); // Simulate API latency

      const index = localMockData.findIndex((req) => req.id === requestId);
      if (index === -1) throw new Error("Request not found");
      if (localMockData[index].status !== 'Pending') throw new Error("Request is not in Pending state");

      // Update local data
      localMockData[index] = {
        ...localMockData[index],
        status: "Approved",
        approvedAt: new Date().toISOString(),
        approvedBy: "Current Admin", // Mocked user
      };

      return localMockData[index];
    },
    onSuccess: () => {
      // Invalidate queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: ["whitelist-requests"] });
    },
  });
}

export function useRejectWhitelistRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, reason }: { requestId: string; reason: string }) => {
      await delay(1000); // Simulate API latency

      const index = localMockData.findIndex((req) => req.id === requestId);
      if (index === -1) throw new Error("Request not found");
      if (localMockData[index].status !== 'Pending') throw new Error("Request is not in Pending state");

      // Update local data
      localMockData[index] = {
        ...localMockData[index],
        status: "Rejected",
        rejectedAt: new Date().toISOString(),
        rejectedBy: "Current Admin", // Mocked user
        rejectionReason: reason,
      };

      return localMockData[index];
    },
    onSuccess: () => {
      // Invalidate queries to refresh the lists
      queryClient.invalidateQueries({ queryKey: ["whitelist-requests"] });
    },
  });
}
