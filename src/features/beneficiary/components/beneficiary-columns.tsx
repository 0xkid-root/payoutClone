"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Beneficiary } from "../beneficiary.mock";
import { MoreVertical } from "lucide-react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const StatusBadge = ({ status }: { status: Beneficiary["status"] }) => {
 const styles = {
 Active: "bg-success/10 text-success border-success/30",
 Inactive: "bg-warning/10 text-warning border-warning/30",
 Deleted: "bg-danger/10 text-danger border-danger/30",
 };

 return (
 <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${styles[status]}`}>
 {status}
 </span>
 );
};

const VerificationBadge = ({ status }: { status: Beneficiary["verificationStatus"] }) => {
 const styles = {
 Verified: "text-success",
 "Not Verified": "text-muted-foreground",
 };

 return (
 <span className={`text-[13px] font-medium ${styles[status]}`}>
 {status}
 </span>
 );
};

const maskAccountNumber = (account: string) => {
 if (!account || account.length < 4) return account;
 return `•••• ${account.slice(-4)}`;
};

export const beneficiaryColumns: ColumnDef<Beneficiary>[] = [
 {
 accessorKey: "name",
 header: "Beneficiary",
 cell: ({ row }) => (
 <div className="flex flex-col">
 <span className="font-semibold text-foreground dark:text-white whitespace-nowrap">
 {row.original.name}
 </span>
 <span className="text-[12px] font-medium text-muted-foreground mt-0.5">
 {row.original.id}
 </span>
 </div>
 ),
 },
 {
 accessorKey: "merchantName",
 header: "Merchant",
 cell: ({ row }) => (
 <div className="flex flex-col">
 <span className="font-medium text-foreground dark:text-white whitespace-nowrap">
 {row.original.merchantName}
 </span>
 <span className="text-[12px] font-medium text-muted-foreground mt-0.5">
 {row.original.mid}
 </span>
 </div>
 ),
 },
 {
 accessorKey: "accountNumber",
 header: "Account",
 cell: ({ row }) => (
 <span className="text-[13px] font-medium tabular-nums text-foreground">
 {maskAccountNumber(row.original.accountNumber)}
 </span>
 ),
 },
 {
 accessorKey: "ifsc",
 header: "IFSC",
 cell: ({ row }) => (
 <span className="text-[13px] font-medium tabular-nums text-foreground">
 {row.original.ifsc}
 </span>
 ),
 },
 {
 accessorKey: "verificationStatus",
 header: "Verification",
 cell: ({ row }) => <VerificationBadge status={row.original.verificationStatus} />,
 },
 {
 accessorKey: "status",
 header: "Status",
 cell: ({ row }) => <StatusBadge status={row.original.status} />,
 },
 {
 accessorKey: "createdDate",
 header: "Created",
 cell: ({ row }) => {
 const date = new Date(row.original.createdDate);
 const formatted = date.toLocaleDateString("en-GB", {
 day: "2-digit",
 month: "short",
 year: "numeric",
 });
 return <span className="text-[13px] font-medium text-muted-foreground">{formatted}</span>;
 },
 },
 {
 id: "actions",
 cell: () => (
 <DropdownMenu>
 <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted dark:hover:bg-card">
 <span className="sr-only">Open menu</span>
 <MoreVertical className="h-4 w-4" />
 </DropdownMenuTrigger>
 <DropdownMenuContent align="end">
 <DropdownMenuItem>View Details</DropdownMenuItem>
 <DropdownMenuItem>View Merchant</DropdownMenuItem>
 <DropdownMenuItem>View Payout History</DropdownMenuItem>
 </DropdownMenuContent>
 </DropdownMenu>
 ),
 },
];
