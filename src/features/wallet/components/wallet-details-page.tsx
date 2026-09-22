"use client";

import { useWalletQuery, useTransactionsQuery, useFreezeWallet } from "../queries";
import { ArrowLeft, Wallet as WalletIcon, Snowflake, AlertCircle, RefreshCw, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WalletStatus } from "../types/wallet.types";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function WalletDetailsPage({ walletId }: { walletId: string }) {
  const { data: wallet, isLoading: isWalletLoading } = useWalletQuery(walletId);
  const { data: transactions, isLoading: isTxLoading } = useTransactionsQuery(walletId);
  const freezeMutation = useFreezeWallet();

  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<WalletStatus | null>(null);

  const displayStatus = optimisticStatus || wallet?.status;

  const handleFreeze = () => {
    freezeMutation.mutate(walletId, {
      onSuccess: () => {
        setOptimisticStatus("Frozen");
        setIsFreezeDialogOpen(false);
      }
    });
  };

  if (isWalletLoading) {
    return (
      <div className="flex flex-col gap-6 pb-8">
        <div className="h-6 w-32 bg-muted bg-card rounded animate-pulse" />
        <div className="h-24 w-full bg-muted bg-card rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-muted bg-card rounded-xl animate-pulse" />
          <div className="h-32 bg-muted bg-card rounded-xl animate-pulse" />
          <div className="h-32 bg-muted bg-card rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex flex-col gap-6 pb-8 items-center justify-center min-h-[400px]">
        <AlertCircle className="h-12 w-12 text-foreground text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-foreground dark:text-white">Wallet Not Found</h2>
        <p className="text-muted-foreground">The wallet you are looking for does not exist.</p>
        <Link href="/wallet/all">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Wallets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Back Navigation */}
      <div>
        <Link href="/wallet/all" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Wallets
        </Link>
      </div>

      {/* Wallet Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/60 border-border pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Wallet</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground dark:text-white mb-2">
            {wallet.merchantName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-muted-foreground">
            <span>Merchant ID: <span className="font-mono font-medium text-foreground">{wallet.merchantId}</span></span>
            <span>&middot;</span>
            <span>Wallet ID: <span className="font-mono font-medium text-foreground">{wallet.id}</span></span>
          </div>
          <div className="flex items-center gap-4 mt-5">
            <StatusBadge status={displayStatus || "Active"} />
            {displayStatus !== "Frozen" && displayStatus !== "Closed" && (
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 border-warning/30 bg-warning/10 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/20 dark:text-warning dark:hover:bg-amber-900/40"
                onClick={() => setIsFreezeDialogOpen(true)}
              >
                <Snowflake className="mr-2 h-3.5 w-3.5" />
                Freeze Wallet
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Balance"
          value={formatCurrency(wallet.totalBalance)}
          icon={WalletIcon}
          iconColorClass="text-muted-foreground"
        />
        <StatCard
          title="Available Balance"
          value={formatCurrency(wallet.availableBalance)}
          icon={WalletIcon}
          iconColorClass="text-success"
        />
        <StatCard
          title="Hold Balance"
          value={formatCurrency(wallet.holdBalance)}
          icon={WalletIcon}
          iconColorClass="text-warning"
          alertText={wallet.holdBalance > 0 ? "Temporarily frozen funds" : undefined}
        />
      </div>

      {/* Wallet Overview */}
      <div className="rounded-[14px] border border-border/60 bg-white shadow-sm border-border bg-background overflow-hidden">
        <div className="p-5 border-b border-border bg-background/50">
          <h2 className="text-sm font-semibold text-foreground dark:text-white">
            Wallet Overview
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Account information and current wallet capabilities</p>
        </div>
        
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800">
          {/* Left Column: Wallet Information */}
          <div className="p-6">
            <h3 className="text-[13px] font-semibold text-foreground dark:text-white mb-5">
              Wallet Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Merchant</p>
                <p className="text-[13px] font-semibold text-foreground dark:text-white">{wallet.merchantName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Merchant ID</p>
                <p className="text-[13px] font-semibold text-foreground dark:text-white font-mono">{wallet.merchantId}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Wallet ID</p>
                <p className="text-[13px] font-semibold text-foreground dark:text-white font-mono">{wallet.id}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Wallet Type</p>
                <p className="text-[13px] font-semibold text-foreground dark:text-white">{wallet.walletType}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Currency</p>
                <p className="text-[13px] font-semibold text-foreground dark:text-white">{wallet.currency}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Created</p>
                <p className="text-[13px] font-semibold text-foreground dark:text-white">
                  {new Date(wallet.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">KYC Status</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${wallet.kycStatus === 'Verified' ? 'bg-success/100' : wallet.kycStatus === 'Pending' ? 'bg-warning/100' : 'bg-danger/100'}`}></div>
                  <p className="text-[13px] font-semibold text-foreground dark:text-white">{wallet.kycStatus}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Last Activity</p>
                <p className="text-[13px] font-semibold text-foreground dark:text-white">
                  {new Date(wallet.lastActivityAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},{' '}
                  {new Date(wallet.lastActivityAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Operational Status */}
          <div className="p-6">
            <h3 className="text-[13px] font-semibold text-foreground dark:text-white mb-5">
              Operational Status
            </h3>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Transactions</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${displayStatus === 'Frozen' ? 'bg-danger/100' : wallet.transactionEnabled ? 'bg-success/100' : 'bg-muted-foreground/30'}`}></div>
                    <p className="text-[13px] font-semibold text-foreground dark:text-white">
                      {displayStatus === 'Frozen' ? 'Disabled' : wallet.transactionEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Credits</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${displayStatus === 'Frozen' ? 'bg-danger/100' : wallet.creditEnabled ? 'bg-success/100' : 'bg-muted-foreground/30'}`}></div>
                    <p className="text-[13px] font-semibold text-foreground dark:text-white">
                      {displayStatus === 'Frozen' ? 'Disabled' : wallet.creditEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Withdrawals</p>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${displayStatus === 'Frozen' ? 'bg-danger/100' : wallet.withdrawalEnabled ? 'bg-success/100' : 'bg-muted-foreground/30'}`}></div>
                    <p className="text-[13px] font-semibold text-foreground dark:text-white">
                      {displayStatus === 'Frozen' ? 'Disabled' : wallet.withdrawalEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-1">Funds on Hold</p>
                <p className="text-xl font-bold text-warning dark:text-warning tracking-tight mb-0.5">{formatCurrency(wallet.holdBalance)}</p>
                <p className="text-xs text-muted-foreground">Temporarily restricted</p>
              </div>

              <div className="pt-5 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-1.5">Wallet Health</p>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${displayStatus === 'Frozen' ? 'bg-warning/100' : 'bg-success/100'}`}></div>
                  <p className="text-[13px] font-semibold text-foreground dark:text-white">
                    {displayStatus === 'Frozen' ? 'Attention Required' : 'Healthy'}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {displayStatus === 'Frozen' ? 'Wallet is currently frozen.' : 'All wallet operations are currently enabled.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 pb-10">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[15px] font-semibold text-foreground dark:text-white">
            Recent Wallet Activity
          </h2>
          <Link href="/wallet/transactions">
            <Button variant="link" className="text-primary h-auto p-0 text-[13px] font-semibold">
              View all transactions &rarr;
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-border">
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Transaction ID</TableHead>
                  <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Type</TableHead>
                  <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Amount</TableHead>
                  <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Balance</TableHead>
                  <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                  <TableHead className="h-11 px-5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isTxLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i} className="border-border/50">
                      <TableCell colSpan={6} className="p-4">
                        <div className="h-5 w-full bg-muted bg-card rounded animate-pulse"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : transactions?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No recent activity.
                    </TableCell>
                  </TableRow>
                ) : transactions?.slice(0, 5).map((tx) => (
                  <TableRow key={tx.id} className="h-14 border-b border-border/60 hover:bg-background dark:hover:bg-card/30 transition-colors">
                    <TableCell className="px-5 font-semibold text-foreground dark:text-white text-[13px]">{tx.id}</TableCell>
                    <TableCell className="px-5">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {tx.type}
                      </span>
                    </TableCell>
                    <TableCell className={`px-5 text-right text-[13px] font-bold tabular-nums ${
                      tx.type === 'Credit' || tx.type === 'Refund' ? 'text-success dark:text-success' : 
                      'text-foreground dark:text-white'
                    }`}>
                      {tx.type === 'Credit' || tx.type === 'Refund' ? '+' : tx.type === 'Debit' || tx.type === 'Withdrawal' || tx.type === 'Payout' ? '-' : ''}
                      {formatCurrency(tx.amount)}
                    </TableCell>
                    <TableCell className="px-5 text-right text-[13px] font-medium text-muted-foreground tabular-nums">
                      {formatCurrency(tx.balanceAfter)}
                    </TableCell>
                    <TableCell className="px-5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Success' ? 'bg-success/100' : tx.status === 'Pending' ? 'bg-warning/100' : 'bg-danger/100'}`}></div>
                        <span className="text-[13px] text-muted-foreground">{tx.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 text-[12px] text-muted-foreground font-medium">
                      {new Date(tx.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

      {/* Freeze Confirmation Dialog */}
      <Dialog open={isFreezeDialogOpen} onOpenChange={setIsFreezeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-amber-700 dark:text-warning">
              <AlertCircle className="h-5 w-5" />
              Freeze Wallet?
            </DialogTitle>
            <DialogDescription className="pt-3 text-muted-foreground text-foreground">
              Are you sure you want to freeze this wallet? New wallet transactions will be restricted until the wallet is activated again.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-background/50 p-4 rounded-lg my-2 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Merchant: <span className="font-semibold text-foreground dark:text-white">{wallet?.merchantName}</span></p>
            <p className="text-sm text-muted-foreground">Wallet ID: <span className="font-mono font-medium text-foreground dark:text-white">{wallet?.id}</span></p>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsFreezeDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={handleFreeze}
              disabled={freezeMutation.isPending}
            >
              {freezeMutation.isPending ? "Freezing..." : "Freeze Wallet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
