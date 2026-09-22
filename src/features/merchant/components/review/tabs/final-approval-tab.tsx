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
 <Card className="shadow-none border-border/60 border-border overflow-hidden">
 <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
 
 {/* Summary & Notice Column */}
 <div className="lg:col-span-2 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
 <div>
 <div className="px-4 py-3 bg-card/20 border-b border-border">
 <h3 className="text-sm font-semibold text-foreground">Review Summary</h3>
 </div>
 <div className="grid sm:grid-cols-2">
 <div className="flex justify-between py-2.5 px-4 border-b sm:border-r border-border">
 <span className="text-[13px] text-muted-foreground">Merchant Name</span>
 <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.businessName}</span>
 </div>
 <div className="flex justify-between py-2.5 px-4 border-b border-border">
 <span className="text-[13px] text-muted-foreground">Merchant ID</span>
 <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.merchantCode}</span>
 </div>
 <div className="flex justify-between py-2.5 px-4 sm:border-r border-border">
 <span className="text-[13px] text-muted-foreground">Business Type</span>
 <span className="text-[13px] font-medium text-foreground dark:text-white">{merchant.businessType}</span>
 </div>
 <div className="flex justify-between py-2.5 px-4 border-t sm:border-t-0 border-border">
 <span className="text-[13px] text-muted-foreground">KYC Status</span>
 <span className={`text-[13px] font-medium ${isKycApproved ? "text-success" : "text-warning"}`}>
 {isKycApproved ? "Verified" : merchant.kycStatus}
 </span>
 </div>
 </div>
 </div>

 <div className="p-5 bg-card/20 flex items-start gap-3">
 <AlertTriangle className="h-5 w-5 text-warning mt-0.5 shrink-0" />
 <div>
 <h4 className="text-sm font-semibold text-foreground dark:text-white">Admin Responsibility Notice</h4>
 <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
 By approving this merchant, you confirm that all submitted documents have been reviewed and comply with the platform's KYC and AML guidelines. This action is recorded in the audit log.
 </p>
 </div>
 </div>
 </div>

 {/* Checklist & Actions Column */}
 <div className="flex flex-col">
 <div className="px-4 py-3 bg-card/20 border-b border-border">
 <h3 className="text-sm font-semibold text-foreground">Review Checklist</h3>
 </div>
 <div>
 <div className="flex items-center justify-between py-3 px-4 border-b border-border">
 <span className="text-[13px] font-medium text-foreground">Basic Details</span>
 <CheckCircle2 className="h-4 w-4 text-success" />
 </div>
 <div className="flex items-center justify-between py-3 px-4 border-b border-border">
 <span className="text-[13px] font-medium text-foreground">Business Details</span>
 <CheckCircle2 className="h-4 w-4 text-success" />
 </div>
 <div className="flex items-center justify-between py-3 px-4 border-b border-border">
 <span className="text-[13px] font-medium text-foreground">Business Documents</span>
 <CheckCircle2 className="h-4 w-4 text-success" />
 </div>
 <div className="flex items-center justify-between py-3 px-4">
 <span className="text-[13px] font-medium text-foreground">KYC Documents</span>
 {isKycApproved ? (
 <CheckCircle2 className="h-4 w-4 text-success" />
 ) : (
 <CircleDashed className="h-4 w-4 text-warning animate-pulse" />
 )}
 </div>
 </div>
 
 <div className="flex flex-col gap-3 p-4 bg-card/50 border-t border-border mt-auto">
 <Button 
 className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
 onClick={() => setDialogConfig({ isOpen: true, type: "APPROVE" })}
 >
 Approve Merchant
 </Button>
 <Button 
 variant="outline" 
 className="w-full text-danger border-danger/30 hover:bg-danger/10 hover:text-danger hover:border-red-300 dark:border-red-900/50 dark:hover:bg-red-900/20"
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
