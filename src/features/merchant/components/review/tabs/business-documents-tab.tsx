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
    if (status === "VERIFIED") return <Badge className="bg-success/10 text-success border-success/30"><CheckCircle2 className="mr-1 h-3 w-3" /> Verified</Badge>;
    if (status === "PENDING") return <Badge className="bg-warning/10 text-warning border-warning/30"><Clock className="mr-1 h-3 w-3" /> Pending Review</Badge>;
    return <Badge className="bg-danger/10 text-danger border-danger/30">Rejected</Badge>;
  };

  return (
    <Card className="shadow-none border-border/60 border-border">
      <CardHeader className="pb-3 border-b border-border bg-background/20">
        <CardTitle className="text-sm font-semibold text-foreground">Business Documents</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-background/30 transition-colors dark:hover:bg-background/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-info/10 text-info dark:bg-blue-900/20 dark:text-blue-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold text-foreground dark:text-white">{doc.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[12px] text-muted-foreground">
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
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
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
