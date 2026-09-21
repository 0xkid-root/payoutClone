"use client";

import { SidebarContext } from "./sidebar-context";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarFooter } from "./sidebar-footer";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Sidebar({
  className,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: {
  className?: string;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  return (
    <SidebarContext.Provider value={{ isCollapsed, activeGroup: null }}>
      <div
        className={cn(
          "relative z-20 flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950",
          isCollapsed ? "w-[72px]" : "w-[248px]",
          className
        )}
      >
        <SidebarHeader onClose={onClose} />

        {/* Desktop Collapse Toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="absolute -right-3 top-[80px] hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 lg:flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white z-50 outline-none"
          >
            {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        )}

        <SidebarNavigation />

        <SidebarFooter />
      </div>
    </SidebarContext.Provider>
  );
}
