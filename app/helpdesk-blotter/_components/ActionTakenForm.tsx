"use client";

import React, { useState } from "react";
import {
  Scale,
  FileCheck,
  Printer,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";

export function ActionTakenForm() {
  const [caseNo, setCaseNo] = useState("KP-2026-101");
  const [resolutionType, setResolutionType] = useState<
    | "Amicable Settlement (Kasunduan)"
    | "Certification to File Action (CFA)"
    | "Repudiated / Dismissed"
  >("Amicable Settlement (Kasunduan)");

  const [settlementTerms, setSettlementTerms] = useState(
    "Both parties voluntarily agree that respondent shall realign the boundary fence by September 15, 2026, with costs equally shared.",
  );
  const [officerNotes, setOfficerNotes] = useState(
    "Parties mediated smoothly in the presence of Lupon Member Carlos Mendoza.",
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#580011] bg-rose-50 px-2 py-0.5 rounded">
            KP Form C3
          </span>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Dispute Resolution & Action Taken Registry
          </h2>
          <p className="text-xs text-slate-500">
            Formalize Lupon Amicable Settlement (Kasunduan) or issue
            Certification to File Action (CFA) for court endorsement.
          </p>
        </div>
        <div className="p-2 rounded-lg bg-rose-50 text-[#580011]">
          <Scale className="h-6 w-6" />
        </div>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-[#10b981] p-4 rounded-xl flex items-center gap-3 text-slate-800">
          <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">
              Dispute Resolution Recorded
            </p>
            <p className="text-slate-600">
              {resolutionType} has been officially attached to Case {caseNo}.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSaveResolution} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Select Blotter Case Number
            </label>
            <input
              type="text"
              required
              value={caseNo}
              onChange={(e) => setCaseNo(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Resolution Disposition Type
            </label>
            <select
              value={resolutionType}
              onChange={(e) =>
                setResolutionType(e.target.value as typeof resolutionType)
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            >
              <option value="Amicable Settlement (Kasunduan)">
                Amicable Settlement (Kasunduan)
              </option>
              <option value="Certification to File Action (CFA)">
                Certification to File Action (CFA)
              </option>
              <option value="Repudiated / Dismissed">
                Repudiated / Dismissed / No Show
              </option>
            </select>
          </div>
        </div>

        {resolutionType === "Certification to File Action (CFA)" ? (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs text-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-[#9f1239] font-bold">
              <AlertOctagon className="h-4 w-4" /> Certification to File Action
              Endorsement
            </div>
            <p>
              This certification confirms that personal confrontation between
              parties failed before the Lupon Tagapamayapa and conciliation
              efforts have been exhausted. This clears the matter for formal
              judicial filing.
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Terms of Agreement / Kasunduan Clause{" "}
              <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={settlementTerms}
              onChange={(e) => setSettlementTerms(e.target.value)}
              className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Lupon Presiding Officer Notes & Sign-off
          </label>
          <input
            type="text"
            value={officerNotes}
            onChange={(e) => setOfficerNotes(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Printer className="h-4 w-4" /> Print Resolution Document
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <FileCheck className="h-4 w-4 text-[#e5a623]" /> Save Official
            Action
          </button>
        </div>
      </form>
    </div>
  );
}
