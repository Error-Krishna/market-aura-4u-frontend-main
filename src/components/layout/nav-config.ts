import {
  LayoutGrid,
  PenSquare,
  FileClock,
  Share2,
  CreditCard,
  UserCircle,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutGrid },
  { label: "Create Content", to: "/content/create", icon: PenSquare },
  { label: "Content History", to: "/content", icon: FileClock },
  { label: "Social Accounts", to: "/social", icon: Share2 },
  { label: "Billing", to: "/billing", icon: CreditCard },
  { label: "Profile", to: "/account", icon: UserCircle },
  { label: "Settings", to: "/settings", icon: Settings },
];
