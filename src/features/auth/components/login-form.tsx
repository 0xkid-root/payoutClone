"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

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

      {/* Title Area */}
      <div className="mb-8">
        <h2 className="mb-2 text-[24px] font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Welcome Back!
        </h2>
        <p className="text-[14px] font-medium leading-relaxed text-slate-500">
          Login to access the PayNexus administration portal and manage platform operations.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleLogin}>
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[13px] font-semibold text-slate-700">Email Address</Label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
            <Input
              id="email"
              type="email"
              placeholder="admin@paynexus.com"
              className="h-11 rounded-lg border border-slate-200 bg-slate-50/50 pl-10 text-[14px] font-medium transition-all placeholder:text-slate-400 hover:bg-slate-100 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-sm"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-[13px] font-semibold text-slate-700">Password</Label>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-11 rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-10 text-[14px] font-medium transition-all placeholder:text-slate-400 hover:bg-slate-100 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="h-4 w-4 rounded-[4px] border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            <Label htmlFor="remember" className="text-[13px] font-semibold text-slate-700 cursor-pointer select-none">
              Remember me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-[13px] font-bold text-primary transition-colors hover:text-primary/80"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button className="h-11 w-full rounded-lg bg-primary text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-primary/95" type="submit">
          Login to Admin Dashboard
        </Button>
      </form>

      {/* Security Message */}
      <div className="mt-8 flex items-center justify-center gap-2 text-[13px] font-medium text-slate-500 rounded-lg bg-slate-50 px-4 py-3 border border-slate-100">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <p>Secure admin access for platform operations.</p>
      </div>
    </div>
  );
}
