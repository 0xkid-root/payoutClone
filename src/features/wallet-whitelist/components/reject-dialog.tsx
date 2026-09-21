"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WhitelistRequest } from "../types/wallet-whitelist.types";
import { useRejectWhitelistRequest } from "../queries";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface RejectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  request: WhitelistRequest;
}

export function RejectDialog({ isOpen, onClose, onSuccess, request }: RejectDialogProps) {
  const [reason, setReason] = useState("");
  const { mutate, isPending } = useRejectWhitelistRequest();

  const handleReject = () => {
    if (!reason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    mutate({ requestId: request.id, reason }, {
      onSuccess: () => {
        toast.success("Whitelist request rejected");
        setReason("");
        onClose();
        onSuccess();
      },
      onError: () => {
        toast.error("Failed to reject request. Please try again.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) setReason("");
      onClose();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-700 dark:text-red-500">
            <AlertCircle className="h-5 w-5" />
            Reject Request?
          </DialogTitle>
          <DialogDescription className="pt-3 text-slate-600 dark:text-slate-300">
            Please provide a reason for rejecting this bank account. This reason will be visible to the merchant.
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 space-y-3">
          <Textarea
            placeholder="Enter rejection reason here (e.g. Account name mismatch)..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isPending}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={isPending || !reason.trim()}
          >
            {isPending ? "Rejecting..." : "Reject Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
