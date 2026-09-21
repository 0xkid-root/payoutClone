"use client";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Download, Clock, CreditCard, RefreshCw, HandCoins, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { 
  useWalletStatsQuery, 
  useTransactionsQuery,
  useWalletFlowQuery 
} from "../queries";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export function WalletDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useWalletStatsQuery();
  const { data: flowData, isLoading: flowLoading } = useWalletFlowQuery();
  const { data: transactions, isLoading: txLoading } = useTransactionsQuery();

  return (
    <div className="flex flex-col gap-6 pb-8">
      <PageHeader
        title="Wallet Dashboard"
        description="Monitor system-wide wallet balances, transaction flows, and pending actions."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Link href="/wallet/adjustments">
              <Button className="bg-primary text-white shadow-sm">
                <Settings2 className="mr-2 h-4 w-4" />
                Manual Adjustment
              </Button>
            </Link>
          </div>
        }
      />

      {/* Row 1: High-level Balances */}
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3">
        {statsLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ))
        ) : stats ? (
          <>
            <StatCard
              title="Total Wallet Balance"
              value={formatCurrency(stats.totalBalance)}
              icon={Wallet}
              iconColorClass="text-indigo-600"
            />
            <StatCard
              title="Available Balance"
              value={formatCurrency(stats.availableBalance)}
              icon={Wallet}
              iconColorClass="text-emerald-600"
            />
            <StatCard
              title="Hold Balance"
              value={formatCurrency(stats.holdBalance)}
              icon={Wallet}
              iconColorClass="text-amber-600"
              alertText="Temporarily frozen funds"
            />
          </>
        ) : null}
      </div>

      {/* Row 2: Today's Flow & Pending */}
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3">
        {statsLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ))
        ) : stats ? (
          <>
            <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">Today's Credits</p>
                <ArrowDownCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(stats.todaysCredits)}</p>
                <span className={`text-xs font-medium ${stats.creditsComparison > 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {stats.creditsComparison > 0 ? "+" : ""}{stats.creditsComparison}%
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">Today's Debits</p>
                <ArrowUpCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(stats.todaysDebits)}</p>
                <span className={`text-xs font-medium ${stats.debitsComparison > 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {stats.debitsComparison > 0 ? "+" : ""}{stats.debitsComparison}%
                </span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                <Clock className="h-5 w-5 text-indigo-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.pendingRequests}</p>
                <span className="text-xs font-medium text-slate-500">Awaiting approval</span>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Wallet Flow Chart */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Wallet Flow</h3>
            <select className="text-sm border-slate-200 rounded-md bg-white dark:bg-slate-900 dark:border-slate-700 py-1 px-2">
              <option>Last 10 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="p-6 flex-1 min-h-[300px]">
            {flowLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : flowData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={flowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDebit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    tickFormatter={(val) => `₹${(val / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [formatCurrency(value as number), ""]}
                  />
                  <Area type="monotone" dataKey="credit" name="Credits" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCredit)" />
                  <Area type="monotone" dataKey="debit" name="Debits" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorDebit)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Status Distribution */}
          <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Wallet Status</h3>
            </div>
            <div className="p-0">
              <div className="flex justify-between items-center p-4 border-b border-slate-50 dark:border-slate-800/50">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active</span></div>
                <span className="text-sm font-bold">1,248</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-slate-50 dark:border-slate-800/50">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500"></div><span className="text-sm font-medium text-slate-700 dark:text-slate-300">Frozen</span></div>
                <span className="text-sm font-bold">24</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-slate-50 dark:border-slate-800/50">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-sm font-medium text-slate-700 dark:text-slate-300">Suspended</span></div>
                <span className="text-sm font-bold">12</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-500"></div><span className="text-sm font-medium text-slate-700 dark:text-slate-300">Closed</span></div>
                <span className="text-sm font-bold">8</span>
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden flex-1">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Pending Actions</h3>
            </div>
            <div className="p-2 space-y-1">
              <Link href="/wallet/fund-requests" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <HandCoins className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Fund Requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-500">42</Badge>
                </div>
              </Link>
              
              <Link href="/wallet/withdrawals" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Withdrawal Requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-500">31</Badge>
                </div>
              </Link>

              <Link href="/wallet/adjustments" className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <RefreshCw className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Manual Adjustments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300">8</Badge>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-xl border border-slate-200/60 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden mt-2">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Wallet Activity</h3>
          <Link href="/wallet/transactions">
            <Button variant="link" className="text-primary h-auto p-0 text-sm">View All &rarr;</Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-slate-500">Transaction ID</TableHead>
                <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-slate-500">Merchant</TableHead>
                <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</TableHead>
                <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Amount</TableHead>
                <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Balance</TableHead>
                <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                <TableHead className="h-10 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {txLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-500">Loading transactions...</TableCell>
                </TableRow>
              ) : transactions?.slice(0, 5).map((tx) => (
                <TableRow key={tx.id} className="border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <TableCell className="font-medium text-slate-900 dark:text-white text-[13px]">{tx.id}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400 text-[13px] font-medium">{tx.merchantName}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                      tx.type === 'Credit' ? 'border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' :
                      tx.type === 'Debit' ? 'border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10' :
                      'border-indigo-200/50 bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10'
                    }`}>
                      {tx.type}
                    </span>
                  </TableCell>
                  <TableCell className={`text-right text-[13px] font-semibold tabular-nums ${
                    tx.type === 'Credit' ? 'text-emerald-600' : 
                    tx.type === 'Debit' || tx.type === 'Withdrawal' ? 'text-red-600' : 'text-slate-900 dark:text-white'
                  }`}>
                    {tx.type === 'Credit' ? '+' : tx.type === 'Debit' || tx.type === 'Withdrawal' ? '-' : ''}
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell className="text-right text-[13px] text-slate-600 dark:text-slate-400 tabular-nums">
                    {formatCurrency(tx.balanceAfter)}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                      tx.status === 'Success' ? 'border-emerald-200/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' :
                      tx.status === 'Pending' || tx.status === 'Processing' ? 'border-amber-200/50 bg-amber-50 text-amber-600 dark:bg-amber-500/10' :
                      'border-red-200/50 bg-red-50 text-red-600 dark:bg-red-500/10'
                    }`}>
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-[13px] text-slate-500">
                    {new Date(tx.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
