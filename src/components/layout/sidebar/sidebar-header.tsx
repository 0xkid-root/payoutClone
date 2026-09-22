"use client";

import Link from "next/link";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
 onClose?: () => void;
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
 const { isCollapsed } = useSidebar();

 return (
 <div className={cn("flex h-[72px] shrink-0 items-center border-b border-sidebar-border px-4", isCollapsed ? "justify-center" : "justify-between")}>
 <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden transition-opacity hover:opacity-90">
 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
 <span className="font-bold text-lg leading-none">A</span>
 </div>
 {!isCollapsed && (
 <div className="flex flex-col">
 <span className="text-[15px] font-bold tracking-tight text-sidebar-foreground dark:text-white">PayNexus</span>
 <span className="text-[10px] font-semibold tracking-wider text-sidebar-foreground0 uppercase">Admin Console</span>
 </div>
 )}
 </Link>

 {onClose && (
 <Button variant="ghost" size="icon" className="shrink-0 lg:hidden text-sidebar-foreground0" onClick={onClose}>
 <Menu className="h-5 w-5" />
 </Button>
 )}
 </div>
 );
}
