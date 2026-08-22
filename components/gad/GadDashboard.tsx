"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGad } from "./GadContext";
import TabGpbForm from "./TabGpbForm";
import TabAccomplishmentReport from "./TabAccomplishmentReport";
import TabDashboardMe from "./TabDashboardMe";
import {
  Scale,
  ArrowLeft,
  FileText,
  FileCheck2,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Printer,
  Download,
  Sparkles,
} from "lucide-react";

export type GadTab = "GPB" | "AR" | "ME";

export default function GadDashboard() {
  const { gpbEntries, accomplishmentReports, toasts, removeToast } = useGad();
  const [activeTab, setActiveTab] = useState<GadTab>("GPB");

  // Inter-tab parameter state
  const [selectedGpbIdForAr, setSelectedGpbIdForAr] = useState<string | undefined>();

  const handleSelectApprovedGpbForAr = (gpbId: string) => {
    setSelectedGpbIdForAr(gpbId);
    setActiveTab("AR");
  };

  const handleBackToGpb = () => {
    setSelectedGpbIdForAr(undefined);
    setActiveTab("GPB");
  };

  const handleClearSelectedGpbId = () => {
    setSelectedGpbIdForAr(undefined);
  };

  const tabs = [
    {
      id: "GPB" as GadTab,
      code: "SECTION 1",
      name: "GAD Plan and Budget (GPB)",
      shortName: "1. GPB Plan & Budget",
      icon: FileText,
      count: gpbEntries.length,
      badgeColor: "bg-rose-100 text-[#580011]",
    },
    {
      id: "AR" as GadTab,
      code: "SECTION 2",
      name: "GAD Accomplishment Report (AR)",
      shortName: "2. Accomplishment Report",
      icon: FileCheck2,
      count: accomplishmentReports.length,
      badgeColor: "bg-[#E5A623]/20 text-slate-900",
    },
    {
      id: "ME" as GadTab,
      code: "SECTION 3",
      name: "Sex-Disaggregated Data & M&E",
      shortName: "3. M&E & Demographics",
      icon: BarChart3,
      count: "M&E",
      badgeColor: "bg-purple-100 text-purple-900",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Alerts Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 animate-in slide-in-from-right-5 fade-in duration-200 ${
              t.type === "success"
                ? "bg-white border-emerald-300 text-slate-900"
                : t.type === "error"
                ? "bg-white border-rose-300 text-slate-900"
                : "bg-white border-amber-300 text-slate-900"
            }`}
          >
            {t.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : t.type === "error" ? (
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="h-5 w-5 text-[#E5A623] shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 leading-tight">{t.title}</h4>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Sub-System Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#580011] flex items-center gap-1 font-medium">
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">Gender & Development</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#580011] text-[#E5A623] shadow-xs">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Gender & Development System (BGADPBMS)
                </h1>
                <span className="text-[10px] font-mono font-bold bg-[#E5A623] text-slate-950 px-2 py-0.5 rounded shadow-2xs">
                  BGADPBMS v2.5
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  PCW & DILG Compliant
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Barangay Sta. Lucia • Annual GAD Planning, Budget Execution, & M&E Sex-Disaggregated Analytics
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Print GAD Audit Matrix"
          >
            <Printer className="h-4 w-4 text-slate-600" /> Print Summary
          </button>
          <button
            onClick={() => alert("Downloading PCW-DILG Compliant GPB & AR Audit Report (CSV)...")}
            className="px-3.5 py-2 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="h-4 w-4 text-[#E5A623]" /> Export DILG Report
          </button>
        </div>
      </div>

      {/* TOP LEVEL TAB NAVIGATION BAR (3 CORE SECTIONS) */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center space-x-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedGpbIdForAr(undefined);
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#580011] text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 transition-colors ${
                    isActive ? "text-[#E5A623]" : "text-slate-500"
                  }`}
                />
                <div className="flex flex-col text-left leading-none">
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider ${
                      isActive ? "text-rose-200" : "text-slate-400"
                    }`}
                  >
                    {tab.code}
                  </span>
                  <span className="mt-1 text-xs">{tab.shortName}</span>
                </div>

                <span
                  className={`ml-1 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md ${
                    isActive
                      ? "bg-[#3D000C] text-[#E5A623] border border-[#7A0018]"
                      : `${tab.badgeColor}`
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE TAB CONTENT RENDERER */}
      <div className="transition-all duration-200">
        {activeTab === "GPB" && (
          <TabGpbForm onSelectApprovedGpbForAr={handleSelectApprovedGpbForAr} />
        )}

        {activeTab === "AR" && (
          <TabAccomplishmentReport
            selectedGpbIdFromTab1={selectedGpbIdForAr}
            onBackToGpb={handleBackToGpb}
            clearSelectedGpbId={handleClearSelectedGpbId}
          />
        )}

        {activeTab === "ME" && <TabDashboardMe />}
      </div>
    </div>
  );
}
