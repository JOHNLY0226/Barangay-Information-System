"use client";

import React, { useState } from "react";
import { Lock, CheckCircle2, AlertTriangle, UserCheck } from "lucide-react";

export function VawcIntakeForm() {
  const [victimName, setVictimName] = useState("");
  const [victimAge, setVictimAge] = useState("29");
  const [perpetratorName, setPerpetratorName] = useState("");
  const [relationship, setRelationship] = useState(
    "Live-in Partner / Common-law spouse",
  );
  const [abuseType, setAbuseType] = useState(
    "Physical & Psychological (RA 9262)",
  );
  const [bpoRequested, setBpoRequested] = useState(true);
  const [incidentSummary, setIncidentSummary] = useState("");
  const [caseOfficer, setCaseOfficer] = useState(
    "Officer Elena Dimaguiba (VAW Desk)",
  );
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-[#580011] shadow-sm p-6 space-y-6">
      {/* Restricted Security Banner */}
      <div className="bg-[#580011] text-white p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black/20 rounded-md">
            <Lock className="h-5 w-5 text-[#e5a623]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wide">
                Confidential VAWC Intake (Form D1)
              </h2>
              <span className="text-[9px] uppercase font-bold bg-[#e5a623] text-slate-950 px-2 py-0.5 rounded">
                Strictly Restricted
              </span>
            </div>
            <p className="text-[11px] text-rose-100 mt-0.5">
              Protected under Republic Act 9262 (Anti-Violence Against Women and
              Their Children Act).
            </p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-rose-200 hidden sm:block">
          ENCRYPTED DESK LOG
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-[#10b981] p-4 rounded-xl flex items-center gap-3 text-slate-800">
          <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">Confidential Case Saved</p>
            <p className="text-slate-600">
              VAWC Record registered. Incident data is masked from general
              blotter views.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Victim & Perpetrator Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#580011]">
              Victim-Survivor Information
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name / Pseudonym <span className="text-rose-500">*</span>
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
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={victimAge}
                onChange={(e) => setVictimAge(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Alleged Perpetrator Information
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
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
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Relationship to Victim
              </label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>
          </div>
        </div>

        {/* Violence Classification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              RA 9262 Classification of Violence
            </label>
            <select
              value={abuseType}
              onChange={(e) => setAbuseType(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            >
              <option value="Physical & Psychological (RA 9262)">
                Physical & Psychological Violence
              </option>
              <option value="Psychological / Emotional Abuse">
                Psychological / Emotional Abuse
              </option>
              <option value="Economic / Financial Abuse">
                Economic / Deprivation of Support
              </option>
              <option value="Sexual Abuse / Harassment">
                Sexual Abuse / Harassment
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Assigned VAW Desk Officer
            </label>
            <input
              type="text"
              value={caseOfficer}
              onChange={(e) => setCaseOfficer(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
            />
          </div>
        </div>

        {/* Immediate Protection Relief */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
            <span className="text-xs font-medium text-slate-800">
              Issue Immediate Barangay Protection Order (BPO - 15 Days Relief)
            </span>
          </div>
          <input
            type="checkbox"
            checked={bpoRequested}
            onChange={(e) => setBpoRequested(e.target.checked)}
            className="h-4 w-4 rounded accent-[#580011]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Confidential Incident Notes / Referrals (Medical / PNP / Safe
            Shelter) <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={incidentSummary}
            onChange={(e) => setIncidentSummary(e.target.value)}
            placeholder="Record assistance provided: e.g. Accompanied to QCGH Medico-Legal, temporary shelter referral, PNP Women's Desk endorsement..."
            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
          />
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-200">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            <UserCheck className="h-4 w-4 text-[#e5a623]" /> Save Protected VAWC
            Record
          </button>
        </div>
      </form>
    </div>
  );
}
