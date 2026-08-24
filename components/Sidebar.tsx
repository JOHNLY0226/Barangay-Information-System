"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  ShieldAlert,
  Package,
  ShieldCheck,
  Scale,
  Scroll,
  Globe,
  Map,
  Landmark,
  Wallet,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface NavItem {
  name: string;
  code: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor?: string;
}

export const navItems: NavItem[] = [
  {
    name: "Dashboard / Overview",
    code: "BIS",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Inhabitants Profiling",
    code: "BIPS",
    href: "/profiling",
    icon: Users,
  },
  {
    name: "Certificates & Clearances",
    code: "BCIS",
    href: "/certifications",
    icon: FileText,
  },
  {
    name: "Helpdesk & Complaints",
    code: "KPISBH",
    href: "/helpdesk-blotter",
    icon: ShieldAlert,
    badgeColor: "bg-[#E5A623] text-slate-950 font-bold", // Dandelion Yellow accent tag
  },
  {
    name: "Asset Management",
    code: "BAMS",
    href: "/assets",
    icon: Package,
  },
  {
    name: "Disaster Resilience",
    code: "BDRIS",
    href: "/disaster-resilience",
    icon: ShieldCheck,
  },
  {
    name: "Gender & Development",
    code: "BGADPBMS",
    href: "/gad-monitoring",
    icon: Scale,
  },
  {
    name: "Ordinances & Resolutions",
    code: "BORIS",
    href: "/ordinances",
    icon: Scroll,
  },
  {
    name: "Web & Mobile Portal CMS",
    code: "CMS",
    href: "/public-portal",
    icon: Globe,
  },
  {
    name: "Barangay Development Plan",
    code: "BDP",
    href: "/development-plan",
    icon: Map,
  },
  {
    name: "Barangay-Based Institutions",
    code: "BBI",
    href: "/institutions",
    icon: Landmark,
  },
  {
    name: "Financial Management",
    code: "BFMS",
    href: "/financials",
    icon: Wallet,
  },
];

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container: Clean Light Slate bg-[#F1F5F9] / bg-slate-100 with border-r border-slate-200 */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#F1F5F9] border-r border-slate-200 flex flex-col justify-between shrink-0 transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } pt-16 lg:pt-0`}
      >
        {/* Sidebar Header Section */}
        <div className="flex flex-col flex-1 overflow-y-auto px-3 py-4">
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sub-System Navigation
            </span>
            <span className="text-[10px] bg-rose-50 text-[#580011] font-semibold px-2 py-0.5 rounded border border-rose-200">
              11 Modules
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive
                      ? "bg-[#580011] text-white shadow-sm font-semibold"
                      : "text-slate-700 hover:bg-slate-200"
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${isActive
                          ? "text-[#E5A623]" // Dandelion Yellow active icon
                          : "text-slate-500 group-hover:text-[#580011]"
                        }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    <span
                      className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded ${item.badgeColor
                          ? item.badgeColor
                          : isActive
                            ? "bg-[#3D000C] text-[#E5A623] border border-[#7A0018]"
                            : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                        }`}
                    >
                      {item.code}
                    </span>
                    {isActive && (
                      <ChevronRight className="h-3 w-3 text-[#E5A623]" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer System Badge */}
        <div className="p-3 m-3 rounded-xl bg-white/80 border border-slate-200 text-slate-700 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-[#E5A623]" />
            <span className="text-xs font-bold text-slate-800">BIS v2.5 Architecture</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            LGU Sta. Lucia • Quezon City Integrated Management Engine
          </p>
          <div className="mt-2 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Status: Operational</span>
            <span className="text-emerald-600 font-semibold">● Live</span>
          </div>
        </div>
      </aside>
    </>
  );
}
