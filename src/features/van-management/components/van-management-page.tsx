"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { VanTable } from "./van-table";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function VanManagementPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ["vans"] });
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
            VAN Management
          </h1>
          <p className="text-muted-foreground mt-1 text-[15px]">
            Manage virtual accounts assigned to merchants and monitor their current status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="bg-white shadow-sm bg-background border-border"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Main Table Content */}
      <VanTable onViewDetails={(van) => router.push(`/van-management/${van.id}`)} />
    </div>
  );
}
