import { TableQueryParams, PageResponse } from "@/types/api";

export interface Beneficiary {
  id: string;
  name: string;
  merchantName: string;
  mid: string;
  accountNumber: string;
  ifsc: string;
  verificationStatus: "Verified" | "Not Verified";
  status: "Active" | "Inactive" | "Deleted";
  createdDate: string;
}

const FIRST_NAMES = ["Rahul", "Priya", "Amit", "Sneha", "Vikram", "Anjali", "Rohan", "Neha", "Karan", "Pooja", "Arjun", "Kavita"];
const LAST_NAMES = ["Sharma", "Patel", "Singh", "Gupta", "Kumar", "Verma", "Reddy", "Jain", "Desai", "Joshi"];
const MERCHANTS = ["Acme Technologies", "Global Supplies", "TechNova Services", "NextGen Solutions", "Apex Retail", "Zenith Corp"];

const generateMockBeneficiaries = (count: number): Beneficiary[] => {
  return Array.from({ length: count }).map((_, i) => {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const merchant = MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)];
    
    // Status distribution: ~80% Active, ~15% Inactive, ~5% Deleted
    const statusRand = Math.random();
    let status: Beneficiary["status"] = "Active";
    if (statusRand > 0.8 && statusRand <= 0.95) status = "Inactive";
    else if (statusRand > 0.95) status = "Deleted";

    // Verification: Active are usually verified. Inactive might not be.
    const verificationStatus = (status === "Active" || Math.random() > 0.5) ? "Verified" : "Not Verified";

    // Random date in the last year
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    const createdDate = date.toISOString().split('T')[0]; // simple YYYY-MM-DD for now, can format in UI

    const accountNum = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const ifsc = `HDFC000${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      id: `BEN-000${1000 + i}`,
      name: `${firstName} ${lastName}`,
      merchantName: merchant,
      mid: `MID-000${100 + Math.floor(Math.random() * 50)}`,
      accountNumber: accountNum,
      ifsc,
      verificationStatus,
      status,
      createdDate,
    };
  });
};

const MOCK_BENEFICIARIES = generateMockBeneficiaries(150);

export async function getBeneficiariesMock(params: TableQueryParams): Promise<PageResponse<Beneficiary>> {
  // Simulate network delay of 400ms
  await new Promise((resolve) => setTimeout(resolve, 400));

  let filtered = [...MOCK_BENEFICIARIES];

  // 1. Apply Search
  if (params.search) {
    const s = params.search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(s) ||
        b.id.toLowerCase().includes(s) ||
        b.merchantName.toLowerCase().includes(s) ||
        b.mid.toLowerCase().includes(s) ||
        b.accountNumber.includes(s) ||
        b.ifsc.toLowerCase().includes(s)
    );
  }

  // 2. Apply Column Filters (Status, Merchant)
  if (params.filters) {
    if (params.filters.status && params.filters.status !== "ALL") {
      filtered = filtered.filter((b) => b.status === params.filters?.status);
    }
  }

  // 3. Apply Sorting
  if (params.sorting && params.sorting.length > 0) {
    const sort = params.sorting[0];
    const key = sort.id as keyof Beneficiary;
    filtered.sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sort.desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
      }
      return 0;
    });
  } else {
    // Default sort by newest createdDate
    filtered.sort((a, b) => b.createdDate.localeCompare(a.createdDate));
  }

  // 4. Apply Pagination
  const pageIndex = params.page ?? 0;
  const pageSize = params.size ?? 20;
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
