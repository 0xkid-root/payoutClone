"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebar-context";
import { NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarSubmenu({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();
  
  // Check if any child route is active
  const isChildActive = item.children?.some(
    (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
  );

  const [isOpen, setIsOpen] = useState(isChildActive || false);
  const Icon = item.icon;

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // In collapsed mode, we use a DropdownMenu to show the nested items safely floating
  if (isCollapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          title={item.title}
          className={cn(
            "group relative flex w-full items-center justify-center rounded-lg py-2.5 outline-none transition-all duration-200",
            isChildActive
              ? "bg-primary/5 text-primary"
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus-visible:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
          )}
        >
          {isChildActive && (
            <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
          )}
          <Icon className={cn("h-5 w-5 shrink-0 transition-colors", isChildActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" align="start" sideOffset={14} className="w-56 p-2 shadow-xl border-slate-200/60 dark:border-slate-800">
          <DropdownMenuLabel className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {item.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1" />
          {item.children?.map((child, i) => (
            <DropdownMenuItem key={i} className="p-0">
              <Link 
                href={child.href}
                className={cn(
                  "flex w-full cursor-pointer rounded-md px-3 py-2 text-[13px] font-medium transition-colors outline-none",
                  pathname === child.href 
                    ? "bg-primary/5 text-primary" 
                    : "text-slate-600 dark:text-slate-400"
                )}
              >
                {child.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Expanded Mode: Accordion behavior
  return (
    <div className="flex flex-col">
      <button
        onClick={toggleOpen}
        className={cn(
          "group relative flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium outline-none transition-all duration-200",
          isChildActive
            ? "bg-primary/5 text-primary"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus-visible:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {isChildActive && (
            <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
          )}
          <Icon className={cn("h-5 w-5 shrink-0 transition-colors", isChildActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
          <span className="truncate">{item.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-1 flex flex-col gap-1 pl-9 pr-2">
              {item.children?.map((child, i) => {
                const isSubActive = pathname === child.href;
                return (
                  <Link
                    key={i}
                    href={child.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-[13px] font-medium transition-colors outline-none",
                      isSubActive
                        ? "text-primary bg-primary/5"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 focus-visible:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
                    )}
                  >
                    {child.title}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
