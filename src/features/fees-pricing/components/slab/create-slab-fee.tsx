"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
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

const slabSchema = z.object({
 minAmount: z.coerce.number().min(0, "Minimum amount cannot be negative"),
 maxAmount: z.coerce.number().min(0, "Maximum amount cannot be negative"),
 slabType: z.enum(["FLAT", "PERCENTAGE"]),
 fee: z.coerce.number().optional(),
 percentage: z.coerce.number().optional(),
}).refine(data => data.minAmount <= data.maxAmount, {
 message: "Min amount cannot exceed Max amount",
 path: ["minAmount"],
}).refine(data => {
 if (data.slabType === "FLAT") return data.fee !== undefined && data.fee > 0;
 return data.percentage !== undefined && data.percentage > 0;
}, {
 message: "Fee/Percentage must be greater than 0",
 path: ["fee"], // attaching error to fee for simplicity
});

const formSchema = z.object({
 merchantId: z.string().min(1, "Merchant is required"),
 slabs: z.array(slabSchema).min(1, "At least one slab is required"),
 effectiveFrom: z.string().min(1, "Effective from date is required"),
 effectiveTo: z.string().optional(),
 status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
}).refine((data) => {
 if (data.effectiveTo) {
 return new Date(data.effectiveFrom) <= new Date(data.effectiveTo);
 }
 return true;
}, {
 message: "Effective To cannot be before Effective From",
 path: ["effectiveTo"],
}).refine((data) => {
 // Overlap and duplication check
 const sorted = [...data.slabs].sort((a, b) => a.minAmount - b.minAmount);
 for (let i = 0; i < sorted.length - 1; i++) {
 if (sorted[i].maxAmount >= sorted[i + 1].minAmount) {
 return false;
 }
 }
 return true;
}, {
 message: "Slab ranges cannot overlap",
 path: ["slabs"],
});

type FormValues = z.infer<typeof formSchema>;

export function CreateSlabFee() {
 const router = useRouter();
 const [isSubmitting, setIsSubmitting] = useState(false);

 const {
 register,
 handleSubmit,
 setValue,
 watch,
 control,
 formState: { errors },
 } = useForm<FormValues>({
 resolver: zodResolver(formSchema as any),
 defaultValues: {
 status: "ACTIVE",
 slabs: [{ minAmount: 0, maxAmount: 10000, slabType: "FLAT", fee: 0 }],
 },
 });

 const { fields, append, remove } = useFieldArray({
 control,
 name: "slabs",
 });

 const watchSlabs = watch("slabs");

 const onSubmit = async (data: FormValues) => {
 setIsSubmitting(true);
 try {
 await new Promise((resolve) => setTimeout(resolve, 1000));
 console.log("Create Slab Fee:", data);
 toast.success("Slab fee created successfully");
 router.push("/fees-pricing/slab");
 } catch (error) {
 toast.error("Failed to create slab fee");
 } finally {
 setIsSubmitting(false);
 }
 };

 return (
 <div className="flex flex-col gap-6 pb-8 max-w-6xl mx-auto">
 <div className="flex items-center gap-2 mb-2">
 <Link href="/fees-pricing/slab" className="text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors">
 <ArrowLeft className="h-5 w-5" />
 </Link>
 <span className="text-sm font-medium text-muted-foreground">Back to Slab Fees</span>
 </div>

 <PageHeader
 title="Create Slab Fee"
 description="Configure transaction fees based on transaction amount ranges."
 />

 <div className="rounded-2xl border border-border shadow-sm border-border bg-card overflow-hidden">
 <form onSubmit={handleSubmit(onSubmit)}>
 <div className="p-6 md:p-8 space-y-6">
 <h3 className="text-lg font-semibold text-foreground dark:text-white">Fee Configuration</h3>
 
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <Label>Merchant <span className="text-danger">*</span></Label>
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
 {errors.merchantId && <p className="text-sm text-danger">{errors.merchantId.message}</p>}
 </div>
 
 <div className="space-y-2">
 <Label>Status</Label>
 <Select defaultValue="ACTIVE" onValueChange={(val) => setValue("status", val as "ACTIVE" | "INACTIVE")}>
 <SelectTrigger className="w-full">
 <SelectValue placeholder="Select Status" />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="ACTIVE">Active</SelectItem>
 <SelectItem value="INACTIVE">Inactive</SelectItem>
 </SelectContent>
 </Select>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <Label>Effective From <span className="text-danger">*</span></Label>
 <Input type="date" {...register("effectiveFrom")} className={errors.effectiveFrom ? "border-red-500" : ""} />
 {errors.effectiveFrom && <p className="text-sm text-danger">{errors.effectiveFrom.message}</p>}
 </div>

 <div className="space-y-2">
 <Label>Effective To</Label>
 <Input type="date" {...register("effectiveTo")} className={errors.effectiveTo ? "border-red-500" : ""} />
 {errors.effectiveTo && <p className="text-sm text-danger">{errors.effectiveTo.message}</p>}
 </div>
 </div>
 </div>

 <div className="pt-6 border-t border-border">
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-md font-semibold text-foreground dark:text-white">Pricing Slabs</h3>
 <Button 
 type="button" 
 variant="outline" 
 size="sm"
 onClick={() => append({ minAmount: 0, maxAmount: 0, slabType: "FLAT", fee: 0 })}
 >
 <Plus className="h-4 w-4 mr-2" /> Add Slab
 </Button>
 </div>

 {errors.slabs?.root && (
 <div className="mb-4 p-3 bg-danger/10 text-danger text-sm rounded-lg border border-danger/30">
 {errors.slabs.root.message}
 </div>
 )}

 <div className="overflow-x-auto rounded-xl border border-border">
 <div className="min-w-[600px] p-4">
 <div className="grid grid-cols-12 gap-4 pb-2 border-b border-border text-sm font-medium text-muted-foreground">
 <div className="col-span-3">Min Amount</div>
 <div className="col-span-3">Max Amount</div>
 <div className="col-span-2">Type</div>
 <div className="col-span-3">Fee / %</div>
 <div className="col-span-1 text-center">Action</div>
 </div>

 <div className="space-y-3 mt-3">
 {fields.map((field, index) => {
 const slabType = watch(`slabs.${index}.slabType`);
 return (
 <div key={field.id} className="grid grid-cols-12 gap-4 items-start">
 <div className="col-span-3">
 <Input
 type="number"
 {...register(`slabs.${index}.minAmount`)}
 placeholder="0"
 className={errors.slabs?.[index]?.minAmount ? "border-red-500" : ""}
 />
 </div>
 <div className="col-span-3">
 <Input
 type="number"
 {...register(`slabs.${index}.maxAmount`)}
 placeholder="10000"
 className={errors.slabs?.[index]?.maxAmount ? "border-red-500" : ""}
 />
 </div>
 <div className="col-span-2">
 <Select 
 defaultValue={field.slabType} 
 onValueChange={(val) => setValue(`slabs.${index}.slabType`, val as "FLAT" | "PERCENTAGE")}
 >
 <SelectTrigger>
 <SelectValue />
 </SelectTrigger>
 <SelectContent>
 <SelectItem value="FLAT">Flat</SelectItem>
 <SelectItem value="PERCENTAGE">%</SelectItem>
 </SelectContent>
 </Select>
 </div>
 <div className="col-span-3">
 <div className="relative">
 {slabType === "FLAT" && (
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
 )}
 <Input
 type="number"
 step="0.01"
 {...register(slabType === "FLAT" ? `slabs.${index}.fee` : `slabs.${index}.percentage`)}
 className={`${slabType === "FLAT" ? "pl-7" : "pr-8"} ${errors.slabs?.[index]?.fee ? "border-red-500" : ""}`}
 placeholder="0.00"
 />
 {slabType === "PERCENTAGE" && (
 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
 )}
 </div>
 </div>
 <div className="col-span-1 flex justify-center mt-1">
 <Button
 type="button"
 variant="ghost"
 size="icon"
 className="text-muted-foreground hover:text-danger"
 onClick={() => remove(index)}
 disabled={fields.length === 1}
 >
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 
 {(errors.slabs?.[index]?.minAmount || errors.slabs?.[index]?.maxAmount || errors.slabs?.[index]?.fee) && (
 <div className="col-span-12 text-xs text-danger">
 Please fix errors in this row.
 </div>
 )}
 </div>
 );
 })}
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="border-t border-border" />
 
 <div className="p-6 md:p-8 bg-card/20">
 <FeeCalculationPreview
 feeType="SLAB_BASED"
 slabs={watchSlabs as any}
 />
 </div>

 <div className="border-t border-border p-6 md:px-8 flex justify-end gap-3 bg-card">
 <Button type="button" variant="outline" onClick={() => router.push("/fees-pricing/slab")}>
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
