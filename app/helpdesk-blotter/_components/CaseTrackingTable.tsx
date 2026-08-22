"use client";

import React, { useState } from "react";
import { Search, Filter, Eye, ShieldAlert, X, Printer } from "lucide-react";
import { BlotterCaseData } from "./BlotterIntakeForm";

interface CaseTrackingProps {
  cases?: BlotterCaseData[];
}

const mockCases: BlotterCaseData[] = [
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
];

export function CaseTrackingTable({ cases = mockCases }: CaseTrackingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeCase, setActiveCase] = useState<BlotterCaseData | null>(null);

  const filtered = cases.filter((c) => {
    const matchQuery =
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.complainantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.respondentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.incidentType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchQuery && matchStatus;
  });

  const handlePrintCaseRecord = () => {
    if (!activeCase) return;
    const prevTitle = document.title;
    document.title = activeCase.caseNumber;
    setTimeout(() => {
      window.print();
      document.title = prevTitle;
    }, 100);
  };

  const getStatusBadge = (status: BlotterCaseData["status"]) => {
    switch (status) {
      case "Settled":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Scheduled for Hearing":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "Elevated / CFA":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Open / Pending Mediation":
      default:
        return "bg-rose-50 text-[#580011] border-rose-200";
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search case #, complainant, respondent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#580011]"
          >
            <option value="All">All Statuses</option>
            <option value="Open / Pending Mediation">Open / Pending</option>
            <option value="Scheduled for Hearing">Scheduled for Hearing</option>
            <option value="Settled">Settled / Amicable</option>
            <option value="Elevated / CFA">Elevated / CFA Issued</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Case Number</th>
                <th className="py-3 px-4">Complainant</th>
                <th className="py-3 px-4">Respondent</th>
                <th className="py-3 px-4">Incident Type</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No blotter records found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.caseNumber}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      {item.caseNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {item.complainantName}
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      {item.respondentName}
                    </td>
                    <td className="py-3 px-4">{item.incidentType}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.urgency === "High Priority" ||
                          item.urgency === "Urgent"
                            ? "bg-[#580011] text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.urgency}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setActiveCase(item)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-rose-50 hover:text-[#580011] text-slate-700 text-[11px] font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" /> Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details Modal */}
      {activeCase && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-50 text-[#580011]">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Incident Case File: {activeCase.caseNumber}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Lupon Tagapamayapa Records • Form C2
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveCase(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div>
                <p className="text-slate-500 font-semibold uppercase text-[10px]">
                  Complainant
                </p>
                <p className="font-bold text-slate-900">
                  {activeCase.complainantName}
                </p>
                <p className="text-slate-600">
                  {activeCase.complainantAddress}
                </p>
                <p className="text-slate-500 font-mono text-[10px]">
                  {activeCase.complainantContact}
                </p>
              </div>
              <div>
                <p className="text-slate-500 font-semibold uppercase text-[10px]">
                  Respondent
                </p>
                <p className="font-bold text-slate-900">
                  {activeCase.respondentName}
                </p>
                <p className="text-slate-600">{activeCase.respondentAddress}</p>
              </div>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Nature of Dispute:</span>
                <span className="font-semibold text-slate-800">
                  {activeCase.incidentType}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Date/Time Occurred:</span>
                <span className="font-semibold text-slate-800">
                  {activeCase.incidentDateTime}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Incident Location:</span>
                <span className="font-semibold text-slate-800">
                  {activeCase.incidentLocation}
                </span>
              </div>
              <div className="pt-2">
                <p className="font-semibold text-slate-700 mb-1">
                  Official Salaysay / Statement:
                </p>
                <p className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-800 leading-relaxed">
                  {activeCase.narrative}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setActiveCase(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close File
              </button>
              <button
                type="button"
                onClick={handlePrintCaseRecord}
                className="px-4 py-2 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Printer className="h-3.5 w-3.5" />
                Print Case Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
