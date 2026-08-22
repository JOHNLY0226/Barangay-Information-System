"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Users,
} from "lucide-react";
import { ConsentClause } from "./ConsentClause";

export interface BlotterCaseData {
  caseNumber: string;
  blotterEntryNo?: string;
  dateReported: string;
  reportDateTime?: string;
  complainantName: string;
  complainantContact: string;
  complainantAddress: string;
  respondentName: string;
  respondentAddress: string;
  additionalComplainants?: string[];
  additionalRespondents?: string[];
  incidentType: string;
  incidentLocation: string;
  incidentDateTime: string;
  narrative: string;
  urgency: "Normal" | "Urgent" | "High Priority";
  status:
    | "Open / Pending Mediation"
    | "Scheduled for Hearing"
    | "Settled"
    | "Elevated / CFA";
}

interface IntakeFormProps {
  onCaseCreated?: (newCase: BlotterCaseData) => void;
}

export function BlotterIntakeForm({ onCaseCreated }: IntakeFormProps) {
  const [formData, setFormData] = useState<BlotterCaseData>({
    caseNumber: "KP-2026-105",
    blotterEntryNo: "BLOT-2026-0894",
    dateReported: "2026-08-21",
    reportDateTime: "2026-08-21T09:00",
    complainantName: "",
    complainantContact: "",
    complainantAddress: "Sta. Lucia, Quezon City",
    respondentName: "",
    respondentAddress: "Sta. Lucia, Quezon City",
    additionalComplainants: ["", ""],
    additionalRespondents: ["", ""],
    incidentType: "Neighborhood Dispute",
    incidentLocation: "Purok 4, Main Alley",
    incidentDateTime: "2026-08-18T14:30",
    narrative: "",
    urgency: "Normal",
    status: "Open / Pending Mediation",
  });

  const [certified, setCertified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastLoggedCaseNumber, setLastLoggedCaseNumber] = useState("");

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
    const timestampSlice = Date.now().toString().slice(-4);
    const uniqueCaseNumber = `KP-2026-${timestampSlice}`;
    const uniqueBlotterNumber = `BLOT-2026-${timestampSlice}`;
    const submissionData: BlotterCaseData = {
      ...formData,
      caseNumber: uniqueCaseNumber,
      blotterEntryNo: uniqueBlotterNumber,
      dateReported:
        formData.dateReported ||
        formData.reportDateTime?.split("T")[0] ||
        "2026-08-21",
    };

    if (onCaseCreated) {
      onCaseCreated(submissionData);
    }

    setLastLoggedCaseNumber(uniqueCaseNumber);
    setSubmitted(true);
    setCertified(false);
    setFormData((prev) => ({
      ...prev,
      complainantName: "",
      complainantContact: "",
      respondentName: "",
      narrative: "",
      incidentLocation: "Purok 4, Main Alley",
      additionalComplainants: ["", ""],
      additionalRespondents: ["", ""],
    }));
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Memo Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#580011] bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
              BIMS Form C1: KPISBH - Incident
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              Katarungang Pambarangay Incident Intake & Blotter Register
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            Incident Intake / Blotter Logging
          </h2>
          <p className="text-xs text-slate-500">
            Provide the unique incident identifier, date/time particulars,
            detailed narrative, and involved parties.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Incident: {lastLoggedCaseNumber || formData.caseNumber}
        </span>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-[#10b981] p-4 rounded-xl flex items-center gap-3 text-slate-800 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">
              Incident Successfully Recorded
            </p>
            <p className="text-slate-600">
              Incident {lastLoggedCaseNumber} has been logged in accordance with
              BIMS Form C1.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Memo Top Meta: Incident Identifier, Dates & Location Table Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <label
              htmlFor="c1-incident-number"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-[#580011]" />
              Incident Number (System / Manual)
            </label>
            <input
              id="c1-incident-number"
              type="text"
              readOnly
              value={formData.caseNumber}
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-bold text-[#580011] cursor-not-allowed"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Unique identifier for the incident.
            </p>
          </div>

          <div>
            <label
              htmlFor="c1-incident-datetime"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
            >
              Incident Date & Time <span className="text-rose-500">*</span>
            </label>
            <input
              id="c1-incident-datetime"
              type="datetime-local"
              required
              value={formData.incidentDateTime}
              onChange={(e) =>
                setFormData({ ...formData, incidentDateTime: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Exact date and time when incident occurred.
            </p>
          </div>

          <div>
            <label
              htmlFor="c1-report-datetime"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
            >
              Report Date & Time <span className="text-rose-500">*</span>
            </label>
            <input
              id="c1-report-datetime"
              type="datetime-local"
              required
              value={
                formData.reportDateTime || `${formData.dateReported}T09:00`
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reportDateTime: e.target.value,
                  dateReported: e.target.value.split("T")[0],
                })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Date and time when report is being made.
            </p>
          </div>

          <div>
            <label
              htmlFor="c1-incident-location"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
            >
              Place of Incident / Location <span className="text-rose-500">*</span>
            </label>
            <input
              id="c1-incident-location"
              type="text"
              required
              value={formData.incidentLocation}
              onChange={(e) =>
                setFormData({ ...formData, incidentLocation: e.target.value })
              }
              placeholder="e.g. Purok 4, Main Alley"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Exact place or sitio where incident occurred.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="c1-narrative"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-800"
            >
              Narrative (Detailed Description){" "}
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Include key facts, events leading up to incident, and actions
              taken.
            </span>
          </div>
          <textarea
            id="c1-narrative"
            required
            rows={4}
            value={formData.narrative}
            onChange={(e) =>
              setFormData({ ...formData, narrative: e.target.value })
            }
            placeholder="Provide a detailed description of the incident. Include key facts, sequence of events, and remedies sought..."
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        {/* Memo: Involved Parties (Complainants vs Respondents 1 to 5) */}
        <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#580011]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Involved Parties (Complainants & Respondents)
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">
              Provide list of all individuals or entities involved (up to 5
              entries).
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complainant(s) Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-rose-50 p-2 rounded-lg border border-rose-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#580011]">
                  Complainant(s) / Nagsusumbong
                </span>
                <span className="text-[10px] font-semibold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                  Complainant 1 (Primary)
                </span>
              </div>

              <div>
                <label
                  htmlFor="c1-complainant-name"
                  className="block text-[11px] font-semibold text-slate-700 mb-1"
                >
                  1. Primary Complainant Name{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="c1-complainant-name"
                  type="text"
                  required
                  value={formData.complainantName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      complainantName: e.target.value,
                    })
                  }
                  placeholder="Full Name (e.g. Maria Teresa Santos)"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div>
                <label
                  htmlFor="c1-complainant-address"
                  className="block text-[11px] font-medium text-slate-700 mb-1"
                >
                  Primary Complainant Address{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="c1-complainant-address"
                  type="text"
                  required
                  value={formData.complainantAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      complainantAddress: e.target.value,
                    })
                  }
                  placeholder="Complete Address in Sta. Lucia"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div>
                <label
                  htmlFor="c1-complainant-contact"
                  className="block text-[11px] font-medium text-slate-700 mb-1"
                >
                  Primary Complainant Contact Number
                </label>
                <input
                  id="c1-complainant-contact"
                  type="text"
                  value={formData.complainantContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      complainantContact: e.target.value,
                    })
                  }
                  placeholder="0917-XXX-XXXX"
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
                    <label
                      htmlFor={`c1-additional-complainant-${idx}`}
                      className="text-[11px] font-bold text-slate-400 w-4"
                    >
                      {idx + 2}.
                    </label>
                    <input
                      id={`c1-additional-complainant-${idx}`}
                      type="text"
                      value={formData.additionalComplainants?.[idx] || ""}
                      onChange={(e) =>
                        handleComplainantChange(idx, e.target.value)
                      }
                      placeholder={`Complainant ${idx + 2} Full Name (Optional)`}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Respondent(s) Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-100 p-2 rounded-lg border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Respondent(s) / Ipinagsusumbong
                </span>
                <span className="text-[10px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Respondent 1 (Primary)
                </span>
              </div>

              <div>
                <label
                  htmlFor="c1-respondent-name"
                  className="block text-[11px] font-semibold text-slate-700 mb-1"
                >
                  1. Primary Respondent Name{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="c1-respondent-name"
                  type="text"
                  required
                  value={formData.respondentName}
                  onChange={(e) =>
                    setFormData({ ...formData, respondentName: e.target.value })
                  }
                  placeholder="Full Name / Alias (e.g. Rodrigo 'Digoy' Cruz)"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div>
                <label
                  htmlFor="c1-respondent-address"
                  className="block text-[11px] font-medium text-slate-700 mb-1"
                >
                  Primary Respondent Address / Location{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="c1-respondent-address"
                  type="text"
                  required
                  value={formData.respondentAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      respondentAddress: e.target.value,
                    })
                  }
                  placeholder="Known Address / Location"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div>
                <label
                  htmlFor="c1-incident-type"
                  className="block text-[11px] font-medium text-slate-700 mb-1"
                >
                  Nature / Urgency Classification
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    id="c1-incident-type"
                    value={formData.incidentType}
                    onChange={(e) =>
                      setFormData({ ...formData, incidentType: e.target.value })
                    }
                    className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                  >
                    <option value="Neighborhood Dispute">
                      Neighborhood Dispute
                    </option>
                    <option value="Unjust Vexation">Unjust Vexation</option>
                    <option value="Property Damage">Property Damage</option>
                    <option value="Physical Injuries (Slight)">
                      Physical Injuries
                    </option>
                    <option value="Unpaid Debt / Estafa (Small Claim)">
                      Unpaid Debt
                    </option>
                    <option value="Noise Disturbance">Noise Disturbance</option>
                    <option value="Others">Others</option>
                  </select>

                  <select
                    id="c1-urgency"
                    aria-label="Urgency Level"
                    value={formData.urgency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        urgency: e.target.value as BlotterCaseData["urgency"],
                      })
                    }
                    className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                  >
                    <option value="Normal">Normal Mediation</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High Priority">High Priority</option>
                  </select>
                </div>
              </div>

              {/* Additional Respondents 2 to 5 */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <p className="text-[11px] font-semibold text-slate-600">
                  Additional Respondents (2 - 5):
                </p>
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <label
                      htmlFor={`c1-additional-respondent-${idx}`}
                      className="text-[11px] font-bold text-slate-400 w-4"
                    >
                      {idx + 2}.
                    </label>
                    <input
                      id={`c1-additional-respondent-${idx}`}
                      type="text"
                      value={formData.additionalRespondents?.[idx] || ""}
                      onChange={(e) =>
                        handleRespondentChange(idx, e.target.value)
                      }
                      placeholder={`Respondent ${idx + 2} Full Name (Optional)`}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Memo Statutory Attestation & LGUSS-BIMS Consent Clause */}
        <ConsentClause
          checked={certified}
          onChange={setCertified}
          variant="standard"
          required
        />

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <AlertTriangle className="h-4 w-4 text-[#e5a623]" />
            <span>
              Complies with Katarungang Pambarangay Law (RA 7160 Sec 399-422) &
              BIMS Form C1
            </span>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Send className="h-4 w-4 text-[#e5a623]" /> File BIMS Form C1
            Incident
          </button>
        </div>
      </form>
    </div>
  );
}
