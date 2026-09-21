import { WhitelistRequest } from "../types/wallet-whitelist.types";

export const mockWhitelistRequests: WhitelistRequest[] = [
  // PENDING REQUESTS
  {
    id: "WL-REQ-1001",
    merchantId: "M_1017",
    merchantName: "ABC Technologies Pvt Ltd",
    businessName: "ABC Tech Solutions",
    accountHolderName: "ABC Technologies Pvt Ltd",
    accountNumber: "50200012345678",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank",
    accountType: "Current",
    documentUrl: "/docs/wl-1001.pdf",
    documentType: "Cancelled Cheque",
    status: "Pending",
    requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    submittedBy: "merchant_admin_1017",
  },
  {
    id: "WL-REQ-1004",
    merchantId: "M_1042",
    merchantName: "Nova Retail Solutions",
    businessName: "Nova Retail",
    accountHolderName: "Nova Retail Solutions",
    accountNumber: "912020012345678",
    ifsc: "UTIB0000012",
    bankName: "Axis Bank",
    accountType: "Current",
    documentUrl: "/docs/wl-1004.pdf",
    documentType: "Passbook",
    status: "Pending",
    requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    submittedBy: "merchant_admin_1042",
  },
  {
    id: "WL-REQ-1007",
    merchantId: "M_1055",
    merchantName: "TechFlow Innovations",
    businessName: "TechFlow",
    accountHolderName: "TechFlow Innovations",
    accountNumber: "302010445566",
    ifsc: "SBIN0004321",
    bankName: "State Bank of India",
    accountType: "Current",
    documentUrl: "/docs/wl-1007.pdf",
    documentType: "Cancelled Cheque",
    status: "Pending",
    requestedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    submittedBy: "merchant_admin_1055",
  },

  // APPROVED REQUESTS
  {
    id: "WL-REQ-0998",
    merchantId: "M_1012",
    merchantName: "Global Trade Co",
    businessName: "Global Trade",
    accountHolderName: "Global Trade Co",
    accountNumber: "001205001234",
    ifsc: "ICIC0000012",
    bankName: "ICICI Bank",
    accountType: "Current",
    documentUrl: "/docs/wl-0998.pdf",
    documentType: "Cancelled Cheque",
    status: "Approved",
    requestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    submittedBy: "merchant_admin_1012",
    approvedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    approvedBy: "Admin User",
  },
  {
    id: "WL-REQ-0985",
    merchantId: "M_1005",
    merchantName: "BrightPay Services",
    businessName: "BrightPay",
    accountHolderName: "BrightPay Services",
    accountNumber: "100203040506",
    ifsc: "KKBK0001234",
    bankName: "Kotak Mahindra Bank",
    accountType: "Current",
    documentUrl: "/docs/wl-0985.pdf",
    documentType: "Passbook",
    status: "Approved",
    requestedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    submittedBy: "merchant_admin_1005",
    approvedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
    approvedBy: "Admin User",
  },
  {
    id: "WL-REQ-0972",
    merchantId: "M_1088",
    merchantName: "Nexus Digital Commerce",
    businessName: "Nexus Digital",
    accountHolderName: "Nexus Digital Commerce",
    accountNumber: "223344556677",
    ifsc: "YESB0001234",
    bankName: "Yes Bank",
    accountType: "Nodal",
    documentUrl: "/docs/wl-0972.pdf",
    documentType: "Cancelled Cheque",
    status: "Approved",
    requestedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    submittedBy: "merchant_admin_1088",
    approvedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    approvedBy: "Super Admin",
  },

  // REJECTED REQUESTS
  {
    id: "WL-REQ-1002",
    merchantId: "M_1020",
    merchantName: "Demo Commerce Pvt Ltd",
    businessName: "Demo Commerce",
    accountHolderName: "John Doe",
    accountNumber: "112233445566",
    ifsc: "HDFC0009999",
    bankName: "HDFC Bank",
    accountType: "Savings",
    documentUrl: "/docs/wl-1002.pdf",
    documentType: "Passbook",
    status: "Rejected",
    requestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    submittedBy: "merchant_admin_1020",
    rejectedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    rejectedBy: "Admin User",
    rejectionReason: "Account holder name does not match the registered business entity name. Please provide an account registered under the business name.",
  },
  {
    id: "WL-REQ-0995",
    merchantId: "M_1033",
    merchantName: "Pioneer Trading",
    businessName: "Pioneer Trading",
    accountHolderName: "Pioneer Trading",
    accountNumber: "998877665544",
    ifsc: "ICIC0008888",
    bankName: "ICICI Bank",
    accountType: "Current",
    documentUrl: "/docs/wl-0995.pdf",
    documentType: "Cancelled Cheque",
    status: "Rejected",
    requestedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    submittedBy: "merchant_admin_1033",
    rejectedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    rejectedBy: "Super Admin",
    rejectionReason: "The uploaded cancelled cheque is blurry and illegible. Please upload a clear, scanned copy.",
  }
];
