"use client";

import { useSidebar } from "./sidebar-context";
import { NavGroup } from "@/types/navigation";
import { SidebarItem } from "./sidebar-item";
import { SidebarSubmenu } from "./sidebar-submenu";

// MOCK ROLE: In a real app, you would get this from a useAuth() hook.
const currentUserRole = "SUPER_ADMIN";

export function SidebarGroup({ group }: { group: NavGroup }) {
  const { isCollapsed } = useSidebar();

  // Filter items based on roles (if specified)
  const visibleItems = group.items.filter(
    (item) => !item.roles || item.roles.includes(currentUserRole)
  );

  if (visibleItems.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {!isCollapsed && (
        <div className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {group.label}
        </div>
      )}
      {isCollapsed && <div className="mx-auto mb-2 h-px w-6 bg-slate-100 dark:bg-slate-800" />}

      {visibleItems.map((item, index) => {
        if (item.children && item.children.length > 0) {
          // Render Nested Submenu
          return <SidebarSubmenu key={index} item={item} />;
        }
        // Render Standard Item
        return <SidebarItem key={index} item={item} />;
      })}
    </div>
  );
}
