import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessTab({ merchant }: { merchant: Merchant }) {
  return (
    <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 border-border">
      {/* Business Details Section */}
      <div>
        <div className="px-5 py-4 bg-slate-50/50 bg-background/20 border-b border-slate-100 border-border">
          <h3 className="text-sm font-semibold text-foreground dark:text-white">Business Details</h3>
        </div>
        <div className="p-0">
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] text-muted-foreground">Legal Business Name</span>
            <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.businessName}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] text-muted-foreground">Trade Name</span>
            <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.businessName}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] text-muted-foreground">Business Type</span>
            <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.businessType}</span>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span className="text-[13px] text-muted-foreground">Industry</span>
            <span className="text-[13px] font-medium text-foreground dark:text-white">Technology / Software</span>
          </div>
        </div>
      </div>

      {/* Registered Address Section */}
      <div>
        <div className="px-5 py-4 bg-slate-50/50 bg-background/20 border-b border-slate-100 border-border">
          <h3 className="text-sm font-semibold text-foreground dark:text-white">Registered Address</h3>
        </div>
        <div className="p-0">
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] text-muted-foreground">Address Line 1</span>
            <span className="text-[13px] font-medium text-right max-w-[200px] text-foreground dark:text-white">{merchant.registeredAddress}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] text-muted-foreground">City</span>
            <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.city}</span>
          </div>
          <div className="flex justify-between py-3 px-5 border-b border-slate-100 border-border">
            <span className="text-[13px] text-muted-foreground">State</span>
            <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.state}</span>
          </div>
          <div className="flex justify-between py-3 px-5">
            <span className="text-[13px] text-muted-foreground">Pincode</span>
            <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.pincode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
