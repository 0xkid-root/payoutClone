import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/common/status-badge";
import { Search, Plus, ShieldCheck } from "lucide-react";

const MOCK_USERS = [
  { id: "U-001", name: "Alice Admin", email: "alice@paynexus.com", role: "SUPER_ADMIN", status: "ACTIVE", lastLogin: "10 mins ago" },
  { id: "U-002", name: "Bob Operations", email: "bob@paynexus.com", role: "OPERATIONS_ADMIN", status: "ACTIVE", lastLogin: "1 hour ago" },
  { id: "U-003", name: "Charlie Finance", email: "charlie@paynexus.com", role: "FINANCE_ADMIN", status: "ACTIVE", lastLogin: "Yesterday" },
  { id: "U-004", name: "David Support", email: "david@paynexus.com", role: "SUPPORT_ADMIN", status: "SUSPENDED", lastLogin: "1 month ago" },
];

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Admin Users & Roles"
        description="Manage internal staff access and Role-Based Access Control (RBAC)."
        actions={
          <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
            <Plus className="mr-2 h-4 w-4" />
            Invite Admin
          </Button>
        }
      />

      <div className="flex flex-col rounded-2xl border border-border bg-white shadow-sm border-border bg-background overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between border-border">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users by name or email..." className="h-10 w-full rounded-xl pl-9 bg-background border-border bg-background/50 border-border" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-background hover:bg-background bg-card/20 dark:hover:bg-card/20 border-border">
              <TableHead>User Name</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-foreground dark:text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground bg-card text-foreground">
                       {item.name.charAt(0)}
                    </div>
                    {item.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                    <span className="text-xs font-semibold text-foreground">{item.role}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{item.lastLogin}</TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Manage Access</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
