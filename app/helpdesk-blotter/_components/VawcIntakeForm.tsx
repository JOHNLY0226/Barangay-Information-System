"use client";

import React, { useState } from "react";
import {
  Lock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ConsentClause } from "./ConsentClause";

export function VawcIntakeForm() {
  const [incidentNumber] = useState("VAWC-2026-042");
  const [incidentDateTime, setIncidentDateTime] = useState("2026-08-20T19:30");
  const [reportDateTime, setReportDateTime] = useState("2026-08-21T09:00");
  const [vawcType, setVawcType] = useState<string>(
    "Violence Against Women and Children",
  );

  const [narrative, setNarrative] = useState("");
  const [victimName, setVictimName] = useState("");
  const [victimAge, setVictimAge] = useState("29");
  const [victimAddress, setVictimAddress] = useState("Sta. Lucia, Quezon City");
  const [perpetratorName, setPerpetratorName] = useState("");
  const [perpetratorAddress, setPerpetratorAddress] = useState(
    "Sta. Lucia, Quezon City",
  );
  const [relationship, setRelationship] = useState(
    "Live-in Partner / Common-law spouse",
  );
  const [additionalComplainants, setAdditionalComplainants] = useState<
    string[]
  >(["", ""]);
  const [additionalRespondents, setAdditionalRespondents] = useState<string[]>([
    "",
    "",
  ]);

  const [bpoRequested, setBpoRequested] = useState(true);
  const [caseOfficer, setCaseOfficer] = useState(
    "Officer Elena Dimaguiba (VAW Desk)",
  );
  const [consentGiven, setConsentGiven] = useState(false);
  const [saved, setSaved] = useState(false);
  const [lastSavedReportNo, setLastSavedReportNo] = useState("");

  const handleComplainantChange = (index: number, val: string) => {
    const updated = [...additionalComplainants];
    updated[index] = val;
    setAdditionalComplainants(updated);
  };

  const handleRespondentChange = (index: number, val: string) => {
    const updated = [...additionalRespondents];
    updated[index] = val;
    setAdditionalRespondents(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dynamicReportNo = `VAWC-2026-${Date.now().toString().slice(-3)}`;
    setLastSavedReportNo(dynamicReportNo);
    setSaved(true);
    setConsentGiven(false);
    setTimeout(() => setSaved(false), 5000);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-[#580011] shadow-sm p-6 space-y-6">
      {/* Restricted Security Banner */}
      <div className="bg-[#580011] text-white p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black/20 rounded-lg">
            <Lock className="h-5 w-5 text-[#e5a623]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold bg-[#e5a623] text-slate-950 px-2 py-0.5 rounded">
                BIMS Form D1
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wide">
                VAWC Incident Intake & Confidential Register
              </h2>
            </div>
            <p className="text-[11px] text-rose-100 mt-0.5">
              Protected under Republic Act 9262 & Data Privacy Act of 2012.
              Strictly restricted access.
            </p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-rose-200 hidden sm:block">
          ENCRYPTED DESK LOG
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-[#10b981] p-4 rounded-xl flex items-center gap-3 text-slate-800 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">Confidential Case Saved</p>
            <p className="text-slate-600">
              VAWC Record {lastSavedReportNo || incidentNumber} registered.
              Incident data is masked from general blotter views.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Memo Top Meta: Incident Identifier & Dates Table Block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-rose-50/40 border border-rose-200/60 rounded-xl">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#580011] mb-1 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#580011]" />
              Incident Number (Auto-Assigned)
            </label>
            <input
              type="text"
              readOnly
              value={incidentNumber}
              className="w-full px-3 py-2 bg-rose-100/60 border border-rose-200 rounded-lg text-xs font-mono font-bold text-[#580011] cursor-not-allowed"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Unique identifier for the VAWC incident.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Incident Date & Time <span className="text-rose-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={incidentDateTime}
              onChange={(e) => setIncidentDateTime(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Exact date and time when incident occurred.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Report Date & Time <span className="text-rose-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={reportDateTime}
              onChange={(e) => setReportDateTime(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Date and time when report is being made.
            </p>
          </div>
        </div>

        {/* Memo: Type Selector (Checkboxes / Select options) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">
            Type of Incident (Select Category){" "}
            <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              "Violence Against Women and Children",
              "Violence Against Children",
              "Violence Against Women (RA 9262)",
            ].map((t) => {
              const isSelected = vawcType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setVawcType(t)}
                  className={`p-3 text-xs font-medium rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#580011] text-white border-[#580011] shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="font-semibold">{t}</div>
                  <div
                    className={`text-[10px] mt-0.5 ${isSelected ? "text-rose-100" : "text-slate-400"}`}
                  >
                    {t === "Violence Against Children"
                      ? "Minor-involved abuse"
                      : "RA 9262 Protected Category"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Narrative Section */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-800">
              Narrative (Detailed Description){" "}
              <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Include key facts, events leading up to the incident, and actions
              taken.
            </span>
          </div>
          <textarea
            required
            rows={4}
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
            placeholder="Provide a detailed description of the incident, injuries, specific threats, and assistance provided..."
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        {/* Memo: Involved Section (Complainant 1-5 & Respondent 1-5) */}
        <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#580011]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Involved Parties (Victim-Survivors & Perpetrators)
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">
              List all individuals involved (up to 5 entries per side).
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Complainant(s) / Victim Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-rose-50 p-2 rounded-lg border border-rose-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#580011]">
                  Complainant / Victim-Survivor(s)
                </span>
                <span className="text-[10px] font-semibold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                  Complainant 1 (Primary)
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  1. Primary Victim Full Name / Pseudonym{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={victimName}
                  onChange={(e) => setVictimName(e.target.value)}
                  placeholder="Full Name (Confidential)"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={victimAge}
                    onChange={(e) => setVictimAge(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">
                    Assigned VAW Officer
                  </label>
                  <input
                    type="text"
                    value={caseOfficer}
                    onChange={(e) => setCaseOfficer(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Victim Address
                </label>
                <input
                  type="text"
                  value={victimAddress}
                  onChange={(e) => setVictimAddress(e.target.value)}
                  placeholder="Address (Confidential)"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              {/* Additional Complainants 2 to 5 */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <p className="text-[11px] font-semibold text-slate-600">
                  Additional Complainants / Children (2 - 5):
                </p>
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 w-4">
                      {idx + 2}.
                    </span>
                    <input
                      type="text"
                      value={additionalComplainants[idx] || ""}
                      onChange={(e) =>
                        handleComplainantChange(idx, e.target.value)
                      }
                      placeholder={`Victim/Child ${idx + 2} Name`}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Respondent(s) / Perpetrator Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-100 p-2 rounded-lg border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Respondent / Alleged Perpetrator(s)
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
                  value={perpetratorName}
                  onChange={(e) => setPerpetratorName(e.target.value)}
                  placeholder="Full Name of Respondent"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Relationship to Victim
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Spouse / Live-in Partner"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">
                  Respondent Known Address
                </label>
                <input
                  type="text"
                  value={perpetratorAddress}
                  onChange={(e) => setPerpetratorAddress(e.target.value)}
                  placeholder="Known Address / Location"
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
                      value={additionalRespondents[idx] || ""}
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

        {/* Immediate Protection Relief (BPO) */}
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
            <span className="text-xs font-semibold text-slate-800">
              Issue Immediate Barangay Protection Order (BPO - 15 Days Emergency
              Relief)
            </span>
          </div>
          <input
            type="checkbox"
            checked={bpoRequested}
            onChange={(e) => setBpoRequested(e.target.checked)}
            className="h-4 w-4 rounded accent-[#580011] cursor-pointer"
          />
        </div>

        {/* Statutory Attestation & LGUSS-BIMS Consent Clause */}
        <ConsentClause
          checked={consentGiven}
          onChange={setConsentGiven}
          variant="vawc"
          required
        />

        <div className="flex justify-end pt-3 border-t border-slate-200">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <UserCheck className="h-4 w-4 text-[#e5a623]" /> Save Protected BIMS
            Form D1 Record
          </button>
        </div>
      </form>
    </div>
  );
}
