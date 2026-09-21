import { SettlementRecord, ReconciliationRecord, SettlementTransaction } from '../types';

export const MOCK_SETTLEMENTS: SettlementRecord[] = [
  {
    id: 'STL-000123',
    merchantName: 'Apex Industries',
    merchantId: 'M-1001',
    grossAmount: 1275000,
    fees: 20000,
    gst: 3600,
    adjustments: 2900,
    settlementAmount: 1248500,
    transactionCount: 450,
    settlementDate: '2026-09-16T10:00:00Z',
    createdAt: '2026-09-16T09:10:00Z',
    completedAt: '2026-09-16T09:17:00Z',
    provider: 'Razorpay',
    providerReference: 'rzp_stl_123',
    bankReference: 'HDFC12345678',
    utr: 'UTR1234567890',
    status: 'Completed',
  },
  {
    id: 'STL-000124',
    merchantName: 'TechNova Solutions',
    merchantId: 'M-1002',
    grossAmount: 855000,
    fees: 8000,
    gst: 1440,
    adjustments: 360,
    settlementAmount: 845200,
    transactionCount: 120,
    settlementDate: '2026-09-16T11:00:00Z',
    createdAt: '2026-09-16T10:30:00Z',
    provider: 'Cashfree',
    status: 'Processing',
  },
  {
    id: 'STL-000125',
    merchantName: 'Global Retail',
    merchantId: 'M-1003',
    grossAmount: 2200000,
    fees: 40000,
    gst: 7200,
    adjustments: 2800,
    settlementAmount: 2150000,
    transactionCount: 890,
    settlementDate: '2026-09-15T15:00:00Z',
    createdAt: '2026-09-15T14:00:00Z',
    provider: 'ICICI Bank',
    status: 'Failed',
  },
  {
    id: 'STL-000126',
    merchantName: 'NextGen Services',
    merchantId: 'M-1004',
    grossAmount: 125000,
    fees: 1500,
    gst: 270,
    adjustments: 0,
    settlementAmount: 123230,
    transactionCount: 45,
    settlementDate: '2026-09-16T12:00:00Z',
    createdAt: '2026-09-16T11:45:00Z',
    provider: 'Razorpay',
    status: 'Pending',
  },
  {
    id: 'STL-000127',
    merchantName: 'Urban Market',
    merchantId: 'M-1005',
    grossAmount: 560000,
    fees: 8000,
    gst: 1440,
    adjustments: 560,
    settlementAmount: 550000,
    transactionCount: 300,
    settlementDate: '2026-09-14T10:00:00Z',
    createdAt: '2026-09-14T09:00:00Z',
    provider: 'Cashfree',
    status: 'Under Review',
  },
];

export const MOCK_RECONCILIATION: ReconciliationRecord[] = [
  {
    id: 'REC-1001',
    transactionId: 'TXN-99881',
    payoutId: 'PO-55441',
    merchantName: 'Apex Industries',
    internalAmount: 10000,
    internalFee: 150,
    internalNetAmount: 9850,
    internalTimestamp: '2026-09-16T09:12:00Z',
    bankAmount: 10000,
    bankReference: 'BNK-101',
    bankUtr: 'UTR99881',
    bankTimestamp: '2026-09-16T09:14:00Z',
    partnerAmount: 10000,
    partnerReference: 'PTN-101',
    partnerTimestamp: '2026-09-16T09:13:00Z',
    difference: 0,
    status: 'Matched',
    reconciledAt: '2026-09-16T10:00:00Z',
  },
  {
    id: 'REC-1002',
    transactionId: 'TXN-99882',
    payoutId: 'PO-55442',
    merchantName: 'TechNova Solutions',
    internalAmount: 10000,
    internalFee: 150,
    internalNetAmount: 9850,
    internalTimestamp: '2026-09-16T09:15:00Z',
    bankAmount: 9900,
    bankReference: 'BNK-102',
    bankUtr: 'UTR99882',
    bankTimestamp: '2026-09-16T09:20:00Z',
    partnerAmount: 9900,
    partnerReference: 'PTN-102',
    partnerTimestamp: '2026-09-16T09:18:00Z',
    difference: 100,
    status: 'Mismatch',
    reconciledAt: '2026-09-16T10:00:00Z',
  },
  {
    id: 'REC-1003',
    transactionId: 'TXN-99883',
    payoutId: 'PO-55443',
    merchantName: 'Global Retail',
    internalAmount: 50000,
    internalFee: 750,
    internalNetAmount: 49250,
    internalTimestamp: '2026-09-16T09:30:00Z',
    bankAmount: 0,
    bankReference: '',
    bankUtr: '',
    bankTimestamp: '',
    partnerAmount: 50000,
    partnerReference: 'PTN-103',
    partnerTimestamp: '2026-09-16T09:35:00Z',
    difference: 50000,
    status: 'Pending Review',
    reconciledAt: '2026-09-16T10:00:00Z',
  },
];

export const MOCK_TRANSACTIONS: SettlementTransaction[] = [
  {
    id: 'TXN-001',
    payoutId: 'PO-001',
    merchantName: 'Apex Industries',
    amount: 10000,
    fee: 150,
    netAmount: 9850,
    status: 'Success',
    processedAt: '2026-09-16T09:10:00Z'
  },
  {
    id: 'TXN-002',
    payoutId: 'PO-002',
    merchantName: 'Apex Industries',
    amount: 25000,
    fee: 375,
    netAmount: 24625,
    status: 'Success',
    processedAt: '2026-09-16T09:11:00Z'
  },
];

export const getSettlements = async (params: { page: number, limit: number, status?: string }) => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate latency
  
  let data = MOCK_SETTLEMENTS;
  if (params.status && params.status !== 'All') {
    data = data.filter(s => s.status === params.status);
  }
  
  const start = (params.page - 1) * params.limit;
  const end = start + params.limit;
  return {
    data: data.slice(start, end),
    total: data.length
  };
};

export const getSettlementById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return MOCK_SETTLEMENTS.find(s => s.id === id);
};

export const getReconciliations = async (params: { page: number, limit: number, status?: string }) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let data = MOCK_RECONCILIATION;
  if (params.status && params.status !== 'All') {
    data = data.filter(s => s.status === params.status);
  }
  
  const start = (params.page - 1) * params.limit;
  const end = start + params.limit;
  return {
    data: data.slice(start, end),
    total: data.length
  };
};

export const getReconciliationById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return MOCK_RECONCILIATION.find(s => s.id === id);
};

export const formatCurrency = (amount: number) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
