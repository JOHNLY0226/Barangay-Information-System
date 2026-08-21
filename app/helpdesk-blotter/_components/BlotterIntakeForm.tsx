"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertTriangle } from "lucide-react";

export interface BlotterCaseData {
  caseNumber: string;
  complainantName: string;
  complainantContact: string;
  complainantAddress: string;
  respondentName: string;
  respondentAddress: string;
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
    complainantName: "",
    complainantContact: "",
    complainantAddress: "Sta. Lucia, Quezon City",
    respondentName: "",
    respondentAddress: "Sta. Lucia, Quezon City",
    incidentType: "Neighborhood Dispute",
    incidentLocation: "Purok 4, Main Alley",
    incidentDateTime: "2026-08-18T14:30",
    narrative: "",
    urgency: "Normal",
    status: "Open / Pending Mediation",
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastLoggedCaseNumber, setLastLoggedCaseNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueCaseNumber = `KP-2026-${Date.now().toString().slice(-4)}`;
    const submissionData: BlotterCaseData = {
      ...formData,
      caseNumber: uniqueCaseNumber,
    };

    if (onCaseCreated) {
      onCaseCreated(submissionData);
    }

    setLastLoggedCaseNumber(uniqueCaseNumber);
    setSubmitted(true);
    setFormData((prev) => ({
      ...prev,
      complainantName: "",
      complainantContact: "",
      respondentName: "",
      narrative: "",
    }));
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#580011] bg-rose-50 px-2 py-0.5 rounded">
              KP Form C1
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              Katarungang Pambarangay Incident Intake
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-1">
            File New Blotter / Complaint Entry
          </h2>
          <p className="text-xs text-slate-500">
            Log complainant grievances and respondent identities for Lupon
            Tagapamayapa mediation.
          </p>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Case No: {lastLoggedCaseNumber || formData.caseNumber}
        </span>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-[#10b981] p-4 rounded-xl flex items-center gap-3 text-slate-800">
          <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">Blotter Entry Recorded</p>
            <p className="text-slate-600">
              Case {lastLoggedCaseNumber} has been logged. You may now schedule
              a mediation hearing under Form C2.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Complainant vs Respondent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Complainant Details */}
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#580011]">
              1. Complainant Information (Nagsusumbong)
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.complainantName}
                onChange={(e) =>
                  setFormData({ ...formData, complainantName: e.target.value })
                }
                placeholder="e.g. Maria Teresa Santos"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Contact Number
              </label>
              <input
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
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Residential Address in Sta. Lucia
              </label>
              <input
                type="text"
                required
                value={formData.complainantAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    complainantAddress: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>
          </div>

          {/* Respondent Details */}
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              2. Respondent Information (Ipinagsusumbong)
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name / Alias <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.respondentName}
                onChange={(e) =>
                  setFormData({ ...formData, respondentName: e.target.value })
                }
                placeholder="e.g. Rodrigo 'Digoy' Cruz"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Resident Address / Known Location
              </label>
              <input
                type="text"
                required
                value={formData.respondentAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    respondentAddress: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Incident Urgency & Priority Level
              </label>
              <select
                value={formData.urgency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    urgency: e.target.value as BlotterCaseData["urgency"],
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              >
                <option value="Normal">Normal Mediation</option>
                <option value="Urgent">Urgent Intervention</option>
                <option value="High Priority">
                  High Priority (Immediate Action)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Incident Particulars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Incident Nature / Dispute Type
            </label>
            <select
              value={formData.incidentType}
              onChange={(e) =>
                setFormData({ ...formData, incidentType: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            >
              <option value="Neighborhood Dispute">
                Neighborhood Dispute / Boundary
              </option>
              <option value="Unjust Vexation">
                Unjust Vexation / Verbal Altercation
              </option>
              <option value="Property Damage">
                Property Damage / Encroachment
              </option>
              <option value="Physical Injuries (Slight)">
                Physical Injuries (Slight)
              </option>
              <option value="Unpaid Debt / Estafa (Small Claim)">
                Unpaid Debt / Financial Claim
              </option>
              <option value="Noise Disturbance">
                Noise Disturbance / Public Disturbance
              </option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Date & Time of Incident
            </label>
            <input
              type="datetime-local"
              value={formData.incidentDateTime}
              onChange={(e) =>
                setFormData({ ...formData, incidentDateTime: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Specific Place of Occurrence
            </label>
            <input
              type="text"
              value={formData.incidentLocation}
              onChange={(e) =>
                setFormData({ ...formData, incidentLocation: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
          </div>
        </div>

        {/* Narrative / Statement */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Detailed Statement / Incident Narrative (Salaysay){" "}
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.narrative}
            onChange={(e) =>
              setFormData({ ...formData, narrative: e.target.value })
            }
            placeholder="Specify facts, sequence of events, witnesses, and remedies sought by complainant..."
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <AlertTriangle className="h-4 w-4 text-[#e5a623]" />
            <span>
              Complies with Katarungang Pambarangay Law (RA 7160 Sec 399-422)
            </span>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
          >
            <Send className="h-4 w-4 text-[#e5a623]" /> File Blotter Entry
          </button>
        </div>
      </form>
    </div>
  );
}
