import { WalletTransaction, WalletOverview } from "../types/wallet.types";
import { MOCK_WALLET_OVERVIEW, MOCK_WALLET_TRANSACTIONS } from "../data/mock-wallets";

export const WalletService = {
  getOverview: async (): Promise<WalletOverview> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_WALLET_OVERVIEW;
  },

  getTransactions: async (): Promise<WalletTransaction[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_WALLET_TRANSACTIONS;
  },
};
