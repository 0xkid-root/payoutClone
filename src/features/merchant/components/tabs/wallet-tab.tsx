import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function WalletTab({ merchant }: { merchant: Merchant }) {
  const formattedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(merchant.walletBalance);

  const availableBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(merchant.walletBalance * 0.85);

  const blockedBalance = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(merchant.walletBalance * 0.15);

  return (
    <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-border">
      {/* Wallet Summary Section */}
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
        <div className="p-6 bg-background/10 bg-background/10">
          <p className="text-[13px] font-medium text-muted-foreground">Available Balance</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-success">{availableBalance}</p>
        </div>
        <div className="p-6 bg-background/10 bg-background/10">
          <p className="text-[13px] font-medium text-muted-foreground">Blocked Amount</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-warning">{blockedBalance}</p>
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <div className="px-5 py-4 bg-background/20 border-b border-border flex flex-row items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground dark:text-white">Recent Wallet Transactions</h3>
          <Link href="#" className="text-xs font-medium text-primary hover:underline inline-flex items-center">
            View all <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="p-0">
          <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 px-5">
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-foreground dark:text-white">
                    {i % 2 === 0 ? "Debit (Payout)" : "Credit (Settlement)"}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">Today, 10:24 AM</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[13px] font-semibold tabular-nums ${i % 2 === 0 ? "text-foreground dark:text-white" : "text-success"}`}>
                    {i % 2 === 0 ? "-" : "+"}₹{Math.floor(Math.random() * 50000).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-success font-medium mt-0.5">Successful</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
