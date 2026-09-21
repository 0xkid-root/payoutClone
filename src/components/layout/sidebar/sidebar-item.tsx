"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-context";
import { NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";

export function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  if (!item.href) return null;

  const Icon = item.icon;
  // Check exact match or sub-route match
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      title={isCollapsed ? item.title : undefined}
      className={cn(
        "group relative flex items-center rounded-md py-[9px] text-[13px] font-semibold transition-all duration-200 outline-none my-[2px]",
        isCollapsed ? "justify-center px-0" : "gap-3 px-3",
        isActive
          ? "bg-primary/[0.04] text-primary dark:bg-primary/10 dark:text-primary"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus-visible:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
      )}
    >
      {/* Active Indicator Line */}
      {isActive && !isCollapsed && (
        <div className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r bg-primary" />
      )}

      <Icon className={cn("h-[18px] w-[18px] shrink-0 transition-colors", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300")} />

      {!isCollapsed && (
        <span className="truncate">{item.title}</span>
      )}
    </Link>
  );
}
