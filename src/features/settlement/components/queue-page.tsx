"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download } from 'lucide-react';
import { formatCurrency, getSettlements } from '../api/mock';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/ui/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { SettlementRecord } from '../types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const columns: ColumnDef<SettlementRecord>[] = [
  {
    accessorKey: 'id',
    header: 'Settlement ID',
  },
  {
    accessorKey: 'merchantName',
    header: 'Merchant',
  },
  {
    accessorKey: 'settlementAmount',
    header: 'Amount',
    cell: ({ row }) => <span className="font-medium">{formatCurrency(row.getValue('settlementAmount'))}</span>,
  },
  {
    accessorKey: 'transactionCount',
    header: 'Txn Count',
  },
  {
    accessorKey: 'provider',
    header: 'Provider',
  },
  {
    accessorKey: 'settlementDate',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('settlementDate') as string);
      return <span>{date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={status === 'Completed' ? 'default' : status === 'Failed' ? 'destructive' : 'secondary'}>
          {status}
        </Badge>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/settlement/${row.original.id}`} className="text-sm font-medium text-blue-600 hover:underline">
          View
        </Link>
      );
    }
  }
];

export function SettlementQueuePage() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('all');
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<any[]>([]);

  const { data: queryData, isLoading } = useQuery({
    queryKey: ['settlements-queue', activeTab, pagination.pageIndex, pagination.pageSize, providerFilter],
    queryFn: () => getSettlements({ 
      page: pagination.pageIndex + 1, 
      limit: pagination.pageSize,
      status: activeTab 
    })
  });

  const tabs = ['All', 'Pending', 'Processing', 'Failed', 'Under Review'];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settlement Queue</h1>
          <p className="text-slate-500 mt-1">Monitor settlements that are currently being processed or require attention.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="flex w-full flex-col rounded-xl border border-slate-200/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
            {/* Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setPagination(prev => ({ ...prev, pageIndex: 0 }));
                  }}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search Settlement ID..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full md:w-[250px] bg-slate-50 dark:bg-slate-900/50 border-slate-200" 
                />
              </div>
              <Select value={providerFilter} onValueChange={(val) => setProviderFilter(val || 'all')}>
                <SelectTrigger className="w-full md:w-[160px] bg-slate-50 dark:bg-slate-900/50 border-slate-200">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                  <SelectItem value="cashfree">Cashfree</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 pt-4">
          <DataTable 
            columns={columns} 
            data={queryData?.data || []}
            pageCount={Math.ceil((queryData?.total || 0) / pagination.pageSize)}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
