import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Filter, Plus } from "lucide-react";

const MOCK_VANS = [
  { id: "VAN-77881", merchantId: "M-1001", accountNo: "VANHDFC1001", ifsc: "HDFC0001234", bank: "HDFC Bank", status: "ACTIVE", date: "2024-02-10T10:00:00Z" },
  { id: "VAN-77882", merchantId: "M-1002", accountNo: "VANICICI1002", ifsc: "ICIC0008888", bank: "ICICI Bank", status: "ACTIVE", date: "2024-02-15T14:30:00Z" },
  { id: "VAN-77883", merchantId: "M-1004", accountNo: "VANAXIS1004", ifsc: "UTIB0005555", bank: "Axis Bank", status: "INACTIVE", date: "2024-01-20T09:15:00Z" },
];

export default function VanManagementPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Virtual Account Numbers (VAN)"
        description="Manage dedicated virtual accounts assigned to merchants for inward remittances."
        actions={
          <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
            <Plus className="mr-2 h-4 w-4" />
            Assign VAN
          </Button>
        }
      />

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search VANs..." className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Bank</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl"><Filter className="mr-2 h-4 w-4" />Status</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead>VAN ID</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Bank Info</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_VANS.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-slate-900 dark:text-white">{item.id}</TableCell>
                <TableCell>{item.merchantId}</TableCell>
                <TableCell className="font-mono text-sm">{item.accountNo}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-white">{item.bank}</span>
                    <span className="text-xs text-slate-500 font-mono">{item.ifsc}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-500">{new Date(item.date).toLocaleDateString()}</TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Manage</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
