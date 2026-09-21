"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FeeType, Slab } from "../../types";

interface FeeCalculationPreviewProps {
  feeType: FeeType;
  percentage?: number;
  flatFee?: number;
  minFee?: number;
  maxFee?: number;
  slabs?: Slab[];
}

const PRESET_AMOUNTS = [100, 1000, 10000, 50000, 100000];

export function FeeCalculationPreview({
  feeType,
  percentage,
  flatFee,
  minFee,
  maxFee,
  slabs,
}: FeeCalculationPreviewProps) {
  const [customAmount, setCustomAmount] = useState<string>("");

  const calculateFee = (amount: number) => {
    if (feeType === "FLAT") {
      return flatFee || 0;
    }

    if (feeType === "PERCENTAGE") {
      let calc = (amount * (percentage || 0)) / 100;
      if (minFee !== undefined && calc < minFee) calc = minFee;
      if (maxFee !== undefined && calc > maxFee) calc = maxFee;
      return calc;
    }

    if (feeType === "SLAB_BASED" && slabs && slabs.length > 0) {
      const slab = slabs.find((s) => amount >= s.minAmount && amount <= s.maxAmount);
      if (!slab) return null;
      if (slab.slabType === "FLAT") return slab.fee || 0;
      return (amount * (slab.percentage || 0)) / 100;
    }

    return 0;
  };

  const amountsToTest = useMemo(() => {
    const custom = parseFloat(customAmount);
    if (!isNaN(custom) && custom > 0 && !PRESET_AMOUNTS.includes(custom)) {
      return [...PRESET_AMOUNTS, custom].sort((a, b) => a - b);
    }
    return PRESET_AMOUNTS;
  }, [customAmount]);

  return (
    <div className="flex flex-col h-full">
      <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Fee Calculation Preview</h3>
      
      <div className="mb-6 space-y-2">
        <Label htmlFor="custom-amount" className="text-xs text-slate-500">Test Custom Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
          <Input
            id="custom-amount"
            type="number"
            placeholder="e.g. 5000"
            className="pl-7 bg-white dark:bg-slate-900"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs font-medium text-slate-500 pb-2 border-b border-slate-200 dark:border-slate-800">
          <span>Transaction Amount</span>
          <span>Calculated Fee</span>
        </div>
        
        {amountsToTest.map((amt) => {
          const fee = calculateFee(amt);
          return (
            <div key={amt} className="flex justify-between text-sm">
              <span className="text-slate-700 dark:text-slate-300">
                ₹{amt.toLocaleString('en-IN')}
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {fee === null ? "Out of range" : `₹${fee.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
