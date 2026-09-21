import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { VanAccount, VanQueryParams, PaginatedVanResponse, VanStatus } from "../types/van.types";
import { MOCK_VANS } from "../mock/van.mock";

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Keep mutable local data for session
let localVansData = [...MOCK_VANS];

export function useVansQuery(params: VanQueryParams) {
  return useQuery({
    queryKey: ["vans", params],
    queryFn: async (): Promise<PaginatedVanResponse> => {
      await delay(600); // Fake API latency

      let filteredData = [...localVansData];

      // 1. Search Filter
      if (params.search) {
        const query = params.search.toLowerCase();
        filteredData = filteredData.filter(
          (van) =>
            van.vanNumber.includes(query) ||
            van.merchantName.toLowerCase().includes(query) ||
            van.merchantId.toLowerCase().includes(query)
        );
      }

      // 2. Status Filter
      if (params.status && params.status !== "All") {
        filteredData = filteredData.filter((van) => van.status === params.status);
      }

      // 3. Provider Filter
      if (params.provider && params.provider !== "All") {
        filteredData = filteredData.filter((van) => van.provider === params.provider);
      }

      // 4. Sorting
      if (params.sortBy) {
        const sortField = params.sortBy as keyof VanAccount;
        const dir = params.sortDir === "asc" ? 1 : -1;

        filteredData.sort((a, b) => {
          const valA = a[sortField];
          const valB = b[sortField];

          if (!valA && !valB) return 0;
          if (!valA) return 1 * dir;
          if (!valB) return -1 * dir;

          if (typeof valA === "string" && typeof valB === "string") {
            return valA.localeCompare(valB) * dir;
          }
          if (valA < valB) return -1 * dir;
          if (valA > valB) return 1 * dir;
          return 0;
        });
      }

      // 5. Pagination
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

export function useVanQuery(id: string) {
  return useQuery({
    queryKey: ["van", id],
    queryFn: async (): Promise<VanAccount> => {
      await delay(400); // Fake API latency
      const van = localVansData.find((v) => v.id === id);
      if (!van) throw new Error("VAN not found");
      return van;
    },
    enabled: !!id,
  });
}

export function useUpdateVanStatusMutation() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: VanStatus }) => {
      await delay(800); // Fake API Latency

      const index = localVansData.findIndex(van => van.id === id);
      if (index === -1) throw new Error("VAN not found");

      localVansData[index] = {
        ...localVansData[index],
        status,
        lastActivityAt: new Date().toISOString(),
      };

      return localVansData[index];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vans"] });
    },
  });
}
