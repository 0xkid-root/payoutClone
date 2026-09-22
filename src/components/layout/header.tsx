"use client";

import { usePathname } from "next/navigation";
import { Menu, Bell, Search, ChevronRight, MessageSquare, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  // Create a simple breadcrumb from the pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentPage = pathSegments.length > 0
    ? pathSegments[pathSegments.length - 1].charAt(0).toUpperCase() + pathSegments[pathSegments.length - 1].slice(1)
    : "Dashboard";

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border bg-white px-4 md:px-6 xl:px-8 border-border bg-background">
      {/* Left: Mobile Menu & Breadcrumb */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-muted-foreground"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <div className="hidden items-center text-sm font-medium text-muted-foreground sm:flex">
          <span>Overview</span>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="font-semibold text-foreground dark:text-white">{currentPage}</span>
        </div>
      </div>

      {/* Right: Search & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search */}
        <div className="relative hidden w-64 md:block lg:w-80 xl:w-96 group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="search"
            placeholder="Search anything..."
            className="h-10 w-full rounded-lg border border-border bg-background/80 pl-10 pr-14 text-[14px] font-medium text-foreground transition-all placeholder:text-muted-foreground hover:bg-muted focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-primary/10 focus:border-primary shadow-sm border-border bg-background/50 dark:text-white dark:hover:bg-card dark:focus:bg-background dark:focus:ring-primary/20"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-[4px] border border-border bg-white px-1.5 font-mono text-[11px] font-semibold text-muted-foreground shadow-[0_1px_1px_rgba(0,0,0,0.05)] border-border bg-card text-muted-foreground">
              <span className="text-[12px]">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-2">
          <Button variant="outline" size="icon" className="relative h-10 w-10 rounded-lg border border-border bg-white shadow-sm text-muted-foreground hover:text-foreground hover:bg-background border-border bg-background text-muted-foreground dark:hover:text-white transition-colors">
            <Bell className="h-[18px] w-[18px]" />
          </Button>

          <Button variant="outline" size="icon" className="relative h-10 w-10 rounded-lg border border-border bg-white shadow-sm text-muted-foreground hover:text-foreground hover:bg-background border-border bg-background text-muted-foreground dark:hover:text-white transition-colors">
            <MessageSquare className="h-[18px] w-[18px]" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-card dark:hover:text-white">
            <Search className="h-5 w-5" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-1 h-10 w-10 overflow-hidden rounded-full border border-border bg-muted shadow-sm transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 border-border bg-card">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Security</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-danger focus:text-danger focus:bg-danger/10 dark:focus:bg-red-950/50">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
