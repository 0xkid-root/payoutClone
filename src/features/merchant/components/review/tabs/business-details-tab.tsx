import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BusinessDetailsTab({ merchant }: { merchant: Merchant }) {
  return (
    <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
          {/* Business Identity */}
          <div>
            <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Identity</h3>
            </div>
            <div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Legal Business Name</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.businessName}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Constitution Type</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.businessType}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Nature of Business</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">Digital Services / Software</span>
              </div>
              <div className="flex justify-between py-2.5 px-4">
                <span className="text-[13px] text-slate-500">Website</span>
                <a href={`https://www.${merchant.businessName.toLowerCase().replace(/\s/g, '')}.com`} target="_blank" rel="noreferrer" className="text-[13px] font-medium text-primary hover:underline">
                  www.{merchant.businessName.toLowerCase().replace(/\s/g, '')}.com
                </a>
              </div>
            </div>
          </div>

          {/* Tax & Registration */}
          <div>
            <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tax & Registration</h3>
            </div>
            <div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">PAN Number</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.pan}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">GST Number</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.gst || "Not Registered"}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">CIN / Reg No.</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">U72900MH2021PTC{Math.floor(Math.random() * 90000) + 10000}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4">
                <span className="text-[13px] text-slate-500">Incorporation Date</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">12 Jan 2021</span>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Bank Details</h3>
            </div>
            <div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Bank Name</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.bankName || "N/A"}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] text-slate-500">Account Number</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white tracking-widest">{merchant.accountNumber || "N/A"}</span>
              </div>
              <div className="flex justify-between py-2.5 px-4">
                <span className="text-[13px] text-slate-500">IFSC Code</span>
                <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.ifscCode || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
