import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CircleDashed } from "lucide-react";

export function KycTab({ merchant }: { merchant: Merchant }) {
  const isApproved = merchant.kycStatus === "APPROVED";

  return (
    <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 border-border">
      {/* Onboarding Progress Section */}
      <div>
        <div className="px-5 py-4 bg-slate-50/50 bg-background/20 border-b border-slate-100 border-border">
          <h3 className="text-sm font-semibold text-foreground dark:text-white">Onboarding Progress</h3>
        </div>
        <div className="p-0">
          <div className="flex items-center justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Basic Details</span>
            <span className="flex items-center text-[13px] font-medium text-emerald-600">
              <CheckCircle2 className="mr-1.5 h-4 w-4" /> Completed
            </span>
          </div>
          <div className="flex items-center justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Business Details</span>
            <span className="flex items-center text-[13px] font-medium text-emerald-600">
              <CheckCircle2 className="mr-1.5 h-4 w-4" /> Completed
            </span>
          </div>
          <div className="flex items-center justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Business Documents</span>
            <span className="flex items-center text-[13px] font-medium text-emerald-600">
              <CheckCircle2 className="mr-1.5 h-4 w-4" /> Completed
            </span>
          </div>
          <div className="flex items-center justify-between py-3 px-5">
            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">KYC Details</span>
            {isApproved ? (
              <span className="flex items-center text-[13px] font-medium text-emerald-600">
                <CheckCircle2 className="mr-1.5 h-4 w-4" /> Completed
              </span>
            ) : (
              <span className="flex items-center text-[13px] font-medium text-amber-500">
                <CircleDashed className="mr-1.5 h-4 w-4 animate-pulse" /> Pending
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Verified Documents Section */}
      <div>
        <div className="px-5 py-4 bg-slate-50/50 bg-background/20 border-b border-slate-100 border-border">
          <h3 className="text-sm font-semibold text-foreground dark:text-white">Verified Documents</h3>
        </div>
        <div className="p-0">
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] text-muted-foreground">PAN</span>
            <div className="flex flex-col items-end">
              <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.pan}</span>
              <span className="text-[11px] text-emerald-600 font-medium">Verified</span>
            </div>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] text-muted-foreground">GST</span>
            <div className="flex flex-col items-end">
              <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.gst}</span>
              <span className="text-[11px] text-emerald-600 font-medium">Verified</span>
            </div>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span className="text-[13px] text-muted-foreground">Bank Account</span>
            <div className="flex flex-col items-end">
              <span className="text-[13px] font-medium text-foreground dark:text-white">•••• 4821</span>
              <span className="text-[11px] text-emerald-600 font-medium">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
