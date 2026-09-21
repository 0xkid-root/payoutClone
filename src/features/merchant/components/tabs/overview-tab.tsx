import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewTab({ merchant, onTabChange }: { merchant: Merchant; onTabChange: (tab: string) => void }) {
  const date = new Date(merchant.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric"
  });

  return (
    <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
      {/* Merchant Information Section */}
      <div>
        <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Merchant Information</h3>
        </div>
        <div className="p-0">
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Merchant Name</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.ownerName}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Merchant ID / MID</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.merchantCode}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Email</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.email}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Mobile</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.mobile}</span>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span className="text-[13px] text-slate-500">Created Date</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{date}</span>
          </div>
        </div>
      </div>

      {/* Account Status Section */}
      <div>
        <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Account Status</h3>
          <button onClick={() => onTabChange("kyc")} className="text-xs font-medium text-primary hover:underline">
            View KYC details
          </button>
        </div>
        <div className="p-0">
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">Merchant Status</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.status}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[13px] text-slate-500">KYC Status</span>
            <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.kycStatus === "APPROVED" ? "Verified" : merchant.kycStatus}</span>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span className="text-[13px] text-slate-500">Onboarding</span>
            <span className="text-[13px] font-medium text-emerald-600">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
