import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Filter } from "lucide-react";

const MOCK_WHITELIST = [
  { id: "WL-4001", merchantId: "M-1002", accountName: "TechFlow Ltd", accountNumber: "XXXX-4433", ifsc: "HDFC0001234", status: "PENDING", requestedAt: "2024-03-10T11:00:00Z" },
  { id: "WL-4002", merchantId: "M-1005", accountName: "CloudSync", accountNumber: "XXXX-9911", ifsc: "ICIC0008888", status: "VERIFIED", requestedAt: "2024-03-09T15:20:00Z" },
  { id: "WL-4003", merchantId: "M-1001", accountName: "Acme Corp", accountNumber: "XXXX-1122", ifsc: "SBIN0004567", status: "REJECTED", requestedAt: "2024-03-08T09:10:00Z" },
];

export default function WhitelistPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Wallet Whitelist"
        description="Manage and verify beneficiary bank accounts for merchant wallets."
      />

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search accounts..." className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Status</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead>Whitelist ID</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead>Account Details</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_WHITELIST.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-slate-900 dark:text-white">{item.id}</TableCell>
                <TableCell>{item.merchantId}</TableCell>
                <TableCell className="font-medium">{item.accountName}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs">{item.accountNumber}</span>
                    <span className="text-xs text-slate-500">{item.ifsc}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-500">{new Date(item.requestedAt).toLocaleString()}</TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Review</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
