import { Merchant } from "../types/merchant.types";
import { MOCK_MERCHANTS } from "../data/mock-merchants";

export const MerchantService = {
  getMerchants: async (): Promise<Merchant[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_MERCHANTS;
  },

  getMerchantById: async (id: string): Promise<Merchant | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_MERCHANTS.find((m) => m.id === id);
  },
};
