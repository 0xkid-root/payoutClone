import { TableQueryParams } from "@/types/api";

export const queryKeys = {
  merchants: {
    all: () => ["merchants"] as const,
    list: (params: TableQueryParams) => ["merchants", "list", params] as const,
    detail: (id: string) => ["merchants", "detail", id] as const,
  },
  // Future domains
  // payouts: { ... },
  // transactions: { ... },
};
