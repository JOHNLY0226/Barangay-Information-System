"use client";

import React, { useState, useEffect } from "react";
import { X, UserPlus, Save, AlertCircle, User, Phone, Home, Heart, ShieldCheck } from "lucide-react";
import { Resident } from "@/types/inhabitants";

interface ResidentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (residentData: Partial<Resident>) => void;
  initialData?: Resident | null;
}

export default function ResidentRegistrationModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ResidentRegistrationModalProps) {
  const [formData, setFormData] = useState<Partial<Resident>>({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    gender: "Male",
    birthDate: "",
    civilStatus: "Single",
    contactNumber: "",
    email: "",
    address: "",
    street: "Sta. Lucia St.",
    householdId: "",
    isHeadOfHousehold: false,
    relationshipToHead: "Self",
    voterStatus: "Registered",
    precinctNo: "",
    occupation: "",
    educationalAttainment: "College",
    isPwd: false,
    pwdType: "",
    isSenior: false,
    isSoloParent: false,
    isIndigent: false,
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
  });

  const [activeTab, setActiveTab] = useState<"personal" | "contact" | "category" | "emergency">("personal");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        middleName: "",
        suffix: "",
        gender: "Male",
        birthDate: "",
        civilStatus: "Single",
        contactNumber: "",
        email: "",
        address: "Brgy. Sta. Lucia, Quezon City",
        street: "Sta. Lucia St.",
        householdId: "HH-STL-010" + Math.floor(Math.random() * 9 + 1),
        isHeadOfHousehold: false,
        relationshipToHead: "Head",
        voterStatus: "Registered",
        precinctNo: "",
        occupation: "",
        educationalAttainment: "College",
        isPwd: false,
        pwdType: "",
        isSenior: false,
        isSoloParent: false,
        isIndigent: false,
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelation: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age > 0 ? age : 0;
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    const calculatedAge = calculateAge(dob);
    setFormData((prev) => ({
      ...prev,
      birthDate: dob,
      age: calculatedAge,
      isSenior: calculatedAge >= 60,
    }));
  };

  const handleChange = (field: keyof Resident, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData.birthDate) newErrors.birthDate = "Date of birth is required";
    if (!formData.contactNumber?.trim()) newErrors.contactNumber = "Contact number is required";
    if (!formData.street) newErrors.street = "Street address is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.firstName || newErrors.lastName || newErrors.birthDate) {
        setActiveTab("personal");
      } else if (newErrors.contactNumber || newErrors.street) {
        setActiveTab("contact");
      }
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-8 transform transition-all">
        {/* Modal Header */}
        <div className="bg-[#580011] text-white p-5 flex items-center justify-between border-b border-[#7A0018]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E5A623] text-slate-950 rounded-lg font-bold">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">
                {initialData ? "Edit Citizen Profile" : "Register New Barangay Citizen"}
              </h2>
              <p className="text-xs text-rose-200">
                Inhabitants Profiling Sub-System (BIPS v2.5) • Sta. Lucia Registry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-[#7A0018] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-3 gap-2 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("personal")}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-t-lg transition-all border-b-2 ${
              activeTab === "personal"
                ? "border-[#580011] text-[#580011] bg-white font-bold shadow-2xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <User className="h-4 w-4" /> Personal Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-t-lg transition-all border-b-2 ${
              activeTab === "contact"
                ? "border-[#580011] text-[#580011] bg-white font-bold shadow-2xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Home className="h-4 w-4" /> Contact & Household
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("category")}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-t-lg transition-all border-b-2 ${
              activeTab === "category"
                ? "border-[#580011] text-[#580011] bg-white font-bold shadow-2xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShieldCheck className="h-4 w-4" /> Special Categories
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("emergency")}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-t-lg transition-all border-b-2 ${
              activeTab === "emergency"
                ? "border-[#580011] text-[#580011] bg-white font-bold shadow-2xs"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Heart className="h-4 w-4" /> Emergency Contact
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* TAB 1: PERSONAL DETAILS */}
          {activeTab === "personal" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName || ""}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="e.g. Juan"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.firstName ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName || ""}
                    onChange={(e) => handleChange("middleName", e.target.value)}
                    placeholder="e.g. Santos"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName || ""}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="e.g. Dela Cruz"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.lastName ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Suffix</label>
                  <input
                    type="text"
                    value={formData.suffix || ""}
                    onChange={(e) => handleChange("suffix", e.target.value)}
                    placeholder="Jr., III, etc."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender || "Male"}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={handleDobChange}
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.birthDate ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                  {errors.birthDate && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.birthDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Calculated Age</label>
                  <div className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 bg-slate-100 text-slate-800">
                    {formData.age ?? 0} yrs old
                    {formData.isSenior && (
                      <span className="ml-2 text-[10px] bg-[#E5A623] text-slate-950 font-bold px-1.5 py-0.5 rounded">
                        Senior
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Civil Status</label>
                  <select
                    value={formData.civilStatus || "Single"}
                    onChange={(e) => handleChange("civilStatus", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Occupation</label>
                  <input
                    type="text"
                    value={formData.occupation || ""}
                    onChange={(e) => handleChange("occupation", e.target.value)}
                    placeholder="e.g. Private Employee, Driver"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Educational Attainment
                  </label>
                  <select
                    value={formData.educationalAttainment || "College"}
                    onChange={(e) => handleChange("educationalAttainment", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="None">None</option>
                    <option value="Elementary">Elementary</option>
                    <option value="High School">High School</option>
                    <option value="Vocational">Vocational</option>
                    <option value="College">College</option>
                    <option value="Post-Graduate">Post-Graduate</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT & HOUSEHOLD */}
          {activeTab === "contact" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactNumber || ""}
                    onChange={(e) => handleChange("contactNumber", e.target.value)}
                    placeholder="09XX-XXX-XXXX"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.contactNumber ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                  {errors.contactNumber && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.contactNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="citizen@example.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Complete Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="House #, Street, Brgy. Sta. Lucia, QC"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Name <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.street || "Sta. Lucia St."}
                    onChange={(e) => handleChange("street", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Sta. Lucia St.">Sta. Lucia St.</option>
                    <option value="Maligaya St.">Maligaya St.</option>
                    <option value="Regalado Ave.">Regalado Ave.</option>
                    <option value="Lilac St.">Lilac St.</option>
                    <option value="Katipunan Ext.">Katipunan Ext.</option>
                    <option value="Commonwealth Ave.">Commonwealth Ave.</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Household Control ID
                  </label>
                  <input
                    type="text"
                    value={formData.householdId || ""}
                    onChange={(e) => handleChange("householdId", e.target.value)}
                    placeholder="e.g. HH-STL-0101"
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Head of Household?
                  </label>
                  <div className="flex items-center h-9">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
                      <input
                        type="checkbox"
                        checked={formData.isHeadOfHousehold || false}
                        onChange={(e) => {
                          handleChange("isHeadOfHousehold", e.target.checked);
                          if (e.target.checked) handleChange("relationshipToHead", "Head");
                        }}
                        className="rounded text-[#580011] focus:ring-[#580011] h-4 w-4"
                      />
                      Designate as Head of Household
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Relationship to Household Head
                  </label>
                  <input
                    type="text"
                    value={formData.relationshipToHead || "Self"}
                    onChange={(e) => handleChange("relationshipToHead", e.target.value)}
                    disabled={formData.isHeadOfHousehold}
                    placeholder="e.g. Spouse, Son, Daughter"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPECIAL CATEGORIES */}
          {activeTab === "category" && (
            <div className="space-y-5">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                Check all applicable government social sector flags for automated benefit allocation and barangay profiling.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSenior || false}
                      onChange={(e) => handleChange("isSenior", e.target.checked)}
                      className="rounded text-[#580011] focus:ring-[#580011] h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Senior Citizen (60+ yrs)</span>
                      <span className="text-[11px] text-slate-500">Eligible for OSCA privileges</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer border-t border-slate-200 pt-3">
                    <input
                      type="checkbox"
                      checked={formData.isSoloParent || false}
                      onChange={(e) => handleChange("isSoloParent", e.target.checked)}
                      className="rounded text-[#580011] focus:ring-[#580011] h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Solo Parent</span>
                      <span className="text-[11px] text-slate-500">RA 11861 Solo Parent Act beneficiary</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer border-t border-slate-200 pt-3">
                    <input
                      type="checkbox"
                      checked={formData.isIndigent || false}
                      onChange={(e) => handleChange("isIndigent", e.target.checked)}
                      className="rounded text-[#580011] focus:ring-[#580011] h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Indigent Beneficiary</span>
                      <span className="text-[11px] text-slate-500">Qualified for 4Ps / Financial Assistance</span>
                    </div>
                  </label>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPwd || false}
                      onChange={(e) => handleChange("isPwd", e.target.checked)}
                      className="rounded text-[#580011] focus:ring-[#580011] h-4 w-4"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Person with Disability (PWD)</span>
                      <span className="text-[11px] text-slate-500">PDAO Registered Citizen</span>
                    </div>
                  </label>

                  {formData.isPwd && (
                    <div className="pl-7 pt-1">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Disability Specification
                      </label>
                      <input
                        type="text"
                        value={formData.pwdType || ""}
                        onChange={(e) => handleChange("pwdType", e.target.value)}
                        placeholder="e.g. Visual, Hearing, Mobility"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                      />
                    </div>
                  )}

                  <div className="border-t border-slate-200 pt-3">
                    <span className="text-xs font-bold text-slate-900 block mb-2">Voter Status</span>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={formData.voterStatus || "Registered"}
                        onChange={(e) => handleChange("voterStatus", e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Registered">Registered Voter</option>
                        <option value="Non-Registered">Non-Registered</option>
                      </select>

                      {formData.voterStatus === "Registered" && (
                        <input
                          type="text"
                          value={formData.precinctNo || ""}
                          onChange={(e) => handleChange("precinctNo", e.target.value)}
                          placeholder="Precinct #"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EMERGENCY CONTACT */}
          {activeTab === "emergency" && (
            <div className="space-y-4">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-700" />
                Primary contact person in case of medical, disaster, or barangay emergency.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContactName || ""}
                    onChange={(e) => handleChange("emergencyContactName", e.target.value)}
                    placeholder="Full name of contact"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContactPhone || ""}
                    onChange={(e) => handleChange("emergencyContactPhone", e.target.value)}
                    placeholder="09XX-XXX-XXXX"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship</label>
                  <input
                    type="text"
                    value={formData.emergencyContactRelation || ""}
                    onChange={(e) => handleChange("emergencyContactRelation", e.target.value)}
                    placeholder="Parent, Spouse, Sibling"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-[11px] text-slate-500">
              Barangay Sta. Lucia BIS v2.5 • All records subject to Data Privacy Act (RA 10173)
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold rounded-lg bg-[#E5A623] text-slate-950 hover:bg-amber-400 transition-colors shadow-sm flex items-center gap-2"
              >
                <Save className="h-4 w-4" /> Save Citizen Record
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
