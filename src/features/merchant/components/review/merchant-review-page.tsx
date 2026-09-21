"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMerchantDetailsQuery } from "../../hooks/use-merchant-details-query";

// Import Tabs
import { BasicDetailsTab } from "./tabs/basic-details-tab";
import { BusinessDetailsTab } from "./tabs/business-details-tab";
import { BusinessDocumentsTab } from "./tabs/business-documents-tab";
import { KycDocumentsTab } from "./tabs/kyc-documents-tab";
import { FinalApprovalTab } from "./tabs/final-approval-tab";
import { RequestChangesModal } from "./request-changes-modal";

const steps = [
  { id: "basic", label: "Basic Details" },
  { id: "business", label: "Business Details" },
  { id: "documents", label: "Business Documents" },
  { id: "kyc", label: "KYC Details" },
  { id: "approval", label: "Final Review" },
];

export function MerchantReviewPage({ merchantId }: { merchantId: string }) {
  const { data: merchant, isLoading, isError } = useMerchantDetailsQuery(merchantId);
  const [activeTab, setActiveTab] = useState("basic");
  const [isRequestChangesOpen, setIsRequestChangesOpen] = useState(false);

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading merchant details for review...</div>;
  }

  if (isError || !merchant) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Failed to load merchant details.</p>
        <Link href="/merchants" className="text-primary hover:underline mt-2 inline-block">Back to Merchants</Link>
      </div>
    );
  }

  const KycBadge = ({ status }: { status: string }) => {
    if (status === "APPROVED") return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50"><CheckCircle2 className="mr-1 h-3 w-3" /> Verified</Badge>;
    if (status === "PENDING") return <Badge className="bg-amber-50 text-amber-600 border-amber-200/50">Pending</Badge>;
    return <Badge className="bg-red-50 text-red-600 border-red-200/50">Rejected</Badge>;
  };

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "ACTIVE") return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50">Under Review</Badge>;
    if (status === "INACTIVE") return <Badge className="bg-amber-50 text-amber-600 border-amber-200/50">Inactive</Badge>;
    return <Badge className="bg-red-50 text-red-600 border-red-200/50">Suspended</Badge>;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link href="/merchants" className="self-start">
            <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-slate-900 -ml-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Merchants
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Merchant Verification
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Review submitted information before making a final decision.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 dark:border-amber-900/50 dark:hover:bg-amber-900/20 dark:text-amber-500"
            onClick={() => setIsRequestChangesOpen(true)}
          >
            <FileEdit className="mr-2 h-4 w-4" />
            Request Changes
          </Button>
        </div>
      </div>

      {/* Unified Main Card */}
      <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col">
        
        {/* Merchant Summary Section */}
        <div className="p-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
              {merchant.businessName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{merchant.businessName}</h2>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-sm text-slate-500 font-medium">ID: {merchant.merchantCode}</span>
                <span className="text-sm text-slate-400">•</span>
                <span className="text-[13px] text-slate-500">{merchant.businessType}</span>
                <span className="text-sm text-slate-400">•</span>
                <span className="text-[13px] text-slate-500">Submitted: {merchant.createdAt ? new Date(merchant.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "10 Sep 2026"}</span>
                <span className="text-sm text-slate-400">•</span>
                <StatusBadge status={merchant.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Verification Progress Stepper Section */}
        <div className="border-y border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-2 flex overflow-x-auto scrollbar-hide">
          {steps.map((step, index) => {
            const isActive = activeTab === step.id;
            const isPassed = steps.findIndex(s => s.id === activeTab) > index;
            
            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveTab(step.id)}
                  className={`relative flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white shadow-sm border border-slate-200/60 text-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      : isPassed
                        ? "text-slate-700 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:bg-slate-800/30"
                        : "text-slate-500 hover:bg-slate-100/50 dark:hover:bg-slate-800/30"
                  }`}
                >
                  <span className={`flex items-center justify-center h-5 w-5 rounded-full mr-2 text-[11px] font-bold ${
                    isActive ? "bg-primary text-white" : isPassed ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                  }`}>
                    {isPassed ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <span className="whitespace-nowrap">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="px-2 text-slate-300 dark:text-slate-700">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tab Content Section */}
        <div className="bg-white dark:bg-slate-900 [&>div]:border-0 [&>div]:rounded-none [&>div]:shadow-none">
          {activeTab === "basic" && <BasicDetailsTab merchant={merchant} />}
          {activeTab === "business" && <BusinessDetailsTab merchant={merchant} />}
          {activeTab === "documents" && <BusinessDocumentsTab merchant={merchant} />}
          {activeTab === "kyc" && <KycDocumentsTab merchant={merchant} />}
          {activeTab === "approval" && <FinalApprovalTab merchant={merchant} />}
        </div>
      </div>

      <RequestChangesModal 
        isOpen={isRequestChangesOpen} 
        onClose={() => setIsRequestChangesOpen(false)} 
        merchant={merchant} 
      />
    </div>
  );
}
