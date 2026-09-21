import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Filter, ArrowUpRight, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

const MOCK_PAYOUTS = [
  { id: "PO-10023", merchantId: "M-1004", beneficiary: "Ravi Kumar", amount: 50000, mode: "IMPS", bank: "HDFC", status: "SUCCESS", date: "2024-03-10T14:30:00Z" },
  { id: "PO-10022", merchantId: "M-1001", beneficiary: "Priya Singh", amount: 150000, mode: "NEFT", bank: "ICICI", status: "PROCESSING", date: "2024-03-10T14:15:00Z" },
  { id: "PO-10021", merchantId: "M-1002", beneficiary: "Amit Sharma", amount: 20000, mode: "IMPS", bank: "AXIS", status: "FAILED", date: "2024-03-10T13:45:00Z" },
  { id: "PO-10020", merchantId: "M-1004", beneficiary: "Neha Gupta", amount: 85000, mode: "RTGS", bank: "SBI", status: "PENDING", date: "2024-03-10T12:00:00Z" },
  { id: "PO-10019", merchantId: "M-1005", beneficiary: "Ravi Kumar", amount: 12000, mode: "IMPS", bank: "HDFC", status: "SUCCESS", date: "2024-03-10T11:30:00Z" },
];

export default function PayoutsPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <PageHeader
        title="Payout Management"
        description="Monitor and manage all merchant payout transactions."
        actions={
          <div className="flex items-center gap-2">
             <Button variant="outline" className="h-10 rounded-xl bg-white shadow-sm dark:bg-slate-900">
               Export
             </Button>
          </div>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Volume (Today)" value="₹8.45 Cr" icon={ArrowUpRight} iconColorClass="text-primary" />
        <StatCard title="Successful" value="1,284" icon={CheckCircle2} iconColorClass="text-emerald-600" />
        <StatCard title="Processing" value="45" icon={Clock} iconColorClass="text-blue-600" />
        <StatCard title="Failed" value="12" icon={XCircle} iconColorClass="text-red-600" alertText="Needs retry" />
      </div>

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search payouts..." className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Mode</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Status</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead>Payout ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Beneficiary</TableHead>
              <TableHead>Mode/Bank</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PAYOUTS.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-slate-900 dark:text-white">{item.id}</TableCell>
                <TableCell className="text-slate-500">{new Date(item.date).toLocaleString()}</TableCell>
                <TableCell>{item.merchantId}</TableCell>
                <TableCell className="font-medium text-slate-900 dark:text-white">{item.beneficiary}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">{item.mode}</span>
                    <span className="text-xs text-slate-500">{item.bank}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-slate-900 dark:text-white">
                  ₹{(item.amount).toLocaleString()}
                </TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell className="text-right">
                  {item.status === 'FAILED' ? (
                     <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-50">Retry</Button>
                  ) : (
                     <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Details</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
