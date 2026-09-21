"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-950 overflow-hidden relative">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:block h-full transition-all duration-300 ease-in-out",
          isDesktopCollapsed ? "w-[72px]" : "w-[248px]"
        )}
      >
        <Sidebar
          isCollapsed={isDesktopCollapsed}
          onToggleCollapse={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-[248px] bg-white shadow-2xl animate-in slide-in-from-left duration-300">
            <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden bg-[#f4f4f5] dark:bg-slate-900">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
