"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VanAccount } from "../types/van.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const getVanColumns = (onViewDetails: (van: VanAccount) => void): ColumnDef<VanAccount>[] => [
  {
    accessorKey: "vanNumber",
    header: "VAN Number",
    cell: ({ row }) => {
      const van = row.original.vanNumber;
      return <div className="font-mono font-medium text-foreground text-foreground">{van}</div>;
    },
  },
  {
    accessorKey: "merchantName",
    header: "Merchant",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-[13px] text-foreground text-foreground">
          {row.original.merchantName}
        </span>
        <span className="text-[12px] text-muted-foreground font-mono">
          {row.original.merchantId}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-[13px] text-slate-700 dark:text-slate-300">
          {row.original.provider}
        </span>
        <span className="text-[12px] text-muted-foreground">
          {row.original.accountType}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let badgeClass = "";
      
      if (status === "Active") badgeClass = "border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10";
      else if (status === "Inactive") badgeClass = "border-border/50 bg-slate-50 text-slate-600 dark:bg-slate-500/10";
      else if (status === "Suspended") badgeClass = "border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10";
      else badgeClass = "border-amber-200/50 bg-amber-50 text-amber-600 dark:bg-amber-500/10";

      return (
        <Badge variant="outline" className={`font-semibold ${badgeClass}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "assignedAt",
    header: "Assigned On",
    cell: ({ row }) => {
      const date = new Date(row.original.assignedAt);
      return <div className="text-[13px] text-slate-600 text-muted-foreground">{date.toLocaleDateString("en-GB")}</div>;
    },
  },
  {
    accessorKey: "lastActivityAt",
    header: "Last Activity",
    cell: ({ row }) => {
      const date = new Date(row.original.lastActivityAt);
      return <div className="text-[13px] text-slate-600 text-muted-foreground">{date.toLocaleDateString("en-GB")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-[13px] font-medium text-slate-600 hover:text-foreground text-muted-foreground dark:hover:text-slate-100"
          onClick={() => onViewDetails(row.original)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Details
        </Button>
      );
    },
  },
];
