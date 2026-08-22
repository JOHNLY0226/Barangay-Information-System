"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  Plus,
  ListFilter,
  Calendar,
  Scale,
  Lock,
} from "lucide-react";
import {
  BlotterIntakeForm,
  BlotterCaseData,
} from "./_components/BlotterIntakeForm";
import { CaseTrackingTable } from "./_components/CaseTrackingTable";
import { SummonsScheduler } from "./_components/SummonsScheduler";
import { ActionTakenForm } from "./_components/ActionTakenForm";
import { VawcIntakeForm } from "./_components/VawcIntakeForm";

export default function HelpdeskBlotterPage() {
  const [activeTab, setActiveTab] = useState<
    "intake" | "tracking" | "summons" | "action" | "vawc"
  >("intake");
  const [cases, setCases] = useState<BlotterCaseData[]>([
    {
      caseNumber: "KP-2026-101",
      complainantName: "Rosalinda Mendoza",
      complainantContact: "0918-223-9011",
      complainantAddress: "Purok 1, Block 5, Sta. Lucia",
      respondentName: "Arturo Valiente",
      respondentAddress: "Purok 1, Block 6, Sta. Lucia",
      incidentType: "Property Damage",
      incidentLocation: "Boundary Fence Alley",
      incidentDateTime: "2026-08-18T14:30",
      narrative:
        "Respondent constructed concrete firewall extending into complainant lot without agreed setback.",
      urgency: "Normal",
      status: "Scheduled for Hearing",
    },
    {
      caseNumber: "KP-2026-102",
      complainantName: "Danilo Fernandez",
      complainantContact: "0920-888-1122",
      complainantAddress: "Purok 4, Sta. Lucia",
      respondentName: "Bernardo Santos",
      respondentAddress: "Purok 4, Sta. Lucia",
      incidentType: "Unjust Vexation",
      incidentLocation: "Community Basketball Court",
      incidentDateTime: "2026-08-19T20:00",
      narrative:
        "Verbal insults and aggressive public shouting during nighttime barangay tournament.",
      urgency: "High Priority",
      status: "Open / Pending Mediation",
    },
    {
      caseNumber: "KP-2026-098",
      complainantName: "Corazon Aquino-Cruz",
      complainantContact: "0917-555-4321",
      complainantAddress: "Katipunan Ext., Sta. Lucia",
      respondentName: "Ernesto Dizon",
      respondentAddress: "Katipunan Ext., Sta. Lucia",
      incidentType: "Unpaid Debt / Estafa (Small Claim)",
      incidentLocation: "Complainant Residence",
      incidentDateTime: "2026-08-10T10:00",
      narrative:
        "Unsettled personal promissory loan amounting to ₱12,500 due last June 2026.",
      urgency: "Normal",
      status: "Settled",
    },
  ]);

  const handleCaseCreated = (newCase: BlotterCaseData) => {
    setCases((prev) => [newCase, ...prev]);
    setActiveTab("tracking");
  };

  return (
    <div className="space-y-6">
      {/* Header Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link
              href="/"
              className="hover:text-[#580011] flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">
              Helpdesk & Complaints
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-50 text-[#580011]">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  Helpdesk & Complaints (KPISBH)
                </h1>
                <span className="text-[10px] font-mono font-bold bg-[#580011] text-white px-2 py-0.5 rounded">
                  KPISBH v2.5
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Katarungang Pambarangay incident logging, blotter scheduling, &
                mediation management.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("intake")}
            className="px-3.5 py-2 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4 text-[#e5a623]" /> File New Blotter
          </button>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("intake")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "intake"
              ? "bg-[#580011] text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Plus className="h-3.5 w-3.5" />
          Blotter Intake (Form C1)
        </button>

        <button
          onClick={() => setActiveTab("tracking")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "tracking"
              ? "bg-[#580011] text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <ListFilter className="h-3.5 w-3.5" />
          Case Tracking & Records ({cases.length})
        </button>

        <button
          onClick={() => setActiveTab("summons")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "summons"
              ? "bg-[#580011] text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Calendar className="h-3.5 w-3.5" />
          Summons & Hearings (Form C2)
        </button>

        <button
          onClick={() => setActiveTab("action")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "action"
              ? "bg-[#580011] text-white"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Scale className="h-3.5 w-3.5" />
          Action Taken / Settlement (Form C3)
        </button>

        <button
          onClick={() => setActiveTab("vawc")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "vawc"
              ? "bg-[#580011] text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          VAWC Desk Intake (Form D1)
        </button>
      </div>

      {/* Active Tab View */}
      <div>
        {activeTab === "intake" && (
          <BlotterIntakeForm onCaseCreated={handleCaseCreated} />
        )}
        {activeTab === "tracking" && <CaseTrackingTable cases={cases} />}
        {activeTab === "summons" && <SummonsScheduler />}
        {activeTab === "action" && <ActionTakenForm />}
        {activeTab === "vawc" && <VawcIntakeForm />}
      </div>
    </div>
  );
}
