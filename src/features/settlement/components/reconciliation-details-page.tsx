"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Server, Building, Landmark, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency, getReconciliationById } from '../api/mock';

export function ReconciliationDetailsPage({ id = 'REC-1002' }: { id?: string }) {
 const { data: record, isLoading } = useQuery({
 queryKey: ['reconciliation', id],
 queryFn: () => getReconciliationById(id)
 });

 if (isLoading || !record) {
 return <div className="p-8 text-center text-muted-foreground">Loading reconciliation details...</div>;
 }

 return (
 <div className="space-y-6 max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
 <div className="flex items-center gap-4">
 <Link href="/settlement/reconciliation">
 <Button variant="ghost" size="icon" className="rounded-full">
 <ArrowLeft className="w-5 h-5" />
 </Button>
 </Link>
 <div>
 <div className="flex items-center gap-3">
 <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">Reconciliation #{record.id}</h1>
 {record.status === 'Matched' ? (
 <Badge variant="default" className="bg-success/100 hover:bg-emerald-600">MATCHED</Badge>
 ) : record.status === 'Mismatch' ? (
 <Badge variant="destructive">MISMATCH</Badge>
 ) : (
 <Badge variant="secondary">{record.status.toUpperCase()}</Badge>
 )}
 </div>
 <p className="text-muted-foreground mt-1">Transaction ID: {record.transactionId} • Merchant: {record.merchantName}</p>
 </div>
 {record.status === 'Mismatch' && (
 <div className="ml-auto flex gap-3">
 <Button variant="outline">Mark as Investigating</Button>
 <Button>Resolve Mismatch</Button>
 </div>
 )}
 </div>

 <div className="mt-8 relative">
 <h2 className="text-[16px] font-semibold text-foreground dark:text-white mb-4">Three-way Comparison</h2>
 <div className="flex w-full flex-col rounded-xl border border-border shadow-sm border-border bg-card">
 
 {/* Internal System */}
 <div className="flex-1 p-6 relative">
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-3">
 <div className="p-2 bg-muted text-muted-foreground rounded-md bg-card text-muted-foreground">
 <Server className="w-5 h-5" />
 </div>
 <h3 className="font-semibold text-foreground dark:text-white">Internal System</h3>
 </div>
 <div className="text-right">
 <p className="text-[20px] font-bold text-foreground dark:text-white">{formatCurrency(record.internalAmount)}</p>
 <p className="text-sm text-muted-foreground mt-0.5">Internal Record</p>
 </div>
 </div>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-card bg-card/50 p-4 rounded-lg">
 <div>
 <span className="block text-muted-foreground mb-1">Transaction ID</span>
 <span className="font-medium text-foreground dark:text-white">{record.transactionId}</span>
 </div>
 <div>
 <span className="block text-muted-foreground mb-1">Status</span>
 <span className="font-medium text-success">Success</span>
 </div>
 <div className="md:col-span-2">
 <span className="block text-muted-foreground mb-1">Created</span>
 <span className="font-medium text-foreground dark:text-white">
 {new Date(record.internalTimestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
 </span>
 </div>
 </div>
 </div>

 <div className="relative flex items-center justify-center h-0 z-10">
 <div className="absolute w-full h-[1px] bg-border"></div>
 <div className="bg-muted bg-card text-muted-foreground text-[11px] font-bold px-3 py-1 rounded-full border border-border z-10">
 VS
 </div>
 </div>

 {/* Bank Record */}
 <div className={`flex-1 p-6 relative ${record.status === 'Mismatch' ? 'bg-danger/10/30 dark:bg-red-900/10' : ''}`}>
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-3">
 <div className="p-2 bg-muted text-muted-foreground rounded-md bg-card text-muted-foreground">
 <Landmark className="w-5 h-5" />
 </div>
 <h3 className="font-semibold text-foreground dark:text-white">Bank Record</h3>
 </div>
 <div className="text-right">
 <p className={`text-[20px] font-bold ${record.status === 'Mismatch' ? 'text-danger dark:text-red-400' : 'text-foreground dark:text-white'}`}>{formatCurrency(record.bankAmount)}</p>
 <p className="text-sm text-muted-foreground mt-0.5">Bank Statement</p>
 </div>
 </div>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-card bg-card/50 p-4 rounded-lg">
 <div>
 <span className="block text-muted-foreground mb-1">Bank Ref</span>
 <span className="font-medium text-foreground dark:text-white">{record.bankReference || '-'}</span>
 </div>
 <div>
 <span className="block text-muted-foreground mb-1">Status</span>
 <span className="font-medium text-success">Success</span>
 </div>
 <div className="md:col-span-2">
 <span className="block text-muted-foreground mb-1">Settlement Date</span>
 <span className="font-medium text-foreground dark:text-white">
 {record.bankTimestamp ? new Date(record.bankTimestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
 </span>
 </div>
 </div>
 </div>

 <div className="relative flex items-center justify-center h-0 z-10">
 <div className="absolute w-full h-[1px] bg-border"></div>
 <div className="bg-muted bg-card text-muted-foreground text-[11px] font-bold px-3 py-1 rounded-full border border-border z-10">
 VS
 </div>
 </div>

 {/* Payment Partner */}
 <div className={`flex-1 p-6 relative ${record.status === 'Mismatch' ? 'bg-danger/10/30 dark:bg-red-900/10' : ''}`}>
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-3">
 <div className="p-2 bg-muted text-muted-foreground rounded-md bg-card text-muted-foreground">
 <Building className="w-5 h-5" />
 </div>
 <h3 className="font-semibold text-foreground dark:text-white">Payment Partner</h3>
 </div>
 <div className="text-right">
 <p className={`text-[20px] font-bold ${record.status === 'Mismatch' ? 'text-danger dark:text-red-400' : 'text-foreground dark:text-white'}`}>{formatCurrency(record.partnerAmount)}</p>
 <p className="text-sm text-muted-foreground mt-0.5">Provider Report</p>
 </div>
 </div>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-card bg-card/50 p-4 rounded-lg">
 <div>
 <span className="block text-muted-foreground mb-1">Partner Ref</span>
 <span className="font-medium text-foreground dark:text-white">{record.partnerReference || '-'}</span>
 </div>
 <div>
 <span className="block text-muted-foreground mb-1">Status</span>
 <span className="font-medium text-success">Success</span>
 </div>
 <div className="md:col-span-2">
 <span className="block text-muted-foreground mb-1">Processed</span>
 <span className="font-medium text-foreground dark:text-white">
 {record.partnerTimestamp ? new Date(record.partnerTimestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>

 {record.difference !== 0 && (
 <div className="mt-8">
 <h2 className="text-[16px] font-semibold text-foreground dark:text-white mb-4">Amount Comparison</h2>
 <div className="flex flex-col rounded-xl border border-border shadow-sm border-border bg-card">
 <div className="p-6 space-y-4">
 <div className="flex justify-between items-center text-sm font-medium">
 <span className="text-muted-foreground">PayNexus Internal</span>
 <span className="text-foreground dark:text-white">{formatCurrency(record.internalAmount)}</span>
 </div>
 <div className="flex justify-between items-center text-sm font-medium">
 <span className="text-muted-foreground">Bank</span>
 <span className="text-foreground dark:text-white">{formatCurrency(record.bankAmount)}</span>
 </div>
 <div className="flex justify-between items-center text-sm font-medium pb-4 border-b border-border">
 <span className="text-muted-foreground">Payment Partner</span>
 <span className="text-foreground dark:text-white">{formatCurrency(record.partnerAmount)}</span>
 </div>
 <div className="flex justify-between items-center font-bold">
 <span className="text-foreground dark:text-white text-base">Difference</span>
 <span className="text-danger text-lg">{formatCurrency(record.difference)}</span>
 </div>
 </div>
 <div className="bg-danger/10 dark:bg-red-900/10 px-6 py-4 border-t border-red-100 dark:border-red-900/20 rounded-b-xl flex gap-3 items-start">
 <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
 <p className="text-sm text-danger dark:text-red-400">
 External records are {formatCurrency(record.difference)} lower than the internal transaction amount.
 </p>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
