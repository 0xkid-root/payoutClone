"use client";

import { useState } from "react";
import { useMerchantDetailsQuery } from "../hooks/use-merchant-details-query";
import { ArrowLeft, ChevronDown, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { StatCard } from "@/components/common/stat-card";
import { Wallet, Users, ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import tabs
import { OverviewTab } from "./tabs/overview-tab";
import { BusinessTab } from "./tabs/business-tab";
import { KycTab } from "./tabs/kyc-tab";
import { WalletTab } from "./tabs/wallet-tab";
import { BeneficiariesTab } from "./tabs/beneficiaries-tab";
import { ActivityTab } from "./tabs/activity-tab";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "business", label: "Business" },
  { id: "kyc", label: "KYC & Onboarding" },
  { id: "wallet", label: "Wallet" },
  { id: "beneficiaries", label: "Beneficiaries" },
  { id: "activity", label: "Activity" },
];

export function MerchantDetailsPage({ merchantId }: { merchantId: string }) {
  const { data: merchant, isLoading, isError } = useMerchantDetailsQuery(merchantId);
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading merchant details...</div>;
  }

  if (isError || !merchant) {
    return (
      <div className="p-8 text-center text-danger">
        <p>Failed to load merchant details.</p>
        <Link href="/merchants" className="text-primary hover:underline mt-2 inline-block">Back to Merchants</Link>
      </div>
    );
  }

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "ACTIVE") return <Badge className="bg-success/10 text-success border-success/30">Active</Badge>;
    if (status === "INACTIVE") return <Badge className="bg-warning/10 text-warning border-warning/30">Inactive</Badge>;
    return <Badge className="bg-danger/10 text-danger border-danger/30">Suspended</Badge>;
  };

  const formattedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(merchant.walletBalance);

  const formattedPayouts = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(merchant.totalPayouts);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link href="/merchants">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
                {merchant.businessName}
              </h1>
              <StatusBadge status={merchant.status} />
            </div>
            <p className="mt-1 text-sm font-medium text-muted-foreground flex items-center gap-2">
              {merchant.merchantCode}
              <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
              {merchant.businessType}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="h-9">
              Actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Beneficiaries</DropdownMenuItem>
            <DropdownMenuItem>View Payouts</DropdownMenuItem>
            <DropdownMenuItem>View Wallet</DropdownMenuItem>
            <DropdownMenuItem className="text-danger focus:text-danger">Suspend Merchant</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* KPI Summary */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Wallet Balance"
          value={formattedBalance}
          icon={Wallet}
          iconColorClass="text-primary"
        />
        <StatCard
          title="Total Beneficiaries"
          value={merchant.totalBeneficiaries.toLocaleString()}
          icon={Users}
          iconColorClass="text-success"
        />
        <StatCard
          title="Total Payouts"
          value={formattedPayouts}
          icon={ArrowUpRight}
          iconColorClass="text-primary"
        />
        <StatCard
          title="Successful Payouts"
          value={merchant.successfulPayouts.toLocaleString()}
          icon={CheckCircle2}
          iconColorClass="text-success"
        />
      </div>

      {/* Unified Main Card for Tabs and Content */}
      <div className="rounded-xl border border-border/60 bg-white shadow-sm border-border bg-background overflow-hidden flex flex-col mt-4">
        {/* Tabs Navigation */}
        <div className="border-b border-border/60 border-border bg-background/50 p-2 flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-medium transition-all mr-1 ${
                  isActive
                    ? "bg-white shadow-sm border border-border/60 text-primary bg-card border-border dark:text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 text-muted-foreground dark:hover:text-foreground dark:hover:bg-card/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white bg-background p-0 pb-2 [&>div]:border-0 [&>div]:rounded-none [&>div]:shadow-none">
          {activeTab === "overview" && <OverviewTab merchant={merchant} onTabChange={setActiveTab} />}
          {activeTab === "business" && <BusinessTab merchant={merchant} />}
          {activeTab === "kyc" && <KycTab merchant={merchant} />}
          {activeTab === "wallet" && <WalletTab merchant={merchant} />}
          {activeTab === "beneficiaries" && <BeneficiariesTab merchant={merchant} />}
          {activeTab === "activity" && <ActivityTab merchant={merchant} />}
        </div>
      </div>
    </div>
  );
}
