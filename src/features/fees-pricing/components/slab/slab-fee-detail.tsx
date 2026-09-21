"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { useFee } from "../../hooks/useFees";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { FeeCalculationPreview } from "../shared/fee-calculation-preview";

export function SlabFeeDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { data: fee, isLoading } = useFee(id);

  if (isLoading) {
    return <div className="p-8 text-center">Loading fee details...</div>;
  }

  if (!fee) {
    return <div className="p-8 text-center text-red-500">Fee configuration not found.</div>;
  }

  return (
    <div className="flex flex-col gap-6 pb-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Link href="/fees-pricing/slab" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="text-sm font-medium text-slate-500">Back to Slab Fees</span>
      </div>

      <PageHeader
        title={`Fee Configuration ${fee.id}`}
        description="View details for this slab-based pricing rule."
        actions={
          <div className="flex gap-3">
            <Button variant="outline" className="h-10 rounded-xl">
              {fee.status === "ACTIVE" ? "Deactivate" : "Activate"}
            </Button>
            <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 p-6 lg:border-r lg:border-slate-200 lg:dark:border-slate-800">
            <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Configuration Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Merchant</p>
                <p className="font-medium text-slate-900 dark:text-white">{fee.merchantName}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Fee Type</p>
                <p className="font-medium text-slate-900 dark:text-white capitalize">{fee.feeType.toLowerCase().replace('_', ' ')}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Status</p>
                <StatusBadge status={fee.status} />
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Effective From</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {new Date(fee.effectiveFrom).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Effective To</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {fee.effectiveTo
                    ? new Date(fee.effectiveTo).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "No end date"}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <h4 className="text-md font-semibold text-slate-900 dark:text-white mb-4">Pricing Slabs</h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-medium">
                    <tr>
                      <th className="px-4 py-3">Min Amount</th>
                      <th className="px-4 py-3">Max Amount</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3 text-right">Fee / %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {fee.slabs?.map((slab, i) => (
                      <tr key={i} className="bg-white dark:bg-slate-900 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="px-4 py-3">₹{slab.minAmount.toLocaleString()}</td>
                        <td className="px-4 py-3">₹{slab.maxAmount.toLocaleString()}</td>
                        <td className="px-4 py-3 capitalize">{slab.slabType.toLowerCase()}</td>
                        <td className="px-4 py-3 text-right font-medium">
                          {slab.slabType === "FLAT" ? `₹${slab.fee}` : `${slab.percentage}%`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 bg-slate-50/50 dark:bg-slate-900/20 p-6">
            <div className="sticky top-6">
              <FeeCalculationPreview
                feeType="SLAB_BASED"
                slabs={fee.slabs}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
