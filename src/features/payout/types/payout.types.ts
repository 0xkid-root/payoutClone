export type PayoutStatus =
  | "Requested"
  | "Approved"
  | "Processing"
  | "Success"
  | "Failed"
  | "Retry Queued"
  | "Cancelled";

export type PayoutMethod = "IMPS" | "NEFT" | "RTGS" | "UPI";

export interface PayoutRecord {
  id: string;
  merchantId: string;
  merchantName: string;
  businessName: string;
  beneficiaryId?: string;
  beneficiaryName: string;
  accountNumber?: string;
  bankName?: string;
  ifsc?: string;
  amount: number;
  fee: number;
  netAmount: number;
  method: PayoutMethod;
  status: PayoutStatus;
  requestedAt: string; // ISO 8601 string
  processedAt?: string; // ISO 8601 string
  failureReason?: string;
  retryCount?: number;
  lastAttempt?: string;
  nextRetry?: string;
  provider?: string;
  providerReference?: string;
  responseCode?: string;
}

export interface PayoutQueryParams {
  page: number;
  size: number;
  search?: string;
  status?: PayoutStatus | "All";
  method?: PayoutMethod | "All";
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

export interface PaginatedPayoutResponse {
  data: PayoutRecord[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface SinglePayoutFormValues {
  merchantId: string;
  beneficiaryId: string;
  amount: number;
  method: PayoutMethod;
  reference?: string;
  remarks?: string;
}

export interface DirectPayoutFormValues {
  merchantId: string;
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  amount: number;
  method: PayoutMethod;
  reference?: string;
  remarks?: string;
}

export interface BulkPayoutUploadResponse {
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  duplicateRecords: number;
  preview: Array<{
    row: number;
    merchantId: string;
    beneficiaryId: string;
    amount: number;
    method: PayoutMethod;
    validationStatus: "Valid" | "Invalid" | "Duplicate";
    error?: string;
  }>;
}
