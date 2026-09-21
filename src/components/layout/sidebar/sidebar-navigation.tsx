"use client";

import { NAVIGATION_CONFIG } from "@/config/navigation";
import { SidebarGroup } from "./sidebar-group";

export function SidebarNavigation() {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 scrollbar-hide">
      <nav className="flex flex-col gap-6">
        {NAVIGATION_CONFIG.map((group, index) => (
          <SidebarGroup key={index} group={group} />
        ))}
      </nav>
    </div>
  );
}
