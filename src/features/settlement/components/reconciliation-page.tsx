"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getReconciliations } from "../api/mock";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ReconciliationRecord } from "../types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Download,
  AlertCircle,
  CheckCircle2,
  FileText,
  Clock,
} from "lucide-react";
import {
  ComposedChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { StatCard } from "@/components/common/stat-card";

const trendData = [
  { date: "10 Sep", matched: 98.2, mismatch: 1.5, review: 0.3 },
  { date: "11 Sep", matched: 98.5, mismatch: 1.2, review: 0.3 },
  { date: "12 Sep", matched: 99.1, mismatch: 0.8, review: 0.1 },
  { date: "13 Sep", matched: 98.8, mismatch: 1.0, review: 0.2 },
  { date: "14 Sep", matched: 97.5, mismatch: 2.0, review: 0.5 },
  { date: "15 Sep", matched: 98.4, mismatch: 1.4, review: 0.2 },
  { date: "16 Sep", matched: 98.6, mismatch: 1.1, review: 0.3 },
];

const columns: ColumnDef<ReconciliationRecord>[] = [
  {
    accessorKey: "id",
    header: "Reconciliation ID",
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "merchantName",
    header: "Merchant",
  },
  {
    accessorKey: "internalAmount",
    header: "Internal",
    cell: ({ row }) => (
      <span className="font-medium text-foreground dark:text-white">
        {formatCurrency(row.getValue("internalAmount"))}
      </span>
    ),
  },
  {
    accessorKey: "bankAmount",
    header: "Bank",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatCurrency(row.getValue("bankAmount"))}
      </span>
    ),
  },
  {
    accessorKey: "partnerAmount",
    header: "Partner",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatCurrency(row.getValue("partnerAmount"))}
      </span>
    ),
  },
  {
    accessorKey: "difference",
    header: "Difference",
    cell: ({ row }) => {
      const diff = row.getValue("difference") as number;
      if (diff === 0)
        return (
          <span className="text-success font-medium">
            {formatCurrency(diff)}
          </span>
        );
      return (
        <span className="text-danger font-bold">{formatCurrency(diff)}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      if (status === "Matched") {
        return (
          <Badge
            variant="default"
            className="bg-success/100 hover:bg-emerald-600"
          >
            MATCHED
          </Badge>
        );
      }
      if (status === "Mismatch") {
        return <Badge variant="destructive">MISMATCH</Badge>;
      }
      return <Badge variant="secondary">{status.toUpperCase()}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link
          href={`/settlement/reconciliation/${row.original.id}`}
          className="text-sm font-medium text-info hover:underline"
        >
          View
        </Link>
      );
    },
  },
];

export function ReconciliationDashboardPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [timeRange, setTimeRange] = useState("7D");

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<any[]>([]);

  const { data: queryData, isLoading } = useQuery({
    queryKey: [
      "reconciliations",
      activeTab,
      pagination.pageIndex,
      pagination.pageSize,
    ],
    queryFn: () =>
      getReconciliations({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        status: activeTab,
      }),
  });

  const tabs = ["All", "Matched", "Mismatch", "Pending Review", "Resolved"];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">
            Reconciliation
          </h1>
          <p className="text-muted-foreground mt-1">
            Compare PayNexus internal transaction records with bank and
            payment-partner records.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Records"
          value="45,231"
          icon={FileText}
          iconColorClass="text-info"
          trendValue="Last 30 Days"
          trendUp={true}
        />
        <StatCard
          title="Matched"
          value="44,601"
          icon={CheckCircle2}
          iconColorClass="text-success"
          trendValue="98.6% match rate"
          trendUp={true}
        />
        <StatCard
          title="Mismatch"
          value="497"
          icon={AlertCircle}
          iconColorClass="text-danger"
          trendValue="1.1% of total"
          trendUp={false}
        />
        <StatCard
          title="Pending Review"
          value="133"
          icon={Clock}
          iconColorClass="text-warning"
          trendValue="Requires action"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reconciliation Trend */}
        <div className="lg:col-span-2 flex h-full min-h-[350px] w-full flex-col rounded-xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] border-border bg-background">
          <div className="flex flex-row items-center justify-between mb-2">
            <div>
              <h3 className="text-[16px] font-semibold text-foreground dark:text-white">
                Reconciliation Trend
              </h3>
              <p className="text-[12px] font-medium text-muted-foreground mt-1">
                Match vs Mismatch rates over time
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-white p-0.5 border-border bg-background">
              {["7D", "30D", "90D"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`flex items-center gap-1 rounded px-2.5 py-1 text-[13px] font-semibold transition-colors ${timeRange === t ? "bg-muted text-foreground bg-card dark:text-white" : "text-muted-foreground hover:text-foreground text-muted-foreground dark:hover:text-white"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={trendData}
                margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#10b981"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[96, 100]}
                  tickFormatter={(value) => `${value}%`}
                  dx={-10}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#ef4444"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 4]}
                  tickFormatter={(value) => `${value}%`}
                  dx={10}
                />
                <RechartsTooltip
                  cursor={{ fill: "rgba(226, 232, 240, 0.4)" }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white bg-background border border-border p-3 rounded-lg shadow-lg">
                          <p className="font-medium text-foreground dark:text-white mb-2">
                            {label}
                          </p>
                          <div className="space-y-1">
                            {payload.map((entry, index) => (
                              <p
                                key={index}
                                className="text-sm text-muted-foreground flex justify-between gap-4"
                              >
                                <span>
                                  {entry.name === "matched"
                                    ? "Matched"
                                    : entry.name === "mismatch"
                                      ? "Mismatch"
                                      : "Review"}
                                  :
                                </span>
                                <span
                                  className={`font-semibold ${entry.name === "matched" ? "text-success" : entry.name === "mismatch" ? "text-danger" : "text-warning"}`}
                                >
                                  {entry.value}%
                                </span>
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  yAxisId="right"
                  dataKey="mismatch"
                  stackId="a"
                  fill="#ef4444"
                  radius={[0, 0, 0, 0]}
                  maxBarSize={40}
                  name="mismatch"
                />
                <Bar
                  yAxisId="right"
                  dataKey="review"
                  stackId="a"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  name="review"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="matched"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#10b981",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6 }}
                  name="matched"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Match Distribution */}
        <div className="flex h-full min-h-[350px] w-full flex-col rounded-xl border border-border/60 bg-white p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] border-border bg-background">
          <div className="mb-2">
            <h3 className="text-[16px] font-semibold text-foreground dark:text-white">
              Match Distribution
            </h3>
            <p className="text-[12px] font-medium text-muted-foreground mt-1">
              Current status breakdown
            </p>
          </div>
          <div className="relative flex-1 flex flex-col items-center justify-center">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Matched", value: 98.6, color: "#10b981" },
                      { name: "Mismatch", value: 1.1, color: "#ef4444" },
                      {
                        name: "Pending Review",
                        value: 0.3,
                        color: "#f59e0b",
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {[
                      { name: "Matched", value: 98.6, color: "#10b981" },
                      { name: "Mismatch", value: 1.1, color: "#ef4444" },
                      {
                        name: "Pending Review",
                        value: 0.3,
                        color: "#f59e0b",
                      },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white bg-background border border-border p-2 rounded shadow-lg text-sm">
                            <span className="font-medium text-foreground dark:text-white">
                              {payload[0].name}:{" "}
                            </span>
                            <span className="text-muted-foreground">
                              {payload[0].value}%
                            </span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-foreground dark:text-white">
                  98.6%
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Matched
                </span>
              </div>
            </div>

            <div className="w-full mt-2 space-y-2">
              {[
                { name: "Matched", value: 98.6, color: "bg-success/100" },
                { name: "Mismatch", value: 1.1, color: "bg-danger/100" },
                { name: "Pending Review", value: 0.3, color: "bg-warning/100" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-[13px]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                    ></span>
                    <span className="text-muted-foreground font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col rounded-xl border border-border/60 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.01)] border-border bg-background">
        <div className="p-4 border-b border-border">
          <div className="flex bg-muted bg-card/50 p-1 rounded-lg w-fit overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? "bg-white bg-card text-foreground dark:text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
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
