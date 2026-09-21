"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Landmark, ArrowRightLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency, getSettlements } from '../api/mock';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/ui/data-table/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { SettlementRecord } from '../types';
import Link from 'next/link';
import { StatCard } from '@/components/common/stat-card';

const chartData = [
  { date: '10 Sep', settlement: 8500000, completed: 8200000, pending: 300000 },
  { date: '11 Sep', settlement: 9200000, completed: 9000000, pending: 200000 },
  { date: '12 Sep', settlement: 7800000, completed: 7800000, pending: 0 },
  { date: '13 Sep', settlement: 10500000, completed: 10100000, pending: 400000 },
  { date: '14 Sep', settlement: 11200000, completed: 10800000, pending: 400000 },
  { date: '15 Sep', settlement: 12100000, completed: 11500000, pending: 600000 },
  { date: '16 Sep', settlement: 12480000, completed: 11920000, pending: 560000 },
];

const statusData = [
  { name: 'Completed', value: 11920000, color: '#10b981' },
  { name: 'Processing', value: 400000, color: '#3b82f6' },
  { name: 'Pending', value: 160000, color: '#f59e0b' },
];

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

export function SettlementDashboardPage() {
  const [timeRange, setTimeRange] = useState('7D');
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [sorting, setSorting] = useState<any[]>([]);

  const { data: recentSettlements, isLoading } = useQuery({
    queryKey: ['recent-settlements'],
    queryFn: () => getSettlements({ page: 1, limit: 5 })
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settlement Dashboard</h1>
        <p className="text-slate-500 mt-1">Monitor daily settlement cycles and reconciliation status.</p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Settlement"
          value={formatCurrency(12480000)}
          icon={Landmark}
          iconColorClass="text-blue-600"
          trendValue="12.5% vs yesterday"
          trendUp={true}
        />
        <StatCard
          title="Completed"
          value={formatCurrency(11920000)}
          icon={CheckCircle2}
          iconColorClass="text-emerald-500"
          trendValue="95.5% success rate"
          trendUp={true}
        />
        <StatCard
          title="Pending"
          value={formatCurrency(560000)}
          icon={ArrowRightLeft}
          iconColorClass="text-amber-500"
        />
        <StatCard
          title="Reconciliation Mismatch"
          value={formatCurrency(125000)}
          icon={AlertCircle}
          iconColorClass="text-red-500"
          trendValue="Needs review"
          trendUp={false}
        />
      </div>

      {/* Main Visuals */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Hero Graph */}
        <div className="md:col-span-2 flex h-full min-h-[350px] w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-row items-center justify-between mb-2">
            <div>
              <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Settlement Performance</h3>
              <p className="text-[12px] font-medium text-slate-500 mt-1">Total settlement vs completed vs pending</p>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-900">
              {['7D', '30D', '90D'].map(t => (
                <button 
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`flex items-center gap-1 rounded px-2.5 py-1 text-[13px] font-semibold transition-colors ${timeRange === t ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`}
                  />
                  <RechartsTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg shadow-lg">
                            <p className="font-medium text-slate-900 dark:text-white mb-2">{label}</p>
                            <div className="space-y-1">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                <span className="inline-block w-3 h-3 rounded-full bg-slate-400 mr-2"></span>
                                Total: <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(payload[0].payload.settlement)}</span>
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
                                Completed: <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(payload[0].value as number)}</span>
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                                Pending: <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(payload[1].value as number)}</span>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="completed" stroke="#10b981" fillOpacity={1} fill="url(#colorCompleted)" />
                  <Area type="monotone" dataKey="pending" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPending)" />
                </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="flex h-full min-h-[350px] w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2">
            <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Status Distribution</h3>
          </div>
          <div className="relative flex-1 flex flex-col items-center justify-center">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg shadow-lg">
                            <p className="text-sm font-medium" style={{ color: data.color }}>{data.name}</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(data.value)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-500">Total</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(12480000)}</span>
              </div>
            </div>
            <div className="w-full mt-4 space-y-2">
              {statusData.map(s => (
                <div key={s.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
                    <span className="text-[12px] font-medium text-slate-500">{s.name}</span>
                  </div>
                  <span className="text-[13px] font-semibold text-slate-900 dark:text-white">{((s.value / 12480000) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Settlement Health */}
      <div className="flex w-full flex-col rounded-xl border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h3 className="text-[16px] font-semibold text-slate-900 dark:text-white">Reconciliation Health</h3>
            <p className="text-[12px] font-medium text-slate-500 mt-1">Are today's settlements reconciling correctly?</p>
          </div>
          <div className="flex gap-6">
            <div className="text-right">
              <div className="text-sm text-emerald-600 font-medium">Matched</div>
              <div className="text-xl font-bold">98.6%</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-amber-500 font-medium">Pending Review</div>
              <div className="text-xl font-bold">0.3%</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-red-500 font-medium">Mismatch</div>
              <div className="text-xl font-bold">1.1%</div>
            </div>
          </div>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
          <div className="h-full bg-emerald-500" style={{ width: '98.6%' }}></div>
          <div className="h-full bg-amber-500" style={{ width: '0.3%' }}></div>
          <div className="h-full bg-red-500" style={{ width: '1.1%' }}></div>
        </div>
      </div>

      {/* Recent Settlement Activity */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle>Recent Settlement Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={recentSettlements?.data || []}
            pageCount={1}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
            hidePagination={true}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
