import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, CircleDashed, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewApprovalDialog } from "../review-approval-dialog";

export function FinalApprovalTab({ merchant }: { merchant: Merchant }) {
  const [dialogConfig, setDialogConfig] = useState<{ isOpen: boolean; type: "APPROVE" | "REJECT" | null }>({
    isOpen: false,
    type: null,
  });

  const isComplete = merchant.completionPercentage === 100;
  const isKycApproved = merchant.kycStatus === "APPROVED";

  return (
    <div className="space-y-6">
      <Card className="shadow-none border-slate-200/60 dark:border-slate-800 overflow-hidden">
        <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
          
          {/* Summary & Notice Column */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            <div>
              <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Review Summary</h3>
              </div>
              <div className="grid sm:grid-cols-2">
                <div className="flex justify-between py-2.5 px-4 border-b sm:border-r border-slate-100 dark:border-slate-800">
                  <span className="text-[13px] text-slate-500">Merchant Name</span>
                  <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.businessName}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[13px] text-slate-500">Merchant ID</span>
                  <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.merchantCode}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 sm:border-r border-slate-100 dark:border-slate-800">
                  <span className="text-[13px] text-slate-500">Business Type</span>
                  <span className="text-[13px] font-medium text-slate-900 dark:text-white">{merchant.businessType}</span>
                </div>
                <div className="flex justify-between py-2.5 px-4 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <span className="text-[13px] text-slate-500">KYC Status</span>
                  <span className={`text-[13px] font-medium ${isKycApproved ? "text-emerald-600" : "text-amber-500"}`}>
                    {isKycApproved ? "Verified" : merchant.kycStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50/50 dark:bg-slate-900/20 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Admin Responsibility Notice</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                  By approving this merchant, you confirm that all submitted documents have been reviewed and comply with the platform's KYC and AML guidelines. This action is recorded in the audit log.
                </p>
              </div>
            </div>
          </div>

          {/* Checklist & Actions Column */}
          <div className="flex flex-col">
            <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Review Checklist</h3>
            </div>
            <div>
              <div className="flex items-center justify-between py-3 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Basic Details</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between py-3 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Business Details</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between py-3 px-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">Business Documents</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between py-3 px-4">
                <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">KYC Documents</span>
                {isKycApproved ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <CircleDashed className="h-4 w-4 text-amber-500 animate-pulse" />
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-3 p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 mt-auto">
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setDialogConfig({ isOpen: true, type: "APPROVE" })}
              >
                Approve Merchant
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:border-red-900/50 dark:hover:bg-red-900/20"
                onClick={() => setDialogConfig({ isOpen: true, type: "REJECT" })}
              >
                Reject Merchant
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <ReviewApprovalDialog 
        isOpen={dialogConfig.isOpen}
        type={dialogConfig.type}
        merchant={merchant}
        onClose={() => setDialogConfig({ isOpen: false, type: null })}
      />
    </div>
  );
}
