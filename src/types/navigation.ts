import { LucideIcon } from "lucide-react";

export type UserRole = 
  | "SUPER_ADMIN" 
  | "OPERATIONS_ADMIN" 
  | "FINANCE_ADMIN" 
  | "SUPPORT_ADMIN" 
  | "READ_ONLY_ADMIN";

export interface NavSubItem {
  title: string;
  href: string;
  roles?: UserRole[];
}

export interface NavItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  roles?: UserRole[];
  children?: NavSubItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}
