import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function KycDocumentsTab({ merchant }: { merchant: Merchant }) {
  const isKycApproved = merchant.kycStatus === "APPROVED";

  const documents = [
    {
      id: "kyc_1",
      name: "Company PAN Card",
      type: "Identity Proof",
      number: merchant.pan ? `${merchant.pan.substring(0, 5)}XXXX${merchant.pan.substring(9)}` : "Not provided",
      verifiedName: merchant.businessName,
      status: "VERIFIED",
    },
    {
      id: "kyc_2",
      name: "Director Aadhaar",
      type: "Address & ID Proof",
      number: "XXXX XXXX 4821",
      verifiedName: merchant.ownerName,
      status: isKycApproved ? "VERIFIED" : "PENDING",
    }
  ];

  return (
    <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
          <span>KYC Documents</span>
          <div className="flex items-center gap-2 text-xs font-normal text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            {isKycApproved ? "All documents verified" : "Verification pending"}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 sm:p-5 hover:bg-slate-50/30 transition-colors dark:hover:bg-slate-900/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{doc.name}</h4>
                    <p className="mt-0.5 text-[12px] text-slate-500">{doc.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {doc.status === "VERIFIED" ? (
                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50 px-2 py-0.5 text-xs font-medium">Verified</Badge>
                  ) : (
                    <Badge className="bg-amber-50 text-amber-600 border-amber-200/50 px-2 py-0.5 text-xs font-medium">Pending</Badge>
                  )}
                  <Button variant="outline" size="sm" className="h-8 text-xs hidden sm:flex">
                    <Eye className="mr-1.5 h-3.5 w-3.5" /> View
                  </Button>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between sm:block">
                  <p className="text-[12px] text-slate-500 uppercase tracking-wider">Doc Number</p>
                  <p className="sm:mt-1 text-[13px] font-medium text-slate-900 dark:text-white tracking-widest">{doc.number}</p>
                </div>
                <div className="flex justify-between sm:block">
                  <p className="text-[12px] text-slate-500 uppercase tracking-wider">Verified Name</p>
                  <p className="sm:mt-1 text-[13px] font-medium text-slate-900 dark:text-white">{doc.verifiedName}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2 sm:hidden h-8 text-xs">
                  <Eye className="mr-1.5 h-3.5 w-3.5" /> View Document
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
