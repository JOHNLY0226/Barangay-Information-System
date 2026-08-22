"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Camera,
  Search,
  Plus,
  Trash2,
  Users,
  Home,
  CheckCircle2,
  AlertCircle,
  Building2,
  DollarSign,
  UserCheck,
} from "lucide-react";
import { Resident } from "@/types/inhabitants";
import { INITIAL_RESIDENTS } from "../mockData";

export interface HouseholdFormData {
  householdPhotoUrl: string;
  householdType: string;
  dwellingType: string;
  householdName: string;
  tenureStatus: string;
  monthlyIncome: string;
  members: Resident[];
}

export default function HouseholdCreateForm() {
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const [householdType, setHouseholdType] = useState<string>("Single Family");
  const [dwellingType, setDwellingType] = useState<string>("Concrete");
  const [householdName, setHouseholdName] = useState<string>("");
  const [tenureStatus, setTenureStatus] = useState<string>("Owned");
  const [monthlyIncome, setMonthlyIncome] = useState<string>("₱ 0.00");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<Resident[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Available citizens to search from
  const availableCitizens = useMemo(() => {
    return INITIAL_RESIDENTS.filter(
      (res) => !selectedMembers.some((m) => m.id === res.id)
    );
  }, [selectedMembers]);

  // Filtered citizens matching live search input
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return availableCitizens.filter(
      (res) =>
        res.firstName.toLowerCase().includes(q) ||
        res.lastName.toLowerCase().includes(q) ||
        res.id.toLowerCase().includes(q) ||
        res.street.toLowerCase().includes(q)
    );
  }, [searchQuery, availableCitizens]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setPhotoError("File size exceeds 10MB limit.");
        return;
      }
      setPhotoError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = (resident: Resident) => {
    setSelectedMembers((prev) => [...prev, resident]);
    setSearchQuery("");
  };

  const handleAddAllFromSearch = () => {
    if (searchResults.length > 0) {
      setSelectedMembers((prev) => [...prev, ...searchResults]);
      setSearchQuery("");
    }
  };

  const handleRemoveMember = (id: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!householdName.trim()) {
      errors.householdName = "Household Name is required";
    }
    if (!householdType) {
      errors.householdType = "Household Type is required";
    }
    if (!tenureStatus) {
      errors.tenureStatus = "Tenure Status is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 1200);
  };

  if (isSaved) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center max-w-2xl mx-auto my-8 space-y-5">
        <div className="h-16 w-16 bg-rose-50 text-[#580011] rounded-full flex items-center justify-center mx-auto border border-rose-200">
          <CheckCircle2 className="h-10 w-10 text-[#580011]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Household Registered Successfully!</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            <strong>{householdName}</strong> has been added to Barangay Sta. Lucia household registry with{" "}
            <strong>{selectedMembers.length} registered members</strong>.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto font-mono">
          <div>• Control No: HH-2026-{Math.floor(Math.random() * 900 + 100)}</div>
          <div>• Household Type: {householdType}</div>
          <div>• Tenure: {tenureStatus}</div>
          <div>• Dwelling: {dwellingType}</div>
          <div>• Monthly Income: {monthlyIncome}</div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            onClick={() => {
              setIsSaved(false);
              setHouseholdName("");
              setSelectedMembers([]);
              setPhotoPreview(null);
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Create Another Household
          </button>
          <Link
            href="/inhabitants/households"
            className="px-5 py-2 text-xs font-bold rounded-lg bg-[#580011] text-[#E5A623] hover:bg-[#7A0018] transition-colors shadow-sm"
          >
            Back to Households Registry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/inhabitants/households" className="hover:text-[#580011] flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Households Registry
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">Create Household</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#580011] text-[#E5A623] rounded-xl font-bold shadow-2xs">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Create New Household Profile
              </h1>
              <p className="text-xs text-slate-500">
                Card-based household registration & dynamic family member mapping • Brgy. Sta. Lucia
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/inhabitants/households"
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* CARD 1: HOUSEHOLD PHOTO */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#580011] text-white p-4 px-6 flex items-center justify-between border-b border-[#7A0018]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-[#E5A623] text-slate-950 px-2 py-0.5 rounded">
                CARD 1
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                HOUSEHOLD PHOTO
              </h2>
            </div>
            <span className="text-xs text-rose-200 font-medium">Max 10MB JPG/PNG</span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* File upload drag-and-drop box */}
              <div className="p-6 border-2 border-dashed border-rose-200 rounded-xl bg-rose-50/40 text-center space-y-4 hover:border-[#580011] transition-colors">
                <div className="h-16 w-16 bg-rose-50 text-[#580011] border border-rose-200 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Upload Household Residence Photo</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload image of house facade or dwelling unit for spatial identification.
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#580011] hover:bg-[#7A0018] text-[#E5A623] text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs">
                  <Camera className="h-4 w-4" /> Browse Photo File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {photoError && <p className="text-xs text-rose-600 font-medium">{photoError}</p>}
              </div>

              {/* Household Photo Preview Box */}
              <div className="p-5 border border-slate-200 rounded-xl bg-white text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Photo Preview Card
                </span>
                {photoPreview ? (
                  <div className="space-y-2">
                    <img
                      src={photoPreview}
                      alt="Household Preview"
                      className="h-40 w-full object-cover rounded-lg border border-slate-300 shadow-xs"
                    />
                    <span className="text-[11px] text-[#580011] font-semibold block">
                      Household Image Ready
                    </span>
                  </div>
                ) : (
                  <div className="h-40 w-full rounded-lg bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 space-y-1">
                    <Home className="h-10 w-10 text-slate-300" />
                    <span className="text-xs text-slate-400">No household photo uploaded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: HOUSEHOLD DETAILS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#580011] text-white p-4 px-6 flex items-center justify-between border-b border-[#7A0018]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-[#E5A623] text-slate-950 px-2 py-0.5 rounded">
                CARD 2
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                HOUSEHOLD DETAILS
              </h2>
            </div>
            <span className="text-xs text-rose-200 font-medium">Core Structure Specification</span>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Household Type <span className="text-rose-600">*</span>
                </label>
                <select
                  value={householdType}
                  onChange={(e) => setHouseholdType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                >
                  <option value="Single Family">Single Family</option>
                  <option value="Extended Family">Extended Family</option>
                  <option value="Single Person">Single Person</option>
                  <option value="Non-Family">Non-Family</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dwelling Type</label>
                <select
                  value={dwellingType}
                  onChange={(e) => setDwellingType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                >
                  <option value="Concrete">Concrete</option>
                  <option value="Semi-Concrete">Semi-Concrete</option>
                  <option value="Light Materials">Light Materials</option>
                  <option value="Makeshift / Salvaged">Makeshift / Salvaged</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Household Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={householdName}
                  onChange={(e) => setHouseholdName(e.target.value)}
                  placeholder="e.g., Dela Cruz Family"
                  className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                    formErrors.householdName ? "border-rose-500 bg-rose-50" : "border-slate-300"
                  }`}
                />
                {formErrors.householdName && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {formErrors.householdName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tenure Status <span className="text-rose-600">*</span>
                </label>
                <select
                  value={tenureStatus}
                  onChange={(e) => setTenureStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                >
                  <option value="Owned">Owned</option>
                  <option value="Rented">Rented</option>
                  <option value="Informal Settler">Informal Settler</option>
                  <option value="Shared">Shared</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Income</label>
                <input
                  type="text"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="₱ 0.00"
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: HOUSEHOLD MEMBERS */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#580011] text-white p-4 px-6 flex items-center justify-between border-b border-[#7A0018]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-[#E5A623] text-slate-950 px-2 py-0.5 rounded">
                CARD 3
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                HOUSEHOLD MEMBERS
              </h2>
              {/* Dynamic Member Counter Badge */}
              <span className="bg-[#3D000C] text-[#E5A623] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#7A0018]">
                {selectedMembers.length} {selectedMembers.length === 1 ? "Member" : "Members"}
              </span>
            </div>
            <span className="text-xs text-rose-200 font-medium">Dynamic Citizen Mapper</span>
          </div>

          <div className="p-6 space-y-6">
            {/* Live Search & Add Controls */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type name to search..."
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#580011] bg-white"
                  />
                </div>

                {searchResults.length > 0 && (
                  <button
                    type="button"
                    onClick={handleAddAllFromSearch}
                    className="w-full sm:w-auto px-4 py-2 bg-[#E5A623] hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <Plus className="h-4 w-4" /> + Add All from Search ({searchResults.length})
                  </button>
                )}
              </div>

              {/* Live Search Result Dropdown List */}
              {searchQuery.trim() !== "" && (
                <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 max-h-56 overflow-y-auto shadow-md">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No matching registered citizens found for "{searchQuery}".
                    </div>
                  ) : (
                    searchResults.map((res) => (
                      <div
                        key={res.id}
                        className="p-3 flex items-center justify-between hover:bg-slate-50 text-xs transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              res.avatarUrl ||
                              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                            }
                            alt={res.firstName}
                            className="h-8 w-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {res.firstName} {res.middleName} {res.lastName}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {res.age} yrs • {res.gender} • Street: {res.street}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddMember(res)}
                          className="px-3 py-1 bg-rose-50 text-[#580011] hover:bg-[#580011] hover:text-[#E5A623] text-xs font-semibold rounded-lg transition-colors border border-rose-200 flex items-center gap-1"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add to Household
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Selected Members Table / List */}
            <div>
              {selectedMembers.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 space-y-2">
                  <Users className="h-10 w-10 text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">
                    No members added yet. Search and add members above.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Type a registered citizen's name in the search field to attach family members to this household card.
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#580011] text-white text-xs font-semibold uppercase tracking-wider border-b border-[#7A0018]">
                        <th className="py-3 px-4">Member Name</th>
                        <th className="py-3 px-4">Age / Sex</th>
                        <th className="py-3 px-4">Role in Family</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4 text-right">Remove</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {selectedMembers.map((member, idx) => (
                        <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  member.avatarUrl ||
                                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                                }
                                alt={member.firstName}
                                className="h-8 w-8 rounded-full object-cover border border-slate-200"
                              />
                              <div>
                                <span className="font-bold text-slate-900 block">
                                  {member.firstName} {member.lastName}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {member.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-800">
                            {member.age} yrs • {member.gender}
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-[#580011] border border-rose-200">
                              {idx === 0 ? "Head of Household" : member.relationshipToHead || "Member"}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-slate-700">
                            {member.contactNumber}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(member.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Remove member"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE BOTTOM ACTION */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 bg-[#580011] hover:bg-[#7A0018] text-[#E5A623] font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            {isSaving ? "Saving Household..." : "SAVE HOUSEHOLD"}
          </button>
        </div>
      </form>
    </div>
  );
}
