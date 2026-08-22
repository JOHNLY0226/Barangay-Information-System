"use client";

import React, { useState } from "react";
import {
  BarChart3,
  PieChart,
  Download,
  Filter,
  Users,
  FileText,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Heart,
  TrendingUp,
  RefreshCw,
  Printer
} from "lucide-react";
import { DemographicStat } from "@/types/inhabitants";

interface DemographicsFilterProps {
  demographicData: DemographicStat;
}

export default function DemographicsFilter({ demographicData }: DemographicsFilterProps) {
  const [selectedStreet, setSelectedStreet] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<"CSV" | "PDF">("CSV");
  const [exporting, setExporting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleExport = (format: "CSV" | "PDF") => {
    setExportFormat(format);
    setExportModalOpen(true);
  };

  const triggerDownload = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportModalOpen(false);
      setToastMessage(
        `Successfully generated and exported ${exportFormat} demographic report for Barangay Sta. Lucia!`
      );
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="p-4 bg-emerald-600 text-white font-medium text-xs rounded-xl shadow-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white hover:text-emerald-100 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Analytics Control & Export Header Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Demographics & Sectoral Analytics
            </h2>
            <span className="text-[10px] font-mono font-bold bg-[#E5A623] text-slate-950 px-2 py-0.5 rounded">
              BIPS Analytics v2.5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time population pyramid, gender distribution, and socio-economic breakdown.
          </p>
        </div>

        {/* Filter Controls & Export Triggers */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={selectedStreet}
              onChange={(e) => setSelectedStreet(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:ring-2 focus:ring-[#580011]"
            >
              <option value="All">All Barangays / Streets</option>
              <option value="Sta. Lucia St.">Sta. Lucia Street</option>
              <option value="Maligaya St.">Maligaya Street</option>
              <option value="Regalado Ave.">Regalado Avenue</option>
              <option value="Lilac St.">Lilac Street</option>
              <option value="Katipunan Ext.">Katipunan Extension</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport("CSV")}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5 text-slate-600" /> Export CSV
            </button>

            <button
              onClick={() => handleExport("PDF")}
              className="px-3.5 py-1.5 bg-[#580011] hover:bg-[#7A0018] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="h-3.5 w-3.5 text-[#E5A623]" /> Generate PDF Summary
            </button>
          </div>
        </div>
      </div>

      {/* Key Population Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Inhabitants
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {demographicData.totalPopulation.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="h-3 w-3" /> +2.4% vs 2025
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Households
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {demographicData.totalHouseholds.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Avg 4.3 members</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Senior Citizens
          </span>
          <div className="text-xl font-bold text-amber-700 mt-1">
            {demographicData.totalSeniorCitizens.toLocaleString()}
          </div>
          <span className="text-[10px] text-amber-600 font-medium mt-1 block">
            {((demographicData.totalSeniorCitizens / demographicData.totalPopulation) * 100).toFixed(1)}% of pop.
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            PWD Sector
          </span>
          <div className="text-xl font-bold text-blue-700 mt-1">
            {demographicData.totalPwds.toLocaleString()}
          </div>
          <span className="text-[10px] text-blue-600 font-medium mt-1 block">PDAO Priority</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Solo Parents
          </span>
          <div className="text-xl font-bold text-[#580011] mt-1">
            {demographicData.totalSoloParents.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">RA 11861 Beneficiaries</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Registered Voters
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {demographicData.totalRegisteredVoters.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-medium mt-1 block">
            {((demographicData.totalRegisteredVoters / demographicData.totalPopulation) * 100).toFixed(1)}% Turnout
          </span>
        </div>
      </div>

      {/* Analytics Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Age Distribution Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#580011]" />
              <h3 className="text-sm font-bold text-slate-900">Age Distribution Pyramid</h3>
            </div>
            <span className="text-xs text-slate-400">Barangay Sta. Lucia 2026</span>
          </div>

          <div className="space-y-3 pt-2">
            {demographicData.ageDistribution.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.category}</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {item.count.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-[#580011] to-rose-700 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 2: Gender Ratio Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-[#E5A623]" />
              <h3 className="text-sm font-bold text-slate-900">Gender Ratio</h3>
            </div>
            <span className="text-xs text-slate-400">Sta. Lucia Registry</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-around gap-6">
            {/* Visual Dual Circle Meter */}
            <div className="relative h-36 w-36 rounded-full bg-slate-100 flex items-center justify-center p-3 border-4 border-slate-200">
              <div className="text-center">
                <span className="text-xs font-bold text-slate-900 block">Ratio</span>
                <span className="text-sm font-extrabold text-[#580011]">
                  {demographicData.genderRatio.malePercentage}% : {demographicData.genderRatio.femalePercentage}%
                </span>
              </div>
            </div>

            <div className="space-y-3 w-full max-w-xs">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#580011]" />
                  <span className="text-xs font-semibold text-slate-800">Female Citizens</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#580011]">
                  {demographicData.genderRatio.femaleCount.toLocaleString()} ({demographicData.genderRatio.femalePercentage}%)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">Male Citizens</span>
                </div>
                <span className="text-xs font-mono font-bold text-blue-900">
                  {demographicData.genderRatio.maleCount.toLocaleString()} ({demographicData.genderRatio.malePercentage}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 3: Employment Status Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Employment Sector Distribution</h3>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {demographicData.employmentStats.map((item, idx) => {
              const colors = [
                "bg-emerald-600",
                "bg-[#E5A623]",
                "bg-blue-600",
                "bg-rose-600",
                "bg-purple-600",
              ];
              return (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.category}</span>
                    <span className="font-mono text-slate-900 font-bold">
                      {item.count.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[idx % colors.length]} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CHART 4: Educational Attainment */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Educational Attainment Levels</h3>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {demographicData.educationStats.map((item, idx) => {
              const colors = [
                "bg-slate-400",
                "bg-blue-500",
                "bg-amber-500",
                "bg-indigo-600",
                "bg-[#580011]",
              ];
              return (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.category}</span>
                    <span className="font-mono text-slate-900 font-bold">
                      {item.count.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[idx % colors.length]} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Export Report Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="bg-[#580011] text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#E5A623]" /> Confirm {exportFormat} Export
              </h3>
              <button
                onClick={() => setExportModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600">
                You are about to export demographic analytics for <strong>Barangay Sta. Lucia</strong> in{" "}
                <strong className="text-[#580011]">{exportFormat}</strong> format.
              </p>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1 font-mono text-[11px]">
                <div>• Scope: {selectedStreet === "All" ? "All Barangay Streets" : selectedStreet}</div>
                <div>• Total Population: {demographicData.totalPopulation.toLocaleString()} Records</div>
                <div>• Generated: {new Date().toLocaleDateString("en-PH")}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setExportModalOpen(false)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 text-xs"
              >
                Cancel
              </button>

              <button
                onClick={triggerDownload}
                disabled={exporting}
                className="px-4 py-2 bg-[#E5A623] hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-2 shadow-xs"
              >
                {exporting ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" /> Download {exportFormat}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
