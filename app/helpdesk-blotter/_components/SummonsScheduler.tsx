"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, CheckCircle2, User } from "lucide-react";

interface SummonsSchedule {
  id: string;
  caseNumber: string;
  hearingStage:
    | "1st Mediation (Pangkat)"
    | "2nd Conciliation"
    | "3rd Final Arbitration";
  date: string;
  time: string;
  venue: string;
  presidingOfficer: string;
  status: "Scheduled" | "Completed" | "No Show / Rescheduled";
}

const mockSchedules: SummonsSchedule[] = [
  {
    id: "SUM-001",
    caseNumber: "KP-2026-101",
    hearingStage: "1st Mediation (Pangkat)",
    date: "2026-08-25",
    time: "10:00 AM",
    venue: "Session Hall Room B, Barangay Hall",
    presidingOfficer: "Lupon Member Carlos Mendoza",
    status: "Scheduled",
  },
  {
    id: "SUM-002",
    caseNumber: "KP-2026-102",
    hearingStage: "1st Mediation (Pangkat)",
    date: "2026-08-26",
    time: "02:00 PM",
    venue: "Barangay Mediation Office",
    presidingOfficer: "Hon. Punong Barangay",
    status: "Scheduled",
  },
];

export function SummonsScheduler() {
  const [schedules, setSchedules] = useState<SummonsSchedule[]>(mockSchedules);
  const [newSchedule, setNewSchedule] = useState<Omit<SummonsSchedule, "id">>({
    caseNumber: "KP-2026-101",
    hearingStage: "1st Mediation (Pangkat)",
    date: "2026-08-25",
    time: "10:00 AM",
    venue: "Barangay Session Hall A",
    presidingOfficer: "Hon. Punong Barangay",
    status: "Scheduled",
  });

  const [toast, setToast] = useState(false);

  const handleAddSummons = (e: React.FormEvent) => {
    e.preventDefault();
    const created: SummonsSchedule = {
      id: `SUM-00${schedules.length + 1}`,
      ...newSchedule,
    };
    setSchedules([created, ...schedules]);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="bg-emerald-50 border border-[#10b981] p-4 rounded-xl flex items-center gap-3 text-slate-800 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-slate-900">Summons Notice Scheduled</p>
            <p className="text-slate-600">
              KP Hearing Notice for case {newSchedule.caseNumber} is logged and
              notice to appear can be served.
            </p>
          </div>
        </div>
      )}

      {/* Form C2: Summons Scheduler Box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#580011] bg-rose-50 px-2 py-0.5 rounded">
              KP Hearing Notice
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              Summons & Conciliation Hearing Scheduler
            </h2>
            <p className="text-xs text-slate-500">
              Schedule confrontation and dialogue hearings before the Lupon
              Tagapamayapa.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddSummons} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Target Blotter Case Number
              </label>
              <input
                type="text"
                required
                value={newSchedule.caseNumber}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, caseNumber: e.target.value })
                }
                placeholder="e.g. KP-2026-101"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Hearing Level / Conciliation Stage
              </label>
              <select
                value={newSchedule.hearingStage}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    hearingStage: e.target
                      .value as SummonsSchedule["hearingStage"],
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              >
                <option value="1st Mediation (Pangkat)">
                  1st Mediation Hearing
                </option>
                <option value="2nd Conciliation">
                  2nd Conciliation Hearing
                </option>
                <option value="3rd Final Arbitration">
                  3rd Final Arbitration
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Presiding Lupon / Hearing Officer
              </label>
              <input
                type="text"
                required
                value={newSchedule.presidingOfficer}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    presidingOfficer: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Hearing Date
              </label>
              <input
                type="date"
                required
                value={newSchedule.date}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, date: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Time Schedule
              </label>
              <input
                type="text"
                value={newSchedule.time}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, time: e.target.value })
                }
                placeholder="e.g. 10:00 AM"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Venue / Room
              </label>
              <input
                type="text"
                value={newSchedule.venue}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, venue: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#580011]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#580011] hover:bg-[#3d000c] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Calendar className="h-4 w-4 text-[#e5a623]" />
              Schedule & Issue Summons
            </button>
          </div>
        </form>
      </div>

      {/* Upcoming Hearings Queue */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4">
          Upcoming Scheduled Mediation Sessions
        </h3>
        <div className="space-y-3">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#580011]">
                    {s.caseNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    • {s.hearingStage}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {s.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" /> {s.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" /> {s.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" /> {s.venue}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" />{" "}
                    {s.presidingOfficer}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs font-medium transition-colors"
                >
                  Print KP Summons Form
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
