import { Merchant } from "../../../merchant.mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BusinessDocumentsTab({ merchant }: { merchant: Merchant }) {
  const documents = [
    {
      id: "doc_1",
      name: "Certificate of Incorporation",
      type: "Registration Document",
      uploadedAt: "10 Sep 2023",
      status: "VERIFIED",
      fileType: "PDF",
      size: "2.4 MB"
    },
    {
      id: "doc_2",
      name: "GST Registration Certificate",
      type: "Tax Document",
      uploadedAt: "10 Sep 2023",
      status: "VERIFIED",
      fileType: "PDF",
      size: "1.1 MB"
    },
    {
      id: "doc_3",
      name: "Board Resolution",
      type: "Authorization",
      uploadedAt: "12 Sep 2023",
      status: "PENDING",
      fileType: "PDF",
      size: "3.5 MB"
    },
    {
      id: "doc_4",
      name: "Cancelled Cheque",
      type: "Bank Proof",
      uploadedAt: "12 Sep 2023",
      status: "VERIFIED",
      fileType: "JPG",
      size: "800 KB"
    }
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "VERIFIED") return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200/50"><CheckCircle2 className="mr-1 h-3 w-3" /> Verified</Badge>;
    if (status === "PENDING") return <Badge className="bg-amber-50 text-amber-600 border-amber-200/50"><Clock className="mr-1 h-3 w-3" /> Pending Review</Badge>;
    return <Badge className="bg-red-50 text-red-600 border-red-200/50">Rejected</Badge>;
  };

  return (
    <Card className="shadow-none border-slate-200/60 dark:border-slate-800">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
        <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Documents</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/30 transition-colors dark:hover:bg-slate-900/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{doc.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[12px] text-slate-500">
                    <span>{doc.type}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{doc.fileType}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>Uploaded {doc.uploadedAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:justify-end">
                <StatusBadge status={doc.status} />
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
