export type WhitelistRequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface WhitelistRequest {
  id: string;
  merchantId: string;
  merchantName: string;
  businessName: string;
  
  // Bank Account Information
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  accountType: 'Current' | 'Savings' | 'Nodal';
  
  // Document
  documentUrl: string;
  documentType: 'Passbook' | 'Cancelled Cheque';
  
  // Status and Timestamps
  status: WhitelistRequestStatus;
  requestedAt: string;
  submittedBy: string;
  
  // Approvals/Rejections
  approvedAt?: string;
  approvedBy?: string;
  rejectedAt?: string;
  rejectedBy?: string;
  rejectionReason?: string;
}

export interface WhitelistPaginationParams {
  page: number;
  size: number;
}

export interface WhitelistFilters {
  status?: WhitelistRequestStatus;
  search?: string;
}

export interface PaginatedWhitelistResponse {
  data: WhitelistRequest[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
