import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BasicDetailsTab({ merchant }: { merchant: Merchant }) {
  return (
    <Card className="shadow-none border-border/60 border-border">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
          {/* Contact Information */}
          <div>
            <div className="px-4 py-3 bg-slate-50/50 bg-background/20 border-b border-slate-100 border-border">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contact Information</h3>
            </div>
            <div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 border-border">
                <span className="text-[13px] text-muted-foreground">Contact Person</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.ownerName}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 border-border">
                <span className="text-[13px] text-muted-foreground">Email Address</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.email}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 border-border">
                <span className="text-[13px] text-muted-foreground">Mobile Number</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.mobile}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4">
                <span className="text-[13px] text-muted-foreground">Account Created</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white">{new Date(merchant.createdAt).toLocaleDateString("en-GB")}</span>
              </div>
            </div>
          </div>

          {/* Registered Address */}
          <div>
            <div className="px-4 py-3 bg-slate-50/50 bg-background/20 border-b border-slate-100 border-border">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Registered Address</h3>
            </div>
            <div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 border-border">
                <span className="text-[13px] text-muted-foreground">Address</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white text-right max-w-[200px] truncate">{merchant.registeredAddress}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 border-border">
                <span className="text-[13px] text-muted-foreground">City</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.city}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 border-border">
                <span className="text-[13px] text-muted-foreground">State</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.state}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 border-border">
                <span className="text-[13px] text-muted-foreground">Pincode</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.pincode}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4">
                <span className="text-[13px] text-muted-foreground">Country</span>
                <span className="text-[13px] font-medium text-foreground dark:text-white">India</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
