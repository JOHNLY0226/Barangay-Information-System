"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Users,
  UserCheck,
  Award,
  HeartHandshake,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Plus,
  X,
} from "lucide-react";
import { Resident } from "@/types/inhabitants";

interface BIPSResidentTableProps {
  residents: Resident[];
  onEditResident: (resident: Resident) => void;
  onArchiveResident: (id: string) => void;
  onAddNewClick: () => void;
}

export default function BIPSResidentTable({
  residents,
  onEditResident,
  onArchiveResident,
  onAddNewClick,
}: BIPSResidentTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [civilStatusFilter, setCivilStatusFilter] = useState("All");
  const [voterFilter, setVoterFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All"); // Senior, PWD, SoloParent, Indigent
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate Metrics
  const metrics = useMemo(() => {
    const total = residents.length;
    const active = residents.filter((r) => r.status === "Active").length;
    const seniors = residents.filter((r) => r.isSenior || r.age >= 60).length;
    const pwds = residents.filter((r) => r.isPwd).length;
    const soloParents = residents.filter((r) => r.isSoloParent).length;
    const indigents = residents.filter((r) => r.isIndigent).length;

    return { total, active, seniors, pwds, soloParents, indigents };
  }, [residents]);

  // Filter Logic
  const filteredResidents = useMemo(() => {
    return residents.filter((resident) => {
      // Search term
      const query = searchTerm.toLowerCase().trim();
      const fullName = `${resident.firstName} ${resident.middleName || ""} ${resident.lastName}`.toLowerCase();
      const matchQuery =
        !query ||
        fullName.includes(query) ||
        resident.householdId.toLowerCase().includes(query) ||
        resident.street.toLowerCase().includes(query) ||
        resident.id.toLowerCase().includes(query);

      // Gender filter
      const matchGender = genderFilter === "All" || resident.gender === genderFilter;

      // Civil status filter
      const matchCivil = civilStatusFilter === "All" || resident.civilStatus === civilStatusFilter;

      // Voter filter
      const matchVoter = voterFilter === "All" || resident.voterStatus === voterFilter;

      // Category filter
      let matchCategory = true;
      if (categoryFilter === "Senior") matchCategory = resident.isSenior || resident.age >= 60;
      if (categoryFilter === "PWD") matchCategory = resident.isPwd;
      if (categoryFilter === "SoloParent") matchCategory = resident.isSoloParent;
      if (categoryFilter === "Indigent") matchCategory = resident.isIndigent;

      return matchQuery && matchGender && matchCivil && matchVoter && matchCategory;
    });
  }, [residents, searchTerm, genderFilter, civilStatusFilter, voterFilter, categoryFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage) || 1;
  const paginatedResidents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResidents.slice(start, start + itemsPerPage);
  }, [filteredResidents, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card 1: Total Citizens */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Total Registered Citizens
            </span>
            <div className="text-2xl font-bold text-slate-900">{metrics.total}</div>
            <p className="text-[11px] text-slate-500">Barangay Sta. Lucia Population</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-rose-50 text-[#580011] flex items-center justify-center font-bold">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Metric Card 2: Active Residents */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Active Residents
            </span>
            <div className="text-2xl font-bold text-slate-900">{metrics.active}</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% Validated Records
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <UserCheck className="h-6 w-6" />
          </div>
        </div>

        {/* Metric Card 3: Senior Citizens */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Senior Citizens (60+)
            </span>
            <div className="text-2xl font-bold text-slate-900">{metrics.seniors}</div>
            <p className="text-[11px] text-amber-600 font-medium">OSCA Registry Qualified</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-[#E5A623] flex items-center justify-center font-bold">
            <Award className="h-6 w-6" />
          </div>
        </div>

        {/* Metric Card 4: PWDs & Social Sectors */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div className="space-y-1">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              PWD Registered
            </span>
            <div className="text-2xl font-bold text-slate-900">{metrics.pwds}</div>
            <p className="text-[11px] text-slate-500">
              {metrics.soloParents} Solo Parents • {metrics.indigents} Indigent
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <HeartHandshake className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar Container */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Citizen Name, Household ID, or Street..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#580011] focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Action Trigger Button */}
          <Link
            href="/inhabitants/citizens/create"
            className="px-4 py-2 bg-[#E5A623] hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="h-4 w-4" /> Register New Citizen
          </Link>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Gender
            </label>
            <select
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#580011]"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Civil Status
            </label>
            <select
              value={civilStatusFilter}
              onChange={(e) => {
                setCivilStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#580011]"
            >
              <option value="All">All Civil Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Voter Status
            </label>
            <select
              value={voterFilter}
              onChange={(e) => {
                setVoterFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#580011]"
            >
              <option value="All">All Voters</option>
              <option value="Registered">Registered Voter</option>
              <option value="Non-Registered">Non-Registered</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Social Sector Flag
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#580011]"
            >
              <option value="All">All Categories</option>
              <option value="Senior">Senior Citizen (60+)</option>
              <option value="PWD">Person with Disability (PWD)</option>
              <option value="SoloParent">Solo Parent</option>
              <option value="Indigent">Indigent Beneficiary</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#580011] text-white text-xs font-semibold uppercase tracking-wider border-b border-[#7A0018]">
                <th className="py-3 px-4">Citizen Profile</th>
                <th className="py-3 px-4">Age / Sex</th>
                <th className="py-3 px-4">Civil Status</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Address / Household ID</th>
                <th className="py-3 px-4 text-center">Flags</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {paginatedResidents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Users className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700">No citizen records found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try adjusting your search criteria or register a new resident.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedResidents.map((resident) => {
                  const fullName = `${resident.firstName} ${resident.middleName ? resident.middleName.charAt(0) + "." : ""} ${resident.lastName} ${resident.suffix || ""}`;

                  return (
                    <tr
                      key={resident.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      {/* Photo Avatar & Full Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              resident.avatarUrl ||
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                            }
                            alt={fullName}
                            className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-2xs"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block group-hover:text-[#580011] transition-colors">
                              {fullName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {resident.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Age / Sex */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800">{resident.age} yrs old</div>
                        <div className="text-[10px] text-slate-500">{resident.gender}</div>
                      </td>

                      {/* Civil Status */}
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {resident.civilStatus}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[110px]">
                          {resident.occupation}
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800">{resident.contactNumber}</div>
                        {resident.email && (
                          <div className="text-[10px] text-slate-500 truncate max-w-[130px]">
                            {resident.email}
                          </div>
                        )}
                      </td>

                      {/* Address / Household ID */}
                      <td className="py-3 px-4">
                        <div className="text-slate-800 font-medium truncate max-w-[180px]">
                          {resident.street}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-mono bg-rose-50 text-[#580011] font-bold px-1.5 py-0.5 rounded border border-rose-200">
                            {resident.householdId}
                          </span>
                          {resident.isHeadOfHousehold && (
                            <span className="text-[9px] bg-[#E5A623] text-slate-950 font-bold px-1.5 py-0.5 rounded">
                              HEAD
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Flags */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          {resident.isSenior && (
                            <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded border border-amber-200">
                              SR
                            </span>
                          )}
                          {resident.isPwd && (
                            <span className="text-[9px] font-bold bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200">
                              PWD
                            </span>
                          )}
                          {resident.isSoloParent && (
                            <span className="text-[9px] font-bold bg-[#580011]/10 text-[#580011] px-1.5 py-0.5 rounded border border-[#580011]/20">
                              SOLO
                            </span>
                          )}
                          {resident.isIndigent && (
                            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded border border-emerald-200">
                              4Ps
                            </span>
                          )}
                          {resident.voterStatus === "Registered" && (
                            <span className="text-[9px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                              VOTER
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action Menu */}
                      <td className="py-3 px-4 text-right">
                        <div className="relative inline-block text-left">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedResident(resident)}
                              title="View Citizen Profile"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#580011] hover:bg-rose-50 transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => onEditResident(resident)}
                              title="Edit Resident"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => onArchiveResident(resident.id)}
                              title="Archive Record"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 bg-slate-50">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-800">
              {filteredResidents.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-slate-800">
              {Math.min(currentPage * itemsPerPage, filteredResidents.length)}
            </span>{" "}
            of <span className="font-bold text-slate-800">{filteredResidents.length}</span> entries
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-[#580011] text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-200"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Citizen Profile Detail Drawer / Modal */}
      {selectedResident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8 transform transition-all">
            <div className="bg-[#580011] text-white p-5 flex items-center justify-between border-b border-[#7A0018]">
              <div className="flex items-center gap-3">
                <img
                  src={
                    selectedResident.avatarUrl ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  }
                  alt={selectedResident.firstName}
                  className="h-12 w-12 rounded-full object-cover border-2 border-[#E5A623]"
                />
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {selectedResident.firstName} {selectedResident.middleName} {selectedResident.lastName}{" "}
                    {selectedResident.suffix}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-rose-200">
                    <span>ID: {selectedResident.id}</span>
                    <span>•</span>
                    <span className="font-mono bg-[#3D000C] text-[#E5A623] px-2 py-0.5 rounded border border-[#7A0018]">
                      {selectedResident.householdId}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedResident(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#7A0018]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Age / Sex</span>
                  <span className="font-semibold text-slate-800">
                    {selectedResident.age} yrs • {selectedResident.gender}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Civil Status</span>
                  <span className="font-semibold text-slate-800">{selectedResident.civilStatus}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Date of Birth</span>
                  <span className="font-semibold text-slate-800">{selectedResident.birthDate}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Contact #</span>
                  <span className="font-semibold text-slate-800">{selectedResident.contactNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Street</span>
                  <span className="font-semibold text-slate-800">{selectedResident.street}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Voter Status</span>
                  <span className="font-semibold text-slate-800">{selectedResident.voterStatus}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Social Sector Classification Flags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedResident.isSenior && (
                    <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-semibold text-xs border border-amber-300">
                      Senior Citizen (OSCA Member)
                    </span>
                  )}
                  {selectedResident.isPwd && (
                    <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-900 font-semibold text-xs border border-blue-300">
                      PWD: {selectedResident.pwdType || "Registered"}
                    </span>
                  )}
                  {selectedResident.isSoloParent && (
                    <span className="px-3 py-1 rounded-lg bg-[#580011]/10 text-[#580011] font-semibold text-xs border border-[#580011]/20">
                      Solo Parent Beneficiary
                    </span>
                  )}
                  {selectedResident.isIndigent && (
                    <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-semibold text-xs border border-emerald-300">
                      4Ps / Indigent Priority
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white text-xs space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">Emergency Contact Details</h4>
                <div className="grid grid-cols-3 gap-2 text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Name</span>
                    <span className="font-semibold text-slate-800">
                      {selectedResident.emergencyContactName || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Phone</span>
                    <span className="font-semibold text-slate-800">
                      {selectedResident.emergencyContactPhone || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Relation</span>
                    <span className="font-semibold text-slate-800">
                      {selectedResident.emergencyContactRelation || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setSelectedResident(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg"
              >
                Close Profile
              </button>
              <button
                onClick={() => {
                  onEditResident(selectedResident);
                  setSelectedResident(null);
                }}
                className="px-4 py-2 bg-[#E5A623] hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Edit className="h-3.5 w-3.5" /> Edit Information
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
