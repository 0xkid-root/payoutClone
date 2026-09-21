import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Merchant } from "../../merchant.mock";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SECTIONS = [
  { id: "basic_details", label: "Basic Details (Name, Contact, Address)" },
  { id: "business_details", label: "Business Details (Type, Registration)" },
  { id: "bank_details", label: "Bank Details" },
  { id: "pan_document", label: "PAN Document" },
  { id: "gst_document", label: "GST Certificate" },
  { id: "kyc_document", label: "KYC Documents" },
];

interface RequestChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchant: Merchant;
}

export function RequestChangesModal({ isOpen, onClose, merchant }: RequestChangesModalProps) {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSection = (id: string) => {
    setSelectedSections((prev) => 
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedSections.length === 0 || !reason.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-slate-200/60 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-950">
        <DialogHeader>
          <DialogTitle className="text-xl text-slate-900 dark:text-white">Request Changes</DialogTitle>
          <DialogDescription className="text-slate-500">
            Select the information or documents that require correction from {merchant.businessName}.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sections Needing Correction</Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {SECTIONS.map((section) => (
                <div key={section.id} className="flex items-start space-x-2.5">
                  <Checkbox 
                    id={section.id} 
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => toggleSection(section.id)}
                    className="mt-0.5"
                  />
                  <Label 
                    htmlFor={section.id} 
                    className="text-[13px] font-medium leading-none cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    {section.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Reason / Instructions</Label>
            <textarea 
              placeholder="e.g., The uploaded PAN document is blurry. Please upload a clear, color copy." 
              className="w-full rounded-md border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="border-t border-slate-100 dark:border-slate-800 pt-4 sm:justify-between">
          <Button variant="ghost" onClick={onClose} className="text-slate-500">Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={selectedSections.length === 0 || !reason.trim() || isSubmitting}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            {isSubmitting ? "Sending..." : "Send Back to Merchant"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
