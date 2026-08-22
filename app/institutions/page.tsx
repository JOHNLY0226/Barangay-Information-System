"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Landmark,
  Plus,
  ClipboardList,
  Shield,
  LifeBuoy,
  HeartPulse,
  BabyIcon,
  Apple,
  Sparkles,
  ChevronRight,
  X,
  User,
} from "lucide-react";

/**
 * Barangay-Based Institutions (BBI) module
 * ------------------------------------------------------------
 * Lists the standard barangay committees, their mandates, and
 * the officers currently assigned to each. Officers can be added
 * through a lightweight modal per committee.
 */

interface Officer {
  id: string;
  name: string;
  role: string; // e.g. "Chairperson", "Member"
}

interface Committee {
  id: string;
  name: string;
  abbreviation: string;
  icon: React.ElementType;
  colorClass: string; // tailwind text/bg accent classes
  responsibilities: string[];
  officers: Officer[];
}

const initialCommittees: Committee[] = [
  {
    id: "bdc",
    name: "Barangay Development Council",
    abbreviation: "BDC",
    icon: ClipboardList,
    colorClass: "text-amber-700 bg-amber-50 ring-amber-200",
    responsibilities: [
      "Prepares and monitors the barangay development plan.",
      "Ensures community participation in identifying priority projects.",
    ],
    officers: [
      { id: "bdc-1", name: "Tony Stark", role: "Chairperson" },
      { id: "bdc-2", name: "Jisoo Kim", role: "Member" },
    ],
  },
  {
    id: "bpoc",
    name: "Barangay Peace and Order Committee",
    abbreviation: "BPOC",
    icon: Shield,
    colorClass: "text-red-700 bg-red-50 ring-red-200",
    responsibilities: [
      "Maintains peace and security.",
      "Coordinates with police and other agencies to prevent crime.",
    ],
    officers: [
      { id: "bpoc-1", name: "Steve Rogers", role: "Chairperson" },
      { id: "bpoc-2", name: "Natasha Romanoff", role: "Member" },
    ],
  },
  {
    id: "bdrrmc",
    name: "Barangay Disaster Risk Reduction and Management Committee",
    abbreviation: "BDRRMC",
    icon: LifeBuoy,
    colorClass: "text-orange-700 bg-orange-50 ring-orange-200",
    responsibilities: [
      "Handles disaster preparedness, response, and recovery.",
      "Organizes evacuation drills and emergency plans.",
    ],
    officers: [
      { id: "bdrrmc-1", name: "Thor Odinson", role: "Chairperson" },
      { id: "bdrrmc-2", name: "Bright Vachirawit", role: "Member" },
    ],
  },
  {
    id: "bhc",
    name: "Barangay Health Committee / Barangay Health Workers",
    abbreviation: "BHWs",
    icon: HeartPulse,
    colorClass: "text-emerald-700 bg-emerald-50 ring-emerald-200",
    responsibilities: [
      "Provides basic health services.",
      "Assists in immunization, maternal care, and health education.",
    ],
    officers: [
      { id: "bhc-1", name: "Bruce Banner", role: "Chairperson" },
      { id: "bhc-2", name: "Rosé Park", role: "Member" },
    ],
  },
  {
    id: "bcpc",
    name: "Barangay Council for the Protection of Children",
    abbreviation: "BCPC",
    icon: BabyIcon,
    colorClass: "text-sky-700 bg-sky-50 ring-sky-200",
    responsibilities: [
      "Safeguards children's rights and welfare.",
      "Implements programs against child abuse and neglect.",
    ],
    officers: [
      { id: "bcpc-1", name: "Wanda Maximoff", role: "Chairperson" },
      { id: "bcpc-2", name: "Win Metawin", role: "Member" },
    ],
  },
  {
    id: "bnc",
    name: "Barangay Nutrition Committee",
    abbreviation: "BNC",
    icon: Apple,
    colorClass: "text-lime-700 bg-lime-50 ring-lime-200",
    responsibilities: [
      "Promotes nutrition programs.",
      "Monitors malnutrition cases and feeding initiatives.",
    ],
    officers: [
      { id: "bnc-1", name: "Lisa Manoban", role: "Chairperson" },
      { id: "bnc-2", name: "Off Jumpol", role: "Member" },
    ],
  },
  {
    id: "sk",
    name: "Sangguniang Kabataan",
    abbreviation: "SK",
    icon: Sparkles,
    colorClass: "text-violet-700 bg-violet-50 ring-violet-200",
    responsibilities: [
      "Represents the youth sector.",
      "Plans and implements youth development projects.",
    ],
    officers: [
      { id: "sk-1", name: "Peter Parker", role: "SK Chairperson" },
      { id: "sk-2", name: "Gun Atthaphan", role: "Kagawad" },
    ],
  },
];

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

interface AddOfficerModalProps {
  committee: Committee;
  onClose: () => void;
  onAdd: (officer: Officer) => void;
}

function AddOfficerModal({ committee, onClose, onAdd }: AddOfficerModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !role.trim()) {
      setError("Enter both a name and a role.");
      return;
    }
    onAdd({ id: crypto.randomUUID(), name: name.trim(), role: role.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {committee.abbreviation}
            </p>
            <h2 className="text-base font-semibold text-slate-900">
              Add committee officer
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="Juan Dela Cruz"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800 focus:ring-2 focus:ring-red-800/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Position / role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setError("");
              }}
              placeholder="Chairperson"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-800 focus:ring-2 focus:ring-red-800/20"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-gradient-to-b from-amber-400 to-amber-500 px-4 py-2 text-sm font-semibold text-red-950 shadow-sm hover:from-amber-300 hover:to-amber-400"
          >
            Add officer
          </button>
        </div>
      </div>
    </div>
  );
}

interface CommitteeCardProps {
  committee: Committee;
  onAddOfficer: (committeeId: string) => void;
}

function CommitteeCard({ committee, onAddOfficer }: CommitteeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = committee.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4 p-5">
        <div className={`rounded-xl p-3 ring-1 ${committee.colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              {committee.name}
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">
              {committee.abbreviation}
            </span>
          </div>

          <ul className="mt-2 space-y-1">
            {committee.responsibilities.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-2 text-xs leading-relaxed text-slate-500"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-300" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 text-xs font-medium text-red-800 hover:text-red-900"
            >
              {committee.officers.length} officer
              {committee.officers.length !== 1 ? "s" : ""} assigned
              <ChevronRight
                className={`h-3.5 w-3.5 transition-transform ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </button>

            <button
              onClick={() => onAddOfficer(committee.id)}
              className="flex items-center gap-1 rounded-lg border border-red-800/20 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-800 hover:bg-red-100"
            >
              <Plus className="h-3.5 w-3.5" />
              Add officer
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 px-5 py-4">
          {committee.officers.length === 0 ? (
            <p className="text-xs text-slate-400">
              No officers assigned yet. Add one to get started.
            </p>
          ) : (
            <ul className="space-y-2">
              {committee.officers.map((officer) => (
                <li
                  key={officer.id}
                  className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-900 text-xs font-semibold text-white">
                    {initials(officer.name) || (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {officer.name}
                    </p>
                    <p className="text-xs text-slate-500">{officer.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function BarangayBasedInstitutions() {
  const [committees, setCommittees] = useState<Committee[]>(initialCommittees);
  const [activeCommitteeId, setActiveCommitteeId] = useState<string | null>(
    null
  );

  const totalOfficers = committees.reduce(
    (sum, c) => sum + c.officers.length,
    0
  );

  const activeCommittee = committees.find((c) => c.id === activeCommitteeId);

  const handleAddOfficer = (officer: Officer) => {
    if (!activeCommitteeId) return;
    setCommittees((prev) =>
      prev.map((c) =>
        c.id === activeCommitteeId
          ? { ...c, officers: [...c.officers, officer] }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
          <ArrowLeft className="h-4 w-4" />
          <span>Dashboard</span>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-700">
            Barangay-Based Institutions
          </span>
        </div>

        {/* Header card */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-red-50 p-3 text-red-900 ring-1 ring-red-100">
              <Landmark className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  Barangay-Based Institutions (BBI)
                </h1>
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-200">
                  BBI v2.5
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Committee rosters, mandates, and officer assignments across
                all barangay-based institutions.
              </p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                {committees.length} committees · {totalOfficers} officer
                {totalOfficers !== 1 ? "s" : ""} assigned
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveCommitteeId(committees[0]?.id ?? null)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 px-4 py-2.5 text-sm font-semibold text-red-950 shadow-sm hover:from-amber-300 hover:to-amber-400"
          >
            <Plus className="h-4 w-4" />
            Add Committee Officer
          </button>
        </div>

        {/* Committee grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {committees.map((committee) => (
            <CommitteeCard
              key={committee.id}
              committee={committee}
              onAddOfficer={setActiveCommitteeId}
            />
          ))}
        </div>
      </div>

      {activeCommittee && (
        <AddOfficerModal
          committee={activeCommittee}
          onClose={() => setActiveCommitteeId(null)}
          onAdd={handleAddOfficer}
        />
      )}
    </div>
  );
}