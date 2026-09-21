"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Building2, Landmark, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency, getSettlementById, MOCK_TRANSACTIONS } from '../api/mock';
import { DataTable } from '@/components/ui/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { SettlementTransaction } from '../types';

const columns: ColumnDef<SettlementTransaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'payoutId',
    header: 'Payout ID',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <span>{formatCurrency(row.getValue('amount'))}</span>,
  },
  {
    accessorKey: 'fee',
    header: 'Fee',
    cell: ({ row }) => <span className="text-red-500">{formatCurrency(row.getValue('fee'))}</span>,
  },
  {
    accessorKey: 'netAmount',
    header: 'Net Amount',
    cell: ({ row }) => <span className="font-medium text-emerald-600">{formatCurrency(row.getValue('netAmount'))}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">{status}</Badge>;
    }
  },
  {
    accessorKey: 'processedAt',
    header: 'Processed At',
    cell: ({ row }) => {
      const dateStr = row.getValue('processedAt') as string;
      const date = new Date(dateStr);
      return <span>{date.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>;
    }
  }
];

export function SettlementDetailsPage({ id = 'STL-000123' }: { id?: string }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<any[]>([]);

  const { data: settlement, isLoading } = useQuery({
    queryKey: ['settlement', id],
    queryFn: () => getSettlementById(id)
  });

  if (isLoading || !settlement) {
    return <div className="p-8 text-center text-slate-500">Loading settlement details...</div>;
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/settlement/queue">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settlement #{settlement.id}</h1>
            <Badge variant={settlement.status === 'Completed' ? 'default' : settlement.status === 'Failed' ? 'destructive' : 'secondary'}>
              {settlement.status}
            </Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Settlement Date: {new Date(settlement.settlementDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div className="ml-auto">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white mb-4">Settlement Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-[12px] font-medium text-slate-500 mb-1">Merchant</p>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-[14px] font-semibold">{settlement.merchantName}</span>
                </div>
              </div>
              <div>
                <p className="text-[12px] font-medium text-slate-500 mb-1">Transaction Count</p>
                <span className="text-[14px] font-semibold">{settlement.transactionCount}</span>
              </div>
              <div>
                <p className="text-[12px] font-medium text-slate-500 mb-1">Provider</p>
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-slate-400" />
                  <span className="text-[14px] font-semibold">{settlement.provider}</span>
                </div>
              </div>
              <div>
                <p className="text-[12px] font-medium text-slate-500 mb-1">Net Settlement</p>
                <span className="font-semibold text-emerald-600 text-lg">{formatCurrency(settlement.settlementAmount)}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white mb-4">Amount Breakdown</h3>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-6 space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Gross Payout Amount</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(settlement.grossAmount)}</span>
              </div>
              <div className="flex justify-between items-center text-red-500">
                <span>Total Fees Deducted</span>
                <span>-{formatCurrency(settlement.fees)}</span>
              </div>
              <div className="flex justify-between items-center text-red-500 pb-4 border-b border-slate-200 dark:border-slate-800">
                <span>Taxes (GST)</span>
                <span>-{formatCurrency(settlement.gst)}</span>
              </div>
              <div className="flex justify-between items-center text-base pt-2">
                <span className="font-semibold text-slate-900 dark:text-white">Net Settlement Amount</span>
                <span className="font-bold text-emerald-600">{formatCurrency(settlement.settlementAmount)}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col rounded-xl border border-slate-200/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Transactions in Settlement</h3>
            </div>
            <div className="p-4 sm:p-6 pt-4">
              <DataTable 
                columns={columns} 
                data={MOCK_TRANSACTIONS}
                pageCount={1}
                pagination={pagination}
                onPaginationChange={setPagination}
                sorting={sorting}
                onSortingChange={setSorting}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white mb-6">Status Timeline</h3>
            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
              <div className="relative">
                <div className="absolute -left-[35px] bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500 p-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Completed</h4>
                <p className="text-sm text-slate-500">16 Sep, 09:17 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[35px] bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500 p-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Bank Response Received</h4>
                <p className="text-sm text-slate-500">16 Sep, 09:16 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[35px] bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500 p-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Sent to Bank</h4>
                <p className="text-sm text-slate-500">16 Sep, 09:14 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[35px] bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500 p-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Processing</h4>
                <p className="text-sm text-slate-500">16 Sep, 09:12 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[35px] bg-slate-100 dark:bg-slate-800 border-2 border-emerald-500 p-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Settlement Created</h4>
                <p className="text-sm text-slate-500">16 Sep, 09:10 AM</p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white mb-4">Settlement Provider</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Provider</span>
                <span className="font-medium">{settlement.provider}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Provider Ref</span>
                <span className="font-mono text-xs">{settlement.providerReference || '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Bank Ref</span>
                <span className="font-mono text-xs">{settlement.bankReference || '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">UTR</span>
                <span className="font-mono text-xs text-blue-600">{settlement.utr || '-'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Processed At</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {settlement.completedAt ? new Date(settlement.completedAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
