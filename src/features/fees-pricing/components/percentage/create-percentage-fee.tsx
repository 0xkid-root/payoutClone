"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeeCalculationPreview } from "../shared/fee-calculation-preview";
import { MOCK_MERCHANTS } from "../../mock/fees-data";

const formSchema = z.object({
  merchantId: z.string().min(1, "Merchant is required"),
  percentage: z.coerce.number().positive("Percentage must be greater than 0"),
  minFee: z.coerce.number().min(0, "Minimum fee cannot be negative").optional(),
  maxFee: z.coerce.number().min(0, "Maximum fee cannot be negative").optional(),
  effectiveFrom: z.string().min(1, "Effective from date is required"),
  effectiveTo: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
}).refine((data) => {
  if (data.minFee !== undefined && data.maxFee !== undefined && data.maxFee !== 0) {
    return data.minFee <= data.maxFee;
  }
  return true;
}, {
  message: "Minimum fee cannot exceed maximum fee",
  path: ["minFee"],
}).refine((data) => {
  if (data.effectiveTo) {
    return new Date(data.effectiveFrom) <= new Date(data.effectiveTo);
  }
  return true;
}, {
  message: "Effective To cannot be before Effective From",
  path: ["effectiveTo"],
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePercentageFee() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      status: "ACTIVE",
    },
  });

  const watchPercentage = watch("percentage");
  const watchMinFee = watch("minFee");
  const watchMaxFee = watch("maxFee");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Create Fee:", data);
      toast.success("Percentage fee created successfully");
      router.push("/fees-pricing/percentage");
    } catch (error) {
      toast.error("Failed to create percentage fee");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Link href="/fees-pricing/percentage" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="text-sm font-medium text-slate-500">Back to Percentage Fees</span>
      </div>

      <PageHeader
        title="Create Percentage Fee"
        description="Configure a percentage-based pricing rule for a merchant."
      />

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Fee Configuration</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Merchant <span className="text-red-500">*</span></Label>
                <Select 
                  value={watch("merchantId") || undefined}
                  onValueChange={(val) => setValue("merchantId", val as string)}
                >
                  <SelectTrigger className={`w-full ${errors.merchantId ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select Merchant">
                      {watch("merchantId") 
                        ? MOCK_MERCHANTS.find(m => m.id.toString() === watch("merchantId"))?.name 
                        : "Select Merchant"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_MERCHANTS.map((m) => (
                      <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.merchantId && <p className="text-sm text-red-500">{errors.merchantId.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Percentage <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      type="number"
                      step="0.01"
                      {...register("percentage")}
                      className={`pr-8 ${errors.percentage ? "border-red-500" : ""}`}
                      placeholder="e.g. 0.50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">%</span>
                  </div>
                  {errors.percentage && <p className="text-sm text-red-500">{errors.percentage.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Minimum Fee</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("minFee")}
                      className={`pl-7 ${errors.minFee ? "border-red-500" : ""}`}
                      placeholder="e.g. 2.00"
                    />
                  </div>
                  {errors.minFee && <p className="text-sm text-red-500">{errors.minFee.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Maximum Fee</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                    <Input
                      type="number"
                      step="0.01"
                      {...register("maxFee")}
                      className="pl-7"
                      placeholder="e.g. 25.00"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Effective From <span className="text-red-500">*</span></Label>
                  <Input type="date" {...register("effectiveFrom")} className={errors.effectiveFrom ? "border-red-500" : ""} />
                  {errors.effectiveFrom && <p className="text-sm text-red-500">{errors.effectiveFrom.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Effective To</Label>
                  <Input type="date" {...register("effectiveTo")} className={errors.effectiveTo ? "border-red-500" : ""} />
                  {errors.effectiveTo && <p className="text-sm text-red-500">{errors.effectiveTo.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="ACTIVE" onValueChange={(val) => setValue("status", val as "ACTIVE" | "INACTIVE")}>
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800" />
          
          <div className="p-6 md:p-8 bg-slate-50/50 dark:bg-slate-900/20">
            <FeeCalculationPreview
              feeType="PERCENTAGE"
              percentage={watchPercentage || 0}
              minFee={watchMinFee}
              maxFee={watchMaxFee}
            />
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800 p-6 md:px-8 flex justify-end gap-3 bg-white dark:bg-slate-900">
            <Button type="button" variant="outline" onClick={() => router.push("/fees-pricing/percentage")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary text-white shadow-[0_2px_10px_rgba(99,102,241,0.2)]">
              {isSubmitting ? "Creating..." : "Create Fee"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
