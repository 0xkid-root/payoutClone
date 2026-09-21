import { FeeConfiguration, PricingHistoryRecord } from "../types";

export const MOCK_MERCHANTS = [
  { id: 1, name: "ABC Technologies" },
  { id: 2, name: "Nova Retail Pvt Ltd" },
  { id: 3, name: "FinEdge Solutions" },
  { id: 4, name: "UrbanKart" },
  { id: 5, name: "CloudPay Services" },
];

export const MOCK_FEES: FeeConfiguration[] = [
  {
    id: "FEE-001",
    merchantId: 1,
    merchantName: "ABC Technologies",
    feeType: "PERCENTAGE",
    percentage: 0.50,
    minFee: 2,
    maxFee: 25,
    effectiveFrom: "2026-09-20",
    effectiveTo: "2026-12-31",
    status: "ACTIVE",
  },
  {
    id: "FEE-002",
    merchantId: 2,
    merchantName: "Nova Retail Pvt Ltd",
    feeType: "PERCENTAGE",
    percentage: 0.75,
    minFee: 3,
    maxFee: 50,
    effectiveFrom: "2026-10-01",
    effectiveTo: "2027-10-01",
    status: "ACTIVE",
  },
  {
    id: "FEE-003",
    merchantId: 3,
    merchantName: "FinEdge Solutions",
    feeType: "PERCENTAGE",
    percentage: 1.00,
    minFee: 5,
    maxFee: 100,
    effectiveFrom: "2026-08-15",
    status: "INACTIVE",
  },
  {
    id: "FEE-014",
    merchantId: 1,
    merchantName: "ABC Technologies",
    feeType: "FLAT",
    flatFee: 7,
    effectiveFrom: "2026-09-20",
    effectiveTo: "2026-12-31",
    status: "ACTIVE",
  },
  {
    id: "FEE-015",
    merchantId: 4,
    merchantName: "UrbanKart",
    feeType: "FLAT",
    flatFee: 10,
    effectiveFrom: "2026-10-01",
    status: "ACTIVE",
  },
  {
    id: "FEE-021",
    merchantId: 1,
    merchantName: "ABC Technologies",
    feeType: "SLAB_BASED",
    slabs: [
      { minAmount: 0, maxAmount: 10000, fee: 5, slabType: "FLAT" },
      { minAmount: 10001, maxAmount: 50000, fee: 10, slabType: "FLAT" },
      { minAmount: 50001, maxAmount: 100000, fee: 15, slabType: "FLAT" },
    ],
    effectiveFrom: "2026-09-20",
    effectiveTo: "2026-12-31",
    status: "ACTIVE",
  }
];

export const MOCK_HISTORY: PricingHistoryRecord[] = [
  {
    id: "HIST-001",
    date: "2026-09-20",
    merchantName: "ABC Technologies",
    feeType: "PERCENTAGE",
    previousConfiguration: "0.50% | Min ₹2 | Max ₹25",
    newConfiguration: "0.60% | Min ₹2 | Max ₹30",
    changedBy: "Super Admin",
    effectiveFrom: "2026-09-20",
  },
  {
    id: "HIST-002",
    date: "2026-09-18",
    merchantName: "Nova Retail Pvt Ltd",
    feeType: "FLAT",
    previousConfiguration: "₹5",
    newConfiguration: "₹7",
    changedBy: "Finance Admin",
    effectiveFrom: "2026-10-01",
  }
];

// Helper to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const feesApi = {
  getAll: async (): Promise<FeeConfiguration[]> => {
    await delay(800);
    return [...MOCK_FEES];
  },
  getByType: async (type: "PERCENTAGE" | "FLAT" | "SLAB_BASED"): Promise<FeeConfiguration[]> => {
    await delay(600);
    return MOCK_FEES.filter(f => f.feeType === type);
  },
  getById: async (id: string): Promise<FeeConfiguration | undefined> => {
    await delay(500);
    return MOCK_FEES.find(f => f.id === id);
  },
  getHistory: async (): Promise<PricingHistoryRecord[]> => {
    await delay(700);
    return [...MOCK_HISTORY];
  }
};
