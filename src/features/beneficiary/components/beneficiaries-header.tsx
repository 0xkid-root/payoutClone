import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BeneficiariesHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight text-slate-900 dark:text-white sm:text-[32px]">
          Beneficiaries
        </h1>
        <p className="mt-1.5 text-[14px] font-medium text-slate-500">
          Monitor beneficiaries across all merchants.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="h-9 rounded-md bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 text-[13px] font-medium text-slate-700 dark:text-slate-300">
          <Download className="mr-2 h-4 w-4 text-slate-500" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
