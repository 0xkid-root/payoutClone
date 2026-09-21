"use client";

import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";
import { ChevronDown, Settings, LogOut, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

export function SidebarFooter() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="mt-auto shrink-0 border-t border-slate-100 p-3 dark:border-slate-800">
      
      {/* Environment Indicator (Expanded Only) */}
      {!isCollapsed && (
        <div className="mb-2.5 px-3 flex items-center gap-2 text-[12px] font-semibold text-slate-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Production
        </div>
      )}

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(
          "flex w-full items-center rounded-md p-2 outline-none transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 dark:hover:bg-slate-800/50 dark:focus-visible:bg-slate-800/50",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md bg-primary/10 text-[13px] font-bold text-primary">
              JD
            </div>
            {!isCollapsed && (
              <div className="flex flex-col items-start overflow-hidden text-left">
                <span className="w-full truncate text-[13px] font-bold text-slate-900 dark:text-white">John Doe</span>
                <span className="w-full truncate text-[12px] font-medium text-slate-500">Super Admin</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56" 
          align={isCollapsed ? "start" : "end"} 
          side={isCollapsed ? "right" : "bottom"}
          sideOffset={isCollapsed ? 12 : 8}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="mr-2 h-4 w-4" />
              <span>Security</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
