import React from "react";
import Image from "next/image";

export function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen overflow-hidden bg-background p-0 sm:p-4 lg:p-6">

      <div className="h-full w-full overflow-hidden bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] border border-border sm:rounded-[20px]">

        <div className="grid h-full w-full lg:grid-cols-[42%_58%]">

          {/* LEFT - AUTH */}
          <div className="flex h-full items-center justify-center bg-white px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
            <div className="w-full max-w-[440px]">
              {children}
            </div>
          </div>

          {/* RIGHT - VISUAL */}
          <div className="relative hidden h-full overflow-hidden lg:block bg-background border-l border-border">
            {/* Ambient Background Glows */}
            <div className="absolute -top-[20%] -right-[10%] h-[70%] w-[70%] rounded-full bg-primary/15 blur-[120px]" />
            <div className="absolute -bottom-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-primary/10 blur-[100px]" />

            <Image
              src="/login/login-image.png"
              alt="PayNexus Admin Platform"
              fill
              priority
              className="relative z-10 object-cover object-center"
              sizes="58vw"
            />
          </div>

        </div>

      </div>
    </main>
  );
}