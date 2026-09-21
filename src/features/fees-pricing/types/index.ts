export type FeeType = "PERCENTAGE" | "FLAT" | "SLAB_BASED";
export type Status = "ACTIVE" | "INACTIVE";
export type SlabType = "FLAT" | "PERCENTAGE";

export interface Slab {
  minAmount: number;
  maxAmount: number;
  fee?: number;
  percentage?: number;
  slabType: SlabType;
}

export interface FeeConfiguration {
  id: string;
  merchantId: number;
  merchantName?: string;
  feeType: FeeType;
  percentage?: number;
  flatFee?: number;
  minFee?: number;
  maxFee?: number;
  slabs?: Slab[];
  effectiveFrom: string;
  effectiveTo?: string;
  status: Status;
}

export interface PricingHistoryRecord {
  id: string;
  date: string;
  merchantName: string;
  feeType: FeeType;
  previousConfiguration: string;
  newConfiguration: string;
  changedBy: string;
  effectiveFrom: string;
}
