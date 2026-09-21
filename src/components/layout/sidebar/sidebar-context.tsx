"use client";

import { createContext, useContext } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  activeGroup: string | null;
}

export const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  activeGroup: null,
});

export function useSidebar() {
  return useContext(SidebarContext);
}
