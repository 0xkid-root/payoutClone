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
 <div className="flex flex-col justify-between rounded-xl border border-border/60 p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] border-border bg-card transition-all hover:shadow-md">
 <div className="flex items-start gap-4">
 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-info/10 dark:bg-info/100/10 text-info">
 <FileText className="h-5 w-5" />
 </div>
 <div className="flex flex-col">
 <h3 className="text-[15px] font-semibold text-foreground dark:text-white">
 Transaction Report
 </h3>
 <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
 Detailed list of all payouts and inward transfers.
 </p>
 </div>
 </div>
 <div className="mt-8 flex flex-col gap-3">
 <Button
 variant="outline"
 className="w-full justify-start rounded-lg border-border/60 shadow-none text-[13px] font-medium text-muted-foreground border-border hover:bg-card dark:hover:bg-card"
 >
 <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
 Select Date Range
 </Button>
 <Button className="w-full rounded-lg bg-card hover:bg-card text-white shadow-none text-[13px] font-semibold transition-all">
 <Download className="mr-2 h-4 w-4" />
 Generate & Download
 </Button>
 </div>
 </div>

 {/* Report Card 2 */}
 <div className="flex flex-col justify-between rounded-xl border border-border/60 p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] border-border bg-card transition-all hover:shadow-md">
 <div className="flex items-start gap-4">
 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 dark:bg-success/100/10 text-success">
 <FileText className="h-5 w-5" />
 </div>
 <div className="flex flex-col">
 <h3 className="text-[15px] font-semibold text-foreground dark:text-white">
 Wallet Ledger
 </h3>
 <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
 Full wallet debit and credit history for merchants.
 </p>
 </div>
 </div>
 <div className="mt-8 flex flex-col gap-3">
 <Button
 variant="outline"
 className="w-full justify-start rounded-lg border-border/60 shadow-none text-[13px] font-medium text-muted-foreground border-border hover:bg-card dark:hover:bg-card"
 >
 <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
 Select Merchant
 </Button>
 <Button className="w-full rounded-lg bg-card hover:bg-card text-white shadow-none text-[13px] font-semibold transition-all">
 <Download className="mr-2 h-4 w-4" />
 Generate & Download
 </Button>
 </div>
 </div>

 {/* Report Card 3 */}
 <div className="flex flex-col justify-between rounded-xl border border-border/60 p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] border-border bg-card transition-all hover:shadow-md">
 <div className="flex items-start gap-4">
 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10 dark:bg-warning/100/10 text-warning">
 <FileText className="h-5 w-5" />
 </div>
 <div className="flex flex-col">
 <h3 className="text-[15px] font-semibold text-foreground dark:text-white">
 Settlement Report
 </h3>
 <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
 Daily settlement batches, fees deducted, and net transfers.
 </p>
 </div>
 </div>
 <div className="mt-8 flex flex-col gap-3">
 <Button
 variant="outline"
 className="w-full justify-start rounded-lg border-border/60 shadow-none text-[13px] font-medium text-muted-foreground border-border hover:bg-card dark:hover:bg-card"
 >
 <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
 Select Date Range
 </Button>
 <Button className="w-full rounded-lg bg-card hover:bg-card text-white shadow-none text-[13px] font-semibold transition-all">
 <Download className="mr-2 h-4 w-4" />
 Generate & Download
 </Button>
 </div>
 </div>
 </div>
 </div>
 );
}
