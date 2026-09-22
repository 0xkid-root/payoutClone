"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { RefreshCw, Clock, CheckCircle2, XCircle, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

import { PendingTab } from "./tabs/pending-tab";
import { ApprovedTab } from "./tabs/approved-tab";
import { RejectedTab } from "./tabs/rejected-tab";
import { HistoryTab } from "./tabs/history-tab";

const tabs = [
  { id: "pending", label: "Pending", icon: Clock },
  { id: "approved", label: "Approved", icon: CheckCircle2 },
  { id: "rejected", label: "Rejected", icon: XCircle },
  { id: "history", label: "History", icon: History },
];

export function WalletWhitelistPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["whitelist-requests"] });
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Wallet Whitelist"
        description="Review and manage merchant bank accounts authorized for wallet funding."
        actions={
          <Button
            variant="outline"
            className="bg-white shadow-sm bg-background border-border"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        }
      />

      <div className="rounded-[14px] border border-border/60 bg-white shadow-sm border-border bg-background overflow-hidden flex flex-col">
        {/* Tabs Header */}
        <div className="border-b border-border/60 border-border bg-background/50 p-2 flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all ${isActive
                    ? "bg-white shadow-sm border border-border/60 text-primary bg-card border-border dark:text-white"
                    : "text-muted-foreground hover:bg-muted/50 text-muted-foreground dark:hover:bg-card/30"
                  }`}
              >
                <Icon className={`mr-2 h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white bg-background min-h-[400px]">
          {activeTab === "pending" && <PendingTab />}
          {activeTab === "approved" && <ApprovedTab />}
          {activeTab === "rejected" && <RejectedTab />}
          {activeTab === "history" && <HistoryTab />}
        </div>
      </div>
    </div>
  );
}
