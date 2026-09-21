import { TableQueryParams, PageResponse } from "@/types/api";

export interface Merchant {
  id: string;
  merchantCode: string;
  businessName: string;
  ownerName: string;
  email: string;
  mobile: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  kycStatus: "APPROVED" | "PENDING" | "REJECTED";
  createdAt: string;
  walletBalance: number;
  businessType: string;
  totalBeneficiaries: number;
  totalPayouts: number;
  successfulPayouts: number;
  completionPercentage: number;
  // Detail level mock info
  registeredAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
  pan?: string;
  gst?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

const BUSINESS_TYPES = ["Private Limited", "Proprietorship", "Partnership", "Public Limited", "LLP"];
const CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"];

// Generate 85 dummy merchants for realistic pagination
const generateMockMerchants = (): Merchant[] => {
  return Array.from({ length: 85 }).map((_, i) => {
    const statusRand = Math.random();
    let status: Merchant["status"] = "ACTIVE";
    if (statusRand > 0.8 && statusRand <= 0.95) status = "INACTIVE";
    else if (statusRand > 0.95) status = "SUSPENDED";

    const kycRand = Math.random();
    let kycStatus: Merchant["kycStatus"] = "APPROVED";
    if (kycRand > 0.7 && kycRand <= 0.9) kycStatus = "PENDING";
    else if (kycRand > 0.9) kycStatus = "REJECTED";

    // If active, typically kyc is approved
    if (status === "ACTIVE" && Math.random() > 0.2) {
      kycStatus = "APPROVED";
    }

    const successfulPayouts = Math.floor(Math.random() * 5000) + 100;
    const totalPayouts = successfulPayouts + Math.floor(Math.random() * 500); // Amount in rupees roughly

    // Completion is usually 100% if active, otherwise random 30-99%
    let completionPercentage = Math.floor(Math.random() * 70) + 30;
    if (status === "ACTIVE" && kycStatus === "APPROVED") {
      completionPercentage = 100;
    } else if (kycStatus === "PENDING") {
      completionPercentage = Math.floor(Math.random() * 20) + 70; // 70-89%
    }

    return {
      id: `m_${1000 + i}`,
      merchantCode: `MID-${20000 + i}`,
      businessName: `Business Enterprise ${i + 1}`,
      ownerName: `Owner Name ${i + 1}`,
      email: `contact${i + 1}@business.com`,
      mobile: `+91 98765${(40000 + i).toString().substring(0, 5)}`,
      status,
      kycStatus,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      walletBalance: Math.floor(Math.random() * 500000),
      businessType: BUSINESS_TYPES[i % BUSINESS_TYPES.length],
      totalBeneficiaries: Math.floor(Math.random() * 500),
      totalPayouts: totalPayouts * 1500, // Roughly 1.5k average per payout
      successfulPayouts,
      completionPercentage,
      registeredAddress: `${Math.floor(Math.random() * 999)}, Business Park, Phase ${i % 4 + 1}`,
      city: CITIES[i % CITIES.length],
      state: "Maharashtra",
      pincode: `40000${i % 9 + 1}`,
      pan: `ABCDE${Math.floor(1000 + Math.random() * 9000)}F`,
      gst: `27ABCDE${Math.floor(1000 + Math.random() * 9000)}F1Z5`,
      bankName: i % 2 === 0 ? "HDFC Bank" : "ICICI Bank",
      accountNumber: `50100${Math.floor(100000 + Math.random() * 900000)}`,
      ifscCode: i % 2 === 0 ? "HDFC0001234" : "ICIC0005678",
    };
  });
};

const MOCK_MERCHANTS: Merchant[] = generateMockMerchants();

export async function getMerchantsMock(params: TableQueryParams): Promise<PageResponse<Merchant>> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  let filtered = [...MOCK_MERCHANTS];

  // 1. Apply Search
  if (params.search) {
    const s = params.search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.businessName.toLowerCase().includes(s) ||
        m.merchantCode.toLowerCase().includes(s) ||
        m.email.toLowerCase().includes(s) ||
        m.mobile.includes(s)
    );
  }

  // 2. Apply Filters
  if (params.filters) {
    if (params.filters.status && params.filters.status !== "ALL") {
      filtered = filtered.filter((m) => m.status === params.filters?.status);
    }
    if (params.filters.kycStatus && params.filters.kycStatus !== "ALL") {
      filtered = filtered.filter((m) => m.kycStatus === params.filters?.kycStatus);
    }
  }

  // 3. Apply Sorting
  if (params.sorting && params.sorting.length > 0) {
    const sort = params.sorting[0];
    const key = sort.id as keyof Merchant;
    filtered.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sort.desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sort.desc ? bVal - aVal : aVal - bVal;
      }
      return 0;
    });
  } else {
    // Default sort by newest createdAt
    filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  // 4. Apply Pagination
  const pageIndex = params.page ?? 0;
  const pageSize = params.size ?? 10;
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  
  const pagedData = filtered.slice(start, end);
  const totalElements = filtered.length;
  const totalPages = Math.ceil(totalElements / pageSize);

  return {
    content: pagedData,
    page: pageIndex,
    size: pageSize,
    totalElements,
    totalPages,
  };
}

export async function getMerchantDetailsMock(id: string): Promise<Merchant | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const merchant = MOCK_MERCHANTS.find((m) => m.id === id || m.merchantCode === id);
  return merchant || null;
}
