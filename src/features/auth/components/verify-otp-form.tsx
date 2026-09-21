"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function VerifyOtpForm() {
  return (
    <div className="w-full max-w-[480px] flex flex-col justify-center">
      <div className="mb-8 flex items-center gap-3 sm:mb-10 sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
          <Image
            src="/paynexus-logo.png"
            alt="PayNexus"
            width={80}
            height={80}
            priority
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            PayNexus
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Admin Portal
          </p>
        </div>
      </div>

      <Link 
        href="/login" 
        className="inline-flex items-center text-[13px] font-bold text-muted-foreground hover:text-foreground transition-colors mb-8 w-fit"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>

      <div className="mb-8">
        <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-foreground mb-2 sm:mb-3">Verify Your Identity</h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed font-medium">
          We've sent a 6-digit verification code to:<br/>
          <span className="font-medium text-foreground">admin@paynexus.com</span><br/>
          Enter the code below to continue.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* OTP Field */}
        <div className="space-y-3">
          <div className="text-[13px] font-semibold text-slate-700">Verification Code</div>
          <div className="flex gap-2 sm:gap-3 justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
               <Input 
                 key={i}
                 type="text" 
                 maxLength={1}
                 className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg text-center text-[18px] font-bold bg-slate-50/50 border border-border transition-all focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-sm"
               />
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-[13px] text-muted-foreground font-medium">Didn't receive the code?</span>
            <button type="button" className="text-[13px] font-bold text-primary hover:text-primary/90 hover:underline transition-colors focus:outline-none">
              Resend Code (00:45)
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full h-11 rounded-lg text-[14px] font-semibold bg-primary hover:bg-primary/95 transition-all shadow-sm mt-2 text-white" type="submit">
          Verify Code
        </Button>
      </form>
    </div>
  );
}
