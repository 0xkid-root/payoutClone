export type MerchantStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "BLOCKED" | "REJECTED";

export interface Merchant {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  status: MerchantStatus;
  createdAt: string;
  walletBalance: number;
  totalVolume: number;
  kycStatus: "VERIFIED" | "PENDING" | "REJECTED";
}
