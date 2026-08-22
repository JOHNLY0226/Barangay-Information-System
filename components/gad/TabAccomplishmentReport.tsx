"use client";

import React, { useState, useEffect } from "react";
import { useGad } from "./GadContext";
import { AccomplishmentReport } from "./types";
import {
  FileCheck2,
  Plus,
  Search,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Minus,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  ArrowLeft,
  Trash2,
  FileSpreadsheet,
} from "lucide-react";

export default function TabAccomplishmentReport({
  selectedGpbIdFromTab1,
  onBackToGpb,
  clearSelectedGpbId,
}: {
  selectedGpbIdFromTab1?: string;
  onBackToGpb?: () => void;
  clearSelectedGpbId?: () => void;
}) {
  const { gpbEntries, accomplishmentReports, addAccomplishmentReport, deleteAccomplishmentReport } =
    useGad();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterVariance, setFilterVariance] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [gpbId, setGpbId] = useState("");
  const [actualAccomplishment, setActualAccomplishment] = useState("");
  const [actualCost, setActualCost] = useState<number>(0);
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Filter approved GPB items for the dropdown selector
  const approvedGpbEntries = gpbEntries.filter((e) => e.status === "Approved");

  useEffect(() => {
    if (selectedGpbIdFromTab1) {
      setGpbId(selectedGpbIdFromTab1);
      const matchedGpb = approvedGpbEntries.find((e) => e.id === selectedGpbIdFromTab1);
      if (matchedGpb) {
        setActualCost(matchedGpb.budget);
      }
      setIsModalOpen(true);
    } else if (approvedGpbEntries.length > 0 && !gpbId) {
      setGpbId(approvedGpbEntries[0].id);
      setActualCost(approvedGpbEntries[0].budget);
    }
  }, [selectedGpbIdFromTab1, approvedGpbEntries]);

  // When modal is closed/cancelled
  const handleCloseModal = () => {
    setIsModalOpen(false);
    const wasTriggeredFromTab1 = !!selectedGpbIdFromTab1;
    clearSelectedGpbId?.();

    // If opened from Form 1 via "Log AR" button, canceling returns the user back to Form 1
    if (wasTriggeredFromTab1 && onBackToGpb) {
      onBackToGpb();
    }
  };

  const handleGpbSelectChange = (selectedId: string) => {
    setGpbId(selectedId);
    const matched = approvedGpbEntries.find((e) => e.id === selectedId);
    if (matched) {
      setActualCost(matched.budget);
    }
  };

  const handleOpenModal = () => {
    if (approvedGpbEntries.length > 0) {
      setGpbId(approvedGpbEntries[0].id);
      setActualCost(approvedGpbEntries[0].budget);
    }
    setActualAccomplishment("");
    setRemarks("");
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!gpbId) newErrors.gpbId = "You must select an Approved GPB item";
    if (!actualAccomplishment.trim())
      newErrors.actualAccomplishment = "Actual Accomplishment / Output is required";
    if (actualCost < 0) newErrors.actualCost = "Actual Cost must be >= 0";
    if (!remarks.trim()) newErrors.remarks = "Remarks / Variance explanation is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedGpb = approvedGpbEntries.find((e) => e.id === gpbId);
    if (!selectedGpb) return;

    addAccomplishmentReport({
      gpbId: selectedGpb.id,
      gpbCode: selectedGpb.gpbCode,
      proposedActivity: selectedGpb.proposedActivity,
      plannedTarget: selectedGpb.targetOutput,
      plannedBudget: selectedGpb.budget,
      actualAccomplishment,
      actualCost,
      remarks,
    });

    // Close modal and clear selection, but stay on Form 2 to view new report
    setIsModalOpen(false);
    clearSelectedGpbId?.();
  };

  // Filter Accomplishment Reports
  const filteredReports = accomplishmentReports.filter((rep) => {
    const matchesSearch =
      rep.arCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.gpbCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.proposedActivity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.actualAccomplishment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVariance =
      filterVariance === "All" ||
      (filterVariance === "Underutilized" && rep.variance > 0) ||
      (filterVariance === "Overutilized" && rep.variance < 0) ||
      (filterVariance === "Exact" && rep.variance === 0);

    return matchesSearch && matchesVariance;
  });

  // Calculate Aggregates
  const totalPlannedBudget = filteredReports.reduce((acc, curr) => acc + curr.plannedBudget, 0);
  const totalActualCost = filteredReports.reduce((acc, curr) => acc + curr.actualCost, 0);
  const totalNetVariance = totalPlannedBudget - totalActualCost;

  const getVarianceBadge = (variance: number) => {
    if (variance > 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <TrendingDown className="h-3.5 w-3.5 text-emerald-600" /> +₱{variance.toLocaleString()}{" "}
          (Savings)
        </span>
      );
    } else if (variance < 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-[#580011] border border-rose-200">
          <TrendingUp className="h-3.5 w-3.5 text-rose-600" /> -₱{Math.abs(variance).toLocaleString()}{" "}
          (Overbudget)
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
          <Minus className="h-3.5 w-3.5 text-slate-500" /> ₱0 (Exact)
        </span>
      );
    }
  };

  const currentSelectedGpbObj = approvedGpbEntries.find((e) => e.id === gpbId);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              BGADPBMS MODULE 2
            </span>
            <span>GAD Accomplishment Report (AR)</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            GAD Accomplishment & Variance Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare planned target outputs & budget allocations against actual expenditures and execution outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onBackToGpb && (
            <button
              onClick={onBackToGpb}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 text-slate-600" /> Back to GPB Plan
            </button>
          )}

          <button
            onClick={handleOpenModal}
            disabled={approvedGpbEntries.length === 0}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              approvedGpbEntries.length > 0
                ? "bg-[#580011] hover:bg-[#3D000C] text-white shadow-xs hover:shadow active:scale-95"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            title={
              approvedGpbEntries.length === 0
                ? "No Approved GPB items in Tab 1 to report on"
                : "Log new accomplishment"
            }
          >
            <Plus className="h-4 w-4 text-[#E5A623]" /> Log Accomplishment Report
          </button>
        </div>
      </div>

      {/* Financial Comparison Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Planned Budget</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₱{totalPlannedBudget.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-500">Across Reported Activities</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#580011]">Total Actual Cost</span>
          <div className="text-2xl font-black text-[#580011] mt-1">
            ₱{totalActualCost.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-500">Actual Funds Spent</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Net Budget Variance</span>
          <div
            className={`text-2xl font-black mt-1 ${
              totalNetVariance >= 0 ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {totalNetVariance >= 0 ? "+" : "-"}₱
            {Math.abs(totalNetVariance).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-slate-500">
            {totalNetVariance >= 0 ? "Cumulative Savings" : "Cumulative Deficit"}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AR code, GPB reference, activity, or accomplishment details..."
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

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-600 text-xs">Variance Filter:</span>
          <select
            value={filterVariance}
            onChange={(e) => setFilterVariance(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-[#580011]"
          >
            <option value="All">All Variances</option>
            <option value="Underutilized">Savings (Underutilized)</option>
            <option value="Overutilized">Overbudget (Overutilized)</option>
            <option value="Exact">Exact Budget (0 Variance)</option>
          </select>
        </div>
      </div>

      {/* Comparative Data Table (Planned vs. Actual) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#580011] text-white font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">AR Code</th>
                <th className="py-3.5 px-4">GPB Reference</th>
                <th className="py-3.5 px-4">Planned Target & Budget</th>
                <th className="py-3.5 px-4">Actual Output & Cost</th>
                <th className="py-3.5 px-4">Variance & Remarks</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 bg-slate-50/50">
                    <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-semibold text-slate-600">No Accomplishment Reports Logged</p>
                    <p className="text-[11px] text-slate-400">
                      Select an approved GPB item from Tab 1 to log actual execution metrics.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredReports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#580011] whitespace-nowrap">
                      {rep.arCode}
                      <span className="block text-[9px] text-slate-400 font-normal">
                        {rep.dateReported}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      <span className="bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
                        {rep.gpbCode}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-xs">{rep.proposedActivity}</div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        <strong className="text-slate-800">Target:</strong> {rep.plannedTarget}
                      </p>
                      <div className="text-[11px] font-mono text-slate-500 mt-1">
                        Budget: ₱{rep.plannedBudget.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-emerald-900 text-xs bg-emerald-50/70 p-2 rounded border border-emerald-200">
                        {rep.actualAccomplishment}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-[#580011] mt-1">
                        Actual Spent: ₱{rep.actualCost.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="mb-1">{getVarianceBadge(rep.variance)}</div>
                      <p className="text-[11px] text-slate-500 italic line-clamp-2">
                        &quot;{rep.remarks}&quot;
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => deleteAccomplishmentReport(rep.id)}
                        className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete report"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot className="bg-slate-100 border-t-2 border-slate-300 font-bold text-slate-900 text-xs">
              <tr>
                <td colSpan={2} className="py-3.5 px-4 uppercase tracking-wider text-slate-700">
                  Totals Across Logged Reports:
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-900">
                  Planned: ₱{totalPlannedBudget.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3.5 px-4 font-mono text-[#580011]">
                  Actual: ₱{totalActualCost.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </td>
                <td colSpan={2} className="py-3.5 px-4 font-mono text-emerald-800">
                  Net Savings: ₱{totalNetVariance.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Log Accomplishment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-[#580011] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#E5A623] text-slate-950 rounded-lg">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight">Log GAD Accomplishment Report</h3>
                  <p className="text-xs text-rose-200">Form E2 / BGADPBMS Execution Audit Form</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-rose-200 hover:text-white p-1 rounded-lg hover:bg-[#7A0018] transition-colors"
                title="Cancel & Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Select Approved GPB Item (Tab 1 Reference) *
                </label>
                <select
                  value={gpbId}
                  onChange={(e) => handleGpbSelectChange(e.target.value)}
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-bold text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.gpbId
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011]"
                  }`}
                >
                  {approvedGpbEntries.length === 0 ? (
                    <option value="" disabled>
                      -- No Approved GPB Items Found --
                    </option>
                  ) : (
                    approvedGpbEntries.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.gpbCode} - {e.proposedActivity} (Budget: ₱{e.budget.toLocaleString()})
                      </option>
                    ))
                  )}
                </select>
                {errors.gpbId && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.gpbId}</p>
                )}

                {/* Info preview card for selected GPB */}
                {currentSelectedGpbObj && (
                  <div className="mt-2 p-3 bg-rose-50/60 border border-rose-200 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-[#580011] flex items-center justify-between">
                      <span>Planned Target: {currentSelectedGpbObj.targetOutput}</span>
                      <span className="font-mono text-xs">
                        Allocated Budget: ₱{currentSelectedGpbObj.budget.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <strong>Gender Issue:</strong> {currentSelectedGpbObj.genderIssue}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Actual Accomplishment / Physical Output *
                </label>
                <textarea
                  rows={3}
                  value={actualAccomplishment}
                  onChange={(e) => setActualAccomplishment(e.target.value)}
                  placeholder="Describe actual outputs, certified participants, workshops completed..."
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.actualAccomplishment
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.actualAccomplishment && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">
                    {errors.actualAccomplishment}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Actual Cost / Expenditure (PHP) *
                </label>
                <input
                  type="number"
                  step="100"
                  min="0"
                  value={actualCost}
                  onChange={(e) => setActualCost(parseFloat(e.target.value) || 0)}
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg font-bold font-mono focus:outline-none focus:ring-2 ${
                    errors.actualCost
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011]"
                  }`}
                />
                {errors.actualCost && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.actualCost}</p>
                )}
              </div>

              {/* Dynamic Real-time Variance Calculation */}
              {currentSelectedGpbObj && (
                <div className="p-3 bg-[#580011] text-white rounded-xl flex items-center justify-between shadow-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-200 block">
                      Auto-Calculated Variance (Planned Budget - Actual Cost)
                    </span>
                    <span className="text-xs text-slate-300 font-mono">
                      ₱{currentSelectedGpbObj.budget.toLocaleString()} - ₱
                      {actualCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-lg font-black font-mono">
                    {currentSelectedGpbObj.budget - actualCost >= 0 ? (
                      <span className="text-[#E5A623]">
                        +₱{(currentSelectedGpbObj.budget - actualCost).toLocaleString()} (Savings)
                      </span>
                    ) : (
                      <span className="text-rose-300">
                        -₱{Math.abs(currentSelectedGpbObj.budget - actualCost).toLocaleString()}{" "}
                        (Deficit)
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Remarks / Variance Explanation *
                </label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Explain why budget was underutilized (savings) or overutilized..."
                  className={`w-full text-xs p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.remarks
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-300 focus:ring-[#580011] focus:bg-white"
                  }`}
                />
                {errors.remarks && (
                  <p className="text-[11px] text-rose-600 mt-0.5 font-medium">{errors.remarks}</p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                >
                  <X className="h-3.5 w-3.5" /> Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#580011] hover:bg-[#3D000C] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4 text-[#E5A623]" /> Submit Accomplishment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
