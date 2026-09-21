import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessTab({ merchant }: { merchant: Merchant }) {
  return (
    <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
      {/* Business Details Section */}
      <div>
        <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Business Details</h3>
        </div>
        <div className="p-0">
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Legal Business Name</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.businessName}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Trade Name</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.businessName}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Business Type</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.businessType}</span>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span className="text-[13px] text-slate-500">Industry</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">Technology / Software</span>
          </div>
        </div>
      </div>

      {/* Registered Address Section */}
      <div>
        <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Registered Address</h3>
        </div>
        <div className="p-0">
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Address Line 1</span>
            <span className="text-[13px] font-medium text-right max-w-[200px] text-slate-900 dark:text-white">{merchant.registeredAddress}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">City</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.city}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">State</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.state}</span>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span className="text-[13px] text-slate-500">Pincode</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.pincode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
