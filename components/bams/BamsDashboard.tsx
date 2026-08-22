"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBams } from "./BamsContext";
import FormE1Properties from "./FormE1Properties";
import FormE2Locations from "./FormE2Locations";
import FormE3Suppliers from "./FormE3Suppliers";
import FormE4AIR from "./FormE4AIR";
import FormE5Assets from "./FormE5Assets";
import FormE6Issuances from "./FormE6Issuances";
import FormE7Returns from "./FormE7Returns";
import {
  Package,
  ArrowLeft,
  Building2,
  MapPin,
  Truck,
  FileCheck,
  Boxes,
  FileUp,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Printer,
  Sparkles,
  Download,
} from "lucide-react";

export type BamsTab = "E1" | "E2" | "E3" | "E4" | "E5" | "E6" | "E7";

export default function BamsDashboard() {
  const {
    properties,
    locations,
    suppliers,
    airReports,
    assets,
    issuances,
    returns,
    toasts,
    removeToast,
  } = useBams();

  const [activeTab, setActiveTab] = useState<BamsTab>("E1");

  // Inter-form linkage state parameters
  const [selectedPropIdForLocation, setSelectedPropIdForLocation] = useState<string | undefined>();
  const [selectedSupplierIdForAIR, setSelectedSupplierIdForAIR] = useState<string | undefined>();
  const [selectedAssetIdForIssuance, setSelectedAssetIdForIssuance] = useState<string | undefined>();
  const [selectedIssuanceIdForReturn, setSelectedIssuanceIdForReturn] = useState<string | undefined>();

  // Handlers for switching tabs with linked selection
  const handleSelectPropertyForLocation = (propId: string) => {
    setSelectedPropIdForLocation(propId);
    setActiveTab("E2");
  };

  const handleSelectSupplierForAIR = (supplierId: string) => {
    setSelectedSupplierIdForAIR(supplierId);
    setActiveTab("E4");
  };

  const handleSelectAssetForIssuance = (assetId: string) => {
    setSelectedAssetIdForIssuance(assetId);
    setActiveTab("E6");
  };

  const handleSelectIssuanceForReturn = (issuanceId: string) => {
    setSelectedIssuanceIdForReturn(issuanceId);
    setActiveTab("E7");
  };

  const tabs = [
    {
      id: "E1" as BamsTab,
      code: "FORM E1",
      name: "Barangay Properties",
      shortName: "Properties",
      icon: Building2,
      count: properties.length,
      badgeColor: "bg-purple-100 text-purple-800",
    },
    {
      id: "E2" as BamsTab,
      code: "FORM E2",
      name: "Property Location",
      shortName: "Location Map",
      icon: MapPin,
      count: locations.length,
      badgeColor: "bg-amber-100 text-amber-800",
    },
    {
      id: "E3" as BamsTab,
      code: "FORM E3",
      name: "Barangay Supplier",
      shortName: "Suppliers",
      icon: Truck,
      count: suppliers.length,
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "E4" as BamsTab,
      code: "FORM E4",
      name: "Inspection Report (A.I.R.)",
      shortName: "A.I.R. Reports",
      icon: FileCheck,
      count: airReports.length,
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      id: "E5" as BamsTab,
      code: "FORM E5",
      name: "Asset Inventory",
      shortName: "Asset Inventory",
      icon: Boxes,
      count: assets.length,
      badgeColor: "bg-rose-100 text-rose-800",
    },
    {
      id: "E6" as BamsTab,
      code: "FORM E6",
      name: "Issuance of Property",
      shortName: "Issuances (PAR/ICS)",
      icon: FileUp,
      count: issuances.length,
      badgeColor: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "E7" as BamsTab,
      code: "FORM E7",
      name: "Return and Receipt",
      shortName: "Property Returns",
      icon: RotateCcw,
      count: returns.length,
      badgeColor: "bg-teal-100 text-teal-800",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Alert Notifications Container */}
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
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Module Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#580011] flex items-center gap-1 font-medium">
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">Sub-System BAMS</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#580011] text-[#E5A623] shadow-xs">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Barangay Asset Management System
                </h1>
                <span className="text-[10px] font-mono font-bold bg-[#E5A623] text-slate-950 px-2 py-0.5 rounded shadow-2xs">
                  BAMS v2.5
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                  DILG BIMS Standard
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Barangay Sta. Lucia • Integrated 7-Form Property & Equipment Registry System
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Print BAMS Audit Sheet"
          >
            <Printer className="h-4 w-4 text-slate-600" /> Print Summary
          </button>
          <button
            onClick={() => alert("Downloading BAMS DILG Compliance Audit Report (CSV)...")}
            className="px-3.5 py-2 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="h-4 w-4 text-[#E5A623]" /> Export DILG Report
          </button>
        </div>
      </div>

      {/* TOP NAVIGATION BAR / TAB SWITCHER INSIDE BAMS (7 FORMS) */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center space-x-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#580011] text-white shadow-md"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors ${
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
                  <span className="truncate mt-0.5">{tab.shortName}</span>
                </div>

                <span
                  className={`ml-1 text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded ${
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

      {/* TAB CONTENT VIEWS */}
      <div className="transition-all duration-200">
        {activeTab === "E1" && (
          <FormE1Properties
            onSelectPropertyForLocation={handleSelectPropertyForLocation}
          />
        )}

        {activeTab === "E2" && (
          <FormE2Locations
            selectedPropertyIdFromE1={selectedPropIdForLocation}
          />
        )}

        {activeTab === "E3" && (
          <FormE3Suppliers
            onSelectSupplierForAIR={handleSelectSupplierForAIR}
          />
        )}

        {activeTab === "E4" && (
          <FormE4AIR
            selectedSupplierIdFromE3={selectedSupplierIdForAIR}
          />
        )}

        {activeTab === "E5" && (
          <FormE5Assets
            onSelectAssetForIssuance={handleSelectAssetForIssuance}
          />
        )}

        {activeTab === "E6" && (
          <FormE6Issuances
            selectedAssetIdFromE5={selectedAssetIdForIssuance}
            onSelectIssuanceForReturn={handleSelectIssuanceForReturn}
          />
        )}

        {activeTab === "E7" && (
          <FormE7Returns
            selectedIssuanceIdFromE6={selectedIssuanceIdForReturn}
          />
        )}
      </div>
    </div>
  );
}
