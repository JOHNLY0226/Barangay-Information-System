"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Home, BarChart3, Plus, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import ResidentRegistrationModal from "./ResidentRegistrationModal";
import { Resident, Household } from "@/types/inhabitants";
import { INITIAL_RESIDENTS, INITIAL_HOUSEHOLDS } from "./mockData";

interface BIPSModuleShellProps {
  children: React.ReactNode;
  activeTab?: "citizens" | "households" | "demographics";
}

export default function BIPSModuleShell({ children, activeTab }: BIPSModuleShellProps) {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [residentList, setResidentList] = useState<Resident[]>(INITIAL_RESIDENTS);

  const handleSaveResident = (newResidentData: Partial<Resident>) => {
    const newResident: Resident = {
      id: `RES-2026-00${residentList.length + 1}`,
      firstName: newResidentData.firstName || "",
      lastName: newResidentData.lastName || "",
      middleName: newResidentData.middleName || "",
      suffix: newResidentData.suffix || "",
      gender: newResidentData.gender || "Male",
      birthDate: newResidentData.birthDate || "1990-01-01",
      age: newResidentData.age || 30,
      civilStatus: newResidentData.civilStatus || "Single",
      contactNumber: newResidentData.contactNumber || "",
      email: newResidentData.email || "",
      address: newResidentData.address || "Brgy. Sta. Lucia, Quezon City",
      street: newResidentData.street || "Sta. Lucia St.",
      householdId: newResidentData.householdId || "HH-STL-0101",
      isHeadOfHousehold: newResidentData.isHeadOfHousehold || false,
      relationshipToHead: newResidentData.relationshipToHead || "Head",
      voterStatus: newResidentData.voterStatus || "Registered",
      precinctNo: newResidentData.precinctNo || "",
      occupation: newResidentData.occupation || "Employed",
      educationalAttainment: newResidentData.educationalAttainment || "College",
      isPwd: newResidentData.isPwd || false,
      pwdType: newResidentData.pwdType || "",
      isSenior: newResidentData.isSenior || false,
      isSoloParent: newResidentData.isSoloParent || false,
      isIndigent: newResidentData.isIndigent || false,
      status: "Active",
      emergencyContactName: newResidentData.emergencyContactName || "",
      emergencyContactPhone: newResidentData.emergencyContactPhone || "",
      emergencyContactRelation: newResidentData.emergencyContactRelation || "",
      dateRegistered: new Date().toISOString().split("T")[0],
    };

    setResidentList((prev) => [newResident, ...prev]);
  };

  // Determine current active tab based on pathname or prop
  const currentTab =
    activeTab ||
    (pathname.includes("/households")
      ? "households"
      : pathname.includes("/demographics")
      ? "demographics"
      : "citizens");

  return (
    <div className="space-y-6">
      {/* Header Breadcrumb & Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#580011] flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">Inhabitants Profiling (BIPS)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#580011] text-white shadow-2xs">
              <Users className="h-6 w-6 text-[#E5A623]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Inhabitants Profiling Sub-System (BIPS)
                </h1>
                <span className="text-[10px] font-mono font-bold bg-[#580011] text-[#E5A623] px-2 py-0.5 rounded border border-[#7A0018]">
                  BIPS v2.5
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official Citizen Census, Household Member Trees & Demographic Analytics • Brgy. Sta. Lucia
              </p>
            </div>
          </div>
        </div>

        {/* Global Modal Action Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-lg bg-[#E5A623] hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Register New Resident
          </button>
        </div>
      </div>

      {/* Primary Sub-System Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1.5 border shadow-2xs gap-1.5 overflow-x-auto">
        <Link
          href="/inhabitants/citizens"
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
            currentTab === "citizens"
              ? "bg-[#580011] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Users className={`h-4 w-4 ${currentTab === "citizens" ? "text-[#E5A623]" : "text-slate-500"}`} />
          Barangay Citizens
        </Link>

        <Link
          href="/inhabitants/households"
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
            currentTab === "households"
              ? "bg-[#580011] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Home className={`h-4 w-4 ${currentTab === "households" ? "text-[#E5A623]" : "text-slate-500"}`} />
          Barangay Households
        </Link>

        <Link
          href="/inhabitants/demographics"
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
            currentTab === "demographics"
              ? "bg-[#580011] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <BarChart3 className={`h-4 w-4 ${currentTab === "demographics" ? "text-[#E5A623]" : "text-slate-500"}`} />
          Demographics & Analytics
        </Link>
      </div>

      {/* Main Mount View Area */}
      <div>{children}</div>

      {/* Shared Registration Modal */}
      <ResidentRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveResident}
      />
    </div>
  );
}
