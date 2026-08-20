"use client";

import { useState } from "react";
import { 
  Search, 
  Bell, 
  Plus, 
  Shield, 
  ChevronDown, 
  Menu, 
  X, 
  FileText, 
  UserPlus, 
  AlertCircle, 
  PackageCheck
} from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#580011] text-white shadow-md border-b border-[#3D000C]">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Mobile Menu Toggle & Barangay Seal / Branding */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-rose-100 hover:bg-[#7A0018]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5A623]"
            aria-label="Toggle Navigation Menu"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            {/* Barangay Seal Emblem */}
            <div className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-[#E5A623] via-amber-400 to-amber-600 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="h-full w-full rounded-full bg-[#580011] flex items-center justify-center border border-[#E5A623]/40">
                <Shield className="h-5 w-5 text-[#E5A623] fill-[#E5A623]/20" />
              </div>
              {/* Dandelion Yellow Tag Accent Dot */}
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#E5A623] ring-2 ring-[#580011]" />
            </div>

            {/* Brand Title & Subtitle */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base sm:text-lg leading-tight">
                  BARANGAY STA. LUCIA
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#E5A623]/20 text-[#E5A623] border border-[#E5A623]/40">
                  LUNGSOD QUEZON
                </span>
              </div>
              <p className="text-xs text-rose-100/90 font-medium">
                Barangay Information System <span className="text-[#E5A623] font-semibold">(BIS v2.5)</span>
              </p>
            </div>
          </Link>
        </div>

        {/* Middle Section: Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-rose-200">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search residents, clearance IDs, complaints..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#3D000C]/60 text-white placeholder-rose-200/70 rounded-lg border border-[#7A0018]/60 focus:outline-none focus:ring-2 focus:ring-[#E5A623] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-rose-200 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Section: Actions, Notifications & Admin Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Action Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowQuickMenu(!showQuickMenu)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-[#E5A623] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs sm:text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">+ Quick Action</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showQuickMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Quick Action Dropdown Menu */}
            {showQuickMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setShowQuickMenu(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Administrative Triggers
                </div>
                <Link
                  href="/certifications"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-[#E5A623] transition-colors"
                >
                  <FileText className="h-4 w-4 text-[#E5A623]" />
                  Issue Clearance / Certificate
                </Link>
                <Link
                  href="/profiling"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#580011] transition-colors"
                >
                  <UserPlus className="h-4 w-4 text-[#580011]" />
                  Register Resident Profile
                </Link>
                <Link
                  href="/helpdesk-blotter"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-[#E5A623] transition-colors"
                >
                  <AlertCircle className="h-4 w-4 text-[#E5A623]" />
                  File Incident / Blotter Report
                </Link>
                <Link
                  href="/assets"
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  <PackageCheck className="h-4 w-4 text-purple-600" />
                  Asset Audit & Dispatch
                </Link>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-rose-100 hover:bg-[#7A0018]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E5A623]"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5A623] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E5A623] border border-[#580011]"></span>
              </span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-80 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setShowNotifications(false)}
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-900">System Notifications</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-2.5">
                      <span className="h-2 w-2 mt-1.5 rounded-full bg-[#580011] shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-slate-800">Urgent Blotter Ticket Submitted</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Zone 4 dispute reported by Juan Dela Cruz</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">5 mins ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-2.5">
                      <span className="h-2 w-2 mt-1.5 rounded-full bg-[#E5A623] shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-slate-800">12 Clearances Ready for Signature</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">BCIS automated queue batch pending approval</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">28 mins ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[11px] font-medium text-[#580011] hover:underline cursor-pointer">
                    View All Activity Logs
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* System Administrator Badge */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-[#7A0018]/80">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#E5A623] to-amber-200 p-0.5 shadow-sm">
                <div className="h-full w-full rounded-full bg-[#580011] flex items-center justify-center font-bold text-xs text-white">
                  SA
                </div>
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#580011]" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white leading-tight">
                  System Admin
                </span>
                <span className="text-[9px] uppercase tracking-wider font-extrabold bg-[#E5A623] text-slate-950 px-1.5 py-0.2 rounded">
                  Super Admin
                </span>
              </div>
              <span className="text-[10px] text-rose-200">
                admin@stalucia.gov.ph
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
