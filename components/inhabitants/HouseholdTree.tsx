"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Users,
  ChevronRight,
  Crown,
  User,
  Plus,
  Search,
  MapPin,
  Building,
  Heart,
  ShieldAlert,
  ArrowRight,
  Info,
  DollarSign
} from "lucide-react";
import { Household, Resident } from "@/types/inhabitants";

interface HouseholdTreeProps {
  households: Household[];
  onSelectResident?: (resident: Resident) => void;
  onAddMemberClick?: (householdId: string) => void;
}

export default function HouseholdTree({
  households,
  onSelectResident,
  onAddMemberClick,
}: HouseholdTreeProps) {
  const [selectedHouseholdId, setSelectedHouseholdId] = useState<string>(
    households[0]?.id || ""
  );
  const [streetFilter, setStreetFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredHouseholds = households.filter((hh) => {
    const matchStreet = streetFilter === "All" || hh.street === streetFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      hh.householdNo.toLowerCase().includes(q) ||
      hh.headName.toLowerCase().includes(q) ||
      hh.street.toLowerCase().includes(q);
    return matchStreet && matchQuery;
  });

  const selectedHousehold = households.find((hh) => hh.id === selectedHouseholdId) || households[0];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-[#580011] rounded-xl font-bold border border-rose-200">
            <Home className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Barangay Household & Family Member Tree
            </h2>
            <p className="text-xs text-slate-500">
              Interactive structural view of linked family units registered in Barangay Sta. Lucia.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200">
            Total Households: {households.length}
          </span>
          <Link
            href="/inhabitants/households/create"
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" /> Create Household
          </Link>
        </div>
      </div>

      {/* Main Grid: Left Column Household Selector, Right Column Member Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Household Registry List (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[700px]">
          <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Households Directory
              </span>
              <span className="text-[10px] font-semibold bg-rose-50 text-[#580011] px-2 py-0.5 rounded">
                {filteredHouseholds.length} Listed
              </span>
            </div>

            {/* Filter controls */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search household or head..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#580011]"
                />
              </div>

              <select
                value={streetFilter}
                onChange={(e) => setStreetFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#580011]"
              >
                <option value="All">All Streets</option>
                <option value="Sta. Lucia St.">Sta. Lucia St.</option>
                <option value="Maligaya St.">Maligaya St.</option>
                <option value="Regalado Ave.">Regalado Ave.</option>
                <option value="Lilac St.">Lilac St.</option>
                <option value="Katipunan Ext.">Katipunan Ext.</option>
              </select>
            </div>
          </div>

          {/* List of Household Cards */}
          <div className="divide-y divide-slate-100 overflow-y-auto flex-1 p-2 space-y-1">
            {filteredHouseholds.map((hh) => {
              const isSelected = hh.id === selectedHousehold?.id;
              return (
                <button
                  key={hh.id}
                  onClick={() => setSelectedHouseholdId(hh.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#580011] text-white shadow-sm font-medium"
                      : "hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="space-y-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected
                            ? "bg-[#3D000C] text-[#E5A623] border border-[#7A0018]"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {hh.householdNo}
                      </span>
                      <span
                        className={`text-[10px] font-semibold ${
                          isSelected ? "text-rose-200" : "text-slate-500"
                        }`}
                      >
                        {hh.street}
                      </span>
                    </div>

                    <div className="font-bold text-xs truncate">
                      Head: {hh.headName}
                    </div>

                    <div
                      className={`text-[11px] truncate ${
                        isSelected ? "text-rose-100/80" : "text-slate-500"
                      }`}
                    >
                      {hh.fullAddress}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#E5A623] text-slate-950"
                          : "bg-rose-50 text-[#580011]"
                      }`}
                    >
                      {hh.memberCount} {hh.memberCount === 1 ? "Member" : "Members"}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 ${
                        isSelected ? "text-[#E5A623]" : "text-slate-400"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Household Member Tree Details (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {selectedHousehold ? (
            <div className="p-6 space-y-6">
              {/* Selected Household Info Card */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#580011] text-white p-5 rounded-xl shadow-md border border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-[#E5A623] text-slate-950 px-2 py-0.5 rounded">
                      {selectedHousehold.householdNo}
                    </span>
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#E5A623]" /> {selectedHousehold.street}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white">
                    {selectedHousehold.fullAddress}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-300 flex-wrap">
                    <span>
                      Housing: <strong className="text-white">{selectedHousehold.housingType}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Income Group:{" "}
                      <strong className="text-[#E5A623]">
                        {selectedHousehold.familyIncomeCategory}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end gap-3 shrink-0">
                  <span className="bg-white/10 text-white backdrop-blur-xs text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                    {selectedHousehold.memberCount} Registered Members
                  </span>

                  {onAddMemberClick && (
                    <button
                      onClick={() => onAddMemberClick(selectedHousehold.id)}
                      className="px-3.5 py-1.5 bg-[#E5A623] hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Family Member
                    </button>
                  )}
                </div>
              </div>

              {/* Head of Household Designation Highlight */}
              {selectedHousehold.members.filter((m) => m.isHeadOfHousehold).map((head) => (
                <div
                  key={head.id}
                  className="p-4 rounded-xl border-2 border-[#E5A623] bg-amber-50/40 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        head.avatarUrl ||
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                      }
                      alt={head.firstName}
                      className="h-14 w-14 rounded-full object-cover border-2 border-[#580011] shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="bg-[#580011] text-[#E5A623] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <Crown className="h-3 w-3" /> HEAD OF FAMILY
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {head.age} yrs old • {head.gender}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        {head.firstName} {head.middleName} {head.lastName} {head.suffix}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {head.occupation || "Unspecified Occupation"} • Contact: {head.contactNumber}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectResident && onSelectResident(head)}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg shrink-0"
                  >
                    View Record
                  </button>
                </div>
              ))}

              {/* Tree Hierarchy Visual Container */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#580011]" /> Linked Household Dependents & Members
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Tree Hierarchy Model
                  </span>
                </div>

                {selectedHousehold.members.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    No linked family members currently registered under this household code.
                  </div>
                ) : (
                  <div className="space-y-3 relative pl-4 border-l-2 border-rose-200">
                    {selectedHousehold.members.map((member, index) => {
                      const isHead = member.isHeadOfHousehold;
                      return (
                        <div
                          key={member.id}
                          className={`relative p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isHead
                              ? "bg-rose-50/50 border-rose-200"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs"
                          }`}
                        >
                          {/* Connector node circle */}
                          <div className="absolute -left-[23px] top-6 h-3 w-3 rounded-full bg-[#580011] border-2 border-white shadow-2xs" />

                          <div className="flex items-center gap-3">
                            <img
                              src={
                                member.avatarUrl ||
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                              }
                              alt={member.firstName}
                              className="h-10 w-10 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-900">
                                  {member.firstName} {member.middleName ? member.middleName.charAt(0) + "." : ""} {member.lastName}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                  {member.relationshipToHead || (isHead ? "Head" : "Member")}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-3">
                                <span>{member.age} yrs old ({member.gender})</span>
                                <span>•</span>
                                <span>{member.civilStatus}</span>
                                <span>•</span>
                                <span>{member.occupation}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {member.isSenior && (
                              <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                                Senior
                              </span>
                            )}
                            {member.isPwd && (
                              <span className="text-[9px] font-bold bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded">
                                PWD
                              </span>
                            )}
                            <button
                              onClick={() => onSelectResident && onSelectResident(member)}
                              className="text-xs text-[#580011] font-semibold hover:underline flex items-center gap-1"
                            >
                              Details <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400">
              Select a household from the left list to view member details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
