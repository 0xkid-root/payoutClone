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
    Active: "bg-emerald-50 text-emerald-600 border-emerald-200/50",
    Inactive: "bg-amber-50 text-amber-600 border-amber-200/50",
    Deleted: "bg-red-50 text-red-600 border-red-200/50",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
};

const VerificationBadge = ({ status }: { status: Beneficiary["verificationStatus"] }) => {
  const styles = {
    Verified: "text-emerald-600",
    "Not Verified": "text-slate-500",
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
        <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
          {row.original.name}
        </span>
        <span className="text-[12px] font-medium text-slate-500 mt-0.5">
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
        <span className="font-medium text-slate-900 dark:text-white whitespace-nowrap">
          {row.original.merchantName}
        </span>
        <span className="text-[12px] font-medium text-slate-500 mt-0.5">
          {row.original.mid}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "accountNumber",
    header: "Account",
    cell: ({ row }) => (
      <span className="text-[13px] font-medium tabular-nums text-slate-700 dark:text-slate-300">
        {maskAccountNumber(row.original.accountNumber)}
      </span>
    ),
  },
  {
    accessorKey: "ifsc",
    header: "IFSC",
    cell: ({ row }) => (
      <span className="text-[13px] font-medium tabular-nums text-slate-700 dark:text-slate-300">
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
      return <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">{formatted}</span>;
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
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
