"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Merchant } from "../merchant.mock";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

const StatusBadge = ({ status }: { status: Merchant["status"] }) => {
  const styles = {
    ACTIVE: "bg-success/10 text-success border-success/30",
    INACTIVE: "bg-warning/10 text-warning border-warning/30",
    SUSPENDED: "bg-danger/10 text-danger border-danger/30",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${styles[status] || styles.INACTIVE}`}>
      {status}
    </span>
  );
};

const KycBadge = ({ status }: { status: Merchant["kycStatus"] }) => {
  const styles = {
    APPROVED: "text-success",
    PENDING: "text-warning",
    REJECTED: "text-danger",
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
        <span className="font-semibold text-foreground dark:text-white whitespace-nowrap">
          {row.original.businessName}
        </span>
        <span className="text-[12px] font-medium text-muted-foreground mt-0.5">
          {row.original.merchantCode}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "businessType",
    header: "Business Type",
    cell: ({ row }) => (
      <span className="text-[13px] font-medium text-foreground">
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
      <span className="text-[13px] font-medium text-foreground">
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
      return <span className="text-[13px] font-medium tabular-nums text-foreground">{formatted}</span>;
    },
  },
  {
    accessorKey: "totalBeneficiaries",
    header: "Beneficiaries",
    cell: ({ row }) => (
      <span className="text-[13px] font-medium tabular-nums text-foreground">
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
      return <span className="text-[13px] font-medium text-muted-foreground">{formatted}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link href={`/merchants/${row.original.id}`}>
          <Button variant="outline" size="sm" className="h-8 text-[12px] font-medium text-muted-foreground">
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
