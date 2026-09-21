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
import { useUpdateVanStatusMutation } from "../hooks/use-vans";
import { VanAccount, VanStatus } from "../types/van.types";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface VanStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  van: VanAccount;
  action: "Activate" | "Deactivate" | "Suspend";
}

export function VanStatusDialog({ isOpen, onClose, van, action }: VanStatusDialogProps) {
  const { mutate, isPending } = useUpdateVanStatusMutation();

  const handleAction = () => {
    let targetStatus: VanStatus = "Active";
    if (action === "Deactivate") targetStatus = "Inactive";
    if (action === "Suspend") targetStatus = "Suspended";

    mutate({ id: van.id, status: targetStatus }, {
      onSuccess: () => {
        toast.success(`Virtual account ${targetStatus.toLowerCase()} successfully`);
        onClose();
      },
      onError: () => {
        toast.error(`Failed to ${action.toLowerCase()} virtual account`);
      }
    });
  };

  const getActionColor = () => {
    if (action === "Activate") return "text-emerald-600 dark:text-emerald-500";
    if (action === "Deactivate") return "text-red-600 dark:text-red-500";
    return "text-amber-600 dark:text-amber-500";
  };

  const getButtonClass = () => {
    if (action === "Activate") return "bg-emerald-600 hover:bg-emerald-700 text-white";
    if (action === "Deactivate") return "bg-red-600 hover:bg-red-700 text-white";
    return "bg-amber-600 hover:bg-amber-700 text-white";
  };

  const getActionDescription = () => {
    if (action === "Activate") return "Are you sure you want to activate this virtual account? The merchant will be able to receive funds.";
    if (action === "Deactivate") return "Are you sure you want to deactivate this virtual account? Inbound transactions will be rejected.";
    return "Are you sure you want to suspend this virtual account? Operations will be temporarily paused.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${getActionColor()}`}>
            <AlertCircle className="h-5 w-5" />
            {action} Virtual Account?
          </DialogTitle>
          <DialogDescription className="pt-3 text-slate-600 dark:text-slate-300">
            {getActionDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg my-2 border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-500 mb-1">Merchant: <span className="font-semibold text-slate-900 dark:text-white">{van.merchantName}</span></p>
          <p className="text-sm text-slate-500 mb-1">Provider: <span className="font-semibold text-slate-900 dark:text-white">{van.provider}</span></p>
          <p className="text-sm text-slate-500">VAN: <span className="font-mono font-medium text-slate-900 dark:text-white">{van.vanNumber}</span></p>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button 
            className={getButtonClass()}
            onClick={handleAction}
            disabled={isPending}
          >
            {isPending ? "Processing..." : `Yes, ${action}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
