export type SettlementStatus = 'Completed' | 'Processing' | 'Pending' | 'Failed' | 'Under Review';

export type ReconciliationStatus = 'Matched' | 'Mismatch' | 'Pending Review' | 'Resolved';

export interface SettlementRecord {
  id: string; // Settlement ID
  merchantName: string;
  merchantId: string;
  settlementAmount: number; // Net Settlement
  grossAmount: number;
  fees: number;
  gst: number;
  adjustments: number;
  transactionCount: number;
  settlementDate: string;
  createdAt: string;
  completedAt?: string;
  provider: string; // e.g. "Razorpay", "Cashfree", "ICICI Bank"
  providerReference?: string;
  bankReference?: string;
  utr?: string;
  status: SettlementStatus;
}

export interface SettlementTransaction {
  id: string;
  payoutId: string;
  merchantName: string;
  amount: number;
  fee: number;
  netAmount: number;
  status: 'Success' | 'Failed' | 'Processing';
  processedAt: string;
}

export interface ReconciliationRecord {
  id: string;
  transactionId: string;
  payoutId: string;
  merchantName: string;
  internalAmount: number;
  internalFee: number;
  internalNetAmount: number;
  internalTimestamp: string;
  
  bankAmount: number;
  bankReference: string;
  bankUtr: string;
  bankTimestamp: string;
  
  partnerAmount: number;
  partnerReference: string;
  partnerTimestamp: string;
  
  difference: number;
  status: ReconciliationStatus;
  reconciledAt: string;
}

export interface SettlementDashboardStats {
  todaySettlement: number;
  pendingSettlement: number;
  completedSettlement: number;
  reconciliationDifference: number;
}

export interface ReconciliationHealthStats {
  matchedPercent: number;
  mismatchPercent: number;
  pendingReviewPercent: number;
}

export interface SettlementStatusDistribution {
  status: SettlementStatus;
  amount: number;
  percentage: number;
}
