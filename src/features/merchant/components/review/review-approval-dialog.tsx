import { useState } from "react";
import { useRouter } from "next/navigation";
import { Merchant } from "../../merchant.mock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReviewApprovalDialogProps {
  isOpen: boolean;
  type: "APPROVE" | "REJECT" | null;
  merchant: Merchant;
  onClose: () => void;
}

export function ReviewApprovalDialog({ isOpen, type, merchant, onClose }: ReviewApprovalDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    onClose();
    // Navigate back to merchants table after action
    router.push("/merchants");
  };

  if (type === "REJECT") {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Reject Merchant Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject {merchant.businessName}? This will notify the merchant.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Rejection Reason
              </label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="" disabled>Select a reason...</option>
                <option value="invalid_kyc">Invalid KYC Documents</option>
                <option value="mismatch_info">Information Mismatch</option>
                <option value="unsupported_business">Unsupported Business Type</option>
                <option value="other">Other / Requires More Info</option>
              </select>
            </div>
            {reason === "other" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Additional Comments
                </label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  placeholder="Provide detailed feedback for the merchant..."
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={isLoading || !reason}>
              {isLoading ? "Processing..." : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-emerald-600">Approve Merchant</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this merchant?
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50 my-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Business Name</span>
              <span className="text-sm font-medium">{merchant.businessName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">Merchant ID</span>
              <span className="text-sm font-medium">{merchant.merchantCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">KYC Status</span>
              <span className="text-sm font-medium text-emerald-600">Verified</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Processing..." : "Confirm Approval"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
