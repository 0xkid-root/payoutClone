import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionButtons() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" className="h-11 px-6 text-base font-semibold border-border text-foreground hover:bg-muted/50 rounded-lg">
        <Plus className="mr-2 h-5 w-5" />
        Add Funds
      </Button>
      
      <Button className="h-11 px-6 text-base font-semibold rounded-lg shadow-sm bg-primary text-primary-foreground hover:bg-primary/90">
        <ArrowRight className="mr-2 h-5 w-5" />
        Withdrawal Request
      </Button>
    </div>
  );
}
