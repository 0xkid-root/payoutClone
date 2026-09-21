export type WalletStatus = "Active" | "Frozen" | "Suspended" | "Closed";

export interface Wallet {
  id: string;
  merchantId: string;
  merchantName: string;
  walletType: string;
  availableBalance: number;
  holdBalance: number;
  totalBalance: number;
  status: WalletStatus;
  kycStatus: "Pending" | "Verified" | "Rejected";
  transactionEnabled: boolean;
  withdrawalEnabled: boolean;
  creditEnabled: boolean;
  createdAt: string;
  lastActivityAt: string;
  currency: string;
}

export type WalletTransactionStatus = "Pending" | "Processing" | "Success" | "Failed" | "Reversed";
export type WalletTransactionType = "Credit" | "Debit" | "Refund" | "Adjustment" | "Hold" | "Release" | "Payout" | "Withdrawal";

export interface WalletTransaction {
  id: string;
  walletId: string;
  merchantName: string;
  amount: number;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  description: string;
  createdAt: string;
  referenceId: string;
  balanceAfter: number;
  previousBalance: number;
}

export interface WalletLedgerEntry {
  id: string;
  walletId: string;
  transactionId: string;
  date: string;
  type: WalletTransactionType;
  credit: number | null;
  debit: number | null;
  runningBalance: number;
  reference: string;
  status: WalletTransactionStatus;
}

export type RequestStatus = "Pending" | "Approved" | "Rejected" | "Processing" | "Completed";

export interface FundRequest {
  id: string;
  merchantName: string;
  walletId: string;
  amount: number;
  paymentMethod: string;
  requestedDate: string;
  status: RequestStatus;
  reference: string;
}

export interface WithdrawalRequest {
  id: string;
  merchantName: string;
  walletId: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  requestedDate: string;
  status: RequestStatus;
}

export type HoldStatus = "Active" | "Released";

export interface WalletHold {
  id: string;
  merchantName: string;
  walletId: string;
  amount: number;
  reason: string;
  createdDate: string;
  releaseDate: string | null;
  status: HoldStatus;
  createdBy: string;
}

export type AdjustmentStatus = "Pending Approval" | "Approved" | "Rejected";

export interface ManualAdjustment {
  id: string;
  merchantName: string;
  walletId: string;
  type: "Credit" | "Debit";
  amount: number;
  reason: string;
  remarks: string;
  createdBy: string;
  createdDate: string;
  status: AdjustmentStatus;
}

export interface WalletDashboardStats {
  totalBalance: number;
  availableBalance: number;
  holdBalance: number;
  todaysCredits: number;
  creditsComparison: number; // percentage
  todaysDebits: number;
  debitsComparison: number; // percentage
  pendingRequests: number;
}
