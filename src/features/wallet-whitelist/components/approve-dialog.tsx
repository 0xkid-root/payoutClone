"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WhitelistRequest } from "../types/wallet-whitelist.types";
import { useApproveWhitelistRequest } from "../queries";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ApproveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  request: WhitelistRequest;
}

export function ApproveDialog({ isOpen, onClose, onSuccess, request }: ApproveDialogProps) {
  const { mutate, isPending } = useApproveWhitelistRequest();

  const handleApprove = () => {
    mutate(request.id, {
      onSuccess: () => {
        toast.success("Bank account approved for wallet funding");
        onClose();
        onSuccess();
      },
      onError: () => {
        toast.error("Failed to approve request. Please try again.");
      }
    });
  };

  const maskAccountNumber = (acc: string) => {
    if (acc.length < 8) return acc;
    return `XXXX XXXX ${acc.slice(-4)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500">
            <AlertCircle className="h-5 w-5" />
            Approve Request?
          </DialogTitle>
          <DialogDescription className="pt-3 text-slate-600 dark:text-slate-300">
            Are you sure you want to approve this bank account for wallet funding? This will authorize the merchant to request funds from this account.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg my-2 border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 mb-1">Merchant: <span className="font-semibold text-slate-900 dark:text-white">{request.merchantName}</span></p>
          <p className="text-sm text-slate-500 mb-1">Bank: <span className="font-semibold text-slate-900 dark:text-white">{request.bankName}</span></p>
          <p className="text-sm text-slate-500">Account: <span className="font-mono font-medium text-slate-900 dark:text-white">{maskAccountNumber(request.accountNumber)}</span></p>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleApprove}
            disabled={isPending}
          >
            {isPending ? "Approving..." : "Approve Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
