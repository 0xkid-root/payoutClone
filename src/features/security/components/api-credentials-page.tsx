import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Plus, Copy, EyeOff } from "lucide-react";

const MOCK_API_KEYS = [
  { id: "API-991", name: "Production Gateway API", merchantId: "Global", keyPrefix: "pk_prod_xxxx", createdAt: "2024-01-10", lastUsed: "10 mins ago", status: "ACTIVE" },
  { id: "API-992", name: "M-1001 Dedicated Keys", merchantId: "M-1001", keyPrefix: "pk_live_xxxx", createdAt: "2024-02-15", lastUsed: "2 hours ago", status: "ACTIVE" },
  { id: "API-993", name: "Legacy Integration", merchantId: "Global", keyPrefix: "pk_old_xxxx", createdAt: "2023-08-01", lastUsed: "1 month ago", status: "INACTIVE" },
];

export default function ApiCredentialsPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="API Credentials"
        description="Manage secure API keys and webhook secrets used across the platform."
        actions={
          <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
            <Plus className="mr-2 h-4 w-4" />
            Generate New Key
          </Button>
        }
      />

      <div className="flex flex-col rounded-2xl border border-border bg-white shadow-sm border-border bg-background overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between border-border">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search keys..." className="h-10 w-full rounded-xl pl-9 bg-background border-border bg-background/50 border-border" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-background hover:bg-background bg-card/20 dark:hover:bg-card/20 border-border">
              <TableHead>Key Name</TableHead>
              <TableHead>Environment / Merchant</TableHead>
              <TableHead>Secret Key Preview</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_API_KEYS.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-foreground dark:text-white">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.merchantId}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm tracking-widest text-muted-foreground">
                      {item.keyPrefix}••••••••
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="h-3 w-3" /></Button>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{item.createdAt}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{item.lastUsed}</TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-danger hover:text-danger hover:bg-danger/10">Revoke</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
