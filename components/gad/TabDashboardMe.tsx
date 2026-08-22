"use client";

import React from "react";
import { useGad } from "./GadContext";
import {
  Users,
  UserCheck,
  ShieldAlert,
  Heart,
  TrendingUp,
  BarChart3,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Award,
  Activity,
  Percent,
  Landmark,
  Scale,
  Sparkles,
} from "lucide-react";

export default function TabDashboardMe() {
  const { gpbEntries, accomplishmentReports, metrics } = useGad();

  // Financial Calculations for GAD Utilization Gauge
  const approvedGpb = gpbEntries.filter((e) => e.status === "Approved");
  const totalPlannedGpbBudget = approvedGpb.reduce((acc, curr) => acc + curr.budget, 0);
  const totalActualExpenditure = accomplishmentReports.reduce((acc, curr) => acc + curr.actualCost, 0);

  const budgetUtilizationRate =
    totalPlannedGpbBudget > 0
      ? Math.min(100, Math.round((totalActualExpenditure / totalPlannedGpbBudget) * 100))
      : 0;

  // Completion Rate
  const totalApprovedActivities = approvedGpb.length;
  const completedActivitiesCount = accomplishmentReports.length;
  const activityCompletionRate =
    totalApprovedActivities > 0
      ? Math.min(100, Math.round((completedActivitiesCount / totalApprovedActivities) * 100))
      : 0;

  // Demographic Calculations
  const totalPopulation = metrics.totalFemalePopulation + metrics.totalMalePopulation;
  const femalePercentage = ((metrics.totalFemalePopulation / totalPopulation) * 100).toFixed(1);
  const malePercentage = ((metrics.totalMalePopulation / totalPopulation) * 100).toFixed(1);
  const femaleHeadedPercentage = (
    (metrics.femaleHeadedHouseholds / metrics.totalHouseholds) *
    100
  ).toFixed(1);

  // VAWC Resolution Rate
  const vawcResolutionRate =
    metrics.vawcCasesReported > 0
      ? Math.round((metrics.vawcCasesResolved / metrics.vawcCasesReported) * 100)
      : 100;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span className="font-bold text-[#580011] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              BGADPBMS MODULE 3
            </span>
            <span>Sex-Disaggregated Data & M&E Analytics</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Sex-Disaggregated Data & GAD M&E Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time demographic statistics, GAD budget utilization rate, VAWC case metrics, and PCW/DILG audit compliance.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs font-bold shrink-0">
          <Award className="h-4 w-4 text-emerald-600" />
          <span>DILG 5% GAD Allocation: Compliant</span>
        </div>
      </div>

      {/* PROGRESS BAR GAUGES SECTION (Key User Requirement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gauge 1: Overall GAD Budget Utilization Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-[#580011]" /> GAD Budget Utilization Rate
            </span>
            <span className="text-lg font-black font-mono text-[#580011]">
              {budgetUtilizationRate}%
            </span>
          </div>

          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-gradient-to-r from-[#580011] via-[#8B001E] to-[#E5A623] h-full rounded-full transition-all duration-500"
              style={{ width: `${budgetUtilizationRate}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>Spent: ₱{totalActualExpenditure.toLocaleString()}</span>
            <span>Budget: ₱{totalPlannedGpbBudget.toLocaleString()}</span>
          </div>
        </div>

        {/* Gauge 2: Mandatory 5% Barangay Budget Allocation */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Landmark className="h-4 w-4 text-amber-600" /> 5% Minimum Allocation Rule
            </span>
            <span className="text-lg font-black font-mono text-emerald-700">
              5.8% (Passed)
            </span>
          </div>

          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `100%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>Req Min: ₱1,200,000</span>
            <span className="font-bold text-emerald-700">Allocated: ₱1,350,000</span>
          </div>
        </div>

        {/* Gauge 3: GPB Activity Completion Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-purple-600" /> Activity Execution Rate
            </span>
            <span className="text-lg font-black font-mono text-purple-900">
              {activityCompletionRate}%
            </span>
          </div>

          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-purple-700 h-full rounded-full transition-all duration-500"
              style={{ width: `${activityCompletionRate}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>Completed: {completedActivitiesCount} ARs</span>
            <span>Total Approved: {totalApprovedActivities} GPBs</span>
          </div>
        </div>
      </div>

      {/* STATISTICAL DEMOGRAPHIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Female vs Male Demographics Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Barangay Population
            </span>
            <div className="p-1.5 rounded bg-rose-50 text-rose-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {totalPopulation.toLocaleString()}
          </div>
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-rose-700">Female: {metrics.totalFemalePopulation.toLocaleString()} ({femalePercentage}%)</span>
              <span className="text-blue-700">Male: {metrics.totalMalePopulation.toLocaleString()} ({malePercentage}%)</span>
            </div>
            <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden flex">
              <div className="bg-rose-500 h-full" style={{ width: `${femalePercentage}%` }} />
              <div className="bg-blue-600 h-full" style={{ width: `${malePercentage}%` }} />
            </div>
          </div>
        </div>

        {/* Female-Headed Households */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Female-Headed Households
            </span>
            <div className="p-1.5 rounded bg-amber-50 text-amber-600">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {metrics.femaleHeadedHouseholds.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">
            Representing <strong className="text-slate-800">{femaleHeadedPercentage}%</strong> of all {metrics.totalHouseholds.toLocaleString()} barangay households.
          </p>
        </div>

        {/* VAWC Cases Desk Intake */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              VAWC Desk Cases (2026)
            </span>
            <div className="p-1.5 rounded bg-rose-50 text-[#580011]">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#580011]">
            {metrics.vawcCasesReported} <span className="text-xs text-slate-500 font-normal">Cases</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-bold">
              {metrics.vawcCasesResolved} Resolved ({vawcResolutionRate}%)
            </span>
            <span className="text-amber-700 font-bold">
              {metrics.vawcCasesReported - metrics.vawcCasesResolved} Active
            </span>
          </div>
        </div>

        {/* Maternal & Vulnerable Sector */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Maternal & Elderly Sector
            </span>
            <div className="p-1.5 rounded bg-purple-50 text-purple-600">
              <Heart className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {metrics.pregnantLactatingMothers + metrics.femaleSeniorPwdCount}
          </div>
          <p className="text-[11px] text-slate-500">
            {metrics.pregnantLactatingMothers} Mothers • {metrics.femaleSeniorPwdCount} Female Seniors & PWDs
          </p>
        </div>
      </div>

      {/* DETAILED M&E COMPLIANCE & CATEGORY BREAKDOWN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Allocation Pie/Bar Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <PieChart className="h-4 w-4 text-[#580011]" /> GAD Budget Category Distribution
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">Client-Focused Programs (Community Livelihood/Health)</span>
                <span className="text-[#580011] font-mono">
                  ₱
                  {gpbEntries
                    .filter((e) => e.category === "Client-Focused")
                    .reduce((a, c) => a + c.budget, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#580011] h-full rounded-full" style={{ width: "65%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">Organization-Focused (Staff Capacitation & VAWC Room)</span>
                <span className="text-rose-700 font-mono">
                  ₱
                  {gpbEntries
                    .filter((e) => e.category === "Organization-Focused")
                    .reduce((a, c) => a + c.budget, 0)
                    .toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: "35%" }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">PCW/DILG Audit Rule:</strong> At least 60% of GAD budgets must prioritize Client-Focused programs directly benefiting women and solo mothers in the community.
          </div>
        </div>

        {/* VAWC & Gender Rights Intake Summary Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldAlert className="h-4 w-4 text-[#580011]" /> Barangay VAWC Desk Intake & Protection Orders
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200">
              <span className="text-[10px] font-bold uppercase text-rose-800 block">BPO Issued (Barangay Protection Order)</span>
              <span className="text-xl font-black text-[#580011] mt-0.5 block">8 Issued</span>
              <span className="text-[10px] text-slate-500">100% within 24-hr mandate</span>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-[10px] font-bold uppercase text-amber-900 block">Confidential Counseling</span>
              <span className="text-xl font-black text-amber-800 mt-0.5 block">14 Clients</span>
              <span className="text-[10px] text-slate-500">Assisted at VAWC Suite</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>24/7 VAWC Hotline: <strong className="text-slate-800 font-mono">(02) 8888-VAWC</strong></span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> ISO Certified Intake
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
