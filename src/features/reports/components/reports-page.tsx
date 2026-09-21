import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Filter } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      <PageHeader
        title="Reports"
        description="Generate and download customized operational and financial reports."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {/* Report Card 1 */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900 transition-all hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white">
                Transaction Report
              </h3>
              <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
                Detailed list of all payouts and inward transfers.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg border-slate-200/60 shadow-none text-[13px] font-medium text-slate-600 dark:text-slate-400 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Calendar className="mr-2 h-4 w-4 text-slate-400" />
              Select Date Range
            </Button>
            <Button className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-none text-[13px] font-semibold transition-all">
              <Download className="mr-2 h-4 w-4" />
              Generate & Download
            </Button>
          </div>
        </div>

        {/* Report Card 2 */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900 transition-all hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white">
                Wallet Ledger
              </h3>
              <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
                Full wallet debit and credit history for merchants.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg border-slate-200/60 shadow-none text-[13px] font-medium text-slate-600 dark:text-slate-400 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Filter className="mr-2 h-4 w-4 text-slate-400" />
              Select Merchant
            </Button>
            <Button className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-none text-[13px] font-semibold transition-all">
              <Download className="mr-2 h-4 w-4" />
              Generate & Download
            </Button>
          </div>
        </div>

        {/* Report Card 3 */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900 transition-all hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white">
                Settlement Report
              </h3>
              <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
                Daily settlement batches, fees deducted, and net transfers.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg border-slate-200/60 shadow-none text-[13px] font-medium text-slate-600 dark:text-slate-400 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <Calendar className="mr-2 h-4 w-4 text-slate-400" />
              Select Date Range
            </Button>
            <Button className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-none text-[13px] font-semibold transition-all">
              <Download className="mr-2 h-4 w-4" />
              Generate & Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
