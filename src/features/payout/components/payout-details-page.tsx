"use client";

import { usePayoutQuery, useRetryPayoutMutation } from "../hooks/use-payouts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PayoutStatusBadge } from "./payout-status-badge";
import { formatINR } from "@/lib/utils";
import { format } from "date-fns";
import { PayoutTimeline } from "./payout-timeline";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface PayoutDetailsPageProps {
  id: string;
}

export function PayoutDetailsPage({ id }: PayoutDetailsPageProps) {
  const router = useRouter();
  const { data: payout, isLoading, isError } = usePayoutQuery(id);
  const retryMutation = useRetryPayoutMutation();

  const handleRetry = () => {
    retryMutation.mutate(id, {
      onSuccess: () => {
        toast.success(`Payout ${id} queued for retry`);
      },
      onError: (err: any) => {
        toast.error(err.message || "Failed to retry payout");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-6">
        <Skeleton className="h-10 w-[200px]" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !payout) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <AlertTriangle className="h-12 w-12 text-slate-400" />
        <h2 className="text-xl font-semibold">Unable to load payout details</h2>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4 sm:p-6 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-3">
              Payout Details
              <PayoutStatusBadge status={payout.status} className="text-sm px-2.5 py-0.5" />
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {payout.id} • Requested on {format(new Date(payout.requestedAt), "dd MMM yyyy, HH:mm")}
            </p>
          </div>
        </div>
        
        {(payout.status === "Failed" || payout.status === "Retry Queued") && (
          <Button onClick={handleRetry} disabled={retryMutation.isPending} className="bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90">
            <RefreshCw className="mr-2 h-4 w-4" />
            {retryMutation.isPending ? "Queuing..." : "Retry Payout"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Amount Breakdown */}
          <Card className="border-slate-200/60 shadow-sm dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg">Amount Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-slate-500 font-medium">Payout Amount</span>
                  <span className="text-3xl font-semibold tracking-tight">{formatINR(payout.amount)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-slate-500 font-medium">Processing Fee</span>
                  <span className="text-3xl font-semibold tracking-tight text-slate-500">{formatINR(payout.fee)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-slate-500 font-medium">Net Deducted</span>
                  <span className="text-3xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">{formatINR(payout.netAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Merchant Information */}
            <Card className="border-slate-200/60 shadow-sm dark:border-slate-800 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Merchant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Merchant Name</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.merchantName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Business Name</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.businessName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Merchant ID</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.merchantId}</span>
                </div>
              </CardContent>
            </Card>

            {/* Beneficiary Information */}
            <Card className="border-slate-200/60 shadow-sm dark:border-slate-800 bg-white dark:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Beneficiary Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Beneficiary Name</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.beneficiaryName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Beneficiary ID</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.beneficiaryId || "N/A (Direct)"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Bank Details</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {payout.bankName}
                    <span className="text-slate-400">•</span>
                    {payout.accountNumber}
                  </span>
                  <span className="text-slate-500 mt-1">IFSC: {payout.ifsc}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Processing Information */}
          <Card className="border-slate-200/60 shadow-sm dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Processing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Payout Method</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.method}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Provider</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.provider || "Pending Assignment"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Provider Reference</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.providerReference || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 mb-1">Response Code</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{payout.responseCode || "N/A"}</span>
                </div>
              </div>
              
              {payout.failureReason && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-col">
                    <span className="text-red-500 font-medium mb-1">Failure Reason</span>
                    <span className="text-slate-700 dark:text-slate-300">{payout.failureReason}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Timeline Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-slate-200/60 shadow-sm dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 sticky top-6">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <PayoutTimeline payout={payout} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
