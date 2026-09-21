import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BasicDetailsTab({ merchant }: { merchant: Merchant }) {
  return (
    <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
          {/* Contact Information */}
          <div>
            <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contact Information</h3>
            </div>
            <div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Contact Person</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.ownerName}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Email Address</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.email}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Mobile Number</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.mobile}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4">
                <span className="text-[13px] text-slate-500">Account Created</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{new Date(merchant.createdAt).toLocaleDateString("en-GB")}</span>
              </div>
            </div>
          </div>

          {/* Registered Address */}
          <div>
            <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Registered Address</h3>
            </div>
            <div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Address</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white text-right max-w-[200px] truncate">{merchant.registeredAddress}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">City</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.city}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">State</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.state}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Pincode</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.pincode}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4">
                <span className="text-[13px] text-slate-500">Country</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">India</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
