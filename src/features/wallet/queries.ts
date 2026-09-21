import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Wallet,
  WalletTransaction,
  WalletLedgerEntry,
  FundRequest,
  WithdrawalRequest,
  WalletHold,
  ManualAdjustment,
} from "./types/wallet.types";
import {
  mockWallets,
  mockTransactions,
  mockLedgerEntries,
  mockFundRequests,
  mockWithdrawalRequests,
  mockWalletHolds,
  mockManualAdjustments,
  mockWalletStats,
  mockFlowData,
} from "./data/mock-data";

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- QUERIES ---

export function useWalletStatsQuery() {
  return useQuery({
    queryKey: ["wallet-stats"],
    queryFn: async () => {
      await delay(600);
      return mockWalletStats;
    },
  });
}

export function useWalletFlowQuery() {
  return useQuery({
    queryKey: ["wallet-flow"],
    queryFn: async () => {
      await delay(800);
      return mockFlowData;
    },
  });
}

export function useWalletsQuery() {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: async () => {
      await delay(1000);
      return mockWallets;
    },
  });
}

export function useWalletQuery(walletId: string) {
  return useQuery({
    queryKey: ["wallet", walletId],
    queryFn: async () => {
      await delay(600);
      const wallet = mockWallets.find((w) => w.id === walletId);
      if (!wallet) throw new Error("Wallet not found");
      return wallet;
    },
    enabled: !!walletId,
  });
}

export function useTransactionsQuery(walletId?: string) {
  return useQuery({
    queryKey: ["wallet-transactions", walletId],
    queryFn: async () => {
      await delay(800);
      if (walletId) {
        return mockTransactions.filter((t) => t.walletId === walletId);
      }
      return mockTransactions;
    },
  });
}

export function useLedgerQuery(walletId?: string) {
  return useQuery({
    queryKey: ["wallet-ledger", walletId],
    queryFn: async () => {
      await delay(1000);
      if (walletId) {
        return mockLedgerEntries.filter((l) => l.walletId === walletId);
      }
      return mockLedgerEntries;
    },
  });
}

export function useFundRequestsQuery() {
  return useQuery({
    queryKey: ["fund-requests"],
    queryFn: async () => {
      await delay(700);
      return mockFundRequests;
    },
  });
}

export function useWithdrawalRequestsQuery() {
  return useQuery({
    queryKey: ["withdrawal-requests"],
    queryFn: async () => {
      await delay(700);
      return mockWithdrawalRequests;
    },
  });
}

export function useWalletHoldsQuery(walletId?: string) {
  return useQuery({
    queryKey: ["wallet-holds", walletId],
    queryFn: async () => {
      await delay(600);
      if (walletId) {
        return mockWalletHolds.filter((h) => h.walletId === walletId);
      }
      return mockWalletHolds;
    },
  });
}

export function useManualAdjustmentsQuery(walletId?: string) {
  return useQuery({
    queryKey: ["wallet-adjustments", walletId],
    queryFn: async () => {
      await delay(600);
      if (walletId) {
        return mockManualAdjustments.filter((a) => a.walletId === walletId);
      }
      return mockManualAdjustments;
    },
  });
}

// --- MUTATIONS ---

export function useApproveFundRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requestId: string) => {
      await delay(1500); // Simulate processing time
      return requestId;
    },
    onSuccess: (requestId) => {
      // In a real app, we would invalidate the query
      // queryClient.invalidateQueries({ queryKey: ["fund-requests"] });
      toast.success("Fund request approved successfully.", {
        description: `Request ID: ${requestId} has been processed.`,
      });
    },
    onError: () => {
      toast.error("Failed to approve fund request.");
    },
  });
}

export function useRejectFundRequest() {
  return useMutation({
    mutationFn: async (requestId: string) => {
      await delay(1000);
      return requestId;
    },
    onSuccess: () => {
      toast.success("Fund request rejected.");
    },
  });
}

export function useCreateManualAdjustment() {
  return useMutation({
    mutationFn: async (data: Partial<ManualAdjustment>) => {
      await delay(1500);
      return data;
    },
    onSuccess: () => {
      toast.success("Adjustment submitted for approval.", {
        description: "It has been added to the pending review queue.",
      });
    },
  });
}

export function useReleaseHold() {
  return useMutation({
    mutationFn: async (holdId: string) => {
      await delay(1200);
      return holdId;
    },
    onSuccess: () => {
      toast.success("Wallet hold released successfully.", {
        description: "The funds are now available in the merchant's wallet.",
      });
    },
  });
}

export function useFreezeWallet() {
  return useMutation({
    mutationFn: async (walletId: string) => {
      await delay(1500);
      return walletId;
    },
    onSuccess: () => {
      toast.success("Wallet frozen successfully.", {
        description: "All outgoing transactions have been blocked.",
      });
    },
  });
}
