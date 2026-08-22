"use client";

import React, { useState } from "react";
import { useGad } from "./GadContext";
import { GpbStatus, GpbEntry } from "./types";
import {
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  FileCheck,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  DollarSign,
  Trash2,
  Tag,
  Target,
  AlertCircle,
  HelpCircle,
  Building,
} from "lucide-react";

export default function TabGpbForm({
  onSelectApprovedGpbForAr,
}: {
  onSelectApprovedGpbForAr?: (gpbId: string) => void;
}) {
  const { gpbEntries, addGpbEntry, updateGpbStatus, deleteGpbEntry } = useGad();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [year, setYear] = useState<number>(2026);
  const [genderIssue, setGenderIssue] = useState("");
  const [causeOfIssue, setCauseOfIssue] = useState("");
  const [gadObjective, setGadObjective] = useState("");
  const [relevantLguProgram, setRelevantLguProgram] = useState("");
  const [proposedActivity, setProposedActivity] = useState("");
  const [targetOutput, setTargetOutput] = useState("");
  const [budget, setBudget] = useState<number>(250000);
  const [status, setStatus] = useState<GpbStatus>("Draft");
  const [category, setCategory] = useState<"Client-Focused" | "Organization-Focused">(
    "Client-Focused"
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleOpenModal = () => {
    setYear(2026);
    setGenderIssue("");
    setCauseOfIssue("");
    setGadObjective("");
    setRelevantLguProgram("Quezon City Gender Responsive Governance & Livelihood Program");
    setProposedActivity("");
    setTargetOutput("");
    setBudget(250000);
    setStatus("Draft");
    setCategory("Client-Focused");
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!genderIssue.trim()) newErrors.genderIssue = "Gender Issue / Mandate is required";
    if (!causeOfIssue.trim()) newErrors.causeOfIssue = "Cause of Issue is required";
    if (!gadObjective.trim()) newErrors.gadObjective = "GAD Objective is required";
    if (!relevantLguProgram.trim()) newErrors.relevantLguProgram = "Relevant LGU Program is required";
    if (!proposedActivity.trim()) newErrors.proposedActivity = "Proposed GAD Activity is required";
    if (!targetOutput.trim()) newErrors.targetOutput = "Performance Indicator / Target Output is required";
    if (!budget || budget <= 0) newErrors.budget = "GAD Budget must be > 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addGpbEntry({
      year,
      genderIssue,
      causeOfIssue,
      gadObjective,
      relevantLguProgram,
      proposedActivity,
      targetOutput,
      budget,
      status,
      category,
    });

    setIsModalOpen(false);
  };

  // Filter GPB entries
  const filteredEntries = gpbEntries.filter((entry) => {
    const matchesSearch =
      entry.gpbCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.genderIssue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.proposedActivity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.relevantLguProgram.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear = entry.year === selectedYear;
    const matchesStatus = selectedStatus === "All" || entry.status === selectedStatus;

    return matchesSearch && matchesYear && matchesStatus;
  });

  // Calculate Total Allocated Budget for displayed year
  const totalYearBudget = filteredEntries.reduce((acc, curr) => acc + curr.budget, 0);
  const totalApprovedBudget = filteredEntries
    .filter((e) => e.status === "Approved")
    .reduce((acc, curr) => acc + curr.budget, 0);

  const getStatusBadge = (st: GpbStatus) => {
    switch (st) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Approved
          </span>
        );
      case "Endorsed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
            <FileCheck className="h-3.5 w-3.5 text-amber-600" /> Endorsed
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <Clock className="h-3.5 w-3.5 text-slate-500" /> Draft
          </span>
        );
    }
  };

  const toggleRowExpansion = (id: string) => {
    setExpandedRowId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              BGADPBMS MODULE 1
            </span>
            <span>Gender Plan & Budget Form (GPB)</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            GAD Plan and Budget (GPB) Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Formulate gender issues, GAD mandates, target indicators, and annual budget appropriations (PCW/DILG Compliant).
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="h-4 w-4 text-[#E5A623]" /> Add GPB Entry
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total GPB Activities</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{filteredEntries.length}</div>
          <span className="text-[11px] text-slate-500">Planned for {selectedYear}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Approved Budget</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            ₱{totalApprovedBudget.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500">Formally Approved</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Total Allocated Budget</span>
          <div className="text-2xl font-black text-[#580011] mt-1">
            ₱{totalYearBudget.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500">All Statuses ({selectedYear})</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Client vs Org</span>
          <div className="text-xl font-extrabold text-purple-900 mt-1 flex items-baseline gap-1">
            <span>{filteredEntries.filter((e) => e.category === "Client-Focused").length} Client</span>
            <span className="text-xs text-slate-400">/</span>
            <span>{filteredEntries.filter((e) => e.category === "Organization-Focused").length} Org</span>
          </div>
          <span className="text-[11px] text-slate-500">GAD Focus Category</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gender issue, proposed activity, GPB code, LGU program..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#580011] focus:bg-white text-slate-800 placeholder-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600 text-[11px]">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="bg-transparent text-xs text-slate-800 font-bold focus:outline-none cursor-pointer"
            >
              <option value={2026}>FY 2026</option>
              <option value={2025}>FY 2025</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 text-xs">
            <span className="font-semibold text-slate-600 text-[11px]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Endorsed">Endorsed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* GPB Comprehensive Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 w-10">#</th>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Gender Issue / Mandate & Activity</th>
                <th className="py-3.5 px-4">Target Output & Program</th>
                <th className="py-3.5 px-4 text-right">GAD Budget (PHP)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 bg-slate-50/50">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold text-slate-600">No GPB Plan Entries Found</p>
                    <p className="text-[11px] text-slate-400">Click &quot;Add GPB Entry&quot; to create a GAD activity plan.</p>
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => {
                  const isExpanded = expandedRowId === entry.id;

                  return (
                    <React.Fragment key={entry.id}>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleRowExpansion(entry.id)}
                            className="p-1 rounded text-slate-400 hover:text-[#580011] hover:bg-slate-200 transition-colors"
                            title="Expand full GAD details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-[#580011]" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#580011] whitespace-nowrap">
                          {entry.gpbCode}
                          <span className="block text-[9px] text-slate-400 font-normal">
                            {entry.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-xs">
                            {entry.proposedActivity}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            <span className="font-semibold text-slate-700">Issue:</span> {entry.genderIssue}
                          </p>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-800 text-[11px] font-medium line-clamp-1">
                            {entry.targetOutput}
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">
                            {entry.relevantLguProgram}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-black text-[#580011] whitespace-nowrap">
                          ₱{entry.budget.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(entry.status)}
                            <select
                              value={entry.status}
                              onChange={(e) =>
                                updateGpbStatus(entry.id, e.target.value as GpbStatus)
                              }
                              className="text-[10px] bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5 font-medium text-slate-600 focus:outline-none cursor-pointer"
                              title="Update approval status"
                            >
                              <option value="Draft">Draft</option>
                              <option value="Endorsed">Endorsed</option>
                              <option value="Approved">Approved</option>
                            </select>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {onSelectApprovedGpbForAr && entry.status === "Approved" && (
                              <button
                                onClick={() => onSelectApprovedGpbForAr(entry.id)}
                                className="px-2 py-1 rounded bg-[#580011] text-[#E5A623] hover:bg-[#3D000C] transition-colors font-bold text-[10px] border border-[#7A0018] cursor-pointer"
                                title="Report Accomplishment in AR tab"
                              >
                                Log AR
                              </button>
                            )}
                            <button
                              onClick={() => deleteGpbEntry(entry.id)}
                              className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Row Details */}
                      {isExpanded && (
                        <tr className="bg-rose-50/40 border-b border-rose-100">
                          <td colSpan={7} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-rose-200 text-xs">
                              <div className="space-y-2">
                                <div>
                                  <span className="font-bold text-[#580011] uppercase tracking-wider text-[10px] block">
                                    Gender Issue / GAD Mandate:
                                  </span>
                                  <p className="text-slate-800 leading-relaxed">{entry.genderIssue}</p>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] block">
                                    Root Cause of Issue:
                                  </span>
                                  <p className="text-slate-700 leading-relaxed">{entry.causeOfIssue}</p>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] block">
                                    GAD Objective:
                                  </span>
                                  <p className="text-slate-700 leading-relaxed">{entry.gadObjective}</p>
                                </div>
                              </div>

                              <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-4">
                                <div>
                                  <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] block">
                                    Relevant LGU / QC Program Alignment:
                                  </span>
                                  <p className="text-slate-800 font-medium">{entry.relevantLguProgram}</p>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] block">
                                    Proposed GAD Activity Details:
                                  </span>
                                  <p className="text-slate-800 font-medium">{entry.proposedActivity}</p>
                                </div>
                                <div>
                                  <span className="font-bold text-slate-600 uppercase tracking-wider text-[10px] block">
                                    Performance Indicator / Target Output:
                                  </span>
                                  <p className="text-emerald-800 font-semibold">{entry.targetOutput}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>

            {/* Total Budget Summary Footer */}
            <tfoot className="bg-slate-100 border-t-2 border-slate-300 font-bold text-slate-900 text-xs">
              <tr>
                <td colSpan={4} className="py-3.5 px-4 text-right uppercase tracking-wider text-slate-700">
                  Total Allocated GAD Budget ({selectedYear}):
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-base font-black text-[#580011]">
                  ₱{totalYearBudget.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </td>
                <td colSpan={2} className="py-3.5 px-4 text-xs text-slate-500 font-normal">
                  (Approved: <span className="font-bold text-emerald-700">₱{totalApprovedBudget.toLocaleString()}</span>)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Add GPB Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#580011] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#E5A623] text-slate-950 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Add GAD Plan and Budget (GPB) Entry</h3>
                  <p className="text-xs text-rose-200">Form E1 / BGADPBMS Annual GAD Planning Form</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-rose-200 hover:text-white p-1 rounded-lg hover:bg-[#7A0018] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Plan Year *
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  >
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    GAD Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as "Client-Focused" | "Organization-Focused")
                    }
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  >
                    <option value="Client-Focused">Client-Focused (Community/Women)</option>
                    <option value="Organization-Focused">Organization-Focused (Barangay Staff)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Approval Status *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as GpbStatus)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#580011]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Endorsed">Endorsed</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Gender Issue / GAD Mandate *
                </label>
                <textarea
                  rows={2}
                  value={genderIssue}
                  onChange={(e) => setGenderIssue(e.target.value)}
                  placeholder="State gender disparity, vulnerability, or PCW/LGU policy mandate..."
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.genderIssue
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.genderIssue && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.genderIssue}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Cause of Issue *
                  </label>
                  <textarea
                    rows={2}
                    value={causeOfIssue}
                    onChange={(e) => setCauseOfIssue(e.target.value)}
                    placeholder="Root causes behind the gender issue..."
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.causeOfIssue
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.causeOfIssue && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.causeOfIssue}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    GAD Objective *
                  </label>
                  <textarea
                    rows={2}
                    value={gadObjective}
                    onChange={(e) => setGadObjective(e.target.value)}
                    placeholder="Measurable objective to address the issue..."
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.gadObjective
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.gadObjective && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.gadObjective}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Relevant LGU / QC Program *
                </label>
                <input
                  type="text"
                  value={relevantLguProgram}
                  onChange={(e) => setRelevantLguProgram(e.target.value)}
                  placeholder="e.g. Quezon City Small Business & Livelihood Program"
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.relevantLguProgram
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.relevantLguProgram && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">
                    {errors.relevantLguProgram}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Proposed GAD Activity *
                </label>
                <input
                  type="text"
                  value={proposedActivity}
                  onChange={(e) => setProposedActivity(e.target.value)}
                  placeholder="e.g. Women Enterprise & Craftsmanship Workshop"
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.proposedActivity
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.proposedActivity && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.proposedActivity}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Performance Indicator / Target Output *
                  </label>
                  <input
                    type="text"
                    value={targetOutput}
                    onChange={(e) => setTargetOutput(e.target.value)}
                    placeholder="e.g. 150 women trained; 3 cooperatives established"
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.targetOutput
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                    }`}
                  />
                  {errors.targetOutput && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.targetOutput}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Proposed GAD Budget (PHP) *
                  </label>
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                    className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-bold font-mono focus:outline-none focus:ring-2 ${
                      errors.budget
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-slate-300 focus:ring-[#580011]"
                    }`}
                  />
                  {errors.budget && (
                    <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.budget}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4 text-[#E5A623]" /> Save GPB Plan Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
