"use client";

import React, { useState } from "react";
import {
  Scale,
  FileCheck,
  Printer,
  CheckCircle2,
  AlertOctagon,
  FileText,
} from "lucide-react";
import { ConsentClause } from "./ConsentClause";

export function ActionTakenForm() {
  const [caseNo, setCaseNo] = useState("KP-2026-101");
  const [dateTimeAction, setDateTimeAction] = useState("2026-08-21T14:30");
  const [actionType, setActionType] = useState<
    | "Amicable Settlement (Kasunduan)"
    | "Certification to File Action (CFA)"
    | "Repudiated / Dismissed"
    | "Arbitration Award (Pagpapasiya)"
  >("Amicable Settlement (Kasunduan)");

  const [narrative, setNarrative] = useState(
    "Both parties appeared before the Lupon Tagapamayapa for personal confrontation. Following conciliation dialogue, parties voluntarily entered into an amicable agreement wherein respondent agreed to realign the partition wall by September 15, 2026, with shared expenses.",
  );
  const [officerName, setOfficerName] = useState("Lupon Member Carlos Mendoza");
  const [certified, setCertified] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Memo Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#580011] bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
              BIMS Form C3: KPISBH - Action Taken
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              Dispute Resolution & Settlement Registry
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Official Action Taken / Settlement Record
          </h2>
          <p className="text-xs text-slate-500">
            Provide the referenced Case Number, narrative description of action taken, specific action outcome (BIMS Form 1.C), and execution date/time.
          </p>
        </div>
        <div className="p-2 rounded-lg bg-rose-50 text-[#580011]">
          <Scale className="h-6 w-6" />
        </div>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-[#10b981] p-4 rounded-xl flex items-center gap-3 text-slate-800 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">
              BIMS Form C3 Action Taken Recorded
            </p>
            <p className="text-slate-600">
              {actionType} officially attached to Case {caseNo} and registered into the dispute archive.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSaveResolution} className="space-y-5">
        {/* Memo Meta & Action Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#580011]" />
              Case Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={caseNo}
              onChange={(e) => setCaseNo(e.target.value)}
              placeholder="e.g. KP-2026-101"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Case number reference to the action taken.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Action Taken (Form 1.C) <span className="text-rose-500">*</span>
            </label>
            <select
              value={actionType}
              onChange={(e) =>
                setActionType(e.target.value as typeof actionType)
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#580011]"
            >
              <option value="Amicable Settlement (Kasunduan)">
                Amicable Settlement (Kasunduan)
              </option>
              <option value="Certification to File Action (CFA)">
                Certification to File Action (CFA)
              </option>
              <option value="Repudiated / Dismissed">
                Repudiated / Dismissed / Dropped
              </option>
              <option value="Arbitration Award (Pagpapasiya)">
                Arbitration Award (Pagpapasiya)
              </option>
            </select>
            <p className="text-[10px] text-slate-400 mt-1">
              Specific action taken (refer to BIMS Form 1.C).
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Date and Time <span className="text-rose-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={dateTimeAction}
              onChange={(e) => setDateTimeAction(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Exact date and time when action was taken.
            </p>
          </div>
        </div>

        {actionType === "Certification to File Action (CFA)" && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-slate-800 space-y-1.5">
            <div className="flex items-center gap-2 text-[#9f1239] font-bold">
              <AlertOctagon className="h-4 w-4" /> Certification to File Action Endorsement
            </div>
            <p className="leading-relaxed">
              This certification confirms that personal confrontation between parties failed before the Lupon Tagapamayapa and conciliation efforts have been legally exhausted. This clears the matter for formal judicial / police filing.
            </p>
          </div>
        )}

        {/* Narrative (Detailed Description) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800">
              Narrative (Detailed Description of Action Taken) <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Include key facts, events leading up to action, terms agreed, and resolutions.
            </span>
          </div>
          <textarea
            required
            rows={4}
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
            placeholder="Provide a detailed description of the action taken..."
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Presiding Lupon / Officer Name & Designation
          </label>
          <input
            type="text"
            value={officerName}
            onChange={(e) => setOfficerName(e.target.value)}
            placeholder="e.g. Lupon Member Carlos Mendoza"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        {/* Statutory Attestation & LGUSS-BIMS Consent Clause */}
        <ConsentClause
          checked={certified}
          onChange={setCertified}
          variant="standard"
          required
        />

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="h-4 w-4" /> Print BIMS Form C3
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck className="h-4 w-4 text-[#e5a623]" /> Save BIMS Form C3 Record
          </button>
        </div>
      </form>
    </div>
  );
}
