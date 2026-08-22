"use client";

import React, { useState } from "react";
import {
  FileCheck,
  Printer,
  CheckCircle2,
  Scale,
  Users,
  FileText,
} from "lucide-react";
import { ConsentClause } from "./ConsentClause";

interface CaseParticularsData {
  caseNumber: string;
  relatedIncidents: string;
  accomplishedDateTime: string;
  receivingAndFilingDateTime: string;
  natureOfComplaint: string;
  complaintStatement: string;
  prayer: string;
  complainantName: string;
  complainantAddress: string;
  respondentName: string;
  respondentAddress: string;
  additionalComplainants?: string[];
  additionalRespondents?: string[];
}

export function CaseParticularsForm() {
  const [formData, setFormData] = useState<CaseParticularsData>({
    caseNumber: "KP-2026-101",
    relatedIncidents:
      "BLOT-2026-0891 (Boundary Encroachment incident logged on Aug 18, 2026)",
    accomplishedDateTime: "2026-08-21T10:00",
    receivingAndFilingDateTime: "2026-08-21T10:30",
    natureOfComplaint:
      "Boundary Encroachment & Unauthorized Construction (Form 1.B)",
    complaintStatement:
      "The respondent commenced construction of a concrete perimeter structure encroaching approximately 1.5 meters into the complainant's registered boundary line without prior consent or valid building clearances.",
    prayer:
      "1. Immediate cessation of ongoing boundary construction.\n2. Removal/demolition of encroaching concrete firewall at respondent's expense.\n3. Restitution for damaged partition fence amounting to ₱8,500.",
    complainantName: "Rosalinda Mendoza",
    complainantAddress: "Purok 1, Block 5, Sta. Lucia",
    respondentName: "Arturo Valiente",
    respondentAddress: "Purok 1, Block 6, Sta. Lucia",
    additionalComplainants: ["", ""],
    additionalRespondents: ["", ""],
  });

  const [certified, setCertified] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleComplainantChange = (index: number, val: string) => {
    const updated = [...(formData.additionalComplainants || [])];
    updated[index] = val;
    setFormData({ ...formData, additionalComplainants: updated });
  };

  const handleRespondentChange = (index: number, val: string) => {
    const updated = [...(formData.additionalRespondents || [])];
    updated[index] = val;
    setFormData({ ...formData, additionalRespondents: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
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
              BIMS Form C2: KPISBH - Case
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              Katarungang Pambarangay Formal Case Particulars & Docket
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Formal Case Filing & Complaint Particulars
          </h2>
          <p className="text-xs text-slate-500">
            Provide the unique Case Number, related incidents, filing dates,
            complaint description, relief/prayer sought, and involved parties.
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
              BIMS Form C2 Case Filed Successfully
            </p>
            <p className="text-slate-600">
              Case {formData.caseNumber} has been officially docketed into the
              Katarungang Pambarangay registry.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Memo Meta & Dates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#580011]" />
              Case Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.caseNumber}
              onChange={(e) =>
                setFormData({ ...formData, caseNumber: e.target.value })
              }
              placeholder="e.g. KP-2026-101"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Unique identifier assigned to the case.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Accomplished Date & Time <span className="text-rose-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={formData.accomplishedDateTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  accomplishedDateTime: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Date when case form was completed.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Receiving & Filing Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={formData.receivingAndFilingDateTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  receivingAndFilingDateTime: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Date received and officially filed.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              For (Nature of Complaint) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.natureOfComplaint}
              onChange={(e) =>
                setFormData({ ...formData, natureOfComplaint: e.target.value })
              }
              placeholder="e.g. Property Dispute (Form 1.B)"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Specify type/nature (BIMS Form 1.B).
            </p>
          </div>
        </div>

        {/* Related Incident/s */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800">
              Related Incident/s
            </label>
            <span className="text-[11px] text-slate-400">
              Provide incident numbers or descriptions connected to this case.
            </span>
          </div>
          <input
            type="text"
            value={formData.relatedIncidents}
            onChange={(e) =>
              setFormData({ ...formData, relatedIncidents: e.target.value })
            }
            placeholder="e.g. BLOT-2026-0891, BLOT-2026-0711"
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        {/* Complaint (Detailed Description) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800">
              Complaint (Detailed Description){" "}
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Include relevant facts, circumstances, and supporting information.
            </span>
          </div>
          <textarea
            required
            rows={4}
            value={formData.complaintStatement}
            onChange={(e) =>
              setFormData({ ...formData, complaintStatement: e.target.value })
            }
            placeholder="Provide a detailed description of the complaint..."
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        {/* Prayer (Relief Sought) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800">
              Prayer (Relief / Action Sought){" "}
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              State what you are asking for (specific actions or resolutions).
            </span>
          </div>
          <textarea
            required
            rows={3}
            value={formData.prayer}
            onChange={(e) =>
              setFormData({ ...formData, prayer: e.target.value })
            }
            placeholder="State what you are asking for in relation to the complaint..."
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        {/* Memo: Involved Section (Complainants 1-5 & Respondents 1-5) */}
        <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#580011]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Involved Parties in Case (Complainants & Respondents)
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">
              List individuals or entities involved (up to 5 entries per side).
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complainants Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-rose-50 p-2 rounded-lg border border-rose-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#580011]">
                  Complainant(s)
                </span>
                <span className="text-[10px] font-semibold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                  Complainant 1 (Primary)
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  1. Primary Complainant Name{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.complainantName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      complainantName: e.target.value,
                    })
                  }
                  placeholder="Full Name of Complainant"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Address of Complainant
                </label>
                <input
                  type="text"
                  value={formData.complainantAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      complainantAddress: e.target.value,
                    })
                  }
                  placeholder="Address in Barangay Sta. Lucia"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              {/* Additional Complainants 2 to 5 */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <p className="text-[11px] font-semibold text-slate-600">
                  Additional Complainants (2 - 5):
                </p>
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 w-4">
                      {idx + 2}.
                    </span>
                    <input
                      type="text"
                      value={formData.additionalComplainants?.[idx] || ""}
                      onChange={(e) =>
                        handleComplainantChange(idx, e.target.value)
                      }
                      placeholder={`Complainant ${idx + 2} Name`}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Respondents Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-100 p-2 rounded-lg border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Respondent(s)
                </span>
                <span className="text-[10px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Respondent 1 (Primary)
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  1. Primary Respondent Name{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.respondentName}
                  onChange={(e) =>
                    setFormData({ ...formData, respondentName: e.target.value })
                  }
                  placeholder="Full Name of Respondent"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Address of Respondent
                </label>
                <input
                  type="text"
                  value={formData.respondentAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      respondentAddress: e.target.value,
                    })
                  }
                  placeholder="Address / Location"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              {/* Additional Respondents 2 to 5 */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <p className="text-[11px] font-semibold text-slate-600">
                  Additional Respondents (2 - 5):
                </p>
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 w-4">
                      {idx + 2}.
                    </span>
                    <input
                      type="text"
                      value={formData.additionalRespondents?.[idx] || ""}
                      onChange={(e) =>
                        handleRespondentChange(idx, e.target.value)
                      }
                      placeholder={`Respondent ${idx + 2} Name`}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Attestation & LGUSS-BIMS Consent Clause */}
        <ConsentClause
          checked={certified}
          onChange={setCertified}
          variant="standard"
          required
        />

        {/* Submit & Action Controls */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="h-4 w-4" /> Print BIMS Form C2
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck className="h-4 w-4 text-[#e5a623]" />
            Save BIMS Form C2 Case
          </button>
        </div>
      </form>
    </div>
  );
}
