import { Merchant } from "../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function BeneficiariesTab({ merchant }: { merchant: Merchant }) {
  const dummyBeneficiaries = [
    { name: "Rahul Sharma", account: "•••• 4521", status: "ACTIVE" },
    { name: "Amit Kumar", account: "•••• 8214", status: "ACTIVE" },
    { name: "Priya Singh", account: "•••• 9012", status: "INACTIVE" },
    { name: "Neha Gupta", account: "•••• 3341", status: "ACTIVE" },
    { name: "Vikram Malhotra", account: "•••• 7762", status: "DELETED" },
  ];

  return (
    <div className="grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
      <div>
        <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/20 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Saved Beneficiaries</h3>
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {merchant.totalBeneficiaries} Total
            </Badge>
          </div>
          <Link href="/beneficiaries" className="text-xs font-medium text-primary hover:underline inline-flex items-center">
            View all beneficiaries <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="p-0 border-t border-slate-100 dark:border-slate-800">
          {merchant.totalBeneficiaries === 0 ? (
            <div className="text-center py-8 text-sm text-slate-500">
              No beneficiaries found.
            </div>
          ) : (
            <div className="w-full">
              <table className="w-full text-sm">
                <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="h-10 px-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">Beneficiary</th>
                    <th className="h-10 px-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">Account</th>
                    <th className="h-10 px-5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyBeneficiaries.map((b, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-[13px] font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                            {b.name.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white text-[13px]">{b.name}</span>
                        </div>
                      </td>
                      <td className="p-4 px-5 text-[13px] text-slate-600 dark:text-slate-400 font-medium tabular-nums">{b.account}</td>
                      <td className="p-4 px-5">
                        {b.status === "ACTIVE" ? (
                          <span className="inline-flex items-center rounded-full border border-emerald-200/50 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">Active</span>
                        ) : b.status === "INACTIVE" ? (
                          <span className="inline-flex items-center rounded-full border border-amber-200/50 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-600">Inactive</span>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-red-200/50 bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-600">Deleted</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
