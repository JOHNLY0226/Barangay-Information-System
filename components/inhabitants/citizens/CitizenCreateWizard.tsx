"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  User,
  Phone,
  ShieldCheck,
  Award,
  Camera,
  Upload,
  AlertCircle,
  Sparkles,
  Check,
} from "lucide-react";

export interface CitizenFormData {
  // Step 1: Personal Info
  firstName: string;
  middleName: string;
  lastName: string;
  extensionName: string;
  birthDate: string;
  age: number;
  birthPlace: string;
  sex: "Male" | "Female";
  civilStatus: "Single" | "Married" | "Widowed" | "Separated" | "Divorced";
  educationalAttainment: string;
  educationalStatus: string;
  occupation: string;
  philsysNumber: string;

  // Step 2: Contact Details
  email: string;
  mobileNumber: string;
  telephoneNumber: string;
  region: string;
  province: string;
  city: string;
  barangay: string;
  houseLotNo: string;
  street: string;
  subdivision: string;
  zipCode: string;

  // Step 3: Identity Information
  bloodType: string;
  weightKg: string;
  heightFt: string;
  complexion: string;
  citizenship: string;
  otherCitizenship: string;
  ethnicity: string;
  otherEthnicity: string;
  religion: string;
  otherReligion: string;
  roleInFamily: string;
  isRegisteredResidentVoter: boolean;
  isRegisteredNonResidentVoter: boolean;
  mothersMaidenName: string;

  // Step 4: Sectoral Information
  sectors: string[];
  otherSector: string;

  // Step 5: Profile Photo
  photoUrl: string;
}

const INITIAL_FORM: CitizenFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  extensionName: "",
  birthDate: "",
  age: 0,
  birthPlace: "Quezon City",
  sex: "Male",
  civilStatus: "Single",
  educationalAttainment: "College",
  educationalStatus: "Graduate",
  occupation: "",
  philsysNumber: "",

  email: "",
  mobileNumber: "",
  telephoneNumber: "",
  region: "NCR - National Capital Region",
  province: "Metro Manila",
  city: "Quezon City",
  barangay: "Barangay Sta. Lucia",
  houseLotNo: "",
  street: "Sta. Lucia St.",
  subdivision: "",
  zipCode: "1117",

  bloodType: "O+",
  weightKg: "",
  heightFt: "",
  complexion: "",
  citizenship: "Filipino",
  otherCitizenship: "",
  ethnicity: "Tagalog",
  otherEthnicity: "",
  religion: "Roman Catholic",
  otherReligion: "",
  roleInFamily: "Child",
  isRegisteredResidentVoter: true,
  isRegisteredNonResidentVoter: false,
  mothersMaidenName: "",

  sectors: [],
  otherSector: "",

  photoUrl: "",
};

const SECTOR_OPTIONS = [
  "Unemployed",
  "Overseas Filipino Worker (OFW)",
  "Person with Disabilities (PWD)",
  "Out of School Children (OSC)",
  "Out of School Youth (OSY)",
  "Student",
  "Employed",
  "Senior Citizen (SC)",
  "Solo Parent",
  "Indigenous People (IP)",
  "Pregnant",
  "Migrant",
];

export default function CitizenCreateWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<CitizenFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Age calculation helper
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
    const computedAge = calculateAge(dob);
    setFormData((prev) => {
      const updatedSectors = [...prev.sectors];
      if (computedAge >= 60 && !updatedSectors.includes("Senior Citizen (SC)")) {
        updatedSectors.push("Senior Citizen (SC)");
      }
      return {
        ...prev,
        birthDate: dob,
        age: computedAge,
        sectors: updatedSectors,
      };
    });
  };

  const handleChange = (field: keyof CitizenFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const toggleSector = (sectorName: string) => {
    setFormData((prev) => {
      const exists = prev.sectors.includes(sectorName);
      const updated = exists
        ? prev.sectors.filter((s) => s !== sectorName)
        : [...prev.sectors, sectorName];
      return { ...prev, sectors: updated };
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, photoUrl: "File size exceeds 10MB limit." }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData((prev) => ({ ...prev, photoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
      if (!formData.birthDate) newErrors.birthDate = "Birthdate is required";
      if (!formData.birthPlace.trim()) newErrors.birthPlace = "Birth Place is required";
      if (!formData.educationalAttainment) newErrors.educationalAttainment = "Highest Educational Attainment is required";
      if (!formData.educationalStatus.trim()) newErrors.educationalStatus = "Educational Status is required";
    } else if (step === 2) {
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile Number is required";
      if (!formData.region) newErrors.region = "Region is required";
      if (!formData.province) newErrors.province = "Province is required";
      if (!formData.city) newErrors.city = "City / Municipality is required";
      if (!formData.barangay) newErrors.barangay = "Barangay is required";
      if (!formData.houseLotNo.trim()) newErrors.houseLotNo = "House / Block / Lot no. is required";
      if (!formData.street.trim()) newErrors.street = "Street name is required";
    } else if (step === 3) {
      if (!formData.citizenship) newErrors.citizenship = "Citizenship is required";
      if (formData.citizenship === "Other" && !formData.otherCitizenship.trim()) {
        newErrors.otherCitizenship = "Please specify citizenship";
      }
      if (!formData.ethnicity) newErrors.ethnicity = "Ethnicity is required";
      if (formData.ethnicity === "Other" && !formData.otherEthnicity.trim()) {
        newErrors.otherEthnicity = "Please specify ethnicity";
      }
      if (!formData.religion) newErrors.religion = "Religion is required";
      if (formData.religion === "Other" && !formData.otherReligion.trim()) {
        newErrors.otherReligion = "Please specify religion";
      }
      if (!formData.roleInFamily) newErrors.roleInFamily = "Role in the family is required";
      if (!formData.mothersMaidenName.trim()) newErrors.mothersMaidenName = "Mother's Maiden Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const steps = [
    { number: 1, label: "Personal Info", icon: User },
    { number: 2, label: "Contact Details", icon: Phone },
    { number: 3, label: "Identity Info", icon: ShieldCheck },
    { number: 4, label: "Sectoral Info", icon: Award },
    { number: 5, label: "Profile Photo", icon: Camera },
  ];

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm text-center max-w-2xl mx-auto my-8 space-y-5">
        <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Citizen Registration Completed!</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Resident record for <strong>{formData.firstName} {formData.middleName} {formData.lastName} {formData.extensionName}</strong> has been successfully registered under Barangay Sta. Lucia BIPS database.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto font-mono">
          <div>• System Control ID: RES-2026-{Math.floor(Math.random() * 9000 + 1000)}</div>
          <div>• Full Address: {formData.houseLotNo} {formData.street}, {formData.barangay}</div>
          <div>• Sectoral Flags: {formData.sectors.join(", ") || "None"}</div>
          <div>• Registered Voter: {formData.isRegisteredResidentVoter ? "Yes (Resident)" : "No"}</div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setFormData(INITIAL_FORM);
              setPhotoPreview(null);
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            Register Another Citizen
          </button>
          <Link
            href="/inhabitants/citizens"
            className="px-5 py-2 text-xs font-bold rounded-lg bg-[#580011] text-white hover:bg-[#7A0018] transition-colors shadow-sm"
          >
            Back to Citizens Directory
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
            <Link href="/inhabitants/citizens" className="hover:text-[#580011] flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Citizens Registry
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">Add New Citizen</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#580011] text-[#E5A623] rounded-xl font-bold">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Citizen Registration Stepper Wizard
              </h1>
              <p className="text-xs text-slate-500">
                Inhabitants Profiling Sub-System (BIPS v2.5) • Barangay Sta. Lucia
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/inhabitants/citizens"
            className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel Registration
          </Link>
        </div>
      </div>

      {/* 5-STEPPER PROGRESS BAR CARD */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative flex items-center justify-between max-w-4xl mx-auto">
          {/* Progress bar background line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#580011] z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />

          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative z-10 flex flex-col items-center group">
                <button
                  type="button"
                  onClick={() => {
                    if (step.number < currentStep) setCurrentStep(step.number);
                  }}
                  className={`h-11 w-11 rounded-full flex items-center justify-center font-bold text-xs transition-all border-2 ${
                    isCompleted
                      ? "bg-[#580011] text-[#E5A623] border-[#580011] shadow-2xs"
                      : isActive
                      ? "bg-[#E5A623] text-slate-950 border-[#580011] ring-4 ring-rose-100 shadow-sm font-extrabold"
                      : "bg-white text-slate-400 border-slate-300"
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5 stroke-[3]" /> : step.number}
                </button>
                <span
                  className={`mt-2 text-[11px] font-semibold tracking-tight transition-colors text-center ${
                    isActive ? "text-[#580011] font-bold" : isCompleted ? "text-slate-800" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN STEP FORM CONTAINER */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Step Title Header */}
        <div className="bg-[#580011] text-white p-4 px-6 flex items-center justify-between border-b border-[#7A0018]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#E5A623] text-slate-950 px-2 py-0.5 rounded">
              STEP {currentStep} OF 5
            </span>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {steps[currentStep - 1].label}
            </h2>
          </div>
          <span className="text-xs text-rose-200 font-medium">Fields marked with (*) are required</span>
        </div>

        <div className="p-6 space-y-6">
          {/* STEP 1: PERSONAL INFO */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="First Name"
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => handleChange("middleName", e.target.value)}
                    placeholder="Middle Name"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Last Name"
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Extension Name</label>
                  <input
                    type="text"
                    value={formData.extensionName}
                    onChange={(e) => handleChange("extensionName", e.target.value)}
                    placeholder="E.G. SR., JR., II, III"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 uppercase focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Birthdate <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Auto-calculated Age</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.birthDate ? `${formData.age} years old` : "Select birthdate"}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-100 text-slate-700 font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Birth Place <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(e) => handleChange("birthPlace", e.target.value)}
                    placeholder="City / Municipality / Province of Birth"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.birthPlace ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sex <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.sex}
                    onChange={(e) => handleChange("sex", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Civil Status <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.civilStatus}
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
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Highest Educational Attainment <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.educationalAttainment}
                    onChange={(e) => handleChange("educationalAttainment", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Elementary">Elementary</option>
                    <option value="High School">High School</option>
                    <option value="Vocational">Vocational</option>
                    <option value="College">College</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Educational Status <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.educationalStatus}
                    onChange={(e) => handleChange("educationalStatus", e.target.value)}
                    placeholder="e.g., Graduate, Undergraduate"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Profession / Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => handleChange("occupation", e.target.value)}
                    placeholder="Leave blank if none"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PhilSys Number (PSN)
                  </label>
                  <input
                    type="text"
                    value={formData.philsysNumber}
                    onChange={(e) => handleChange("philsysNumber", e.target.value)}
                    placeholder="0000-0000-0000-0000"
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONTACT DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="resident@example.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.mobileNumber}
                    onChange={(e) => handleChange("mobileNumber", e.target.value)}
                    placeholder="09158541583"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.mobileNumber ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                  {errors.mobileNumber && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Telephone Number</label>
                  <input
                    type="text"
                    value={formData.telephoneNumber}
                    onChange={(e) => handleChange("telephoneNumber", e.target.value)}
                    placeholder="(02) 8123-4567"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Region <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => handleChange("region", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="NCR - National Capital Region">NCR - National Capital Region</option>
                    <option value="Region III - Central Luzon">Region III - Central Luzon</option>
                    <option value="Region IV-A - CALABARZON">Region IV-A - CALABARZON</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Province <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => handleChange("province", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Metro Manila">Metro Manila</option>
                    <option value="Bulacan">Bulacan</option>
                    <option value="Rizal">Rizal</option>
                    <option value="Cavite">Cavite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Municipality <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Quezon City"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Barangay <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.barangay}
                    onChange={(e) => handleChange("barangay", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Barangay Sta. Lucia">Barangay Sta. Lucia</option>
                    <option value="Barangay Greater Lagro">Barangay Greater Lagro</option>
                    <option value="Barangay Pasong Putik">Barangay Pasong Putik</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    House / Block / Lot no. / Unit no. <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.houseLotNo}
                    onChange={(e) => handleChange("houseLotNo", e.target.value)}
                    placeholder="e.g., #15 Block 4 Lot 12"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.houseLotNo ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleChange("street", e.target.value)}
                    placeholder="e.g., Sta. Lucia St."
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.street ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subdivision / Village</label>
                  <input
                    type="text"
                    value={formData.subdivision}
                    onChange={(e) => handleChange("subdivision", e.target.value)}
                    placeholder="e.g., Doña Carmen Subd."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: IDENTITY INFORMATION */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Type</label>
                  <select
                    value={formData.bloodType}
                    onChange={(e) => handleChange("bloodType", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Weight (Kilograms)</label>
                  <input
                    type="number"
                    value={formData.weightKg}
                    onChange={(e) => handleChange("weightKg", e.target.value)}
                    placeholder="e.g., 65"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Height (Feet)</label>
                  <input
                    type="text"
                    value={formData.heightFt}
                    onChange={(e) => handleChange("heightFt", e.target.value)}
                    placeholder={`e.g., 5'8"`}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Complexion</label>
                  <input
                    type="text"
                    value={formData.complexion}
                    onChange={(e) => handleChange("complexion", e.target.value)}
                    placeholder="e.g., Fair, Medium, Dark"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Citizenship <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.citizenship}
                    onChange={(e) => handleChange("citizenship", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Filipino">Filipino</option>
                    <option value="Dual Citizenship">Dual Citizenship</option>
                    <option value="Other">Other (Specify below)</option>
                  </select>
                  {formData.citizenship === "Other" && (
                    <input
                      type="text"
                      value={formData.otherCitizenship}
                      onChange={(e) => handleChange("otherCitizenship", e.target.value)}
                      placeholder="If Other, please specify"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 mt-2 focus:ring-2 focus:ring-[#580011]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ethnicity <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.ethnicity}
                    onChange={(e) => handleChange("ethnicity", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Tagalog">Tagalog</option>
                    <option value="Ilocano">Ilocano</option>
                    <option value="Cebuano">Cebuano</option>
                    <option value="Bicolano">Bicolano</option>
                    <option value="Kapampangan">Kapampangan</option>
                    <option value="Pangasinense">Pangasinense</option>
                    <option value="Other">Other (Specify below)</option>
                  </select>
                  {formData.ethnicity === "Other" && (
                    <input
                      type="text"
                      value={formData.otherEthnicity}
                      onChange={(e) => handleChange("otherEthnicity", e.target.value)}
                      placeholder="If Other, please specify"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 mt-2 focus:ring-2 focus:ring-[#580011]"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Religion <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.religion}
                    onChange={(e) => handleChange("religion", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Roman Catholic">Roman Catholic</option>
                    <option value="Islam">Islam</option>
                    <option value="Iglesia ni Cristo">Iglesia ni Cristo</option>
                    <option value="Christian / Protestant">Christian / Protestant</option>
                    <option value="Seventh-day Adventist">Seventh-day Adventist</option>
                    <option value="Aglipayan">Aglipayan</option>
                    <option value="Other">Other (Specify below)</option>
                  </select>
                  {formData.religion === "Other" && (
                    <input
                      type="text"
                      value={formData.otherReligion}
                      onChange={(e) => handleChange("otherReligion", e.target.value)}
                      placeholder="If Other, please specify"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 mt-2 focus:ring-2 focus:ring-[#580011]"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role in the family <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.roleInFamily}
                    onChange={(e) => handleChange("roleInFamily", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                  >
                    <option value="Head">Head of Family</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Relative">Relative</option>

                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mother's Maiden Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.mothersMaidenName}
                    onChange={(e) => handleChange("mothersMaidenName", e.target.value)}
                    placeholder="First Name, Middle Name, Last Name"
                    className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-2 focus:ring-[#580011] focus:outline-hidden ${
                      errors.mothersMaidenName ? "border-rose-500 bg-rose-50" : "border-slate-300"
                    }`}
                  />
                </div>
              </div>

              {/* Voter Registration Checkboxes */}
              <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                <span className="text-xs font-bold text-slate-900 block mb-1">Voter Registration Status</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.isRegisteredResidentVoter}
                      onChange={(e) => handleChange("isRegisteredResidentVoter", e.target.checked)}
                      className="rounded text-[#580011] focus:ring-[#580011] h-4 w-4"
                    />
                    <span>Registered Resident Voter (Barangay Sta. Lucia)</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-800">
                    <input
                      type="checkbox"
                      checked={formData.isRegisteredNonResidentVoter}
                      onChange={(e) => handleChange("isRegisteredNonResidentVoter", e.target.checked)}
                      className="rounded text-[#580011] focus:ring-[#580011] h-4 w-4"
                    />
                    <span>Registered voter, but not a resident</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SECTORAL INFORMATION */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                Check all applicable sectors for targeted social service programs, benefits, and demographic profiling.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SECTOR_OPTIONS.map((sector) => {
                  const isChecked = formData.sectors.includes(sector);
                  return (
                    <label
                      key={sector}
                      onClick={() => toggleSector(sector)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isChecked
                          ? "bg-rose-50/70 border-[#580011] text-[#580011] font-bold shadow-2xs"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-[#580011] focus:ring-[#580011] h-4 w-4"
                      />
                      <span className="text-xs">{sector}</span>
                    </label>
                  );
                })}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Other Sector (Specify other sector if not listed above)
                </label>
                <input
                  type="text"
                  value={formData.otherSector}
                  onChange={(e) => handleChange("otherSector", e.target.value)}
                  placeholder="Specify other sector if not listed above"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#580011] focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* STEP 5: PROFILE PHOTO & FINAL SUBMIT */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* File Upload Box */}
                <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center space-y-4 hover:border-[#580011] transition-colors">
                  <div className="h-16 w-16 bg-rose-50 text-[#580011] rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Upload Citizen Profile Photo</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      PNG, JPG, or WEBP up to 10MB limit.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#580011] text-[#E5A623] hover:bg-[#7A0018] text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs">
                    <Camera className="h-4 w-4" /> Browse Photo File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {errors.photoUrl && (
                    <p className="text-xs text-rose-600 font-medium">{errors.photoUrl}</p>
                  )}
                </div>

                {/* Compressed Preview Card */}
                <div className="p-5 border border-slate-200 rounded-xl bg-white space-y-4 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Profile Photo Preview Card
                  </span>
                  {photoPreview ? (
                    <div className="space-y-2">
                      <img
                        src={photoPreview}
                        alt="Citizen Preview"
                        className="h-36 w-36 rounded-full object-cover border-4 border-[#E5A623] mx-auto shadow-md"
                      />
                      <span className="text-[11px] text-emerald-600 font-semibold block">
                        Photo Loaded & Compressed
                      </span>
                    </div>
                  ) : (
                    <div className="h-36 w-36 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                      <User className="h-16 w-16" />
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Confirmation */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Registration Summary Audit
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700 font-mono text-[11px]">
                  <div>Name: <strong>{formData.firstName} {formData.lastName}</strong></div>
                  <div>Sex: <strong>{formData.sex}</strong></div>
                  <div>Age: <strong>{formData.age} yrs</strong></div>
                  <div>Civil Status: <strong>{formData.civilStatus}</strong></div>
                  <div>Phone: <strong>{formData.mobileNumber}</strong></div>
                  <div>Address: <strong>{formData.street}, {formData.barangay}</strong></div>
                  <div>Family Role: <strong>{formData.roleInFamily}</strong></div>
                  <div>Sectors: <strong>{formData.sectors.length} selected</strong></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STEPPER NAVIGATION CONTROL BAR */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" /> Previous Step
          </button>

          <div className="flex items-center gap-3">
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-[#580011] text-white hover:bg-[#7A0018] transition-colors shadow-sm flex items-center gap-2"
              >
                Next Step <ChevronRight className="h-4 w-4 text-[#E5A623]" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md flex items-center gap-2"
              >
                {isSubmitting ? "Submitting Registration..." : "Submit Registration"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
