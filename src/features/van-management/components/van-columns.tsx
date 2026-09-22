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
      return <div className="font-mono font-medium text-foreground">{van}</div>;
    },
  },
  {
    accessorKey: "merchantName",
    header: "Merchant",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-[13px] text-foreground">
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
        <span className="font-medium text-[13px] text-foreground">
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
      
      if (status === "Active") badgeClass = "border-success/30 bg-success/10 text-success dark:bg-success/100/10";
      else if (status === "Inactive") badgeClass = "border-border/50 bg-background text-muted-foreground bg-background0/10";
      else if (status === "Suspended") badgeClass = "border-danger/30 bg-danger/10 text-danger dark:bg-danger/100/10";
      else badgeClass = "border-warning/30 bg-warning/10 text-warning dark:bg-warning/100/10";

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
      return <div className="text-[13px] text-muted-foreground">{date.toLocaleDateString("en-GB")}</div>;
    },
  },
  {
    accessorKey: "lastActivityAt",
    header: "Last Activity",
    cell: ({ row }) => {
      const date = new Date(row.original.lastActivityAt);
      return <div className="text-[13px] text-muted-foreground">{date.toLocaleDateString("en-GB")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 text-[13px] font-medium text-muted-foreground hover:text-foreground text-muted-foreground dark:hover:text-foreground"
          onClick={() => onViewDetails(row.original)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Details
        </Button>
      );
    },
  },
];
