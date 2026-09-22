import { CalendarDays, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-foreground dark:text-white sm:text-[32px]">
          Welcome back, Admin <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
        </h1>
        <p className="mt-1.5 text-[14px] font-medium text-muted-foreground">
          Here's what's happening across all merchants today.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="h-9 rounded-md bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-background border-border text-[13px] font-medium text-foreground">
          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
          01 May, 2024 - 07 May, 2024
        </Button>
        <Button variant="outline" className="h-9 rounded-md bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-background border-border text-[13px] font-medium text-foreground">
          <Download className="mr-2 h-4 w-4 text-muted-foreground" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
