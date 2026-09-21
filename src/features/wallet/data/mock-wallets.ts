import { WalletTransaction, WalletOverview } from "../types/wallet.types";

export const MOCK_WALLET_OVERVIEW: WalletOverview = {
  merchantId: "M-1001",
  availableBalance: 25000000, // 2.5 Cr in paise (actually let's just use raw numbers and format them later)
  holdBalance: 150000,
  totalCredits: 150000000,
  totalDebits: 125000000,
};

export const MOCK_WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "WTX-99881",
    merchantId: "M-1001",
    amount: 50000,
    type: "DEBIT",
    status: "SUCCESS",
    description: "Payout to Beneficiary (Ravi)",
    createdAt: "2024-03-10T10:30:00Z",
    referenceId: "PO-45672",
    balanceAfter: 24950000,
  },
  {
    id: "WTX-99882",
    merchantId: "M-1001",
    amount: 1000000,
    type: "CREDIT",
    status: "SUCCESS",
    description: "Fund Request Approved",
    createdAt: "2024-03-09T14:20:00Z",
    referenceId: "FR-10293",
    balanceAfter: 25000000,
  },
  {
    id: "WTX-99883",
    merchantId: "M-1002",
    amount: 25000,
    type: "DEBIT",
    status: "PENDING",
    description: "Payout Processing",
    createdAt: "2024-03-10T11:15:00Z",
    referenceId: "PO-45673",
    balanceAfter: 24975000,
  },
  {
    id: "WTX-99884",
    merchantId: "M-1004",
    amount: 5000,
    type: "DEBIT",
    status: "FAILED",
    description: "Payout Failed - Insufficient Balance",
    createdAt: "2024-03-08T09:45:00Z",
    referenceId: "PO-45660",
    balanceAfter: 120000,
  },
  {
    id: "WTX-99885",
    merchantId: "M-1001",
    amount: 5000,
    type: "CREDIT",
    status: "REVERSED",
    description: "Reversal for Failed Payout (PO-45660)",
    createdAt: "2024-03-08T10:00:00Z",
    referenceId: "REV-45660",
    balanceAfter: 25005000,
  },
];
