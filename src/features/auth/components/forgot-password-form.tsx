"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, Send, ShieldCheck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  return (
    <div className="w-full flex flex-col justify-center">
      {/* Branding Header */}
      <div className="mb-10 flex items-center gap-3 sm:mb-12 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 sm:h-14 sm:w-14">
          <Image
            src="/paynexus-logo.png"
            alt="PayNexus"
            width={80}
            height={80}
            priority
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            PayNexus
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Admin Portal
          </p>
        </div>
      </div>

      <Link
        href="/login"
        className="mb-8 inline-flex w-fit items-center text-sm font-bold text-slate-500 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      {/* Title Area */}
      <div className="mb-8">
        <h2 className="mb-2 text-[24px] font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Forgot Password?
        </h2>
        <p className="text-[14px] font-medium leading-relaxed text-slate-500">
          Enter your registered email address and we'll send you instructions to reset your password.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[13px] font-semibold text-slate-700">Email Address</Label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="h-11 rounded-lg border border-slate-200 bg-slate-50/50 pl-10 text-[14px] font-medium transition-all placeholder:text-slate-400 hover:bg-slate-100 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button className="h-11 w-full rounded-lg bg-primary text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-primary/95" type="submit">
          Send Reset Link
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="bg-[#ffffff] px-4">OR</span>
          </div>
        </div>

        {/* Back to Login Outline Button */}
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex h-11 w-full justify-center rounded-lg border-slate-200 text-[14px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          Back to Login
        </Link>
      </form>

      {/* Security Message */}
      <div className="mt-8 flex items-center justify-center gap-2 text-[13px] font-medium text-slate-500 rounded-lg bg-slate-50 px-4 py-3 border border-slate-100">
        <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
        <p>A secure reset link will be sent directly to your inbox.</p>
      </div>
    </div>
  );
}
