"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreHorizontal, Eye, Ban, CheckCircle, Trash2 } from "lucide-react";
import { useFees } from "../../hooks/useFees";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/common/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function FlatFeesPage() {
  const { data: fees, isLoading } = useFees("FLAT");
  const [search, setSearch] = useState("");

  const filteredFees = fees?.filter(
    (fee) =>
      fee.merchantName?.toLowerCase().includes(search.toLowerCase()) ||
      fee.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Flat Fees"
        description="Manage fixed transaction fees for merchants."
        actions={
          <Link href="/fees-pricing/flat/create">
            <Button className="h-10 rounded-xl bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
              <Plus className="mr-2 h-4 w-4" />
              Create Flat Fee
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search Merchant / Fee ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl pl-9 bg-slate-50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-800"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 dark:bg-slate-800/20 dark:hover:bg-slate-800/20 border-slate-200 dark:border-slate-800">
              <TableHead>Fee ID</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead className="text-right">Flat Fee</TableHead>
              <TableHead>Effective From</TableHead>
              <TableHead>Effective To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredFees?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                  No flat fees found.
                </TableCell>
              </TableRow>
            ) : (
              filteredFees?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    {item.id}
                  </TableCell>
                  <TableCell className="font-medium">{item.merchantName}</TableCell>
                  <TableCell className="text-right font-medium">
                    ₹{item.flatFee?.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(item.effectiveFrom).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {item.effectiveTo
                      ? new Date(item.effectiveTo).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>
                          <Link href={`/fees-pricing/flat/${item.id}`} className="flex items-center w-full cursor-pointer">
                            <Eye className="mr-2 h-4 w-4 text-slate-500" />
                            View / Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          {item.status === "ACTIVE" ? (
                            <>
                              <Ban className="mr-2 h-4 w-4 text-slate-500" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4 text-slate-500" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/10 dark:focus:text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
