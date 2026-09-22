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
            <DialogTitle className="text-danger">Reject Merchant Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject {merchant.businessName}? This will notify the merchant.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Rejection Reason
              </label>
              <select 
                className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus-visible:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-border bg-background ring-offset-background dark:placeholder:text-muted-foreground focus-visible:ring-ring"
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
                <label className="text-sm font-medium text-foreground">
                  Additional Comments
                </label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-border bg-background ring-offset-background dark:placeholder:text-muted-foreground focus-visible:ring-ring"
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
          <DialogTitle className="text-success">Approve Merchant</DialogTitle>
          <DialogDescription>
            Are you sure you want to approve this merchant?
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-background p-4 bg-background/50 my-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Business Name</span>
              <span className="text-sm font-medium">{merchant.businessName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Merchant ID</span>
              <span className="text-sm font-medium">{merchant.merchantCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">KYC Status</span>
              <span className="text-sm font-medium text-success">Verified</span>
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
