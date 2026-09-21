"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Merchant } from "../merchant.mock";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

const StatusBadge = ({ status }: { status: Merchant["status"] }) => {
  const styles = {
    ACTIVE: "bg-emerald-50 text-emerald-600 border-emerald-200/50",
    INACTIVE: "bg-amber-50 text-amber-600 border-amber-200/50",
    SUSPENDED: "bg-red-50 text-red-600 border-red-200/50",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${styles[status] || styles.INACTIVE}`}>
      {status}
    </span>
  );
};

const KycBadge = ({ status }: { status: Merchant["kycStatus"] }) => {
  const styles = {
    APPROVED: "text-emerald-600",
    PENDING: "text-amber-500",
    REJECTED: "text-red-500",
  };

  return (
    <span className={`text-[13px] font-medium ${styles[status]}`}>
      {status === "APPROVED" ? "Verified" : status === "PENDING" ? "Pending" : "Rejected"}
    </span>
  );
};

export const merchantColumns: ColumnDef<Merchant>[] = [
  {
    accessorKey: "businessName",
    header: "Merchant",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-slate-900 dark:text-white whitespace-nowrap">
          {row.original.businessName}
        </span>
        <span className="text-[12px] font-medium text-slate-500 mt-0.5">
          {row.original.merchantCode}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "businessType",
    header: "Business Type",
    cell: ({ row }) => (
      <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">
        {row.original.businessType}
      </span>
    ),
  },
  {
    accessorKey: "kycStatus",
    header: "KYC",
    cell: ({ row }) => <KycBadge status={row.original.kycStatus} />,
  },
  {
    accessorKey: "completionPercentage",
    header: "Completion",
    cell: ({ row }) => (
      <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300">
        {row.original.completionPercentage}%
      </span>
    ),
  },
  {
    accessorKey: "walletBalance",
    header: "Wallet",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(row.original.walletBalance);
      return <span className="text-[13px] font-medium tabular-nums text-slate-700 dark:text-slate-300">{formatted}</span>;
    },
  },
  {
    accessorKey: "totalBeneficiaries",
    header: "Beneficiaries",
    cell: ({ row }) => (
      <span className="text-[13px] font-medium tabular-nums text-slate-700 dark:text-slate-300">
        {row.original.totalBeneficiaries}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
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
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link href={`/merchants/${row.original.id}`}>
          <Button variant="outline" size="sm" className="h-8 text-[12px] font-medium text-slate-600">
            View
          </Button>
        </Link>
        <Link href={`/merchants/${row.original.id}/review`}>
          <Button variant="outline" size="sm" className="h-8 text-[12px] font-medium">
            <Eye className="mr-2 h-3.5 w-3.5" />
            Review
          </Button>
        </Link>
      </div>
    ),
  },
];
