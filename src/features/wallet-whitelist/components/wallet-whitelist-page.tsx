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
            className="bg-white shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        }
      />

      <div className="rounded-[14px] border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex flex-col">
        {/* Tabs Header */}
        <div className="border-b border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-2 flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all ${isActive
                    ? "bg-white shadow-sm border border-slate-200/60 text-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    : "text-slate-500 hover:bg-slate-100/50 dark:text-slate-400 dark:hover:bg-slate-800/30"
                  }`}
              >
                <Icon className={`mr-2 h-4 w-4 ${isActive ? "text-primary" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-900 min-h-[400px]">
          {activeTab === "pending" && <PendingTab />}
          {activeTab === "approved" && <ApprovedTab />}
          {activeTab === "rejected" && <RejectedTab />}
          {activeTab === "history" && <HistoryTab />}
        </div>
      </div>
    </div>
  );
}
